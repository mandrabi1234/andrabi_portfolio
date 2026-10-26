export default function SectionHeading({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center md:text-left">{children}</h3>
			<div className="h-px w-full bg-gray-200 dark:bg-gray-700 mt-2" />
		</div>
	);
}
