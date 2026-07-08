# Netlify Deployment Guide

## Architecture Overview

This is a full-stack application that requires separate deployments:

- **Frontend (Next.js)** → Netlify (this guide)
- **Backend (Express.js)** → Railway, Render, or Vercel (separate deployment required)
- **Database (PostgreSQL)** → Neon (already configured)
- **Cache (Redis)** → Upstash (already configured)

## Netlify Configuration

The `frontend/netlify.toml` file has been created with the following settings:

```toml
[build]
  base = "."
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Deployment Steps (Netlify Dashboard)

Since the repository is already connected to Netlify:

### 1. Configure Build Settings in Netlify Dashboard

Go to your site settings → Build & deploy → Build settings:

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `20`

### 2. Configure Environment Variables

Go to Site settings → Environment variables and add the following:

#### Required Frontend Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-domain.com` | Your deployed backend URL |
| `NEXT_PUBLIC_SITE_URL` | `https://your-netlify-site.netlify.app` | Your Netlify site URL |

#### Backend Environment Variables (for separate backend deployment)

These are needed for the backend deployment (Railway/Render/Vercel):

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Neon pooled connection string |
| `DIRECT_URL` | ✅ | Neon direct connection string |
| `REDIS_URL` | ✅ | Upstash Redis connection string |
| `JWT_SECRET` | ✅ | Secret for JWT signing (min 32 chars) |
| `OPENAI_API_KEY` | ✅ | OpenAI API key for AI chatbot |
| `RESEND_API_KEY` | ✅ | Resend API key for emails |
| `ADMIN_EMAIL` | ✅ | Admin email for notifications |
| `FRONTEND_URL` | ✅ | Your Netlify site URL |
| `PORT` | ⬜ | API port (default: 4000) |

### 3. Update API Redirect in netlify.toml

After deploying your backend, update `frontend/netlify.toml`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR_ACTUAL_BACKEND_DOMAIN.com/api/:splat"
  status = 200
  force = true
```

Replace `YOUR_ACTUAL_BACKEND_DOMAIN.com` with your deployed backend URL.

### 4. Trigger Deployment

- Push changes to GitHub
- Netlify will auto-deploy from the `frontend` directory
- Monitor the deploy log in Netlify dashboard

## Backend Deployment Options

### Option 1: Railway (Recommended)

1. Create a Railway account
2. New Project → Deploy from GitHub
3. Select this repository
4. Set root directory to `backend`
5. Add all environment variables from the table above
6. Deploy
7. Copy the Railway domain URL
8. Update `NEXT_PUBLIC_API_URL` in Netlify

### Option 2: Render

1. Create a Render account
2. New Web Service → Connect GitHub
3. Select this repository
4. Set root directory to `backend`
5. Build command: `npm run build`
6. Start command: `npm run start`
7. Add all environment variables
8. Deploy

### Option 3: Vercel

1. Create a Vercel account
2. Import GitHub repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

## Verification Steps

After deployment:

1. **Frontend**: Visit your Netlify URL and verify:
   - Homepage loads correctly
   - Navigation works
   - Static assets load

2. **Backend Connection**: After backend is deployed:
   - Test API health endpoint: `https://your-backend.com/health`
   - Update `NEXT_PUBLIC_API_URL` in Netlify
   - Test contact form submission
   - Test admin login

3. **Database**: Verify Neon database is accessible
   - Check backend logs for connection errors
   - Test CRUD operations in admin panel

4. **Redis**: Verify Upstash connection
   - Check backend logs for Redis connection
   - Test rate limiting functionality

## Troubleshooting

### Build Fails

- Check Node version is set to 20 in Netlify settings
- Verify `frontend/package.json` has correct scripts
- Check build logs for specific errors

### API Calls Fail

- Ensure backend is deployed and accessible
- Verify `NEXT_PUBLIC_API_URL` is correct in Netlify
- Check CORS settings on backend
- Update netlify.toml redirect rule

### Database Connection Issues

- Verify `DATABASE_URL` and `DIRECT_URL` in backend deployment
- Check Neon database is active
- Ensure IP whitelisting is configured if needed

### Redis Connection Issues

- Verify `REDIS_URL` in backend deployment
- Check Upstash Redis is active
- Ensure TLS is enabled in connection string

## Security Recommendations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Rotate keys regularly
3. **HTTPS**: Ensure all deployments use HTTPS
4. **CORS**: Restrict CORS to your Netlify domain
5. **Rate Limiting**: Keep rate limiting enabled
6. **JWT Secret**: Use a strong, random secret

## Performance Optimizations

1. **Image Optimization**: Next.js Image component is configured
2. **CDN**: Netlify provides automatic CDN
3. **Caching**: Configure cache headers for static assets
4. **Bundle Size**: Monitor bundle size in Netlify deploy logs
5. **Database**: Use connection pooling (Neon provides this)

## Monitoring

- **Netlify**: Use Netlify Analytics for frontend monitoring
- **Backend**: Add logging (Winston, Pino) for backend monitoring
- **Database**: Monitor Neon dashboard for performance
- **Errors**: Set up error tracking (Sentry, LogRocket)

## Post-Deployment Checklist

- [ ] Frontend deployed to Netlify successfully
- [ ] Backend deployed to Railway/Render/Vercel
- [ ] Environment variables configured in both deployments
- [ ] API redirect updated in netlify.toml
- [ ] Database connection verified
- [ ] Redis connection verified
- [ ] Contact form tested
- [ ] Admin login tested
- [ ] AI chatbot tested
- [ ] Real-time chat tested
- [ ] SSL/HTTPS verified
- [ ] Custom domain configured (optional)
