// Shared shapes for everything in /content. Edit the data files, not this one,
// unless you want to add a new field.

export type Link = { label: string; url: string };

export type Profile = {
	name: string;
	title: string;
	/** Short line under your name on the home page. */
	tagline: string;
	/** Longer "About" paragraph shown at the top of the right column. */
	about: string;
	email: string;
	location: string;
	photo: string;
	/** Optional: put a PDF in /public and set e.g. "/Mohi_Andrabi_Resume.pdf". */
	resumeUrl?: string;
	/** Full site URL once deployed (used for SEO metadata), e.g. "https://mohiandrabi.com". */
	siteUrl?: string;
	socials: { github?: string; linkedin?: string };
};

export type SkillGroup = {
	category: string;
	/** One of the icon names in app/components/Icon.tsx. */
	icon: 'code' | 'layers' | 'cloud' | 'tool' | 'globe' | 'chart' | 'spark';
	items: string[];
};

export type Experience = {
	role: string;
	organization: string;
	location?: string;
	period: string;
	/** One-sentence summary shown under the role. */
	summary?: string;
	highlights?: string[];
	/** Earlier titles at the same organization, newest first (shown as a small timeline). */
	previousRoles?: { role: string; period: string }[];
	/** Slugs of projects (filenames in content/projects, without .md) to link from this entry. */
	projects?: string[];
};

export type Education = {
	school: string;
	location?: string;
	degree: string;
	period: string;
	details?: string[];
};

export type ServiceTier = {
	/** Short id used for anchors, e.g. "project" → /services#project. */
	id: string;
	name: string;
	/** Main price line, e.g. "$125". */
	price: string;
	/** Text after the price, e.g. "/ hour". */
	unit?: string;
	/** Secondary price line, e.g. "$150/hr for sports analytics & AI". */
	priceNote?: string;
	/** One sentence on who this tier is for. */
	bestFor: string;
	/** What's included; shown on the services page and (first 3) on the home card. */
	includes: string[];
	/** Optional sized options within the tier, shown on the services page. */
	options?: { name: string; price: string; description: string }[];
	/** Highlights this tier as the recommended one. */
	featured?: boolean;
	/** Label on the featured tier's badge; defaults to "Recommended". */
	badge?: string;
};

/** A lower-priced track for small organizations and tight budgets. */
export type CommunityTrack = {
	/** false hides this track (the rest of the services module is unaffected). */
	enabled: boolean;
	title: string;
	intro: string;
	/** Who qualifies. */
	eligibility: string[];
	/** What makes the lower price workable (the trade-offs). */
	howItStaysAffordable: string[];
	tiers: ServiceTier[];
	terms: string[];
	/** e.g. "I take on one or two community projects at a time." */
	availability?: string;
	/** Subject prefix for emails from this track. */
	emailSubject: string;
};

export type Services = {
	/** false hides the whole module: home-page section, nav link and /services page. */
	enabled: boolean;
	/** false replaces every price with `hiddenPriceLabel` but keeps the tiers. */
	showPrices: boolean;
	hiddenPriceLabel: string;
	title: string;
	intro: string;
	/** What kinds of work you take on, shown as tags. */
	offerings: string[];
	tiers: ServiceTier[];
	process: { step: string; description: string }[];
	terms: string[];
	faqs: { question: string; answer: string }[];
	community: CommunityTrack;
	cta: { label: string; emailSubject: string; note?: string };
};
