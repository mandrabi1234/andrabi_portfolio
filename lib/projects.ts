import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// Projects live in content/projects/<slug>.md. The filename is the URL:
// content/projects/pcb-bat-bowl-index.md -> /projects/pcb-bat-bowl-index
// Files starting with "_" (like _template.md) are ignored.

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

export type ProjectImage = { src: string; caption?: string; alt?: string };

export type ProjectMeta = {
	slug: string;
	title: string;
	organization?: string;
	role?: string;
	period?: string;
	category: 'professional' | 'personal';
	/** Lower numbers show first within a category. */
	order: number;
	/** One or two sentences for the card on the home page. */
	summary: string;
	/** Short bullets for the card and the top of the project page. */
	highlights: string[];
	tech: string[];
	links: { label: string; url: string }[];
	/** Optional image shown on the card and at the top of the project page. */
	cover?: string;
	/** Screenshot gallery on the project page. */
	images: ProjectImage[];
	/** true hides the project everywhere until it's ready. */
	draft: boolean;
};

export type Project = ProjectMeta & { body: string };

function asStringArray(value: unknown, field: string, file: string): string[] {
	if (value === undefined || value === null) return [];
	if (!Array.isArray(value) || value.some((v) => typeof v !== 'string')) {
		throw new Error(`${file}: "${field}" must be a list of text items`);
	}
	return value as string[];
}

function readProject(file: string): Project {
	const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8');
	const { data, content } = matter(raw);
	const slug = file.replace(/\.md$/, '');

	for (const field of ['title', 'summary', 'category']) {
		if (!data[field]) throw new Error(`${file}: missing required field "${field}"`);
	}
	if (data.category !== 'professional' && data.category !== 'personal') {
		throw new Error(`${file}: category must be "professional" or "personal"`);
	}

	const images: ProjectImage[] = Array.isArray(data.images)
		? data.images.map((img: unknown) => (typeof img === 'string' ? { src: img } : (img as ProjectImage)))
		: [];

	return {
		slug,
		title: String(data.title),
		organization: data.organization,
		role: data.role,
		period: data.period !== undefined ? String(data.period) : undefined,
		category: data.category,
		order: typeof data.order === 'number' ? data.order : 100,
		summary: String(data.summary),
		highlights: asStringArray(data.highlights, 'highlights', file),
		tech: asStringArray(data.tech, 'tech', file),
		links: Array.isArray(data.links) ? data.links : [],
		cover: data.cover,
		images,
		draft: data.draft === true,
		// <!-- notes --> are private reminders to yourself and never appear on the site.
		body: content.replace(/<!--[\s\S]*?-->/g, '').trim(),
	};
}

export function getAllProjects(): Project[] {
	if (!fs.existsSync(PROJECTS_DIR)) return [];
	return fs
		.readdirSync(PROJECTS_DIR)
		.filter((f) => f.endsWith('.md') && !f.startsWith('_'))
		.map(readProject)
		.filter((p) => !p.draft)
		.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getProjectsByCategory(category: ProjectMeta['category']): Project[] {
	return getAllProjects().filter((p) => p.category === category);
}

export function getProject(slug: string): Project | undefined {
	return getAllProjects().find((p) => p.slug === slug);
}

/** Previous/next project in the same order as the home page, for page-to-page navigation. */
export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
	const all = [...getProjectsByCategory('professional'), ...getProjectsByCategory('personal')];
	const i = all.findIndex((p) => p.slug === slug);
	if (i === -1) return {};
	return { prev: all[i - 1], next: all[i + 1] };
}
