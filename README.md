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

## Light / dark mode toggle

Added a sun/moon toggle in the header. Light mode is the current white + navy theme; dark mode reuses the original matte black + red theme, both are fully built out, so this was a rebuild-free addition.

How it works:
- A small inline script in each page's `<head>` sets the theme before the page paints, so there's no flash of the wrong theme on load.
- Defaults to the visitor's OS-level light/dark preference on first visit; after that, remembers whatever they manually pick (stored in `localStorage`, persists across pages and future visits).
- The hero's animated background dots/lines switch color to match the active theme.
- Certification logo tiles are intentionally kept on a fixed light background in both themes, since the logos themselves (some with dark text) are designed for light backgrounds and would lose legibility on a dark tile.

**Known limitation:** the favicon and the social share preview image (what shows up when your link is posted on LinkedIn/Facebook) are static files and always show the light/navy version, regardless of which mode a visitor has selected. This is normal, browsers and social platforms don't support theme-aware favicons/share images.

## Stat row + accessibility panel

Adapted two ideas from a reference site a while back:

- **Stat row** in the hero (below the CTA buttons): "3+ Years at JTI", "10+ Credentials earned", "2022 Volunteering since". Update these numbers as they change, they're plain text in `index.html` right after `.hero-actions`.
- **Accessibility panel** (bottom-left icon, navy circle with a person-in-circle icon): text size (A / A+ / A++, using the browser's zoom so the whole layout scales, not just font size), a manual "Reduce motion" toggle (stops the marquees and hero network animation even if the visitor's OS-level setting doesn't have it on), and "Underline links" (adds underlines to inline text links for visitors who have trouble distinguishing links by color alone). All three persist across visits via `localStorage`, same pattern as the theme toggle.

Skipped the "high contrast" toggle from the reference site since the current palette already passes WCAG AA everywhere, it would've been a toggle with nothing real to fix.

## Big round of fixes (mobile tabs, marquee overhaul, breakout photos, direct-send form, SEO)

- **Mobile tabs**: "Professional" / "Leadership & service" now stay side-by-side instead of stacking, scrolls horizontally on very narrow screens if needed instead of wrapping.
- **Marquee bug fix**: the crescent/clipped-border glitch on hover or touch was the marquee clipping right at its own edge with no headroom for the hover lift. Added padding to fix it.
- **Marquees rebuilt from CSS animation to JS-driven**: tap/click pauses the scroll, resumes automatically after 3 seconds; fully draggable/swipeable by the visitor at any time.
- **Breakout photo effect**: the About and Leadership Award photos are now background-removed cutouts (`images/about-portrait-cutout.png`, `images/leadership-award-cutout.png`) layered over a frame panel, so the head extends past the top of the frame.
- **Contact form now sends directly** via Formspree instead of opening the visitor's email app. **You need to do one thing**: sign up free at formspree.io, create a form, and replace `YOUR_FORM_ID` in `js/script.js` (`FORM_ENDPOINT`) with your real endpoint. Until you do that, it automatically falls back to the old mailto behavior, so nothing breaks in the meantime.
- **Socials**: removed GitHub, added YouTube and TikTok (Contact section).
- **"Featured gallery" → "Gallery"**.
- **Em dashes removed** from the language tags.
- **Scroll-reveal animations** added throughout (About, Award, Education tiles, Certification cards, timeline items, gallery tiles fade/slide in as you scroll to them) plus a **count-up animation** on the hero stat numbers. All respect the reduced-motion toggle and OS setting.
- **SEO reinforcement**: added `max-image-preview:large` and explicit `index,follow` to robots meta, a canonical URL tag, alt text on the share image, and expanded the structured data (added a description, topics, and updated the linked profiles to match the current social icons).

## Round after the big rebuild

- **Hero photo replaced** with your new headshot (professional navy suit), background removed cleanly.
- **Header avatar**: a small circular photo now sits before your name in the nav. Skipped the verified-checkmark badge on purpose (see conversation, borrows platform-verification credibility that doesn't apply here).
- **About & Award photos**: reverted away from background removal. They now use your original, full-quality photos with a CSS mask, only the sliver breaking above the frame fades out; everything inside the frame (including the real background) stays fully intact and undistorted.
- **Mobile hamburger menu**: now a floating rounded card with margin and shadow instead of a flush full-width panel.
- **Marquee pause**: 3s → 2s.
- **Timeline scroll-line**: the vertical line in Experience & Leadership now visually "draws" downward as you scroll through that section, tested against real scroll math, not just eyeballed.
- **Book titles updated**: "The 1% Manager Blueprint" and "The Young Employee's Playbook."
- **Favicon**: added a 96×96 version (Google's documented preferred size) alongside the existing sizes.
- **Scroll-reveal animations made more pronounced** (bigger slide distance + a subtle scale-in) after confirming via direct testing that the effect was firing correctly but was too subtle to notice on a fast mobile scroll.

## Final round

- **Hero photo enlarged** to fill the layout column properly (was sitting small with empty space around it).
- **Avatar ring** recolored to Twitter/Facebook blue (`#1d9bf0`).
- **Checkmark badge** added after your name. Note: this uses a plain circle with a checkmark in the same blue, not the exact scalloped Twitter/X badge shape, that was a deliberate choice to avoid the badge reading as "verified by X," which was flagged twice during the build. If you'd rather have the literal X-style badge asset instead, it's a one-line swap in `index.html` (the `.logo-badge` SVG).

## Handle + new photos

- Added an italicized `@markanthonymgabo` handle beneath your name in the header.
- Swapped in your new avatar and hero photos (both provided pre-cropped/cut).
- Hero photo enlarged further per your follow-up request.

## Border restored on breakout photos

Added back a thin frame border around the About and Leadership Award photo boxes (visible on the boxed/opaque portion, not the part breaking above it). Also swapped in a refined version of the leadership award cutout.

## Fixed: gray gap on the Leadership Award photo border

The refined award cutout you sent had a slightly bigger transparent zone at the top than the original one, so the fixed sizing (tuned for the old photo) was too short, leaving a strip of the frame panel's background exposed above the real photo, inside the border. Re-measured both images precisely and adjusted the sizing so the border now aligns exactly with where each photo's real content starts, no gap.

## Live IDs wired in

- Google Analytics Measurement ID: `G-GZY4CE0QWM`
- Formspree endpoint: `https://formspree.io/f/xgaeqqyk`

Both are now real, not placeholders. Analytics will start tracking once a visitor accepts the cookie banner. The contact form will now attempt a direct send via Formspree first, falling back to opening the visitor's email app only if that request fails.

**One thing to do on your end:** check your email for a message from Formspree confirming your form, submissions won't go through until you confirm it.
