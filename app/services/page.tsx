import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import profile from '@/content/profile';
import services from '@/content/services';
import SiteHeader from '@/app/components/SiteHeader';
import TierCard from '@/app/components/TierCard';
import { CtaButton, inquiryHref } from '@/app/components/pricing';

export const metadata: Metadata = {
	title: `${services.title} – ${profile.name}`,
	description: services.intro,
};

function H2({ children }: { children: React.ReactNode }) {
	return <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{children}</h2>;
}

export default function ServicesPage() {
	if (!services.enabled) notFound();
	const { community } = services;

	return (
		<main className="min-h-screen bg-white dark:bg-gray-900">
			<SiteHeader backHref="/#services" backLabel="Back to portfolio" />

			<div className="max-w-3xl mx-auto px-6 py-10 space-y-14">
				{/* Intro */}
				<section className="space-y-4">
					<p className="text-sm font-medium text-gray-500 dark:text-gray-400">Consulting</p>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{services.title}</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{services.intro}</p>
					<div className="flex flex-wrap gap-1.5 pt-1">
						{services.offerings.map((o) => (
							<span key={o} className="px-2.5 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full ring-1 ring-gray-200 dark:ring-gray-700">
								{o}
							</span>
						))}
					</div>
				</section>

				{/* Tiers */}
				<section className="space-y-6" aria-labelledby="pricing">
					<div id="pricing" className="sr-only">Pricing</div>
					{services.tiers.map((tier) => (
						<TierCard key={tier.id} tier={tier} />
					))}
				</section>

				{/* Community & small teams */}
				{community.enabled && (
					<section id="community" className="scroll-mt-20 space-y-8 rounded-2xl bg-gray-50 dark:bg-gray-800/40 ring-1 ring-gray-200 dark:ring-gray-700 p-6 sm:p-8">
						<div className="space-y-3">
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">Smaller budgets</p>
							<H2>{community.title}</H2>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{community.intro}</p>
						</div>

						<div className="grid gap-6 sm:grid-cols-2">
							<div className="space-y-2">
								<h3 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Who it’s for</h3>
								<ul className="space-y-1.5 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
									{community.eligibility.map((e) => (
										<li key={e}>{e}</li>
									))}
								</ul>
							</div>
							<div className="space-y-2">
								<h3 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">How it stays affordable</h3>
								<ul className="space-y-1.5 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
									{community.howItStaysAffordable.map((h) => (
										<li key={h}>{h}</li>
									))}
								</ul>
							</div>
						</div>

						<div className="space-y-6 [&_article]:bg-white dark:[&_article]:bg-gray-900">
							{community.tiers.map((tier) => (
								<TierCard key={tier.id} tier={tier} emailSubject={community.emailSubject} />
							))}
						</div>

						<div className="space-y-2">
							<ul className="space-y-1.5 list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
								{community.terms.map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
							{community.availability && <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">{community.availability}</p>}
						</div>
					</section>
				)}

				{/* Process */}
				<section className="space-y-6">
					<H2>How it works</H2>
					<ol className="grid gap-4 sm:grid-cols-2">
						{services.process.map((p, i) => (
							<li key={p.step} className="flex gap-3">
								<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-gray-300 dark:ring-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300">
									{i + 1}
								</span>
								<div>
									<p className="text-sm font-medium text-gray-900 dark:text-white">{p.step}</p>
									<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.description}</p>
								</div>
							</li>
						))}
					</ol>
				</section>

				{/* Terms */}
				<section className="space-y-4">
					<H2>Terms</H2>
					<ul className="space-y-2 list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
						{services.terms.map((t) => (
							<li key={t}>{t}</li>
						))}
					</ul>
				</section>

				{/* FAQ */}
				{services.faqs.length > 0 && (
					<section className="space-y-4">
						<H2>Questions</H2>
						<div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
							{services.faqs.map((f) => (
								<details key={f.question} className="group py-4">
									<summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-gray-900 dark:text-white">
										{f.question}
										<span className="text-gray-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
									</summary>
									<p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.answer}</p>
								</details>
							))}
						</div>
					</section>
				)}

				{/* CTA */}
				<section className="rounded-xl bg-gray-50 dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-700 p-6 text-center space-y-3">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Have a project in mind?</h2>
					{services.cta.note && <p className="text-sm text-gray-600 dark:text-gray-400">{services.cta.note}</p>}
					<CtaButton />
					<p className="text-xs text-gray-500 dark:text-gray-400">
						or email{' '}
						<a href={inquiryHref()} className="underline underline-offset-2">
							{profile.email}
						</a>
					</p>
				</section>
			</div>
		</main>
	);
}
