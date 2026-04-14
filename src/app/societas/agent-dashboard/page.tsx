import Link from "next/link";

/* ── Fake data ───────────────────────────────────────────── */

const stats = [
  { label: "Active Agents", value: "5", delta: "+1", color: "text-green-400" },
  { label: "Tasks Today", value: "47", delta: "+12", color: "text-blue-400" },
  { label: "Avg Response", value: "1.2s", delta: "-0.3s", color: "text-green-400" },
  { label: "Error Rate", value: "0.8%", delta: "+0.1%", color: "text-yellow-400" },
];

const agents = [
  { name: "飞马 (Architect)", status: "online", tasks: 12, uptime: "99.8%" },
  { name: "战马 (Dev)", status: "online", tasks: 18, uptime: "99.5%" },
  { name: "Doctor (QA)", status: "online", tasks: 8, uptime: "99.9%" },
  { name: "Sentinel (Monitor)", status: "idle", tasks: 3, uptime: "98.2%" },
  { name: "Courier (Messenger)", status: "offline", tasks: 0, uptime: "95.0%" },
];

const barData = [
  { day: "Mon", value: 32 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 28 },
  { day: "Thu", value: 64 },
  { day: "Fri", value: 51 },
  { day: "Sat", value: 19 },
  { day: "Sun", value: 12 },
];

const recentTasks = [
  { id: "T-1024", title: "Implement registry module", agent: "战马", status: "done", time: "2m ago" },
  { id: "T-1023", title: "Review DESIGN.md", agent: "飞马", status: "done", time: "15m ago" },
  { id: "T-1022", title: "Run integration tests", agent: "Doctor", status: "running", time: "20m ago" },
  { id: "T-1021", title: "Deploy staging env", agent: "Sentinel", status: "pending", time: "1h ago" },
  { id: "T-1020", title: "Send daily report", agent: "Courier", status: "failed", time: "2h ago" },
];

const statusColor: Record<string, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  offline: "bg-zinc-600",
};

const taskStatusStyle: Record<string, string> = {
  done: "bg-green-900/40 text-green-400",
  running: "bg-blue-900/40 text-blue-400",
  pending: "bg-zinc-800 text-zinc-400",
  failed: "bg-red-900/40 text-red-400",
};

/* ── Component ───────────────────────────────────────────── */

export default function AgentDashboard() {
  const maxBar = Math.max(...barData.map((d) => d.value));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/societas" className="hover:text-zinc-300 transition-colors">
          Societas (Office Agent)
        </Link>
        <span>/</span>
        <span className="text-zinc-300">Agent Dashboard</span>
      </nav>

      <h1 className="mb-8 text-3xl font-bold text-white">Agent Dashboard</h1>

      {/* ── Stat cards ──────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <p className="text-sm text-zinc-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{s.value}</p>
            <p className={`mt-1 text-xs ${s.color}`}>{s.delta}</p>
          </div>
        ))}
      </div>

      {/* ── Main grid: Agents + Chart ───────────────────── */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Agent list (3 cols) */}
        <div className="lg:col-span-3 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Agents</h2>
          <div className="space-y-3">
            {agents.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${statusColor[a.status]}`}
                  />
                  <span className="font-medium text-zinc-200">{a.name}</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-zinc-500">
                  <span>{a.tasks} tasks</span>
                  <span>{a.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini bar chart (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Tasks / Day
          </h2>
          <div className="flex items-end justify-between gap-2" style={{ height: 160 }}>
            {barData.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-blue-500/80 transition-all"
                  style={{
                    height: `${(d.value / maxBar) * 140}px`,
                  }}
                />
                <span className="text-xs text-zinc-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Tasks Table ──────────────────────────── */}
      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Tasks</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="pb-3 pr-4 font-medium">ID</th>
                <th className="pb-3 pr-4 font-medium">Title</th>
                <th className="pb-3 pr-4 font-medium">Agent</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((t) => (
                <tr key={t.id} className="border-b border-zinc-800/50 last:border-0">
                  <td className="py-3 pr-4 font-mono text-zinc-400">{t.id}</td>
                  <td className="py-3 pr-4 text-zinc-200">{t.title}</td>
                  <td className="py-3 pr-4 text-zinc-400">{t.agent}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${taskStatusStyle[t.status]}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 text-zinc-600">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
