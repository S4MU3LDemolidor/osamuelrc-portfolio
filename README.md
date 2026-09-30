# osamuelrc: Thumbnail portfolio

Plain HTML/CSS/JS with no build step. Open `index.html` or serve the folder:

```bash
python3 -m http.server 4321
```

Then go to http://localhost:4321.

## Where to edit things

| What | Where |
| --- | --- |
| Gallery thumbnails, categories, titles, channels, views, A/B variants | `js/content.js` → `work` |
| Tilted cards under the hero (and the "Latest drop" tab) | `js/content.js` → `heroStrip` |
| All other text (hero, System, Process, Pricing, FAQ, CTA) | `index.html` |
| WhatsApp and X links | `index.html` (search for `wa.me` and `x.com`) |
| Visitor stats | Vercel dashboard → your project → Analytics (turn it on once) |
| Colors, fonts, spacing | top of `css/styles.css` (`:root`) |
| Smooth scrolling (speed, on/off) | `js/smooth-scroll.js` (`lerp`: lower = smoother). Delete its `<script>` tags in `index.html` to turn it off. |
| "Page not found" page | `404.html` (Netlify, Vercel and GitHub Pages use it automatically) |
| Link preview image (WhatsApp, LinkedIn, X…) | `assets/og-image.jpg` (1200×630) |
| Browser and iPhone icons | `assets/favicon.svg`, `assets/favicon-32.png`, `assets/apple-touch-icon.png`, `favicon.ico` |

### Adding thumbnails
1. Put your images (1280×720) in the `thumbnails/` folder. WebP loads fastest: export as WebP, or convert for free at https://squoosh.app (quality about 80). JPG and PNG work too, just heavier.
2. In `js/content.js`, add a line at the top of `work` with `title: "Concept #8"` (the next number), a short `desc`, and `variantA: "thumbnails/my-thumb.webp"`.
3. For A/B tests, set `variantB` to the second image and `abNote` to one line on what changed (e.g. `"Text vs. no text"`). Use `variantB: null` to hide the A/B toggle.
4. For practice redesigns of a creator's video, add `concept: true`. That shows a "Concept" label next to the channel name, so nobody thinks the channel hired you. Remove it once they do.
5. Give every image a unique, lowercase file name with no spaces (e.g. `why-i-switched-A.webp`). Most hosts are case-sensitive.

New categories get their own filter chip automatically, and every card with an image opens full size when clicked.

Your full-quality originals live in `../thumbnail-originals/` (outside this folder, so they are never published or pushed to GitHub).

## Still to do once the site is live
- Make `og:image` / `twitter:image` in `index.html` full URLs (https://your-site/assets/og-image.jpg), and add `og:url`, a canonical link and `sitemap.xml` (plus a `Sitemap:` line in `robots.txt`).
- Update "5 spots open this month" in the final section whenever it changes.

## Sections parked for later
*How the thumbnails perform*, *Channels & brands I've worked with* and *What it's like working with me*
are saved in `snippets/later-sections.html`, and their styles are still in `css/styles.css`.
When you have real results, clients and testimonials, paste a section back into `index.html`
after *The System* section.

## Deploying (Vercel)
This folder is the GitHub repository (https://github.com/S4MU3LDemolidor/osamuelrc-portfolio).
- **From GitHub (recommended):** at vercel.com/new, import `osamuelrc-portfolio` and click Deploy. No build settings are needed. Every push to `main` then redeploys the site automatically.
- **Without GitHub:** install the CLI once (`npm i -g vercel`), then run `vercel --prod` inside this folder.

Your full-quality originals (`../thumbnail-originals/`) are kept only on your computer, not in the repository.

Vercel uses `404.html` automatically for broken links.
