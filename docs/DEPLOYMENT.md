# Deployment Guide — Vercel

## Prerequisites
- GitHub repository with UnitySphere AI code
- Vercel account (vercel.com)
- Firebase project configured
- API keys ready

## Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial UnitySphere AI platform"
git remote add origin https://github.com/YOUR_USERNAME/unitysphere-ai.git
git push -u origin main
```

## Step 2: Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework Preset: **Next.js** (auto-detected)
4. Root Directory: `./`
5. Build Command: `npm run build`
6. Output Directory: `.next` (default)

## Step 3: Environment Variables
In Vercel → Project → Settings → Environment Variables, add all from `.env.example`:

**Required for production auth:**
- `NEXT_PUBLIC_FIREBASE_*` (all 7 Firebase vars)

**Optional but recommended:**
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `OPENWEATHER_API_KEY`
- `NEWS_API_KEY`

## Step 4: Firebase Setup
1. Create project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication → Email/Password + Google
3. Create Firestore database
4. Deploy security rules:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore
   firebase deploy --only firestore:rules
   ```
5. Add authorized domain: `your-app.vercel.app`

## Step 5: Deploy
Click **Deploy** in Vercel. Subsequent pushes to `main` auto-deploy.

## Custom Domain
Vercel → Settings → Domains → Add your domain.

## Performance Tips
- Three.js globe loads client-side only (no SSR issues)
- API routes cache NASA EONET data
- Enable Vercel Analytics for monitoring

## Troubleshooting
| Issue | Fix |
|-------|-----|
| Build fails on Three.js | `transpilePackages: ['three']` in next.config.ts |
| Firebase auth redirect | Add Vercel URL to Firebase authorized domains |
| Maps not loading | Check Maps Embed API billing enabled |
| AI returns demo only | Set OPENAI_API_KEY in Vercel env |
