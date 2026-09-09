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

## v6 fix pass

- Favicon replaced with the custom "MAG" monogram logo.
- Browser tab title shortened to "Mark Anthony Gabo."
- Motto removed from the footer line.
- "Gallery" nav link and GitHub icon removed from the header.
- Contact section content centered.
- Certification marquee: removed the white card backgrounds; also fixed the LinkedIn Learning badge, which had a white background baked into the image itself (not just CSS), and recolored the Skillsoft logo's black text to white so it's visible on a dark background.
- Fixed a real bug: the marquee edge-fade mask was visually clipping through hovered pill/tile borders, causing a crescent-shaped distortion on hover/touch. Removed the fade mask.
- Hero photo re-centered vertically (was bottom-aligned, leaving a visible gap above it) and sized slightly larger.
- Added quotation marks around the leadership award quote.
- Experience & Leadership timeline: dates now sit above the title instead of beside it, fixing both the desktop layout and the cramped/wrapping title issue on mobile.
- Mobile hamburger menu is now scrollable (`overflow-y: auto` with a height cap relative to viewport) so all items are reachable on short screens, and added visible tap feedback on the toggle button and nav links.

## Latest round of fixes

- Favicon background removed — now a transparent PNG/ICO of the "MAG" mark, blends with any browser tab color.
- Skills and Certifications marquees now sit inside a bordered panel (box), and are split into two rows scrolling in opposite directions (top row left-to-right, bottom row right-to-left, running slightly slower).
- Hero photo enlarged on mobile/tablet.
- Added a scroll-linked zoom effect on the hero photo — it scales up subtly as you scroll down past it (respects reduced-motion settings).

## Theme: Crisp white + deep navy

The site now uses a white background with deep navy accents (previously matte black + red). Everything shares the same CSS variables, so future palette tweaks only need to happen in the `:root` block at the top of `css/style.css`:

- `--black` → page background (white)
- `--black-soft` / `--panel-solid` → light gray section/card backgrounds
- `--line` → border color
- `--red` / `--red-bright` / `--red-deep` → the navy accent scale (kept the variable names to avoid rewriting every rule; they hold navy values now)
- `--white` → main text color (dark navy/ink, despite the name)
- `--on-accent` → always-white text/icons used on solid navy surfaces (buttons, badges, the FAB)

Also updated for the new theme: the favicon (recolored to navy so it's visible in light browser tabs), the social share image, and the hero's animated background dots/lines.

## Pre-launch checklist pass

Went through a 20-point launch checklist. Here's the status:

**Added:**
- `privacy.html` and `terms.html` (linked in the footer, marked `noindex` so they don't clutter search results)
- Cookie consent banner — Google Analytics now only loads after the visitor clicks Accept (declining still lets the site work normally)
- Honeypot field on the contact form for basic spam protection (invisible to real visitors, catches simple bots)
- Mark's name added to the 404 page

**Already in place from earlier rounds** (verified, no changes needed):
- Meta titles, descriptions, social preview image, favicon, sitemap.xml, robots.txt, custom 404 page, alt text on every image, lazy loading on below-the-fold images, mobile responsiveness, one clear CTA (Download CV / Get in touch)
- Color contrast checked against WCAG AA for every text/background pairing on the site — all pass (lowest is 4.65:1, minimum required is 4.5:1)
- No secrets, API keys, or credentials anywhere in the frontend code

**Needs one manual step from you:**
- Force HTTPS: in GitHub repo → Settings → Pages → check "Enforce HTTPS" (should be available now that your domain is verified)
- Compress further if desired: gallery images are already compressed once; if you add new photos later, keep them under ~300KB each

**Not applicable:**
- Form validation / spam protection for a real backend: this site has no backend, the "form" opens the visitor's own email client, so there's nothing to validate server-side or protect from injection. The honeypot above still helps if you ever swap in a real form service like Formspree.
