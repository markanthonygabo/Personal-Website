# Mark Anthony Gabo — Personal Website

A single-page personal site: hero, about, experience, education, skills, leadership & service, and contact.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `mark-anthony-gabo.github.io` for a user site, or any name for a project site).
2. Push these files to the repository root — keep `index.html`, `css/`, `js/`, and `images/` at the top level.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Pick the `main` branch and `/ (root)` folder, then save.
6. Under **Custom domain**, enter `markanthonygabo.com` and save. GitHub will auto-detect the `CNAME` file already included in this project.
7. At your domain registrar, point DNS at GitHub Pages:
   - For the apex domain (`markanthonygabo.com`), add **A records** pointing to GitHub's Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - For `www.markanthonygabo.com` (optional), add a **CNAME record** pointing to `markanthonygabo.github.io`.
8. Back in **Settings → Pages**, once DNS resolves, check **Enforce HTTPS** so the site loads securely.

DNS propagation can take anywhere from a few minutes to 24 hours. No build step is required beyond that — it's plain HTML/CSS/JS with relative asset paths.

## Structure

```
index.html
css/style.css
js/script.js
images/
  hero-portrait-nobg.png   (background removed, blends into the page)
  about-portrait.jpg
  leadership-portrait.jpg
assets/
  Mark-Anthony-Gabo-CV.pdf (served by the "Download CV" buttons)
```

## What's new in this revision

- A subtle animated network runs behind the hero photo on a `<canvas>` element (`js/script.js`, respects `prefers-reduced-motion`).
- The Experience section is a tabbed, expandable accordion covering both JTI roles and your full leadership and civic history.
- A dedicated Leadership Award block features your 2023 City Youth Development Office photo and quote.
- Education is shown as alternating red and black tiles with hover lift effects.
- Skills scroll as a horizontal marquee of icon pills; Certifications has its own marquee of issuer logos (`images/certs/`).
- Two pull-quotes: your personal philosophy quote after the hero, and your leadership quote in the award block.

## Contact form

There's no backend, so the floating message button and "Get in touch" / "Compose a message" buttons open a modal that builds a `mailto:` link and hands off to the visitor's own email app, addressed to the inbox set in `js/script.js` (`RECIPIENT_EMAIL`). No email address is printed anywhere in the visible page text.

## Updating content

- Text content lives directly in `index.html`, organized by section (`hero`, `about`, `experience`, `education`, `skills`, `leadership`, `contact`).
- Colors, fonts, and spacing are controlled by CSS variables at the top of `css/style.css` (`:root`), so palette or type changes can be made in one place.
- Swap photos by replacing the files in `images/` with the same filenames, or update the `src` paths in `index.html`.
- Replace `assets/Mark-Anthony-Gabo-CV.pdf` with an updated CV any time — the filename can stay the same.

## Technical audit fixes applied

- Favicon set (`favicon.ico` + PNG sizes + Apple touch icon) generated from a simple "MG" mark.
- Open Graph and Twitter Card meta tags, plus a matching `images/meta/og-image.jpg` share card, so links posted on LinkedIn/Facebook/etc. show a proper preview.
- JSON-LD `Person` structured data in `<head>` for richer Google search results.
- `robots.txt` and `sitemap.xml` for search engines.
- Custom branded `404.html`.
- Gallery and portrait images resized and recompressed (roughly 4.5MB total savings).
- `loading="lazy"` added to all below-the-fold images (gallery, certification logos, about photo, award photo).
- "Get in touch," "Compose a message," and the floating button are now real `mailto:` links underneath, so they still work even if JavaScript fails to load; JS intercepts the click to open the nicer compose modal when available.
- Added a "Skip to content" link for keyboard/screen-reader users.
- Lightened the muted gray text color for better contrast against black.
- Removed an unused leftover image asset.

**Before deploying**, the domain is already set to `markanthonygabo.com` throughout (`CNAME`, `og:url`, `robots.txt`, `sitemap.xml`). If you ever change domains, update those four spots.
