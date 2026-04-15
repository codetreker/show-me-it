import Sidebar from "../Sidebar";
import Link from "next/link";




/* ── Fake data ───────────────────────────────────────────── */

const stats = [
  { label: "Total Users", value: "24", icon: "👥", delta: "+3 this week", color: "text-blue-400" },
  { label: "Databases", value: "8", icon: "🗄️", delta: "2 suspended", color: "text-yellow-400" },
  { label: "Documents", value: "12.4K", icon: "📄", delta: "+840 today", color: "text-green-400" },
  { label: "Requests / 24h", value: "45.2K", icon: "📈", delta: "+12% vs yesterday", color: "text-blue-400" },
];

const services = [
  { name: "Gateway", status: "healthy", uptime: "99.99%", latency: "2ms" },
  { name: "Query", status: "healthy", uptime: "99.98%", latency: "8ms" },
  { name: "Indexer", status: "healthy", uptime: "99.95%", latency: "12ms" },
  { name: "Puller", status: "healthy", uptime: "99.97%", latency: "5ms" },
  { name: "Streamer", status: "healthy", uptime: "99.90%", latency: "15ms" },
  { name: "Trigger", status: "degraded", uptime: "98.20%", latency: "120ms" },
];

const barData = [
  { day: "Mon", value: 38200 },
  { day: "Tue", value: 45100 },
  { day: "Wed", value: 42800 },
  { day: "Thu", value: 51300 },
  { day: "Fri", value: 48600 },
  { day: "Sat", value: 22100 },
  { day: "Sun", value: 18400 },
];

const recentActivity = [
  { time: "2 min ago", action: "Document created", user: "alice", database: "default", status: "success" },
  { time: "5 min ago", action: "User login", user: "bob", database: "—", status: "success" },
  { time: "12 min ago", action: "Database created", user: "admin", database: "analytics", status: "success" },
  { time: "18 min ago", action: "Auth failed", user: "unknown", database: "—", status: "error" },
  { time: "25 min ago", action: "Rules updated", user: "admin", database: "default", status: "success" },
  { time: "1h ago", action: "Document deleted", user: "charlie", database: "staging", status: "success" },
];

const serviceStatusColor: Record<string, string> = {
  healthy: "bg-green-500",
  degraded: "bg-yellow-500",
  unhealthy: "bg-red-500",
};

const serviceStatusText: Record<string, string> = {
  healthy: "text-green-400",
  degraded: "text-yellow-400",
  unhealthy: "text-red-400",
};

const activityStatusStyle: Record<string, string> = {
  success: "bg-green-900/40 text-green-400",
  error: "bg-red-900/40 text-red-400",
};

/* ── Component ───────────────────────────────────────────── */

export default function Dashboard() {
  const maxBar = Math.max(...barData.map((d) => d.value));

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar current="Dashboard" />

      <main className="lg:ml-56 flex-1 px-8 pt-16 pb-8 lg:pt-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/syntrix" className="hover:text-zinc-300 transition-colors">Syntrix Admin Console</Link>
          <span>/</span>
          <span className="text-zinc-300">Dashboard</span>
        </nav>

        <h1 className="mb-8 text-2xl font-bold text-white">Dashboard</h1>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{s.label}</p>
                <span className="text-lg">{s.icon}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-white">{s.value}</p>
              <p className={`mt-1 text-xs ${s.color}`}>{s.delta}</p>
            </div>
          ))}
        </div>

        {/* Services + Chart */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* Service status */}
          <div className="lg:col-span-3 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Service Status</h2>
            <div className="space-y-2">
              {services.map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${serviceStatusColor[s.status]}`} />
                    <span className="font-medium text-zinc-200">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className={serviceStatusText[s.status]}>{s.status}</span>
                    <span className="text-zinc-500">{s.uptime}</span>
                    <span className="font-mono text-zinc-600">{s.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request chart */}
          <div className="lg:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Requests / Day</h2>
            <div className="flex items-end justify-between gap-2" style={{ height: 180 }}>
              {barData.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs text-zinc-600 mb-1">{(d.value / 1000).toFixed(1)}K</span>
                  <div
                    className="w-full rounded-t bg-blue-500/70 transition-all"
                    style={{ height: `${(d.value / maxBar) * 140}px` }}
                  />
                  <span className="text-xs text-zinc-500">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="pb-3 pr-4 font-medium">Time</th>
                  <th className="pb-3 pr-4 font-medium">Action</th>
                  <th className="pb-3 pr-4 font-medium">User</th>
                  <th className="pb-3 pr-4 font-medium">Database</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((a, i) => (
                  <tr key={i} className="border-b border-zinc-800/50 last:border-0">
                    <td className="py-3 pr-4 text-zinc-600">{a.time}</td>
                    <td className="py-3 pr-4 text-zinc-200">{a.action}</td>
                    <td className="py-3 pr-4 font-mono text-zinc-400">{a.user}</td>
                    <td className="py-3 pr-4 font-mono text-zinc-400">{a.database}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${activityStatusStyle[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
