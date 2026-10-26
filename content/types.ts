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
