import profile from '@/content/profile';
import services from '@/content/services';
import type { ServiceTier } from '@/content/types';

/** mailto: link for the call-to-action, pre-filled with a subject line. */
export function inquiryHref(extra?: string, baseSubject: string = services.cta.emailSubject) {
	const subject = extra ? `${baseSubject}: ${extra}` : baseSubject;
	return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;
}

/** A tier's price, or the "Contact for pricing" label when prices are hidden. */
export function TierPrice({ tier, size = 'md' }: { tier: ServiceTier; size?: 'md' | 'lg' }) {
	if (!services.showPrices) {
		return <p className="text-lg font-semibold text-gray-900 dark:text-white">{services.hiddenPriceLabel}</p>;
	}
	if (size === 'md') {
		// Compact cards: unit on its own line so narrow columns don't wrap mid-price.
		return (
			<div>
				<p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{tier.price}</p>
				{tier.unit && <p className="text-xs text-gray-500 dark:text-gray-400">{tier.unit}</p>}
				{tier.priceNote && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tier.priceNote}</p>}
			</div>
		);
	}
	return (
		<div>
			<p className="text-gray-900 dark:text-white">
				<span className="text-3xl font-bold tracking-tight">{tier.price}</span>
				{tier.unit && <span className="text-sm text-gray-500 dark:text-gray-400"> {tier.unit}</span>}
			</p>
			{tier.priceNote && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tier.priceNote}</p>}
		</div>
	);
}

/** An option's price, hidden along with the rest when showPrices is false. */
export function optionPrice(price: string) {
	return services.showPrices ? price : null;
}

export function CtaButton({ className = '' }: { className?: string }) {
	return (
		<a
			href={inquiryHref()}
			className={`inline-block px-5 py-2 text-sm font-medium rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 ${className}`}
		>
			{services.cta.label}
		</a>
	);
}

export const featuredRing = 'ring-2 ring-gray-900 dark:ring-white';
export const plainRing = 'ring-1 ring-gray-200 dark:ring-gray-700';
