# Vercel Deployment Guide for BurgTech (Simplified Approach)

## Why Separate Projects?

**Deploy frontend and backend as separate Vercel projects:**
- Easier to configure and debug
- Better isolation between services
- Simpler routing
- No complex monorepo configuration needed
- Each can be deployed independently

## Step 1: Deploy Backend to Vercel

### 1. Create Backend Project
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import GitHub repository: Burgess-GLAY/BurgTech
4. Configure:
   - **Project Name**: `burgtech-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click Deploy

### 2. Add Backend Environment Variables
Go to Settings → Environment Variables:
```
DATABASE_URL = postgresql://neondb_owner:npg_t5CyTGFgL4YE@ep-cool-lake-at7mligd-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
DIRECT_URL = postgresql://neondb_owner:npg_t5CyTGFgL4YE@ep-cool-lake-at7mligd-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET = ab4407b7a2bd6997cbcaa450b301cc5d40c9bd327739e052d26afdadd455ad13
RESEND_API_KEY = your_resend_api_key_here
ADMIN_EMAIL = burgtechsolutions@gmail.com
FRONTEND_URL = https://burgtech.vercel.app
NODE_ENV = production
PORT = 4000
```

### 3. Note Backend URL
After deployment, your backend will be at: `https://burgtech-backend.vercel.app`

## Step 2: Deploy Frontend to Vercel

### 1. Create Frontend Project
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import GitHub repository: Burgess-GLAY/BurgTech
4. Configure:
   - **Project Name**: `burgtech`
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: (leave default)
   - **Output Directory**: (leave default)
5. Click Deploy

### 2. Add Frontend Environment Variables
Go to Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL = https://burgtech-backend.vercel.app/api/v1
NEXT_PUBLIC_SITE_URL = https://burgtech.vercel.app
```

### 3. Update Backend FRONTEND_URL
Go back to the backend project settings and update:
```
FRONTEND_URL = https://burgtech.vercel.app
```

## Step 3: Test the Deployment

1. **Test Backend**: Visit `https://burgtech-backend.vercel.app/health`
2. **Test Frontend**: Visit `https://burgtech.vercel.app`
3. **Test API**: Visit `https://burgtech-backend.vercel.app/api/v1/services`

## Advantages of This Approach

- **Simple configuration** - no complex routing needed
- **Independent deployments** - update frontend without touching backend
- **Clear separation** - easier to debug issues
- **Better isolation** - backend issues don't affect frontend
- **Scalable** - can scale each service independently

## Troubleshooting

**Backend build fails:**
- Check that `backend/package.json` has the correct build script
- Verify TypeScript compiles correctly
- Check Prisma client generation

**Frontend can't connect to backend:**
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings in backend
- Ensure backend is deployed and accessible

**Database connection issues:**
- Verify DATABASE_URL is correct
- Check Neon database is active
- Ensure SSL mode is enabled
