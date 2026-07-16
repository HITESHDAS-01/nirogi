"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "nirogi-chat-history";

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: Message[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // storage full or unavailable
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setMessages(loadMessages());
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialized.current) {
      saveMessages(messages);
    }
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMessage];
    setMessages(allMessages);
    setInput("");
    setLoading(true);

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

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong";
      setMessages((prev) => [
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
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">AI Health Chat</h1>
          <p className="text-text-muted">
            Ask questions about your health records
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleNewChat}
            className="px-4 py-2 text-sm rounded-lg border border-border text-text-muted hover:bg-secondary hover:text-text transition-colors"
          >
            New Chat
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-lg font-semibold text-text mb-2">
              How can I help you today?
            </h2>
            <p className="text-text-muted text-sm mb-6 max-w-md">
              Ask me anything about your health records, medications, or medical
              reports.
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
              {loading && i === messages.length - 1 && msg.role === "assistant" && (
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-text-muted animate-pulse" />
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex gap-2 pt-4 border-t border-border"
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
  );
}
