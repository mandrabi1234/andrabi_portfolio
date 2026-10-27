# How the Portfolio Site Works

This document explains how the codebase is put together: where content comes from, how pages are
built, what each file does, and how to extend it. For quick "how do I add a project" steps, see
`README.md`.

---

## 1. The big picture

The site is a **statically exported Next.js app**. At build time, Next.js reads your content files,
renders every page to plain HTML in the `out/` folder, and any static host serves those files. There is no database,
no server-side API and no CMS: the files in `content/` *are* the database.

```
content/*.ts  ─────────────┐
                           ├──►  React components  ──►  next build  ──►  static HTML pages
content/projects/*.md ──►  lib/projects.ts ─┘
public/ (images)  ─────────────────────────────────────────────────►  served as-is
```

Two kinds of pages come out of the build:

| URL | Source file | What it shows |
| --- | --- | --- |
| `/` | `app/page.tsx` | Profile on the left; About, Experience, Projects, Skills, Education on the right |
| `/projects/<slug>` | `app/projects/[slug]/page.tsx` | One page per project markdown file |
| `/services` | `app/services/page.tsx` | Consulting tiers, options, process, terms, FAQs and contact |

A 404 page (`app/not-found.tsx`) covers anything else.

### Tech stack

| Piece | Version | Role |
| --- | --- | --- |
| Next.js (App Router) | 15 | Routing, static generation, image optimization, fonts |
| React | 19 | UI components |
| TypeScript | 5 | Types for content and components (strict mode) |
| Tailwind CSS | 3.4 | Styling via utility classes |
| @tailwindcss/typography | — | `prose` styles for project write-ups |
| gray-matter | — | Splits a markdown file into frontmatter (YAML) and body |
| react-markdown + remark-gfm | — | Renders markdown bodies, including tables and lists |
| framer-motion | 12 | Installed by the original template; not currently used |

---

## 2. Folder map

```
portfolio-site/
├── app/                         Next.js App Router: every route and component
│   ├── layout.tsx               Root HTML shell, fonts, site-wide SEO metadata
│   ├── page.tsx                 Home page (/): assembles the sections
│   ├── not-found.tsx            404 page
│   ├── globals.css              Tailwind setup + body background
│   ├── projects/[slug]/page.tsx Project detail page (/projects/<slug>)
│   ├── services/page.tsx        Consulting services & pricing page (/services)
│   └── components/              Reusable UI pieces (see section 5)
│
├── content/                     ← Everything you edit to change what the site says
│   ├── types.ts                 TypeScript shapes for the data files below
│   ├── profile.ts               Name, title, tagline, About, contact, socials
│   ├── experience.ts            Resume entries
│   ├── skills.ts                Skill groups
│   ├── education.ts             Education entries
│   ├── services.ts              Consulting tiers, pricing, process, terms, FAQs
│   └── projects/                One markdown file per project
│       ├── _template.md         Starter file (ignored by the site)
│       └── <slug>.md
│
├── lib/
│   └── projects.ts              Reads, validates, filters and sorts project files
│
├── public/                      Static files served from the site root
│   ├── profilePhoto.jpg         → /profilePhoto.jpg
│   └── projects/<slug>/…        → /projects/<slug>/… (screenshots)
│
├── tailwind.config.ts           Tailwind content paths + typography plugin
├── next.config.ts               Static export settings (see section 8)
├── render.yaml                  Render deployment settings
├── tsconfig.json                TypeScript config; defines the "@/" import alias
└── eslint.config.mjs            Lint rules (next/core-web-vitals + TypeScript)
```

**The `@/` alias.** `tsconfig.json` maps `@/*` to the project root, so
`import profile from '@/content/profile'` works from any file regardless of folder depth.

---

## 3. The content layer

Content is split by how it's edited:

- **Structured, short data** (profile, experience, skills, education) lives in **TypeScript files**.
  TypeScript checks every field against `content/types.ts`, so a typo like `organisation` instead
  of `organization` fails the build instead of silently disappearing.
- **Long-form writing** (projects) lives in **markdown files** with YAML frontmatter, because
  writing paragraphs inside TypeScript strings is painful.

### 3.1 TypeScript data files

Each file default-exports a typed value:

