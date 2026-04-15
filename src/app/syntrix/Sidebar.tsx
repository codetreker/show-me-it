"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/syntrix/dashboard", icon: "📊" },
  { label: "Users", href: "/syntrix/users", icon: "👥" },
  { label: "Databases", href: "/syntrix/databases", icon: "🗄️" },
  { label: "Data Browser", href: "/syntrix/data-browser", icon: "📂" },
  { label: "Rules", href: "#", icon: "🔐" },
  { label: "Settings", href: "#", icon: "⚙️" },
];

export default function Sidebar({ current }: { current: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-[4rem] z-40 rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-zinc-400 hover:bg-zinc-800 lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] w-56 flex-col border-r border-zinc-800 bg-zinc-950 px-3 py-6 transition-transform duration-200 lg:top-0 lg:h-screen ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:z-auto`}
      >
        <div className="mb-8 flex items-center justify-between px-3">
          <Link href="/syntrix" className="text-xl font-bold text-white">
            ◆ Syntrix
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-500 hover:text-zinc-300 lg:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                item.label === current
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-zinc-800 px-3 pt-4 text-xs text-zinc-600">
          Syntrix v0.1.0
        </div>
      </aside>
    </>
  );
}
