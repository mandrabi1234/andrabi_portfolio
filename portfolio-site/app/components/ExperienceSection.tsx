import Link from 'next/link';
import experience from '@/content/experience';
import { getAllProjects } from '@/lib/projects';
import Section from './Section';
import TimelineItem from './Timeline';

export default function ExperienceSection() {
	const projectTitles = new Map(getAllProjects().map((p) => [p.slug, p.title]));

	return (
		<Section title="Experience" id="experience">
			<div className="space-y-5">
				{experience.map((exp) => {
					const linked = (exp.projects ?? []).filter((slug) => projectTitles.has(slug));
					return (
						<TimelineItem key={`${exp.organization}-${exp.role}`}>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between">
								<h4 className="text-md font-medium text-gray-900 dark:text-white">{exp.role}</h4>
								<span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">{exp.period}</span>
							</div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-300">
								{exp.organization}
								{exp.location && <span className="font-normal text-gray-500 dark:text-gray-400"> · {exp.location}</span>}
							</p>
							{exp.previousRoles?.map((r) => (
								<p key={r.role} className="text-xs text-gray-500 dark:text-gray-400">
									Previously {r.role}, {r.period}
								</p>
							))}
							{exp.summary && <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{exp.summary}</p>}
							{exp.highlights && exp.highlights.length > 0 && (
								<ul className="list-disc pl-4 space-y-0.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
									{exp.highlights.map((h) => (
										<li key={h}>{h}</li>
									))}
								</ul>
							)}
							{linked.length > 0 && (
								<div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
									{linked.map((slug) => (
										<Link
											key={slug}
											href={`/projects/${slug}`}
											className="text-xs text-gray-500 dark:text-gray-400 underline underline-offset-2 decoration-gray-300 dark:decoration-gray-600 hover:text-gray-900 dark:hover:text-white"
										>
											{projectTitles.get(slug)} →
										</Link>
									))}
								</div>
							)}
						</TimelineItem>
					);
				})}
			</div>
		</Section>
	);
}
