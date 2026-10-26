import SectionHeading from './SectionHeading';

/** Wrapper used by every section on the home page so spacing stays consistent. */
export default function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
	return (
		<section id={id} className="py-6 px-6 bg-white dark:bg-gray-900">
			<div className="space-y-4 max-w-2xl mx-auto">
				<SectionHeading>{title}</SectionHeading>
				{children}
			</div>
		</section>
	);
}
