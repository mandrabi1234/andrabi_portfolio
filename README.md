# Mohi Andrabi – Portfolio

Next.js + Tailwind portfolio. All content lives in `/content`, so you rarely need to touch a component.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # builds the static site into /out (also checks every project file)
npm start          # serves /out locally to preview the real deployed site
```

## Where everything lives

| What | File |
| --- | --- |
| Name, title, tagline, About paragraph, email, socials, resume link | `content/profile.ts` |
| Experience (resume entries) | `content/experience.ts` |
| Skills | `content/skills.ts` |
| Education | `content/education.ts` |
| Consulting services & pricing | `content/services.ts` |
| Projects (one file each) | `content/projects/<slug>.md` |
| Project screenshots | `public/projects/<slug>/` |
| Section order on the home page | `app/page.tsx` |

## Add a project

1. Copy `content/projects/_template.md` to `content/projects/my-project.md`.
   The filename becomes the URL: `/projects/my-project`.
2. Fill in the frontmatter at the top (title, summary, category, tech, …) and write the page
   below it in Markdown. Headings, lists, bold, links, tables and images all work.
3. Put screenshots in `public/projects/my-project/` and list them under `images:`:

   ```yaml
   images:
     - src: /projects/my-project/dashboard.png
       caption: The selector dashboard
   ```

   They appear in a gallery at the bottom of the page; clicking one opens it full size
   (arrow keys move between them). You can also place an image inline in the text with
   `![alt text](/projects/my-project/diagram.png)`.
4. Optional: set `cover:` to an image to show it on the home page card and the top of the page.

The project appears on the home page automatically, sorted by `order` within its `category`
(`professional` or `personal`).

**Useful switches**

- `draft: true` hides a project everywhere until it's ready.
- `<!-- notes -->` in the Markdown are stripped, so you can leave reminders to yourself.
- Files starting with `_` are ignored.

## Add a resume entry

Copy an object in `content/experience.ts` and edit it. List project slugs in `projects` to show
links from that role to its project pages:

```ts
{
  role: 'Senior Software Engineer',
  organization: 'New Company',
  period: 'Jan 2027 – Present',
  summary: 'One sentence about the role.',
  highlights: ['Bullet one', 'Bullet two'],
  projects: ['my-project'],
},
```

If you're promoted within a company, add `previousRoles: [{ role: 'Software Engineer', period: '2022 – 2026' }]`.

## Services & pricing

Everything on the "Work With Me" section and the `/services` page comes from `content/services.ts`:
the intro, the three tiers (Advisory, Project, Retainer) with their prices and options, the process
steps, terms, FAQs and the call-to-action email subject.

- Change a price: edit its string (e.g. `price: '$150'`).
- Hide all prices but keep the tiers: `showPrices: false` (shows "Contact for pricing").
- Remove the module entirely (home section, "Work with me" button and `/services`): `enabled: false`.
- Mark the recommended tier with `featured: true` (badge text via `badge`, default "Recommended").
- **Community & Small Teams** (lower-priced track for small organizations) lives under `community` in
  the same file: who qualifies, the trade-offs that keep it affordable, its own three tiers and terms.
  Set `community.enabled: false` to hide just that track.

## Add a downloadable resume

Put the PDF in `public/` (e.g. `public/Mohi_Andrabi_Resume.pdf`) and set
`resumeUrl: '/Mohi_Andrabi_Resume.pdf'` in `content/profile.ts`. A "Download resume" button appears
under your contact details.

## Deploy

The site builds to plain HTML files in `out/` (see `next.config.ts`), so it runs on any static host.

**Render (Static Site):**
- Build command: `npm ci && npm run build`
- Publish directory: `out`

`render.yaml` holds the same settings, so you can also create it with New → Blueprint.

**Vercel / Netlify:** import the repo; both detect Next.js and the `out/` folder automatically.

Once you have a domain, set `siteUrl` in `content/profile.ts` for correct link previews.