| File | Exports | Type (in `types.ts`) | Used by |
| --- | --- | --- | --- |
| `profile.ts` | one object | `Profile` | `ProfileSection`, `AboutSection`, `SocialLinks`, `layout.tsx`, project pages |
| `experience.ts` | array, newest first | `Experience[]` | `ExperienceSection` |
| `skills.ts` | array | `SkillGroup[]` | `SkillsSection` |
| `education.ts` | array | `Education[]` | `EducationSection` |
| `services.ts` | one object | `Services` | `ServicesSection`, `/services` page, `ProfileSection` |

Notable fields:

- `Profile.resumeUrl` – when set, a "Download resume" button appears on the home page.
- `Profile.siteUrl` – when set, becomes `metadataBase` so link previews use absolute URLs.
- `Experience.projects` – a list of project slugs. `ExperienceSection` turns each one into a link
  to `/projects/<slug>`. Slugs that don't match a published project are skipped silently, so a
  draft project won't produce a broken link.
- `Experience.previousRoles` – earlier titles at the same company, shown as "Previously …".
- `SkillGroup.icon` – must be one of the names defined in `app/components/Icon.tsx`
  (`code`, `layers`, `cloud`, `tool`, `globe`, `chart`, `spark`). TypeScript enforces this.

### 3.2 Project markdown files

Each file in `content/projects/` has two parts:

```markdown
---
title: Stock Footage Database Replatform     ← frontmatter (YAML)
category: professional
summary: One or two sentences for the card.
images:
  - src: /projects/stock-footage-replatform/ui.png
    caption: The new cataloguing screen
---

## Overview                                  ← body (markdown)
...
```

**The filename is the slug**, and the slug is the URL:
`content/projects/stock-footage-replatform.md` → `/projects/stock-footage-replatform`.

Frontmatter fields:

| Field | Required | Default | Notes |
| --- | --- | --- | --- |
| `title` | yes | — | |
| `summary` | yes | — | Shown on the card and under the page title |
| `category` | yes | — | `professional` or `personal` |
| `organization` | no | — | |
| `role` | no | — | Shown in the page's meta row |
| `period` | no | — | Free text, e.g. `2024 – Present`. Numbers like `2025` are converted to text |
| `order` | no | `100` | Lower comes first within its category; ties sort by title |
| `highlights` | no | `[]` | List of short strings; shown in the Highlights box on the page |
| `tech` | no | `[]` | List of strings; shown as tags on the card and page |
| `links` | no | `[]` | List of `{ label, url }`; shown as buttons on the page |
| `cover` | no | — | Image path; shown on the card and at the top of the page |
| `images` | no | `[]` | List of `{ src, caption?, alt? }` (or plain path strings); the gallery |
| `draft` | no | `false` | `true` hides the project everywhere |

### 3.3 `lib/projects.ts` – the project loader

