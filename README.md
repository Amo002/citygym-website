# City GYM — Website + Admin

Marketing website for **City GYM** (Amman, Jordan) with a built-in admin dashboard.
Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **framer-motion**, and **SQLite**.

- Animated landing page: hero, about, services, classes, coaches, gallery, pricing, contact, location.
- **Light / dark** mode (orange `#ff6600` brand, matching the City GYM desktop app).
- **Admin dashboard** at `/admin` — edit every section, swap images by URL, manage pricing/coaches/classes, read contact submissions, change password.
- All content + contact messages stored in a local **SQLite** database (`data/citygym.db`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & run (production)

```bash
npm run build
npm run start    # serves on :3000
```

## Admin

- URL: `/admin`
- Default login: **admin / citygym** (change the password from the Settings tab on first login).

## Configuration

- `SESSION_SECRET` — set in production to a long random string (used to sign admin sessions).
- Stock images come from Unsplash and can be replaced with any image URL from the admin panel.

## Database

SQLite via `better-sqlite3`. The DB file is created automatically at `data/citygym.db`
(ignored by git). Tables: `meta` (site content JSON), `admins`, `submissions`.

## Deploy (VPS — 140.82.34.115 · citygym.redamo.work)

```bash
# on the server
git clone https://github.com/Amo002/citygym-website.git
cd citygym-website
npm install
npm run build
SESSION_SECRET="<random>" npm run start   # or run under pm2 behind nginx
```

Point an `A` record `citygym → 140.82.34.115` (already set), proxy nginx → `127.0.0.1:3000`,
and add TLS with certbot.
