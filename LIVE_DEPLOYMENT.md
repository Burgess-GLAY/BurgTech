# 🚀 BurgTech AI Portfolio - Live Deployment (GitHub Integration)

## ✅ Deployment Status: CONNECTED TO GITHUB

Your portfolio is now connected to GitHub for automatic deployments through Railway!

### 🌐 **Live URLs:**

**Portfolio Website:** `https://burgtech-portfolio-production.up.railway.app`
**Backend API:** `https://burgtech-portfolio-production.up.railway.app`

### 🔄 **Updated Deployment Workflow:**

Since you've connected your GitHub repository to Railway, deployments now happen automatically when you push to GitHub.

**To Deploy Changes:**
```bash
# Make your changes
git add .
git commit -m "Update portfolio content"
git push origin main
```

Railway will automatically:
1. Detect the push to your repository
2. Pull the latest code
3. Build and deploy your application
4. Update your live portfolio

### ⚡ **Benefits of GitHub Integration:**

✅ **Automatic Deployments** - No manual commands needed
✅ **Instant Updates** - Push and see changes live immediately
✅ **Version Control** - Full git history of your deployments
✅ **Rollback Capability** - Easy to revert if needed
✅ **Branch Deployments** - Test on different branches

### Option 2: Manual Redeployment (Alternative)
```bash
# Using Railway CLI (Windows)
railway login
railway up

# Or using the batch script
.\deploy.bat
```

### Option 3: Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Navigate to your project
3. Click "Deployments" → "Deploy latest commit"

## 📋 **How to Access & Test:**

1. **Open Portfolio:** Visit `https://burgtech-portfolio-production.up.railway.app`
2. **Test AI Chatbot:** Click the floating chat button (bottom-right)
3. **Ask Questions:** Try "Tell me about your projects" or "What are your skills?"
4. **Check Projects:** Projects load dynamically from the backend
5. **Download Resume:** Click the "Download My CV" button

## 🎯 **Features Live:**

✅ **AI Chatbot** - Interactive assistant in bottom-right corner
✅ **Dynamic Projects** - Loads from backend API with static fallback
✅ **Resume Download** - Your CV download functionality
✅ **Responsive Design** - Works on all devices
✅ **Production Optimized** - Fast loading with Gunicorn server
✅ **GitHub Integration** - Automatic deployments on push

## 🔧 **Production Configuration:**

**Environment Variables Set:**
```
FLASK_ENV=production  # Disables debug mode for security
```

**Backend Features:**
- Gunicorn WSGI server for production performance
- CORS enabled for frontend-backend communication
- Graceful error handling and logging
- Automatic fallback to static content if backend offline

## 🚨 **Important Notes for GitHub Integration:**

### Repository Structure:
Railway expects your project structure to match what you have locally:
```
your-repo/
├── backend/          # Flask application
│   ├── app.py
│   ├── portfolio_data.json
│   └── requirements.txt
├── assets/           # Frontend assets
├── index.html        # Main portfolio page
└── ...               # Other files
```

### Deployment Triggers:
- **Main branch pushes** trigger production deployments
- **Other branches** create separate preview deployments
- **Tags** can be used for versioned releases

### Build Process:
Railway automatically:
1. Installs Python dependencies from `requirements.txt`
2. Sets environment variables
3. Builds the Flask application
4. Deploys to production domain

## 🛠️ **Customization & Maintenance:**

### Update Portfolio Data:
Edit `backend/portfolio_data.json` and push to GitHub:
```bash
git add backend/portfolio_data.json
git commit -m "Update project information"
git push origin main
```

### Update Chatbot Responses:
Modify `backend/app.py` and push changes:
```bash
git add backend/app.py
git commit -m "Improve chatbot responses"
git push origin main
```

### Monitor Deployments:
- **Railway Dashboard:** View build logs and deployment status
- **GitHub Actions:** Monitor automated deployment workflows
- **Live Site:** Test changes immediately after deployment

## 📊 **Deployment Monitoring:**

### Check Status:
```bash
# Railway CLI
railway status

# Or check Railway dashboard
```

### View Logs:
```bash
# Railway CLI
railway logs

# Or check Railway dashboard
```

### Rollback (if needed):
1. Go to Railway dashboard
2. Navigate to "Deployments"
3. Select previous successful deployment
4. Click "Deploy this commit"

## 🎉 **What's Next:**

Your AI-powered portfolio is now connected to GitHub with:
- **🚀 Automatic deployments** on every push
- **⚡ Instant updates** to live site
- **📱 Mobile-responsive** design
- **🤖 AI chatbot** for visitor engagement
- **🔄 Dynamic content** loading

**Test it now:** Visit `https://burgtech-portfolio-production.up.railway.app`

Every time you push changes to GitHub, your live portfolio will automatically update! 🎊

## 🛠️ **Customization & Maintenance:**

### Update Portfolio Data:
Edit `backend/portfolio_data.json` and redeploy:
```json
{
  "projects": [
    {
      "title": "New AI Project",
      "description": "Updated project description",
      "technologies": ["Python", "AI", "React"]
    }
  ]
}
```

### Update Chatbot Responses:
Modify `backend/app.py` in the `PortfolioChatbot` class:
```python
def get_response(self, user_message):
    # Add new response patterns here
    return "Custom response for specific queries"
```

### Monitor & Logs:
```bash
# View live logs
railway logs

# Check deployment status
railway status

# View variables
railway variables
```

## 🚨 **Troubleshooting:**

### If Chatbot Not Working:
1. Check if backend is running: `railway status`
2. View logs: `railway logs`
3. Verify CORS settings in browser console

### If Projects Not Loading:
1. Check API endpoint: Visit `https://burgtech-portfolio-production.up.railway.app/api/projects`
2. Ensure backend is responding correctly
3. Check browser console for errors

### Backend Connection Issues:
- The site gracefully falls back to static content
- Check Railway service status in dashboard
- Verify environment variables are set correctly

## 📞 **Support & Monitoring:**

**Railway Dashboard:** https://railway.app
- Monitor deployment status
- View real-time logs
- Manage environment variables
- Check resource usage

**Project ID:** `burgtech-portfolio` (for CLI commands)

## 🎉 **What's Next:**

Your AI-powered portfolio is now live with:
- Interactive AI chatbot for visitor engagement
- Dynamic project showcase
- Professional design with your branding
- Mobile-responsive layout
- Production-grade performance

Share your portfolio URL: `https://burgtech-portfolio-production.up.railway.app`

The AI assistant will help visitors learn about your projects, skills, and experience while maintaining your existing static content as a reliable fallback! 🚀
