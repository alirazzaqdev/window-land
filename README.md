# Window Land — Production Website

**Company:** Window Land Glass & Aluminum Installation & Maintenance Co. LLC  
**Location:** Dubai, United Arab Emirates  
**CEO:** Muhammad Waqas Muhammad Akram  
**Contact:** +971 50 455 2652 | info@windowland.ae  
**DED License:** 1441416

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS v3, GSAP, Framer Motion |
| Backend API | Node.js + Express + TypeScript |
| Quote Engine | Python FastAPI |
| Database (content) | MongoDB Atlas |
| Database (transactions) | PostgreSQL via Neon |
| Cache | Redis via Upstash |
| Media CDN | Cloudinary |
| Auth | JWT + bcrypt |
| Email | Nodemailer + SendGrid |
| WhatsApp | WhatsApp Cloud API |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |
| CDN/DNS | Cloudflare |

---

## Project Structure

```
window-land/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   ├── api/          # Node.js Express backend
│   └── python/       # Python FastAPI quote calculator
└── packages/
    └── types/        # Shared TypeScript types
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm 10+

### Install

```bash
npm install
```

### Environment Variables

```bash
cp .env.example .env
# Fill in all values
```

### Development

```bash
# All services simultaneously
npm run dev

# Individual
cd apps/web && npm run dev          # http://localhost:3000
cd apps/api && npm run dev          # http://localhost:3001
cd apps/python && uvicorn main:app --reload  # http://localhost:8000
```

### Build

```bash
npm run build
```

---

## Deployment

### Frontend (Vercel)
- Connect GitHub repo → Vercel auto-deploys on push to `main`
- Set environment variables in Vercel dashboard
- Set root directory to `apps/web`

### Backend (Railway)
- Connect GitHub repo → Railway deploys `apps/api`
- Add environment variables in Railway dashboard
- Set start command: `npm start`

### Python (Railway)
- Separate Railway service for `apps/python`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Database Setup
```bash
# PostgreSQL migrations
cd apps/api && npx prisma migrate deploy
```

---

## Admin Panel

URL: `https://windowland.ae/admin`  
Login: username `waqas` + configured password

To generate the admin password hash:
```bash
node -e "require('bcrypt').hash('your-password', 12).then(console.log)"
```
Set the result as `ADMIN_PASSWORD_HASH` in Railway environment variables.

---

## Uploading CEO Photo

1. Upload `waqas-main.jpg` to Cloudinary: folder `window-land/team/ceo/`
2. Copy the public ID
3. Update `components/team/CEOSection.tsx` — replace the placeholder div with:
```tsx
<Image
  src="https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_600,h_750,c_fill,g_face/window-land/team/ceo/waqas-main"
  alt="Muhammad Waqas Muhammad Akram — CEO, Window Land"
  fill
  className="object-cover"
/>
```

---

## SEO Checklist

- [ ] Set `NEXT_PUBLIC_GA_ID` → Google Analytics
- [ ] Verify domain in Google Search Console
- [ ] Submit sitemap: `https://windowland.ae/sitemap.xml`
- [ ] Add OG image at `apps/web/public/og-image.jpg` (1200×630px)
- [ ] Configure Cloudflare proxy on `windowland.ae`

---

*Built for Window Land · Dubai, UAE*
