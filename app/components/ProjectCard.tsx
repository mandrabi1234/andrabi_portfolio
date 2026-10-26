import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/projects';

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="group block rounded-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-gray-400 dark:hover:ring-gray-500 transition-shadow bg-white dark:bg-gray-900 overflow-hidden"
		>
			{project.cover && (
				<div className="relative aspect-[16/9] bg-gray-100 dark:bg-gray-800">
					<Image src={project.cover} alt="" fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" />
				</div>
			)}
			<div className="p-4 space-y-2">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-0.5">
					<h4 className="text-md font-medium text-gray-900 dark:text-white">{project.title}</h4>
					{project.period && <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 md:pl-3">{project.period}</span>}
				</div>
				{project.organization && <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{project.organization}</p>}
				<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.summary}</p>
				{project.tech.length > 0 && (
					<div className="flex flex-wrap gap-1.5 pt-1">
						{project.tech.map((t) => (
							<span key={t} className="px-2 py-0.5 text-xs bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full ring-1 ring-gray-200 dark:ring-gray-700">
								{t}
							</span>
						))}
					</div>
				)}
				<p className="text-sm font-medium text-gray-900 dark:text-white pt-1">
					View project <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
				</p>
			</div>
		</Link>
	);
}
