"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

interface ConversationRow {
  id: string;
  messages: Message[];
  created_at: string;
}

function getTitle(messages: Message[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New Chat";
  const text = firstUser.content;
  return text.length > 40 ? text.slice(0, 40) + "..." : text;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConvo = conversations.find((c) => c.id === activeId);
  const messages = activeConvo?.messages ?? [];

  const supabase = createClient();

  const getUserId = useCallback(async (): Promise<string | null> => {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;
  }, [supabase]);

  useEffect(() => {
    const load = async () => {
      const userId = await getUserId();
      if (!userId || !supabase) {
        setPageLoading(false);
        return;
      }

      const { data } = await supabase
        .from("ai_conversations")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (data) {
        const convos: Conversation[] = (data as ConversationRow[]).map((row) => ({
          id: row.id,
          title: getTitle(row.messages as Message[]),
          messages: (row.messages as Message[]) ?? [],
          createdAt: row.created_at,
        }));
        setConversations(convos);
        if (convos.length > 0) setActiveId(convos[0].id);
      }
      setPageLoading(false);
    };
    load();
  }, [getUserId, supabase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNewChat = () => {
    const tempId = "temp-" + Date.now().toString(36);
    const newConvo: Conversation = {
      id: tempId,
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setConversations((prev) => [newConvo, ...prev]);
    setActiveId(tempId);
    setShowSidebar(false);
  };

  const handleSelectChat = (id: string) => {
    setActiveId(id);
    setShowSidebar(false);
  };

  const handleDeleteChat = async (id: string) => {
    if (!supabase) return;
    if (!id.startsWith("temp-")) {
      await supabase.from("ai_conversations").delete().eq("id", id);
    }
    setConversations((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      if (activeId === id) {
        setActiveId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
  };

  const persistConversation = async (id: string, msgs: Message[]) => {
    if (!supabase) return id;
    const userId = await getUserId();
    if (!userId) return id;

    if (id.startsWith("temp-")) {
      const { data } = await supabase
        .from("ai_conversations")
        .insert({ user_id: userId, messages: msgs })
        .select("id, created_at")
        .single();

      if (data) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, id: data.id, createdAt: data.created_at } : c
          )
        );
        setActiveId(data.id);
        return data.id;
      }
    } else {
      await supabase
        .from("ai_conversations")
        .update({ messages: msgs, updated_at: new Date().toISOString() })
        .eq("id", id);
    }
    return id;
  };

  const updateMessages = useCallback(
    (updater: (prev: Message[]) => Message[]) => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== activeId) return c;
          const newMessages = updater(c.messages);
          return {
            ...c,
            messages: newMessages,
            title: c.title === "New Chat" ? getTitle(newMessages) : c.title,
          };
        })
      );
    },
    [activeId]
  );

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    let currentId = activeId;
    if (!currentId) {
      handleNewChat();
      currentId = "temp-" + Date.now().toString(36);
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMessage];
    setInput("");
    setLoading(true);

    updateMessages(() => allMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to get response");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let assistantContent = "";

      updateMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        updateMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }

      const finalMessages = [...allMessages, { role: "assistant" as const, content: assistantContent }];
      const finalId = currentId ?? activeId;
      if (finalId) {
        await persistConversation(finalId, finalMessages);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong";
      updateMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, ${errorMsg}. Please try again.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What do my latest blood test results mean?",
    "Summarize my recent documents",
    "What medicines am I currently taking?",
    "When is my next follow-up?",
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } md:block w-full md:w-64 shrink-0 border-r border-border flex flex-col bg-white md:bg-transparent absolute md:relative z-10 h-full`}
      >
        <div className="p-3 border-b border-border">
          <button
            onClick={handleNewChat}
            className="w-full px-3 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
          >
            + New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {pageLoading && (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-1" />
                </div>
              ))}
            </div>
          )}
          {!pageLoading && conversations.length === 0 && (
            <p className="p-4 text-xs text-text-muted text-center">
              No conversations yet
            </p>
          )}
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`group flex items-center gap-2 px-3 py-2.5 cursor-pointer border-b border-border/50 ${
                c.id === activeId
                  ? "bg-primary/5 border-l-2 border-l-primary"
                  : "hover:bg-secondary"
              }`}
              onClick={() => handleSelectChat(c.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text truncate">{c.title}</p>
                <p className="text-[10px] text-text-muted">
                  {formatTime(c.createdAt)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChat(c.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-500 text-xs p-1 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary text-text-muted"
          >
            ☰
          </button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-text">AI Health Chat</h1>
          </div>
          <div className="w-9" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-lg font-semibold text-text mb-2">
                How can I help you today?
              </h2>
              <p className="text-text-muted text-sm mb-6 max-w-md">
                Ask me anything about your health records, medications, or
                medical reports.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="px-4 py-2 rounded-full border border-border text-sm text-text-muted hover:bg-secondary hover:text-text transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-white border border-border text-text rounded-bl-md"
                }`}
              >
                {msg.content}
                {loading &&
                  i === messages.length - 1 &&
                  msg.role === "assistant" && (
                    <span className="inline-block w-1.5 h-4 ml-0.5 bg-text-muted animate-pulse" />
                  )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="flex gap-2 px-4 py-3 border-t border-border"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your health..."
            className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-light transition-colors disabled:opacity-50 text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
