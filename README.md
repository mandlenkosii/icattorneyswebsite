# Ivirn Chauke Inc — website


Link : https://icattorneyswebsite.vercel.app/


Marketing site for Ivirn Chauke Inc, attorneys in Parktown, Johannesburg.
Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router. No backend.

## Run it

Requires Node.js 20 or newer.

```bash
npm install      # first time only
npm run dev      # local dev server at http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build locally
```

## Updating content

| What | Where |
| --- | --- |
| Firm name, slogan, address, phone, email, WhatsApp, X handle, opening hours, director details | `src/data/site.ts` |
| Practice areas (title, icon, description, detail, home-page `featured` flag) | `src/data/practices.ts` |
| Colours, fonts, radii, shadows | `@theme` block in `src/styles.css` |
| Page copy | `src/pages/*.tsx` |

The top bar, footer, contact page and JSON-LD structured data all read from
`src/data/site.ts`, so hours and address only need changing in one place.

To add a practice area, append an object to `PRACTICES` in `src/data/practices.ts`.
It appears automatically on the Practice Areas page, in the footer and in the contact form.
Icons come from [lucide.dev](https://lucide.dev/icons).

## Images

- **Logo:** `public/logo.jpeg`, used in the header, footer, director panels, JSON-LD and as the favicon.
  To change it, replace the file (keep it square).
- **Hero / page backgrounds:** `public/hero-johannesburg.jpg` is a colour-graded version of the AI-generated
  skyline in `assets-src/hero-original.jpg` (warmed toward bronze/gold, gold glow on the sunset, soft vignette,
  cropped so the tower sits clear of the hero text, 2000px wide). To regrade or use a new image:

  ```bash
  npm run grade-hero                       # regrade assets-src/hero-original.jpg
  npm run grade-hero -- path/to/new.jpg    # grade a different image
  ```

  This also regenerates `public/og-image.jpg`. Adjust `CROP`, `GLOW`, `WARMTH` and `SATURATION` in
  `assets-src/grade-hero.mjs`, and `heroFocus` in `src/data/site.ts` to change what stays in frame.
  If a replacement photo needs attribution, fill in `photoCredit` and it appears in the footer.
- **Share image:** `public/og-image.jpg` (1200×630), shown when links are shared on WhatsApp, LinkedIn, X etc.

Shared copy (values, approach steps, philosophy quote, FAQs) lives in `src/data/content.ts`.
The privacy notice is at `src/pages/Privacy.tsx`.

For social sharing, `share` should ideally be a 1200×630 JPG.

## Contact form

The form does not send anything to a server. The two buttons open WhatsApp
(`wa.me`) or the visitor's email app with the message prefilled; the visitor
must press send there.

## Deploying

`npm run build` outputs a static site in `dist/`. `public/_redirects` (Netlify)
and `vercel.json` (Vercel) route every path to `index.html` so deep links such as
`/contact` work.
