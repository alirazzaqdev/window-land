# Window Land — Deployment Guide

## Frontend (Vercel) ✅ LIVE
URL: https://window-land.vercel.app
GitHub: https://github.com/alirazzaqdev/window-land

### Vercel Environment Variables
Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://window-land-api.up.railway.app  # set after Railway deploy
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX                              # optional — GA4 measurement ID
SENTRY_DSN=https://xxx@sentry.io/xxx                        # optional — Sentry DSN
```

---

## Backend API (Railway — Node.js/Express)

### Step 1: Create Railway account
Go to https://railway.app → Sign up with GitHub

### Step 2: Create project and deploy API
1. New Project → Deploy from GitHub repo
2. Select `alirazzaqdev/window-land`
3. Set **Root Directory** to `apps/api`
4. Railway auto-detects Node.js and runs `npm install && npm start`

### API Environment Variables (Railway → Service → Variables):
```
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/windowland
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/windowland
REDIS_URL=redis://default:PASSWORD@HOST:PORT
JWT_SECRET=cf5e3c307b6c419b48d08e22ec74e6024f1d5e05b96c2a1cc829615c3a793033fd91771de02dd7f422ae26e058a0ae3d
JWT_EXPIRES_IN=8h
ADMIN_USERNAME=waqas
ADMIN_PASSWORD_HASH=$2b$12$1KPqMuzLZD09MeQen6FIMe4FGi7QqX0HcrwuAKH3ePAldT3erdUi6
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@windowland.ae
EMAIL_TO=info@windowland.ae
WHATSAPP_TOKEN=your_whatsapp_cloud_api_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PYTHON_API_URL=https://window-land-python.up.railway.app
```

**Default admin credentials:**
- Username: `waqas`
- Password: `WindowLand2024!`
- ⚠️ Change the password after first login via Admin → Settings

---

## Python Quote API (Railway — FastAPI)

### Create second Railway service:
1. In same Railway project → Add Service → GitHub repo
2. Root Directory: `apps/python`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Python Environment Variables:
```
PORT=8000
```
No other env vars needed for the quote calculator.

---

## Databases

### MongoDB Atlas (Free tier)
1. https://cloud.mongodb.com → Create cluster (M0 free)
2. Create database user
3. Whitelist `0.0.0.0/0` for Railway (or use Railway static IPs)
4. Connection string → copy to `MONGODB_URI`

### PostgreSQL/Neon (Free tier)
1. https://neon.tech → Create project
2. Copy connection string to `DATABASE_URL`
3. Run Prisma migration: in Railway console → `npx prisma migrate deploy`

### Redis/Upstash (Free tier)
1. https://upstash.com → Create Redis database
2. Copy Redis URL to `REDIS_URL`

---

## DNS (Cloudflare)

### Point windowland.ae to Vercel:
Add these DNS records in Cloudflare:
```
Type: CNAME  Name: @  Value: cname.vercel-dns.com  Proxy: OFF (DNS only)
Type: CNAME  Name: www  Value: cname.vercel-dns.com  Proxy: OFF (DNS only)
```
Then in Vercel → Domains → Add `windowland.ae` and `www.windowland.ae`

---

## WhatsApp Cloud API
1. Go to https://developers.facebook.com → Create app → WhatsApp
2. Add phone number (+971 50 455 2652)
3. Generate permanent token
4. Set `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` in Railway

---

## Post-Deploy Checklist
- [ ] Test contact form → check email notification received
- [ ] Test WhatsApp notification
- [ ] Test admin login at /admin/login (username: waqas, password: WindowLand2024!)
- [ ] Change admin password via /admin/settings
- [ ] Test quote calculator on /contact page
- [ ] Verify sitemap at /sitemap.xml
- [ ] Verify robots.txt at /robots.txt
- [ ] Add custom domain windowland.ae in Vercel
- [ ] Set NEXT_PUBLIC_API_URL in Vercel after Railway URL is known
