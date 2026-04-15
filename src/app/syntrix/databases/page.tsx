import Sidebar from "../Sidebar";
import Link from "next/link";




/* ── Fake data ───────────────────────────────────────────── */

const databases = [
  {
    name: "Default",
    slug: "default",
    id: "a1b2c3d4e5f67890",
    status: "active" as const,
    owner: "admin",
    documents: 4280,
    storageUsed: 128,
    storageMax: 500,
    protected: true,
    createdAt: "2026-01-15",
  },
  {
    name: "My App",
    slug: "myapp",
    id: "b2c3d4e5f6789012",
    status: "active" as const,
    owner: "alice",
    documents: 3150,
    storageUsed: 256,
    storageMax: 500,
    protected: false,
    createdAt: "2026-02-03",
  },
  {
    name: "Analytics",
    slug: "analytics",
    id: "c3d4e5f678901234",
    status: "active" as const,
    owner: "admin",
    documents: 2800,
    storageUsed: 340,
    storageMax: 1000,
    protected: false,
    createdAt: "2026-03-01",
  },
  {
    name: "Staging",
    slug: "staging",
    id: "d4e5f67890123456",
    status: "suspended" as const,
    owner: "charlie",
    documents: 890,
    storageUsed: 45,
    storageMax: 200,
    protected: false,
    createdAt: "2026-03-10",
  },
  {
    name: "Production",
    slug: "production",
    id: "e5f6789012345678",
    status: "active" as const,
    owner: "dave",
    documents: 1120,
    storageUsed: 180,
    storageMax: 500,
    protected: false,
    createdAt: "2026-03-15",
  },
  {
    name: "Demo",
    slug: "demo",
    id: "f67890123456789a",
    status: "active" as const,
    owner: "frank",
    documents: 150,
    storageUsed: 8,
    storageMax: 100,
    protected: false,
    createdAt: "2026-04-01",
  },
];

const statusStyle: Record<string, string> = {
  active: "bg-green-900/40 text-green-400",
  suspended: "bg-yellow-900/40 text-yellow-400",
  deleting: "bg-red-900/40 text-red-400",
};

/* ── Component ───────────────────────────────────────────── */

export default function Databases() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar current="Databases" />

      <main className="lg:ml-56 flex-1 px-8 pt-16 pb-8 lg:pt-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/syntrix" className="hover:text-zinc-300 transition-colors">Syntrix Admin Console</Link>
          <span>/</span>
          <span className="text-zinc-300">Databases</span>
        </nav>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Database Management</h1>
            <p className="mt-1 text-sm text-zinc-500">
              <span className="text-blue-400 font-medium">6</span> / 10 databases used
              <span className="ml-3 text-zinc-600">·</span>
              <span className="ml-3">5 active · 1 suspended</span>
            </p>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
            + Create Database
          </button>
        </div>

        {/* Quota bar */}
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-zinc-400">Quota Usage</span>
            <span className="text-zinc-500">6 / 10</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-800">
            <div className="h-2 rounded-full bg-blue-500" style={{ width: "60%" }} />
          </div>
        </div>

        {/* Database cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {databases.map((db) => {
            const storagePercent = Math.round((db.storageUsed / db.storageMax) * 100);
            const storageColor = storagePercent > 80 ? "bg-red-500" : storagePercent > 60 ? "bg-yellow-500" : "bg-blue-500";

            return (
              <div
                key={db.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-700 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{db.name}</h3>
                      {db.protected && (
                        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500 border border-zinc-700">
                          PROTECTED
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-zinc-500">{db.slug}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${statusStyle[db.status]}`}>
                    {db.status}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Owner</span>
                    <span className="font-mono text-zinc-400">{db.owner}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Documents</span>
                    <span className="text-zinc-300">{db.documents.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Created</span>
                    <span className="text-zinc-500">{db.createdAt}</span>
                  </div>
                </div>

                {/* Storage bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-zinc-500">Storage</span>
                    <span className="text-zinc-500">{db.storageUsed} / {db.storageMax} MB</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-800">
                    <div className={`h-1.5 rounded-full ${storageColor}`} style={{ width: `${storagePercent}%` }} />
                  </div>
                </div>

                {/* ID */}
                <p className="mt-3 font-mono text-[10px] text-zinc-700 truncate">ID: {db.id}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
