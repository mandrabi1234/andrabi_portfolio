/** The dot-and-line entry used by Experience and Education. */
export default function TimelineItem({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
			<div className="absolute -left-[5px] top-[10px] h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
			<div className="space-y-1">{children}</div>
		</div>
	);
}
