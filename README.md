# ByHeart — Hosted PWA

Memorize any text by heart. This folder is a complete Progressive Web App,
ready to deploy to any free static host. Once hosted over HTTPS, Android
Chrome installs it as a real app (WebAPK): app-drawer icon, full-screen,
fully offline.

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire app |
| `manifest.webmanifest` | App name, colors, icons for installation |
| `sw.js` | Service worker — offline caching |
| `icon-192.png`, `icon-512.png` | App icons |
| `icon-maskable-512.png` | Icon for Android's round/squircle masks |

## Deploy — pick ONE option

### Option A: Netlify Drop (fastest, ~2 minutes, no account needed to try)
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get a URL like `https://something.netlify.app` — done.
   (Create a free account to keep the site permanently and rename it.)

### Option B: GitHub Pages (free, permanent)
1. Create a new repository on https://github.com (e.g. `byheart`).
2. Upload all files from this folder to the repository
   (on the repo page: "Add file" → "Upload files").
3. Repo → Settings → Pages → Source: "Deploy from a branch",
   Branch: `main`, folder `/ (root)` → Save.
4. After ~1 minute your app is live at
   `https://YOUR-USERNAME.github.io/byheart/`

### Option C: Cloudflare Pages
1. https://pages.cloudflare.com → Create a project → Direct upload.
2. Upload this folder. Done.

## Install on your Android phone
1. Open the deployed URL in **Chrome**.
2. Chrome may show an "Install" banner — tap it.
   Otherwise: menu **⋮ → Add to Home screen → Install**.
3. ByHeart now appears in your app drawer and works fully offline.

## Updating the app later
1. Edit `index.html` (or ask Claude for a new version).
2. In `sw.js`, change the first line's version string
   (e.g. `byheart-v1` → `byheart-v2`) so phones fetch the new files.
3. Re-upload the changed files to your host.
4. Installed apps pick up the update the next time they're opened
   (open twice: once to download, once to run the new version).

## Your data
All texts and progress are stored **on your device** (localStorage) —
nothing is sent to any server. Use Backup/Restore inside the app to move
data between devices or before clearing browser data.
