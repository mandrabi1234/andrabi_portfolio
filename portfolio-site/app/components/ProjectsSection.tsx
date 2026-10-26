import type { Project } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import Section from './Section';

export default function ProjectsSection({ title, id, projects }: { title: string; id: string; projects: Project[] }) {
	if (projects.length === 0) return null;
	return (
		<Section title={title} id={id}>
			<div className="space-y-4">
				{projects.map((p) => (
					<ProjectCard key={p.slug} project={p} />
				))}
			</div>
		</Section>
	);
}
