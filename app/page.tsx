import ProfileSection from './components/ProfileSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import { getProjectsByCategory } from '@/lib/projects';

// Content lives in /content. To reorder sections, move the lines below.
export default function Home() {
	return (
		<main className="min-h-screen md:h-screen flex flex-col bg-white dark:bg-gray-900 pb-16 sm:pb-0">
			<div className="flex-1 grid grid-cols-1 md:grid-cols-5 overflow-hidden min-h-0">
				{/* Left column: profile */}
				<div className="md:col-span-2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 md:flex md:items-center">
					<ProfileSection />
				</div>

				{/* Right column: scrollable content */}
				<div className="md:col-span-3 flex flex-col md:overflow-y-scroll min-h-0 h-full">
					<div className="p-4">
						<AboutSection />
						<ExperienceSection />
						<ProjectsSection title="Select Professional Projects" id="projects" projects={getProjectsByCategory('professional')} />
						<ProjectsSection title="Select Personal Projects" id="personal-projects" projects={getProjectsByCategory('personal')} />
						<SkillsSection />
						<EducationSection />
					</div>
				</div>
			</div>
		</main>
	);
}
