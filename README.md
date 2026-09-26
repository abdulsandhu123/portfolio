# Portfolio — Vercel + MongoDB

Static portfolio site (`index.html`) with a real backend: two Vercel
serverless functions (`/api/profile`, `/api/projects`) that read and
write a MongoDB database. The admin panel (⚙ admin link in the footer)
lets you edit your profile, photo and projects live — changes are
visible to every visitor, on every device.

## 1. Create a free MongoDB Atlas database

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a free (M0) cluster.
3. Under **Database Access**, create a database user with a username/password.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) — Vercel's servers use rotating IPs.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`

## 2. Push this project to GitHub

```bash
cd portfolio-mongodb
git init
git add .
git commit -m "Portfolio with MongoDB backend"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 3. Deploy on Vercel

1. Go to https://vercel.com and sign in (GitHub login is easiest).
2. Click **Add New → Project**, import the GitHub repo you just pushed.
3. Vercel will auto-detect the `/api` folder as Serverless Functions and
   serve `index.html` as the site — no build settings needed.
4. Before deploying, open **Environment Variables** and add:
   - `MONGODB_URI` — your connection string from step 1
   - `MONGODB_DB` — `portfolio` (optional, this is the default)
   - `ADMIN_SECRET` — the password you want to use to log into the admin panel
5. Click **Deploy**.

Your site will be live at `https://<project-name>.vercel.app`.

## 4. Using the admin panel

- Open your live site, scroll to the footer, click **⚙ admin**.
- Enter the password you set as `ADMIN_SECRET`.
- Edit your name, roles, bio, contact links and photo, or add/delete
  projects — changes save to MongoDB immediately and show up for
  everyone who visits the site.

## Changing the admin password later

Go to your Vercel project → **Settings → Environment Variables**,
update `ADMIN_SECRET`, then **Redeploy** the project (Vercel does not
apply new env vars to already-running functions until you redeploy).

## Project structure

```
index.html          the whole site (public page + admin panel)
api/login.js         checks the entered password against ADMIN_SECRET
api/profile.js        GET/POST the profile document
api/projects.js       GET/POST/DELETE project documents
lib/db.js             shared MongoDB connection + admin-secret check
package.json          declares the "mongodb" dependency
.env.example          template for local environment variables
```

## Running locally (optional)

```bash
npm install -g vercel
npm install
vercel dev
```
Create a `.env` file (copy `.env.example`) with your real values first.
