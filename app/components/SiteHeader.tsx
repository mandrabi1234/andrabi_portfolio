import Link from 'next/link';
import profile from '@/content/profile';

/** Sticky top bar used on inner pages (project pages, services). */
export default function SiteHeader({ backHref, backLabel }: { backHref: string; backLabel: string }) {
	return (
		<header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
			<div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
				<Link href={backHref} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
					← {backLabel}
				</Link>
				<Link href="/" className="text-sm font-medium text-gray-900 dark:text-white">
					{profile.name}
				</Link>
			</div>
		</header>
	);
}
