# Heliopause Tech Solutions website

The official website of Heliopause Tech Solutions, my IT services business in Harare. It covers IT support, web design and GPS vehicle tracking.

Live site: https://www.heliopausetechsolutions.co.zw/

## Pages

- `index.html`: home page with services, about and a contact form that opens a pre-filled WhatsApp message.
- `tracking/`: GPS vehicle tracking, car alarm and fuel monitoring.
- `404.html`: custom not-found page.

## How it is built

- Static HTML, CSS and vanilla JavaScript. Fonts, styles and scripts are all self-hosted, with no CDNs.
- Mobile first: the navigation menu works with the keyboard and closes on Escape, an outside click or a resize. Touch targets are sized for phones, and hover effects only apply on devices with a mouse.
- Accessibility: a skip link, visible focus outlines, ARIA attributes on the menu, and animations switched off for users who prefer reduced motion.
- SEO: page titles and descriptions, Open Graph tags, `sitemap.xml`, `robots.txt` and a web manifest with app icons.
- Performance: WebP images and long-lived caching for versioned CSS and JS files.

## Security

`_headers` sets HTTP security headers on every response:

- `Content-Security-Policy` that only allows the site's own resources
- `Strict-Transport-Security` (HTTPS only)
- `X-Frame-Options: DENY` and `frame-ancestors 'none'` (no clickjacking)
- `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy`

`.well-known/security.txt` tells people how to report a security problem.

## Deployment

The site is hosted on Cloudflare Pages. `www` is a CNAME to the Pages project, and `_redirects` handles old URLs. To deploy, push to the connected repository or upload the folder in the Cloudflare dashboard. There is no build step.

## Licence

Code and content © Heliopause Tech Solutions. All rights reserved. The bundled Bootstrap CSS and the Inter font keep their own MIT and OFL licences.
