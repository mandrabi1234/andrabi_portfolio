import type { Services } from './types';

// Consulting services and pricing.
// - Set `enabled: false` to remove the module from the site entirely.
// - Set `showPrices: false` to keep the tiers but show "Contact for pricing" instead of numbers.
// - Edit any price string below; nothing else needs to change.
//
// How the numbers were set (Oct 2026):
// - Base rate $125/hr ≈ 2× a $120K salary's hourly equivalent (~$60/hr), covering self-employment
//   tax, benefits, time off and unbilled time. Sits in the upper half of the US mid-level contract
//   range ($85–$135/hr full-stack; $119–$185/hr for LLM work).
// - Specialist rate $150/hr for sports analytics, ranking models and AI/LLM builds.
// - Project fees = estimated hours × $125, plus 20–30% for unknowns, rounded.
// - Retainers price hours at ~$110–$125, a small discount for guaranteed monthly work.

const services: Services = {
	enabled: true,
	showPrices: true,
	hiddenPriceLabel: 'Contact for pricing',

	title: 'Work With Me',
	intro:
		'I take on a limited number of consulting engagements alongside my full-time role: data platforms, analytics models, AI-powered tools, and replatforming legacy systems. Every engagement starts with a free 30-minute call and a written scope before any work begins.',

	offerings: [
		'Sports analytics & ranking models',
		'Data pipelines & automation',
		'REST APIs & backend services',
		'LLM / AI integrations',
		'Legacy system replatforms',
		'Dashboards & internal tools',
	],

	tiers: [
		{
			id: 'advisory',
			name: 'Advisory',
			price: '$125',
			unit: '/ hour',
			priceNote: '$150/hr for sports analytics & AI work',
			bestFor: 'Short, well-defined help: architecture reviews, code or data audits, scoping a build, or unblocking your team.',
			includes: [
				'2-hour minimum, billed in 30-minute increments',
				'Written summary and recommendations after each session',
				'Async questions by email between sessions',
				'Invoiced monthly for hours used',
			],
		},
		{
			id: 'project',
			name: 'Project',
			price: 'From $4,000',
			unit: 'fixed fee',
			priceNote: 'Quoted up front; no hourly surprises',
			bestFor: 'A defined build with a clear outcome: a data pipeline, an API, an analytics model, a dashboard or a replatform.',
			includes: [
				'Scoping call and a written, fixed-price proposal',
				'Weekly progress updates and a working demo at each milestone',
				'Two rounds of revisions on the agreed scope',
				'Source code, deployment and handoff documentation',
				'30 days of bug-fix support after launch',
			],
			options: [
				{
					name: 'Focused build',
					price: '$4,000 – $8,000',
					description: '1–2 weeks. One component done well: an automated pipeline, a dashboard, an API endpoint set, or an LLM document workflow.',
				},
				{
					name: 'Full build',
					price: '$10,000 – $30,000',
					description: '3–8 weeks. An end-to-end system: data ingestion, models, API and UI, or a full replatform of a legacy tool with data migration.',
				},
				{
					name: 'Analytics model',
					price: 'From $8,000',
					description: 'A custom rating, ranking or valuation model with tunable weights, validation against your historical data, and an API or dashboard to use it.',
				},
			],
			featured: true,
			badge: 'Recommended',
		},
		{
			id: 'retainer',
			name: 'Retainer',
			price: 'From $1,250',
			unit: '/ month',
			priceNote: 'Month-to-month; cancel with 30 days notice',
			bestFor: 'Ongoing ownership of a system: maintenance, data refreshes, monitoring and steady improvements.',
			includes: [
				'Reserved hours each month at a discounted rate',
				'Response within 1 business day',
				'Monitoring of scheduled jobs and data refreshes',
				'Monthly summary of work done and what’s next',
			],
			options: [
				{ name: 'Essentials', price: '$1,250 / month', description: 'Up to 10 hours. Maintenance, fixes and small enhancements.' },
				{ name: 'Growth', price: '$2,250 / month', description: 'Up to 20 hours. Regular feature work plus maintenance.' },
				{ name: 'Partner', price: '$4,000 / month', description: 'Up to 36 hours. Effectively a part-time engineer on your team.' },
			],
		},
	],

	process: [
		{ step: 'Intro call', description: 'A free 30-minute call to understand the problem and whether I’m the right fit.' },
		{ step: 'Scope & quote', description: 'A short written proposal: deliverables, timeline, price and what’s out of scope.' },
		{ step: 'Build', description: 'Work in milestones with a demo at each one, so you see progress early and can steer.' },
		{ step: 'Handoff & support', description: 'Deployment, documentation and a walkthrough, then 30 days of bug-fix support.' },
	],

	terms: [
		'Projects: 50% to start, 50% on delivery. Builds over $10,000 can be split across milestones.',
		'Invoices are due within 15 days.',
		'Unused retainer hours roll over for one month.',
		'Changes beyond the agreed scope are quoted separately before any work starts.',
		'You own the code and deliverables once the final invoice is paid.',
		'Smaller budget? See Community & Small Teams pricing below.',
	],

	faqs: [
		{
			question: 'Do you work with teams outside the US?',
			answer: 'Yes. I’ve built analytics for the Pakistan Cricket Board and work asynchronously across time zones. Pricing can be quoted in USD as a fixed project fee or monthly retainer.',
		},
		{
			question: 'Can you work with our existing stack?',
			answer: 'Usually. I work across Python, Java, TypeScript, SQL, AWS and Salesforce, and I’ll say plainly in the scoping call if something isn’t a good fit.',
		},
		{
			question: 'Our budget is smaller than these prices. Can you still help?',
			answer: 'Often, yes. Small organizations, nonprofits, schools, youth sports programs and students can use the Community & Small Teams pricing, which starts at $75/hr or $750 for a small fixed-price build.',
		},
		{
			question: 'What if we’re not sure what we need yet?',
			answer: 'Start with a few Advisory hours. I’ll help define the problem and turn it into a scoped project you can take to me or anyone else.',
		},
	],

	// Lower-priced track for small organizations. Set `enabled: false` to hide just this part.
	// Rates sit at ~60% of standard ($75 vs $125/hr). That's still above a $120K salary's hourly
	// equivalent (~$60/hr), so it's a deliberate discount rather than working below cost.
	// It stays sustainable by narrowing scope, reusing proven building blocks, working async on a
	// flexible timeline, and capping how many of these run at once.
	community: {
		enabled: true,
		title: 'Community & Small Teams',
		intro:
			'Good ideas don’t always come with big budgets. For small organizations I offer lighter, lower-cost engagements: same quality of work, scoped tighter and scheduled around my other commitments.',
		eligibility: [
			'Independent businesses with fewer than 10 people',
			'Nonprofits and community organizations',
			'Schools, youth and club sports programs',
			'Students and first-time founders',
		],
		howItStaysAffordable: [
			'Smaller, sharply defined scope: one problem solved well',
			'Built from proven components and templates I already maintain',
			'Async communication by email instead of standing meetings',
			'Flexible timelines that fit around my full-time role',
			'Permission to feature the finished work in my portfolio (you can opt out)',
		],
		tiers: [
			{
				id: 'community-hours',
				name: 'Office Hours',
				price: '$75',
				unit: '/ hour',
				priceNote: '1-hour minimum',
				bestFor: 'Advice and hands-on help: reviewing a setup, untangling a spreadsheet or tool, or planning what to build.',
				includes: ['Live session or async review', 'Short written next-steps after each session', 'Book one hour at a time, no commitment'],
			},
			{
				id: 'community-project',
				name: 'Starter Project',
				price: '$750 – $2,500',
				unit: 'fixed fee',
				priceNote: 'Payment plans available',
				bestFor: 'One small, well-defined build: a simple site or dashboard, a spreadsheet automation, a data cleanup, or a basic internal tool.',
				includes: [
					'Scoping call and a fixed quote before work starts',
					'One round of revisions',
					'Handoff notes so you can run it yourself',
					'14 days of bug-fix support after launch',
				],
				featured: true,
				badge: 'Best for small teams',
			},
			{
				id: 'community-care',
				name: 'Care Plan',
				price: '$300',
				unit: '/ month',
				priceNote: 'Up to 4 hours a month',
				bestFor: 'Keeping something running: small fixes, updates, and checking that scheduled jobs and data stay healthy.',
				includes: ['Up to 4 hours of fixes and small changes', 'Response within 3 business days', 'Cancel with 30 days notice'],
			},
		],
		terms: [
			'Projects: 50% to start and 50% on delivery, or three equal monthly payments.',
			'Timelines are typically 2–6 weeks, depending on my availability.',
			'Larger or open-ended work moves to standard pricing, quoted before anything changes.',
		],
		availability: 'I take on one or two community projects at a time, so there may be a short wait.',
		emailSubject: 'Community project inquiry',
	},

	cta: {
		label: 'Book a free intro call',
		emailSubject: 'Consulting inquiry',
		note: 'Tell me a little about the project and your timeline; I reply within two business days.',
	},
};

export default services;
