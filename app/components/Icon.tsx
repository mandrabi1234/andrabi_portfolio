import type { SkillGroup } from '@/content/types';

const paths: Record<SkillGroup['icon'], string> = {
	code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
	layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
	cloud: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
	tool: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
	globe: 'M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z',
	chart: 'M18 20V10M12 20V4M6 20v-6',
	spark: 'M12 3l1.9 5.8L20 10.7l-5.1 3.7 1.9 5.9L12 16.6l-4.8 3.7 1.9-5.9L4 10.7l6.1-1.9L12 3z',
};

export default function Icon({ name, className = 'w-4 h-4' }: { name: SkillGroup['icon']; className?: string }) {
	return (
		<svg className={`${className} text-gray-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d={paths[name]} />
		</svg>
	);
}
