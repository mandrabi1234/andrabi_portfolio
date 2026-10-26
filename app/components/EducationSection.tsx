import education from '@/content/education';
import Section from './Section';
import TimelineItem from './Timeline';

export default function EducationSection() {
	return (
		<Section title="Education" id="education">
			<div className="space-y-5">
				{education.map((e) => (
					<TimelineItem key={e.school + e.degree}>
						<div className="flex flex-col md:flex-row md:items-center md:justify-between">
							<h4 className="text-md font-medium text-gray-900 dark:text-white">{e.degree}</h4>
							<span className="text-sm text-gray-500 dark:text-gray-400">{e.period}</span>
						</div>
						<p className="text-sm font-medium text-gray-600 dark:text-gray-300">
							{e.school}
							{e.location && <span className="font-normal text-gray-500 dark:text-gray-400"> · {e.location}</span>}
						</p>
						{e.details?.map((d) => (
							<p key={d} className="text-sm text-gray-600 dark:text-gray-400">{d}</p>
						))}
					</TimelineItem>
				))}
			</div>
		</Section>
	);
}
