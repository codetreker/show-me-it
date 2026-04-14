import Link from "next/link";
import { allProjectSlugs, getProject } from "@/lib/registry";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allProjectSlugs().map((project) => ({ project }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const mockups = Object.entries(project.mockups);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{project.label}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">{project.label}</h1>
        <p className="mt-2 text-zinc-400">
          {mockups.length} mockup{mockups.length !== 1 ? "s" : ""} in this
          project.
        </p>
      </div>

      {mockups.length === 0 ? (
        <p className="text-zinc-500">No mockups yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockups.map(([mSlug, m]) => (
            <Link
              key={mSlug}
              href={`/${slug}/${mSlug}`}
              className="group rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800/80"
            >
              <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                {m.label}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">{m.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-600">
                <span>by {m.author}</span>
                <span
                  className={`rounded-full px-2 py-0.5 ${
                    m.status === "draft"
                      ? "bg-yellow-900/40 text-yellow-400"
                      : m.status === "review"
                        ? "bg-blue-900/40 text-blue-400"
                        : "bg-green-900/40 text-green-400"
                  }`}
                >
                  {m.status}
                </span>
              </div>
              <div className="mt-2 text-xs text-zinc-600">{m.date}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
