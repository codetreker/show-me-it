import Sidebar from "../Sidebar";
import Link from "next/link";




/* ── Fake data ───────────────────────────────────────────── */

const collections = [
  { name: "users", count: 142 },
  { name: "posts", count: 1280 },
  { name: "comments", count: 3450 },
  { name: "sessions", count: 89 },
];

const documents = [
  {
    id: "user_01h8x9kzm",
    preview: { username: "alice", email: "alice@example.com", role: "admin" },
    expanded: false,
  },
  {
    id: "user_02m4p7rtn",
    preview: { username: "bob", email: "bob@example.com", role: "user" },
    expanded: true,
    fullDoc: {
      _id: "user_02m4p7rtn",
      _collection: "users",
      _version: 3,
      _created_at: "2026-02-10T08:30:00Z",
      _updated_at: "2026-04-14T12:15:30Z",
      username: "bob",
      email: "bob@example.com",
      role: "user",
      profile: {
        displayName: "Bob Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
        bio: "Full-stack developer"
      },
      settings: {
        theme: "dark",
        notifications: true,
        language: "en"
      },
      lastLogin: "2026-04-14T10:00:00Z"
    },
  },
  {
    id: "user_03n6q2svw",
    preview: { username: "charlie", email: "charlie@example.com", role: "user" },
    expanded: false,
  },
  {
    id: "user_04w8t5vxy",
    preview: { username: "dave", email: "dave@example.com", role: "admin" },
    expanded: false,
  },
  {
    id: "user_05y1u8xza",
    preview: { username: "eve", email: "eve@example.com", role: "user" },
    expanded: false,
  },
];

/* ── JSON Renderer ───────────────────────────────────────── */

function JsonValue({ value, indent = 0 }: { value: unknown; indent?: number }) {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);

  if (value === null) return <span className="text-zinc-500">null</span>;
  if (typeof value === "boolean") return <span className="text-yellow-400">{value.toString()}</span>;
  if (typeof value === "number") return <span className="text-blue-400">{value}</span>;
  if (typeof value === "string") return <span className="text-green-400">&quot;{value}&quot;</span>;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-zinc-400">[]</span>;
    return (
      <span>
        {"[\n"}
        {value.map((item, i) => (
          <span key={i}>
            {padInner}
            <JsonValue value={item} indent={indent + 1} />
            {i < value.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad}{"]"}
      </span>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span className="text-zinc-400">{"{}"}</span>;
    return (
      <span>
        {"{\n"}
        {entries.map(([key, val], i) => (
          <span key={key}>
            {padInner}<span className="text-purple-400">&quot;{key}&quot;</span>
            <span className="text-zinc-500">: </span>
            <JsonValue value={val} indent={indent + 1} />
            {i < entries.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad}{"}"}
      </span>
    );
  }

  return <span className="text-zinc-400">{String(value)}</span>;
}

/* ── Component ───────────────────────────────────────────── */

export default function DataBrowser() {
  const selectedCollection = "users";
  const selectedDb = "default";

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar current="Data Browser" />

      <main className="lg:ml-56 flex min-h-screen flex-1">
        {/* Collection sidebar */}
        <div className="w-60 border-r border-zinc-800 bg-zinc-950 px-3 pt-16 pb-8 lg:pt-8 hidden lg:block">
          {/* Database selector */}
          <div className="mb-6 px-2">
            <label className="mb-1.5 block text-xs text-zinc-500">Database</label>
            <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200">
              <span className="flex-1">{selectedDb}</span>
              <span className="text-zinc-600">▾</span>
            </div>
          </div>

          {/* Collections */}
          <div className="px-2">
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">Collections</h3>
            <div className="space-y-0.5">
              {collections.map((c) => (
                <div
                  key={c.name}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                    c.name === selectedCollection
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                  }`}
                >
                  <span className="font-mono">{c.name}</span>
                  <span className="text-xs text-zinc-600">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 px-6 pt-16 pb-8 lg:pt-8">
          {/* Breadcrumb + actions */}
          <div className="mb-6 flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">Home</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/syntrix" className="text-zinc-500 hover:text-zinc-300 transition-colors">Syntrix</Link>
              <span className="text-zinc-700">/</span>
              <span className="font-mono text-zinc-400">{selectedDb}</span>
              <span className="text-zinc-700">/</span>
              <span className="font-mono text-zinc-200">{selectedCollection}</span>
            </nav>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
              + Add Document
            </button>
          </div>

          {/* Filter bar */}
          <div className="mb-4 flex gap-3">
            <input
              type="text"
              placeholder="Filter by field... e.g. role == &quot;admin&quot;"
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:border-blue-600 focus:outline-none font-mono"
            />
            <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors">
              Apply
            </button>
          </div>

          {/* Document list */}
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              >
                {/* Document header */}
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-600">{doc.expanded ? "▼" : "▶"}</span>
                    <span className="font-mono text-sm text-blue-400">{doc.id}</span>
                    <span className="text-sm text-zinc-600">·</span>
                    {Object.entries(doc.preview).map(([key, val]) => (
                      <span key={key} className="text-sm">
                        <span className="text-zinc-600">{key}:</span>
                        <span className="ml-1 text-zinc-400">{String(val)}</span>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors">
                      Edit
                    </button>
                    <button className="rounded border border-red-800/50 px-2 py-1 text-xs text-red-500 hover:bg-red-900/30 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>

                {/* Expanded JSON */}
                {doc.expanded && doc.fullDoc && (
                  <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-4">
                    <pre className="text-sm leading-relaxed font-mono whitespace-pre overflow-x-auto">
                      <JsonValue value={doc.fullDoc} />
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-zinc-500">Showing 1-25 of 142 documents</span>
            <div className="flex gap-1">
              <button className="rounded border border-zinc-700 px-3 py-1 text-zinc-500 hover:bg-zinc-800 transition-colors" disabled>
                Previous
              </button>
              <button className="rounded bg-blue-600 px-3 py-1 text-white">1</button>
              <button className="rounded border border-zinc-700 px-3 py-1 text-zinc-400 hover:bg-zinc-800 transition-colors">2</button>
              <button className="rounded border border-zinc-700 px-3 py-1 text-zinc-400 hover:bg-zinc-800 transition-colors">3</button>
              <button className="rounded border border-zinc-700 px-3 py-1 text-zinc-400 hover:bg-zinc-800 transition-colors">...</button>
              <button className="rounded border border-zinc-700 px-3 py-1 text-zinc-400 hover:bg-zinc-800 transition-colors">6</button>
              <button className="rounded border border-zinc-700 px-3 py-1 text-zinc-400 hover:bg-zinc-800 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