This is the only file that touches the file system. It runs at **build time only** (it imports
Node's `fs`, so it can never be used inside a client component).

What `readProject(file)` does for each `.md` file:

1. Reads the file and splits it with `gray-matter` into `data` (frontmatter) and `content` (body).
2. Derives the `slug` from the filename.
3. **Validates**: throws a clear error if `title`, `summary` or `category` is missing, if
   `category` isn't `professional`/`personal`, or if `highlights`/`tech` aren't lists of text.
   Because it throws, a broken project file fails `npm run build` with a message naming the file,
   rather than producing a half-empty page.
4. **Normalizes**: fills defaults, turns `period` into a string, accepts images as either strings
   or objects.
5. **Strips `<!-- comments -->`** from the body so private notes never reach the page.

Public functions:

| Function | Returns | Used by |
| --- | --- | --- |
| `getAllProjects()` | Every published project (skips `_*.md` and `draft: true`), sorted by `order` then title | Experience links, `generateStaticParams` |
| `getProjectsByCategory(cat)` | Published projects in one category | Home page |
| `getProject(slug)` | One project or `undefined` | Project page |
| `getAdjacentProjects(slug)` | `{ prev, next }` in home-page order (professional first, then personal) | Previous/Next links on the project page |

Files are re-read on each call. That's deliberate: the cost is trivial at build time, and in
`npm run dev` it means edits show up on refresh without restarting the server.

---

## 4. How pages are built

### 4.1 The root layout – `app/layout.tsx`

Wraps every page in `<html>` and `<body>`. It:

- Loads the Geist fonts through `next/font/google`. Next.js downloads them **at build time** and
  self-hosts them, so visitors never contact Google. The fonts are exposed as CSS variables
  (`--font-geist-sans`, `--font-geist-mono`) but not applied to text, which keeps the template's
  original look. To use Geist, add `font-[family-name:var(--font-geist-sans)]` to the `<body>` class.
- Builds site-wide SEO metadata (title, description, Open Graph, Twitter card) from `profile.ts`.

> Because fonts are fetched during the build, `npm run build` needs internet access.

### 4.2 The home page – `app/page.tsx`

A server component that arranges sections in a two-column grid:

```
┌──────────────────────┬──────────────────────────────────────┐
│                      │  AboutSection                        │
│   ProfileSection     │  ExperienceSection                   │
│   (fixed, centred)   │  ProjectsSection  (professional)     │  ← scrolls independently
│                      │  ProjectsSection  (personal)         │     on desktop
│                      │  ServicesSection  (Work With Me)     │
│                      │  SkillsSection                       │
│                      │  EducationSection                    │
└──────────────────────┴──────────────────────────────────────┘
        2/5 width                       3/5 width
```

- **Desktop (`md` and up, ≥768px):** the page is exactly one screen tall (`md:h-screen`); the
  right column has its own scrollbar (`md:overflow-y-scroll`), so the profile stays in view.
- **Mobile:** columns stack and the whole page scrolls normally.

To reorder, add or remove sections, move the component lines in `page.tsx`. Each section has an
`id` (`about`, `experience`, `projects`, …) so you can link to `/#experience`.

`ProjectsSection` returns nothing when its list is empty, so the "Personal Projects" heading only
appears once at least one personal project is published.

### 4.3 Project pages – `app/projects/[slug]/page.tsx`

`[slug]` is a **dynamic route segment**: one file produces a page per project.

- `generateStaticParams()` returns every published slug. Next.js renders each one to HTML at build
  time.
- `dynamicParams = false` means any slug not in that list returns the 404 page, instead of trying
  to render on demand.
- `generateMetadata()` gives each project its own browser title, description and preview image.
- In Next.js 15, `params` is a Promise, which is why the page does `const { slug } = await params`.

Page structure, top to bottom:

1. Sticky header: "← All projects" (back to `/#projects`) and your name (back to `/`).
2. Organization, title, summary.
3. Meta row (Role, Period), tech tags, link buttons. Each only renders if it has data.
4. Cover image (if `cover` is set).
5. Highlights box (if `highlights` is set).
6. Markdown body.
7. Screenshots gallery (if `images` is set).
8. Previous / Next project links.

### 4.4 The services page – `app/services/page.tsx`

A single static page built from `content/services.ts`:

1. Intro and offering tags.
2. One card per tier, rendered by `TierCard` (shared with the community track). Each card has an `id` (`advisory`, `project`, `retainer`), so the home-page
   cards link straight to `/services/#project` and so on. The `featured` tier gets a dark ring and a
   "Most popular" badge. Tiers with `options` show a sub-table of sized packages.
3. **Community & Small Teams** (`services.community`, anchor `#community`): a shaded block with
   eligibility, the trade-offs that keep it affordable, its own tier cards and terms. Its email links
   use their own subject ("Community project inquiry: …"). The home section shows a one-line pointer
   to it with the lowest community price.
4. How it works (numbered steps), Terms, and FAQs. The FAQs use native `<details>` elements, so they
   expand and collapse without any JavaScript.
5. A call-to-action. Every contact link is a `mailto:` with a pre-filled subject, and the per-tier
   links include the tier name (e.g. "Consulting inquiry: Project") so you can tell where an inquiry
   came from.

Two switches in `services.ts` control the whole module:

| Switch | Effect |
| --- | --- |
| `enabled: false` | `ServicesSection` and the profile's "Work with me" button render nothing; `/services` calls `notFound()` and exports as the 404 page |
| `community.enabled: false` | Hides only the Community & Small Teams block and its home-page pointer |
| `showPrices: false` | `TierPrice` and `optionPrice` (in `app/components/pricing.tsx`) replace every figure with `hiddenPriceLabel` |

Because all price rendering goes through those two helpers, a new place that shows a price should
use them too, so the switch keeps working.

---

## 5. Components

All in `app/components/`. Everything is a **server component** (rendered to HTML at build time,
no JavaScript sent to the browser) except `ProjectGallery`, which needs interactivity.

### Layout building blocks

| Component | What it does |
| --- | --- |
| `Section` | Standard wrapper for home-page sections: padding, max width, heading, `id`. Use it for any new section so spacing stays consistent |
| `SectionHeading` | The title + thin divider line |
| `Timeline` (`TimelineItem`) | The left border with a dot, used by Experience and Education |
| `Icon` | Small stroke icons by name; the name list doubles as the allowed values for `SkillGroup.icon` |
| `SocialLinks` | GitHub / LinkedIn icon links; each only renders if set in `profile.ts` |
| `SiteHeader` | Sticky bar with a back link and your name, used on project pages and `/services` |
| `pricing.tsx` | Shared pricing helpers: `TierPrice`, `optionPrice`, `CtaButton`, `inquiryHref` |
| `TierCard` | A full tier card (badge, price, includes, options, inquiry link); used for standard and community tiers |

### Home page sections

| Component | Reads from | Notes |
| --- | --- | --- |
| `ProfileSection` | `profile.ts` | Photo, name, title, tagline, email, location, resume button, socials |
| `AboutSection` | `profile.about` | |
| `ExperienceSection` | `experience.ts` + `getAllProjects()` | Renders summary, bullets, previous roles, and links to related project pages |
| `ProjectsSection` | props: `title`, `id`, `projects` | A list of `ProjectCard`s |
| `ProjectCard` | one `Project` | Whole card is a link to the project page; shows cover, period, org, summary, tech |
| `SkillsSection` | `skills.ts` | Two-column grid of pill tags |
| `EducationSection` | `education.ts` | |
| `ServicesSection` | `services.ts` | Intro, three compact tier cards linking to `/services`, CTA button. Renders nothing when `enabled` is false |

### Project page pieces

| Component | Notes |
| --- | --- |
| `Markdown` | Renders the body with `react-markdown` + GitHub-flavoured markdown. Raw HTML is skipped (`skipHtml`) so nothing in a markdown file can inject markup. External links open in a new tab. Styled with Tailwind's `prose` classes |
| `ProjectGallery` | **Client component** (`'use client'`). A grid of thumbnails; clicking opens a full-screen lightbox. Keyboard: ← → to move, Esc to close. Locks page scrolling while open. Clicking the dark backdrop closes it |

**Server vs client, in one line:** a component only needs `'use client'` if it uses state, effects
or browser events. Keep that boundary small (as with the gallery) so most of the site ships as
plain HTML.

---

## 6. Styling

- **Tailwind utility classes** do all the styling, written directly in each component's `className`.
  `tailwind.config.ts` tells Tailwind which files to scan for class names; a class used anywhere
  else won't be generated.
- **Dark mode** follows the visitor's operating system setting (Tailwind's default `media`
  strategy). Every colour has a `dark:` counterpart, e.g. `text-gray-900 dark:text-white`.
  When adding UI, add both.
