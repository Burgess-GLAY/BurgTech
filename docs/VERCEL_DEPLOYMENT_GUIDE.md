# Vercel Deployment Guide for BurgTech

## Why Vercel?

**Vercel is the best free platform for this project:**
- Native Next.js support (your frontend is Next.js)
- Serverless functions for backend (no separate hosting needed)
- No payment requirement for free tier
- Automatic GitHub integration
- Better than Netlify for Next.js projects
- Generous free tier (100GB bandwidth/month)

## Deployment Steps

### 1. Create Vercel Account
- Go to https://vercel.com/signup
- Sign up with GitHub (recommended)

### 2. Install Vercel CLI
```bash
npm install -g vercel
```

### 3. Login to Vercel
```bash
vercel login
```

### 4. Deploy Project
From the root directory (c:\Users\BurgTech):
```bash
vercel
```

Follow the prompts:
- Set up and deploy? → Yes
- Link to existing project? → No
- Project name → burgtech
- Directory → . (current directory)
- Override settings? → No

### 5. Configure Environment Variables

Go to Vercel Dashboard → Settings → Environment Variables and add:

**Backend Variables:**
```
DATABASE_URL = postgresql://neondb_owner:npg_t5CyTGFgL4YE@ep-cool-lake-at7mligd-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
DIRECT_URL = postgresql://neondb_owner:npg_t5CyTGFgL4YE@ep-cool-lake-at7mligd-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET = ab4407b7a2bd6997cbcaa450b301cc5d40c9bd327739e052d26afdadd455ad13
RESEND_API_KEY = your_resend_api_key_here
ADMIN_EMAIL = burgtechsolutions@gmail.com
FRONTEND_URL = https://your-vercel-url.vercel.app
NODE_ENV = production
```

**Frontend Variables:**
```
NEXT_PUBLIC_API_URL = https://your-vercel-url.vercel.app/api
NEXT_PUBLIC_SITE_URL = https://your-vercel-url.vercel.app
```

### 6. Update Backend for Vercel Functions

The backend needs to be wrapped as a Vercel serverless function. The `backend/api/index.js` file has been created for this.

### 7. Update Build Configuration

Add to `backend/package.json`:
```json
{
  "scripts": {
    "vercel-build": "npm run build"
  }
}
```

### 8. Deploy to Production
```bash
vercel --prod
```

## Alternative: Manual Dashboard Deployment

If CLI doesn't work, use Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import GitHub repository: Burgess-GLAY/BurgTech
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (leave default)
   - Output Directory: (leave default)
5. Add environment variables (see step 5)
6. Click Deploy

## Post-Deployment

1. **Update FRONTEND_URL** in environment variables with actual Vercel URL
2. **Update NEXT_PUBLIC_API_URL** with actual Vercel URL
3. **Test all endpoints**
4. **Test frontend functionality**
5. **Test email functionality**

## Advantages Over Previous Approach

- **Single deployment** (frontend + backend together)
- **No separate Render account needed**
- **No payment requirement**
- **Automatic SSL**
- **Automatic GitHub deployments**
- **Better Next.js performance**
- **Built-in edge network**

## Troubleshooting

**Build fails:**
- Check environment variables are set correctly
- Verify DATABASE_URL is valid
- Check build logs in Vercel dashboard

**API not working:**
- Ensure backend is properly wrapped in Vercel function
- Check routes in vercel.json
- Verify CORS settings

**Database connection issues:**
- Verify Neon database is active
- Check connection string format
- Ensure SSL mode is enabled
