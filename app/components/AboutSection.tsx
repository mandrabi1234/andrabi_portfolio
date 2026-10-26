import profile from '@/content/profile';
import Section from './Section';

export default function AboutSection() {
	return (
		<Section title="About" id="about">
			<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{profile.about}</p>
		</Section>
	);
}