- **Palette:** greys only (`gray-50` to `gray-900`), white and black, matching the original
  template. Changing the accent is a find-and-replace on the gray classes.
- **Breakpoints:** `sm` (640px), `md` (768px). The two-column home layout switches on at `md`.
- **Typography plugin:** project bodies use `prose prose-gray dark:prose-invert`, which styles
  headings, lists, tables, links and images inside rendered markdown without per-element classes.
  Tweaks live as `prose-*` modifiers in `Markdown.tsx`.
- `globals.css` only loads Tailwind and sets a black body background (visible during overscroll).

---

## 7. Images

- Anything in `public/` is served from the site root: `public/projects/pcb/ui.png` → `/projects/pcb/ui.png`.
- Images are rendered with `next/image`, which lazy-loads anything below the fold. Because the
  site is a static export, `images.unoptimized` is on: files are served exactly as you saved them,
  with no automatic resizing. Export screenshots at a sensible size (around 1600–2400px wide) and
  compress them (PNG for UI, JPG for photos) so pages stay fast.
- Thumbnails and covers are cropped to fixed ratios (16:10 in the gallery, 16:9 for covers) with
  `object-cover`. The lightbox shows the whole image uncropped.
- **External image URLs** work as-is with unoptimized images, but keeping images in `public/`
  means they can't disappear or change under you.

