import Sidebar from "../Sidebar";
import Link from "next/link";




/* ── Fake data ───────────────────────────────────────────── */

const users = [
  { id: "u_01h8x9k", username: "admin", roles: ["admin"], dbAdmin: ["default", "analytics"], disabled: false, createdAt: "2026-01-15", lastLogin: "2 min ago" },
  { id: "u_02m4p7r", username: "alice", roles: ["user"], dbAdmin: ["myapp"], disabled: false, createdAt: "2026-02-03", lastLogin: "1h ago" },
  { id: "u_03n6q2s", username: "bob", roles: ["user"], dbAdmin: [], disabled: false, createdAt: "2026-02-10", lastLogin: "3h ago" },
  { id: "u_04w8t5v", username: "charlie", roles: ["user"], dbAdmin: ["staging"], disabled: false, createdAt: "2026-03-01", lastLogin: "1d ago" },
  { id: "u_05y1u8x", username: "dave", roles: ["user", "admin"], dbAdmin: ["default", "production"], disabled: false, createdAt: "2026-03-12", lastLogin: "5h ago" },
  { id: "u_06z3v0a", username: "eve", roles: ["user"], dbAdmin: [], disabled: true, createdAt: "2026-03-20", lastLogin: "30d ago" },
  { id: "u_07a5w2b", username: "frank", roles: ["user"], dbAdmin: ["demo"], disabled: false, createdAt: "2026-04-01", lastLogin: "12h ago" },
  { id: "u_08b7x4c", username: "grace", roles: ["user"], dbAdmin: [], disabled: false, createdAt: "2026-04-10", lastLogin: "Just now" },
];

const roleStyle: Record<string, string> = {
  admin: "bg-purple-900/40 text-purple-400 border border-purple-800/50",
  user: "bg-zinc-800 text-zinc-400 border border-zinc-700/50",
};

/* ── Component ───────────────────────────────────────────── */

export default function Users() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar current="Users" />

      <main className="lg:ml-56 flex-1 px-8 pt-16 pb-8 lg:pt-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/syntrix" className="hover:text-zinc-300 transition-colors">Syntrix Admin Console</Link>
          <span>/</span>
          <span className="text-zinc-300">Users</span>
        </nav>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="mt-1 text-sm text-zinc-500">24 users total · 23 active · 1 disabled</p>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
            + Create User
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users by username..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="px-4 py-3 font-medium">Username</th>
                  <th className="px-4 py-3 font-medium">Roles</th>
                  <th className="px-4 py-3 font-medium">DB Admin</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Last Login</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium text-zinc-200">{u.username}</span>
                        <p className="text-xs font-mono text-zinc-600">{u.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {u.roles.map((r) => (
                          <span key={r} className={`rounded-full px-2 py-0.5 text-xs ${roleStyle[r]}`}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {u.dbAdmin.length > 0 ? (
                          u.dbAdmin.map((db) => (
                            <span key={db} className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-zinc-400">
                              {db}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-zinc-600">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {u.disabled ? (
                        <span className="rounded-full bg-red-900/40 px-2 py-0.5 text-xs text-red-400">disabled</span>
                      ) : (
                        <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs text-green-400">active</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{u.createdAt}</td>
                    <td className="px-4 py-3 text-zinc-500">{u.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="rounded border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors">
                          Edit
                        </button>
                        <button className={`rounded border px-2.5 py-1 text-xs transition-colors ${
                          u.disabled
                            ? "border-green-800/50 text-green-500 hover:bg-green-900/30"
                            : "border-red-800/50 text-red-500 hover:bg-red-900/30"
                        }`}>
                          {u.disabled ? "Enable" : "Disable"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
            <span className="text-sm text-zinc-500">Showing 1-8 of 24 users</span>
            <div className="flex gap-1">
              <button className="rounded border border-zinc-700 px-3 py-1 text-sm text-zinc-500 hover:bg-zinc-800 transition-colors" disabled>
                Previous
              </button>
              <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white">1</button>
              <button className="rounded border border-zinc-700 px-3 py-1 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors">2</button>
              <button className="rounded border border-zinc-700 px-3 py-1 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors">3</button>
              <button className="rounded border border-zinc-700 px-3 py-1 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
