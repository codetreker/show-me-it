import Link from "next/link";
import { getRegistry } from "@/lib/registry";

export default function HomePage() {
  const registry = getRegistry();
  const projects = Object.entries(registry.projects);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <p className="mt-2 text-zinc-400">
          Browse mockups by project. Click a project to see all its mockups.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-zinc-500">No projects yet. Add one to mockup-registry.json.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(([slug, project]) => {
            const mockupCount = Object.keys(project.mockups).length;
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800/80"
              >
                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {project.label}
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  {mockupCount} mockup{mockupCount !== 1 ? "s" : ""}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(project.mockups).map(([mSlug, m]) => (
                    <span
                      key={mSlug}
                      className="inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400"
                    >
                      {m.label}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
