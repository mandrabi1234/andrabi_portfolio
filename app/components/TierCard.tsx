import type { ServiceTier } from '@/content/types';
import { TierPrice, featuredRing, inquiryHref, optionPrice, plainRing } from './pricing';

/** Full tier card on the /services page; used by both the standard and community tracks. */
export default function TierCard({ tier, emailSubject }: { tier: ServiceTier; emailSubject?: string }) {
	return (
		<article id={tier.id} className={`relative scroll-mt-20 rounded-xl p-6 space-y-5 ${tier.featured ? featuredRing : plainRing}`}>
			{tier.featured && (
				<span className="absolute -top-3 left-6 px-2.5 py-0.5 text-xs uppercase tracking-wide font-semibold rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
					{tier.badge ?? 'Recommended'}
				</span>
			)}
			<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
				<div className="space-y-1 sm:max-w-sm">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{tier.bestFor}</p>
				</div>
				<div className="sm:text-right shrink-0">
					<TierPrice tier={tier} size="lg" />
				</div>
			</div>

			<ul className="grid gap-2 sm:grid-cols-2">
				{tier.includes.map((item) => (
					<li key={item} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
						<svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
							<path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<span>{item}</span>
					</li>
				))}
			</ul>

			{tier.options && tier.options.length > 0 && (
				<div className="rounded-lg bg-gray-50 dark:bg-gray-800/60 divide-y divide-gray-200 dark:divide-gray-700">
					{tier.options.map((opt) => (
						<div key={opt.name} className="p-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">{opt.name}</p>
								<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{opt.description}</p>
							</div>
							{optionPrice(opt.price) && <p className="text-sm font-semibold text-gray-900 dark:text-white shrink-0 sm:text-right">{opt.price}</p>}
						</div>
					))}
				</div>
			)}

			<a
				href={inquiryHref(tier.name, emailSubject)}
				className="inline-block text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white"
			>
				Ask about {tier.name.toLowerCase()} →
			</a>
		</article>
	);
}
