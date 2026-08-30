# Production Deployment Guide: Render (Backend) + Vercel (Frontend)

## Why This Hybrid Approach?

**Backend on Render + Frontend on Vercel:**
- Render handles Node.js/Express backend perfectly
- Vercel is optimized for Next.js frontend
- Each platform excels at its specific use case
- Better performance and stability
- Render has generous free tier for web services
- Vercel has excellent Next.js support

## Step 1: Deploy Backend to Render

### 1. Create Render Account
- Go to https://dashboard.render.com
- Sign up with GitHub
- Add payment method (required for free tier)

### 2. Deploy Backend
1. Go to https://dashboard.render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repository: `Burgess-GLAY/BurgTech`
5. Configure:
   - **Name**: `burgtech-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npx prisma migrate deploy && node dist/index.js`
   - **Runtime**: Node 20
   - **Plan**: Free
6. Click "Create Web Service"

**Note**: The `backend/render.yaml` file is already configured with these settings and environment variables. Render will auto-detect it.

### 3. Environment Variables
The `render.yaml` file includes all environment variables. Render will automatically use them:
- DATABASE_URL
- DIRECT_URL
- JWT_SECRET
- RESEND_API_KEY
- ADMIN_EMAIL
- FRONTEND_URL
- PORT
- NODE_ENV

### 4. Note Backend URL
After deployment, your backend will be at: `https://burgtech-backend.onrender.com`

## Step 2: Deploy Frontend to Vercel

### 1. Create Frontend Project
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import GitHub repository: `Burgess-GLAY/BurgTech`
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
NEXT_PUBLIC_API_URL = https://burgtech-backend.onrender.com/api/v1
NEXT_PUBLIC_SITE_URL = https://burgtech.vercel.app
```

### 3. Update Render FRONTEND_URL
Go back to Render dashboard → burgtech-backend → Environment and update:
```
FRONTEND_URL = https://burgtech.vercel.app
```

## Step 3: Test the Deployment

1. **Test Backend**: Visit `https://burgtech-backend.onrender.com/health`
2. **Test Frontend**: Visit `https://burgtech.vercel.app`
3. **Test API**: Visit `https://burgtech-backend.onrender.com/api/v1/services`

## Advantages of This Approach

- **Render for backend**: Better Node.js/Express support
- **Vercel for frontend**: Native Next.js optimization
- **Free tiers**: Both platforms have generous free tiers
- **Independent scaling**: Scale each service separately
- **Better performance**: Each platform optimized for its workload
- **Simpler debugging**: Clear separation of concerns

## Troubleshooting

**Backend build fails on Render:**
- Check render.yaml configuration
- Verify build command in Render dashboard
- Check build logs in Render
- Ensure Prisma client generation works

**Frontend can't connect to backend:**
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings in backend
- Ensure backend is deployed and accessible
- Check Render service is running

**Database connection issues:**
- Verify DATABASE_URL in render.yaml
- Check Neon database is active
- Ensure SSL mode is enabled
- Check Render environment variables
