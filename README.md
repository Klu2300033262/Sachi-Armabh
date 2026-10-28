# SachiArambh

A four-page postpartum wellbeing and health-navigation website: Home, About,
Privacy, and Safety. Built with React, Vite, JavaScript, and Tailwind CSS,
with a separate FastAPI backend. Tagline: "From confusion to the right next step."

Minimal and Advanced Mode open static educational previews on Home. Feature
cards expand into practical educational content. No personalized assessment,
AI provider, database, authentication, or health-data storage is implemented.

## Website design and behavior

- React Router handles `/`, `/about`, `/privacy`, and `/safety`. Other paths
  redirect home. Navigation has active states, a mobile menu, skip link,
  route-focus handling, and reduced-motion support.
- Mode selection is a non-sensitive URL query (`?mode=minimal` or
  `?mode=advanced`), not a stored user profile. No symptoms are collected.
- Photography is served locally from `frontend/public/images`; credits,
  source links, and the Pexels License are on the Privacy page. Models are
  illustrative, not endorsers. Botanical SVG illustrations are original.
- DM Sans and Cormorant Garamond are self-hosted via Fontsource packages
  under the SIL Open Font License. No external font/image requests are needed.
- The frontend makes no AI calls and has no tracking, analytics, cookies,
  or application-managed browser storage. Browser history/cache and server
  access logs can still exist; the Privacy page explains these limits.
- No healthcare affiliation, clinical validation, or personalized medical
  advice is claimed. Safety includes urgent warning signs and source links.
- Production hosting must serve `index.html` for the four frontend routes,
  while routing `/api` separately to FastAPI. Vite does this during development.

## Prerequisites

Use Node.js 24 LTS (or a supported release meeting Vite's Node requirement),
npm, Python 3.11 or newer, and Git.

Check installations in PowerShell:

```powershell
node --version
npm.cmd --version
python --version
git --version
```

If a command is missing, use its official installer:

- [Node.js LTS](https://nodejs.org/en/download) includes npm. Use the Windows
  installer and keep the PATH option enabled.
- [Python for Windows](https://www.python.org/downloads/windows/): enable
  "Add python.exe to PATH" when offered.
- [Git for Windows](https://git-scm.com/downloads/win): enable command-line use.

Restart VS Code/terminals after installation and repeat the version checks.
Do not install npm separately from an unofficial website. `npm.cmd` avoids
PowerShell script execution-policy errors; no policy change is necessary.

## Structure

```text
self-learning\
  frontend\
    src\               Shared shell, routed pages, illustrations, and styles
    public\            Local licensed photos, brand icon, and template assets
    .env.example       Public frontend settings and development proxy target
    package.json
    package-lock.json
    vite.config.js
  backend\
    app\
      config.py        Validated backend environment settings
      main.py          FastAPI app and /api/health endpoint
    tests\             Health response and CORS tests
    .env.example
    requirements.txt
    requirements-dev.txt
    .venv\             Local Python environment (ignored by Git)
  .gitignore
  README.md
```

Unused Vite template assets/styles are preserved, not deleted.

## Install or restore dependencies

The initial setup installs these locally. To recreate them later:

```powershell
Set-Location C:\self-learning\frontend
npm.cmd ci

Set-Location C:\self-learning\backend
if (-not (Test-Path .\.venv)) { python -m venv .venv }
.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
```

Python runtime requirements are in `requirements.txt`; the development file
also installs HTTPX for the tests. No global Python packages are needed.

## Environment configuration

Defaults work without local environment files. For optional overrides, copy
the examples only when a local file does not already exist:

```powershell
Set-Location C:\self-learning
if (-not (Test-Path .\frontend\.env)) {
  Copy-Item .\frontend\.env.example .\frontend\.env
}
if (-not (Test-Path .\backend\.env)) {
  Copy-Item .\backend\.env.example .\backend\.env
}
```

- Frontend `VITE_API_BASE_URL=/api` makes browser requests relative to Vite.
- Vite forwards `/api` requests to `API_PROXY_TARGET=http://127.0.0.1:8000`,
  keeping the `/api` prefix.
- Backend `CORS_ORIGINS` is a JSON list of explicitly permitted origins.
  Wildcard origins and credentialed cross-origin requests are not enabled.
- Restart the relevant server after editing its environment file.
- Local `.env` files are ignored. Never place secrets in `VITE_` variables:
  they are embedded in public browser code.

The proxy is for development only. A production deployment must route `/api`
to FastAPI through its web server, or use an explicit public API URL and
configure the matching allowed frontend origin.

## Run locally

Open two PowerShell terminals in VS Code. Virtual-environment activation is
not needed; use its Python executable directly.

Alternatively, use **Terminal > Run Task** and select `SachiArambh: backend`
and `SachiArambh: frontend`. The initial setup uses these two persistent VS Code
task terminals. Do not start duplicate servers while they are already running.

**Terminal 1 - backend**

```powershell
Set-Location C:\self-learning\backend
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Terminal 2 - frontend**

```powershell
Set-Location C:\self-learning\frontend
npm.cmd run dev
```

Open:

- Frontend: http://127.0.0.1:5173
- Backend health: http://127.0.0.1:8000/api/health
- Interactive API docs: http://127.0.0.1:8000/docs

Home shows the maternal-wellbeing website. The backend remains independently
available at `/api/health`; the informational website does not need it to
render. Stop each server with **Ctrl+C** in its terminal before restarting it.
Servers bind only to this computer.

If a port is already in use, do not stop unknown processes. Stop your own
previous server or choose another port and update the proxy/CORS settings.
Vite uses a strict port so it will not silently choose another one.

## Verify

```powershell
Set-Location C:\self-learning\frontend
npm.cmd run lint
npm.cmd run build
npm.cmd run test:e2e

Set-Location C:\self-learning\backend
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
.\.venv\Scripts\python.exe -m pip check
```

With both servers running, verify the proxy:

```powershell
Invoke-RestMethod http://127.0.0.1:5173/api/health
```

Expected JSON: `{"status":"ok","service":"SachiArambh API"}`.

Browser regression tests cover all four direct routes, six viewport widths
(320–1440px), mode previews, disclosures, mobile menu keyboard behavior,
focus restoration, self-hosted assets, and absence of external asset requests.
For a fresh development machine, if the test runner reports that its browser
is missing, run `npx.cmd playwright install chromium` once and retry.
Playwright reuses a running Vite server locally or starts its own when needed.

## Official framework documentation

- [React](https://react.dev/)
- [Vite](https://vite.dev/guide/)
- [Tailwind CSS Vite integration](https://tailwindcss.com/docs/installation/using-vite)
- [FastAPI](https://fastapi.tiangolo.com/)
