import skills from '@/content/skills';
import Icon from './Icon';
import Section from './Section';

export default function SkillsSection() {
	return (
		<Section title="Core Skills" id="skills">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{skills.map((group) => (
					<div key={group.category}>
						<div className="flex items-center space-x-2 mb-2">
							<Icon name={group.icon} />
							<h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{group.category}</h4>
						</div>
						<div className="flex flex-wrap gap-1.5">
							{group.items.map((skill) => (
								<span
									key={skill}
									className="px-2.5 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</Section>
	);
}