---

## 8. How a change flows through

**Editing a project file during `npm run dev`:** save the `.md` file → refresh the browser →
`lib/projects.ts` re-reads it → the page re-renders with the change.

**Publishing:** `npm run build`
1. Type-checks and lints all code and the TypeScript content files.
2. Runs `generateStaticParams`, which loads and validates every project file.
3. Renders `/`, every `/projects/<slug>`, and the 404 page to static HTML.
4. Writes plain HTML, CSS, JS and images to `out/`. `npm start` serves that folder locally;
   Render (or any static host) serves the same folder in production.

### Static export settings (`next.config.ts`)

| Setting | Why |
| --- | --- |
| `output: "export"` | Produces plain files in `out/` instead of needing a running Node server. Without it, a Render Static Site has nothing to serve and shows "Not Found" |
| `trailingSlash: true` | Writes `projects/<slug>/index.html`, so clean URLs work on any host |
| `images.unoptimized: true` | Next's image resizer needs a server; a static site serves images directly |

Things a static export can't do: API routes, server actions, middleware, or rendering pages on
request. This site uses none of them. If you ever need them, remove `output: "export"` and deploy
to Render as a **Web Service** (build `npm ci && npm run build`, start `npx next start -p $PORT`).

If any step fails, nothing is published, so a broken project file can't take the live site down.

---

## 9. Extending the site

### Add a home-page section (e.g. Awards)

1. Add a type to `content/types.ts` and a data file `content/awards.ts`.
2. Create `app/components/AwardsSection.tsx`, wrapping its content in `<Section title="Awards" id="awards">`.
3. Add `<AwardsSection />` where you want it in `app/page.tsx`.

### Add a new project field (e.g. `teamSize`)

1. Add it to the `ProjectMeta` type in `lib/projects.ts`.
2. Read it in `readProject()` (e.g. `teamSize: data.teamSize`).
3. Display it, e.g. `<Meta label="Team" value={project.teamSize} />` in the project page's meta row.
4. Add it to `_template.md` so future projects include it.

### Add a project category (e.g. `research`)

1. Widen the `category` type in `lib/projects.ts` and update the check in `readProject()`.
2. Add a `<ProjectsSection title="Research" id="research" projects={getProjectsByCategory('research')} />` in `app/page.tsx`.
3. Add the category to the list in `getAdjacentProjects()` so Previous/Next includes it.

### Add a skill icon

Add a name and SVG path to `paths` in `Icon.tsx`, then add the same name to the `icon` union in
`SkillGroup` (`content/types.ts`).

### Add a page (e.g. `/now`)

Create `app/now/page.tsx` exporting a component. The folder name is the URL.

---

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Build error naming a project file | Missing `title`/`summary`/`category`, or a field in the wrong format | Read the message; it names the file and field |
| Build error from the YAML parser | A frontmatter value contains `: ` or starts with a special character | Wrap the value in quotes: `summary: "Ratio: 3 to 1"` |
| Project doesn't appear | `draft: true`, filename starts with `_`, or the file isn't `.md` | Check the file name and frontmatter |
| Project link in Experience missing | Slug in `experience.ts` doesn't match the filename | Use the filename without `.md` |
| Image shows nothing / 404 | Path doesn't start with `/` or doesn't match the file under `public/` | `public/projects/x/a.png` → `/projects/x/a.png` |
| Deployed site shows "Not Found" | Host is serving the wrong folder | Publish directory must be `out`; check `output: "export"` is still in `next.config.ts` |
| `Failed to fetch font 'Geist'` during build | No internet access while building | Build with a connection; Vercel always has one |
| Page looks unstyled in one spot | Tailwind class built dynamically from a string | Write class names out in full so Tailwind can find them |
| A `<!-- note -->` appears on the page | — | Shouldn't happen; notes are stripped in `lib/projects.ts` |

---

## 11. Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (first run, or after `package.json` changes) |
| `npm run dev` | Local dev server at http://localhost:3000 with live reload |
| `npm run build` | Build the static site into `out/`; also validates all content |
| `npm start` | Serve `out/` locally to preview the deployed site (run `build` first) |
| `npm run lint` | Lint all code |
