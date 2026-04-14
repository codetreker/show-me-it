import Link from "next/link";
import { allMockupParams, getProject, getMockup } from "@/lib/registry";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allMockupParams();
}

export default async function MockupPage({
  params,
}: {
  params: Promise<{ project: string; mockup: string }>;
}) {
  const { project: projectSlug, mockup: mockupSlug } = await params;
  const project = getProject(projectSlug);
  const mockup = getMockup(projectSlug, mockupSlug);
  if (!project || !mockup) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/${projectSlug}`}
          className="hover:text-zinc-300 transition-colors"
        >
          {project.label}
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{mockup.label}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{mockup.label}</h1>
        <p className="mt-2 text-zinc-400">{mockup.description}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-zinc-600">
          <span>by {mockup.author}</span>
          <span>{mockup.date}</span>
          <span
            className={`rounded-full px-2 py-0.5 ${
              mockup.status === "draft"
                ? "bg-yellow-900/40 text-yellow-400"
                : mockup.status === "review"
                  ? "bg-blue-900/40 text-blue-400"
                  : "bg-green-900/40 text-green-400"
            }`}
          >
            {mockup.status}
          </span>
        </div>
      </div>

      {/* Placeholder content area */}
      <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 p-12 text-center">
        <p className="text-zinc-500">
          Mockup content goes here. Create a dedicated page at{" "}
          <code className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
            src/app/{projectSlug}/{mockupSlug}/page.tsx
          </code>{" "}
          to override this placeholder.
        </p>
      </div>
    </div>
  );
}
