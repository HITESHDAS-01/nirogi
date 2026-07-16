"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const profileTabs = [
  { href: "/app/profile", label: "Basic Info" },
  { href: "/app/profile/health", label: "Health Data" },
  { href: "/app/profile/medical", label: "Medical History" },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Profile</h1>
        <p className="text-text-muted">
          Manage your personal and health information
        </p>
      </div>

      <div className="flex gap-1 bg-white rounded-lg border border-border p-1">
        {profileTabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium text-center transition-colors",
              pathname === tab.href
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-surface-alt"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
