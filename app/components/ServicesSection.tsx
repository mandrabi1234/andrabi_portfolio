import Link from 'next/link';
import services from '@/content/services';
import Section from './Section';
import { CtaButton, TierPrice, featuredRing, plainRing } from './pricing';

/** Compact pricing summary for the home page; full details live on /services. */
export default function ServicesSection() {
	if (!services.enabled) return null;

	return (
		<Section title={services.title} id="services">
			<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{services.intro}</p>

			<div className="grid gap-3 lg:grid-cols-3">
				{services.tiers.map((tier) => (
					<Link
						key={tier.id}
						href={`/services/#${tier.id}`}
						className={`group relative flex flex-col rounded-lg p-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 ${tier.featured ? featuredRing : plainRing}`}
					>
						{tier.featured && (
							<span className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] uppercase tracking-wide font-semibold rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
								{tier.badge ?? 'Recommended'}
							</span>
						)}
						<h4 className="text-sm font-semibold text-gray-900 dark:text-white">{tier.name}</h4>
						<div className="mt-1">
							<TierPrice tier={tier} />
						</div>
						<p className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{tier.bestFor}</p>
					</Link>
				))}
			</div>

			{services.community.enabled && (
				<Link
					href="/services/#community"
					className="block rounded-lg px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-gray-400 dark:hover:ring-gray-500 text-gray-700 dark:text-gray-300"
				>
					<span className="font-medium text-gray-900 dark:text-white">Small team or tight budget?</span>{' '}
					{services.community.title} pricing starts at{' '}
					{services.showPrices && services.community.tiers[0]
						? `${services.community.tiers[0].price}${services.community.tiers[0].unit ? ` ${services.community.tiers[0].unit}` : ''}`
						: 'a lower rate'}. →
				</Link>
			)}

			<div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
				<CtaButton />
				<Link href="/services/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-center sm:text-left">
					Full pricing, process &amp; terms →
				</Link>
			</div>
		</Section>
	);
}
