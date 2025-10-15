@echo off
REM BurgTech Portfolio Deployment Script for Windows

echo 🚀 Deploying BurgTech AI Portfolio to Railway...

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if errorlevel 1 (
    echo Installing Railway CLI...
    npm install -g @railway/cli
    if errorlevel 1 (
        echo ❌ Failed to install Railway CLI. Please install Node.js first.
        echo    Visit: https://nodejs.org/
        pause
        exit /b 1
    )
)

REM Login to Railway (opens browser)
echo.
echo 🔐 Please authenticate with Railway CLI in your browser...
railway login

if errorlevel 1 (
    echo ❌ Railway login failed. Please try again.
    pause
    exit /b 1
)

REM Initialize or link project
echo.
echo 📦 Setting up Railway project...
railway init --name burgtech-portfolio

if errorlevel 1 (
    echo ❌ Project initialization failed.
    pause
    exit /b 1
)

REM Navigate to backend and deploy
echo.
echo 🔄 Deploying Flask backend...
cd backend
railway up

if errorlevel 1 (
    echo ❌ Deployment failed. Check Railway dashboard for details.
    pause
    exit /b 1
)

REM Set environment variables
echo.
echo ⚙️ Configuring production environment...
railway variables set FLASK_ENV=production

echo.
echo ✅ Deployment complete!
echo.
echo 🌐 Your portfolio will be available at:
echo    https://burgtech-portfolio.railway.app
echo.
echo 📋 To check status: railway status
echo 📋 To view logs: railway logs
echo 📋 To redeploy: railway up
echo.
pause
