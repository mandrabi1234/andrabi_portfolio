import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import profile from '@/content/profile';
import Markdown from '@/app/components/Markdown';
import ProjectGallery from '@/app/components/ProjectGallery';
import SiteHeader from '@/app/components/SiteHeader';
import { getAdjacentProjects, getAllProjects, getProject } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

// Every project page is generated at build time from content/projects/*.md.
export const dynamicParams = false;

export function generateStaticParams() {
	return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) return {};
	return {
		title: `${project.title} – ${profile.name}`,
		description: project.summary,
		openGraph: {
			title: project.title,
			description: project.summary,
			images: project.cover ? [project.cover] : undefined,
		},
	};
}

function Meta({ label, value }: { label: string; value?: string }) {
	if (!value) return null;
	return (
		<div>
			<dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</dt>
			<dd className="text-sm text-gray-900 dark:text-gray-100">{value}</dd>
		</div>
	);
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) notFound();
	const { prev, next } = getAdjacentProjects(slug);

	return (
		<main className="min-h-screen bg-white dark:bg-gray-900">
			<SiteHeader backHref="/#projects" backLabel="All projects" />

			<article className="max-w-3xl mx-auto px-6 py-10 space-y-10">
				<div className="space-y-4">
					{project.organization && <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{project.organization}</p>}
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{project.title}</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{project.summary}</p>

					<dl className="flex flex-wrap gap-x-10 gap-y-3 pt-2">
						<Meta label="Role" value={project.role} />
						<Meta label="Period" value={project.period} />
					</dl>

					{project.tech.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{project.tech.map((t) => (
								<span key={t} className="px-2.5 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full ring-1 ring-gray-200 dark:ring-gray-700">
									{t}
								</span>
							))}
						</div>
					)}

					{project.links.length > 0 && (
						<div className="flex flex-wrap gap-3 pt-1">
							{project.links.map((l) => (
								<a
									key={l.url}
									href={l.url}
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-1.5 text-sm rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90"
								>
									{l.label} ↗
								</a>
							))}
						</div>
					)}
				</div>

				{project.cover && (
					<div className="relative aspect-[16/9] rounded-lg overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800">
						<Image src={project.cover} alt={`${project.title} cover`} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" priority />
					</div>
				)}

				{project.highlights.length > 0 && (
					<section className="rounded-lg bg-gray-50 dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-700 p-5">
						<h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Highlights</h2>
						<ul className="space-y-2">
							{project.highlights.map((h) => (
								<li key={h} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
									<span className="text-gray-400" aria-hidden="true">—</span>
									<span>{h}</span>
								</li>
							))}
						</ul>
					</section>
				)}

				{project.body && <Markdown>{project.body}</Markdown>}

				{project.images.length > 0 && (
					<section className="space-y-4">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Screenshots</h2>
						<ProjectGallery images={project.images} title={project.title} />
					</section>
				)}

				<nav className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800" aria-label="More projects">
					<div>
						{prev && (
							<Link href={`/projects/${prev.slug}`} className="group block">
								<span className="text-xs text-gray-500 dark:text-gray-400">← Previous</span>
								<span className="block text-sm font-medium text-gray-900 dark:text-white group-hover:underline">{prev.title}</span>
							</Link>
						)}
					</div>
					<div className="text-right">
						{next && (
							<Link href={`/projects/${next.slug}`} className="group block">
								<span className="text-xs text-gray-500 dark:text-gray-400">Next →</span>
								<span className="block text-sm font-medium text-gray-900 dark:text-white group-hover:underline">{next.title}</span>
							</Link>
						)}
					</div>
				</nav>
			</article>
		</main>
	);
}
