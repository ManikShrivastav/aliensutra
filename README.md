# 👽 Aliensutra — Static Galactic Website

A futuristic static website for **Aliensutra**, built with plain HTML, CSS and JavaScript.

## Features

- 🌌 Three.js animated galaxy background
- 👽 Alien-inspired visual identity
- 🛰️ Holographic / sci-fi UI
- 📱 Responsive mobile layout
- 🍔 Mobile hamburger navigation
- 🖱️ Mouse-based galaxy movement
- 📱 Touch-based galaxy movement
- ✨ Scroll reveal animations
- 🪐 Interactive project constellation
- 📡 Transmission / YouTube section
- 📬 Contact terminal
- 🚫 No npm required

## Files

```text
index.html
style.css
script.js
README.md
```

## Run locally

Because the page uses external Three.js assets, run it through a local HTTP server rather than opening `index.html` with `file:///`.

### VS Code

Install the Live Server extension, then right-click `index.html` → **Open with Live Server**.

Or use Python:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Deploy

This is a static site and can be deployed directly to Cloudflare Pages.

Upload/push these files to the connected Git repository and set the build configuration to:

- Build command: leave empty
- Build output directory: `/`
- Root directory: `/`

If deploying as a Worker/static-assets project, the same files can also be served as static assets.

## Contact form

The current form is intentionally static. It creates a `mailto:` transmission to:

```text
hello@aliensutra.com
```

For true server-side form delivery without requiring the visitor's mail app, connect the form to a Cloudflare Worker / Pages Function or a form service later.

## Customize

Update:

- Social links in `index.html`
- Project descriptions/URLs in `script.js`
- `hello@aliensutra.com` if your official address changes
- Colors and typography in `style.css`
- The 3D galaxy parameters near the bottom of `script.js`

Build beyond the ordinary. 👽
