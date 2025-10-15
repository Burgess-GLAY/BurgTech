# 🚀 Railway Deployment Guide for BurgTech AI Portfolio

## Quick Deployment (Automated)

### Option 1: Using the Deploy Script
1. Make sure you have Node.js installed for Railway CLI
2. Run the deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Option 2: Manual Railway CLI Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway (opens browser for authentication)
railway login

# Create new project
railway init

# Navigate to backend directory
cd backend

# Deploy
railway up

# Set production environment
railway variables set FLASK_ENV=production
```

## Manual Deployment via Railway Dashboard

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app) and sign up/login
2. Create a new project

### Step 2: Deploy from GitHub (Recommended)
1. Connect your GitHub repository to Railway
2. Railway will automatically detect it's a Python Flask app
3. Set these environment variables in Railway dashboard:
   ```
   FLASK_ENV=production
   ```

### Step 3: Manual File Upload (Alternative)
1. In Railway dashboard, go to your project
2. Click "Deployments" → "Deploy from file"
3. Upload the `backend` folder as a zip file
4. Railway will build and deploy automatically

## Configuration

### Environment Variables (Set in Railway Dashboard)
```
FLASK_ENV=production
```

### Build Settings
Railway should automatically detect:
- **Runtime**: Python
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn --bind 0.0.0.0:$PORT app:app`

## After Deployment

### Check Deployment Status
```bash
railway status
```

### View Logs
```bash
railway logs
```

### Access Your Portfolio
Your portfolio will be available at:
```
https://your-project-name.railway.app
```

## Updating the Deployment

### For Code Changes:
1. Push changes to your GitHub repository (if connected)
2. Railway will automatically redeploy

### Or manually:
```bash
railway up
```

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that `requirements.txt` is correct
   - Ensure `Procfile` and `runtime.txt` are present

2. **App Won't Start**
   - Check Railway logs: `railway logs`
   - Verify environment variables are set correctly

3. **Backend Connection Issues**
   - Ensure CORS is enabled (it is in the code)
   - Check that the Flask app is running on the correct port

### Getting Help
- Railway Dashboard: Check the "Logs" tab for detailed error messages
- Railway CLI: `railway help`
- Railway Documentation: [docs.railway.app](https://docs.railway.app)

## Production Settings Applied

✅ **Flask Debug Mode**: Disabled in production
✅ **Gunicorn WSGI Server**: For production deployment
✅ **CORS Enabled**: For frontend-backend communication
✅ **Graceful Fallback**: Static content works if backend is offline
✅ **Environment Variables**: Configurable for different environments

## Next Steps

1. Deploy using one of the methods above
2. Test the AI chatbot functionality
3. Update the frontend API URLs if needed (currently set to localhost:5000 for development)
4. Share your live portfolio URL!

The deployment is configured to handle both development and production environments automatically.
