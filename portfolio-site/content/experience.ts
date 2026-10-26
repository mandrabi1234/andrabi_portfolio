import type { Experience } from './types';

// Newest first. To add a role, copy one object and edit it.
// `projects` lists slugs from content/projects so the entry links to those pages.
const experience: Experience[] = [
	{
		role: 'Software Engineer (Full-Time)',
		organization: 'Sony Pictures Entertainment',
		location: 'Culver City, CA',
		period: 'Jun 2022 – Present',
		summary:
			'Enterprise solutions across teams and divisions using Java, Angular, Python, AWS, Terraform, Salesforce, and industry-standard AI tooling.',
		highlights: [
			'Led replatforms of legacy studio systems as project lead and principal engineer, from requirements through delivery and user support.',
			'Streamlined CI/CD infrastructure with AWS and Terraform.',
			'BI development, database engineering, and AI integration; participate in architecture reviews and technical strategy.',
		],
		projects: [
			'stock-footage-replatform',
			'montage-replatform',
			'genai-database',
			'talent-acquisition-database',
			'production-finance-chatbot',
			'production-management-app',
		],
	},
	{
		role: 'Analytics Consultant',
		organization: 'Pakistan Cricket Board',
		period: 'Jan 2024 – Present',
		summary:
			'Built the Bat/Bowl Index, the batting and bowling ranking model the national selection committee uses for central contracts and team selection, and the API and data pipeline behind it.',
		projects: ['pcb-bat-bowl-index'],
	},
	{
		role: 'Co-Founder & CTO',
		organization: 'Precision Analysis Systems for Sport (PASS)',
		period: '2021 – Present',
		summary:
			'Sole developer of ML-based performance evaluation and team-building soccer software licensed to D3 collegiate and club programs.',
		projects: ['pass-analytics-engine'],
	},
	{
		role: 'Programmer (Contract)',
		organization: 'Brimstone Energy',
		location: 'Berkeley, CA',
		period: 'May 2020 – Aug 2020',
		highlights: [
			'Migrated MATLAB-based emissions analysis code to Python for faster data visualization.',
			'Helped build tools for analyzing soil chemistry and carbon data for sustainable R&D.',
		],
	},
];

export default experience;
