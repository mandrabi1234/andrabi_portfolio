import type { SkillGroup } from './types';

// Add a group by adding an object; add a skill by adding a string.
const skills: SkillGroup[] = [
	{
		category: 'Languages',
		icon: 'code',
		items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
	},
	{
		category: 'Frameworks / Libraries',
		icon: 'layers',
		items: ['React.js', 'Angular', 'Node.js', 'Flask', 'Pandas', 'REST APIs (OpenAPI)'],
	},
	{
		category: 'Cloud / DevOps',
		icon: 'cloud',
		items: ['AWS', 'Terraform', 'Docker', 'Git', 'GitHub Actions', 'Jenkins', 'Snowflake', 'Salesforce'],
	},
	{
		category: 'AI / ML',
		icon: 'spark',
		items: ['OpenAI GPT API', 'LLM document parsing', 'Agentic AI', 'YOLO computer vision', 'Predictive modeling'],
	},
	{
		category: 'Tools',
		icon: 'tool',
		items: ['Tableau', 'Power BI', 'Alteryx', 'Airtable', 'Box SDK/API', 'Jira', 'Figma'],
	},
	{
		category: 'Spoken Languages',
		icon: 'globe',
		items: ['English (native)', 'Urdu (native)', 'Spanish (professional)', 'Hindi (fluent)'],
	},
];

export default skills;
