#!/bin/bash
# BurgTech Portfolio Deployment Script for Railway

echo "🚀 Deploying BurgTech AI Portfolio to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway (user will need to authenticate)
echo "Please authenticate with Railway CLI:"
railway login

# Initialize project if not exists
if ! railway project ls | grep -q "burgtech-portfolio"; then
    echo "Creating new Railway project..."
    railway init --name burgtech-portfolio
else
    echo "Using existing Railway project..."
    railway link burgtech-portfolio
fi

# Navigate to backend directory
cd backend

# Deploy the application
echo "Deploying Flask backend..."
railway up

# Set environment variables
echo "Setting environment variables..."
railway variables set FLASK_ENV=production

echo "✅ Deployment complete!"
echo "Your portfolio should be available at: https://your-app.railway.app"
echo ""
echo "To check deployment status:"
echo "railway status"
echo ""
echo "To view logs:"
echo "railway logs"
echo ""
echo "To redeploy after changes:"
echo "railway up"
