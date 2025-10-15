#!/bin/bash
# BurgTech Portfolio Deployment Test Script

echo "🧪 Testing BurgTech AI Portfolio Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Check if backend files exist
echo -e "\n${YELLOW}Test 1: Checking backend files...${NC}"
if [ -f "backend/app.py" ] && [ -f "backend/requirements.txt" ] && [ -f "backend/portfolio_data.json" ]; then
    echo -e "${GREEN}✅ Backend files present${NC}"
else
    echo -e "${RED}❌ Backend files missing${NC}"
    exit 1
fi

# Test 2: Check if frontend files exist
echo -e "\n${YELLOW}Test 2: Checking frontend integration...${NC}"
if [ -f "assets/js/portfolio-chatbot.js" ] && [ -f "portfolio.html" ]; then
    echo -e "${GREEN}✅ Frontend integration files present${NC}"
else
    echo -e "${RED}❌ Frontend integration files missing${NC}"
    exit 1
fi

# Test 3: Install Python dependencies
echo -e "\n${YELLOW}Test 3: Installing Python dependencies...${NC}"
cd backend
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Test 4: Test Flask app locally
echo -e "\n${YELLOW}Test 4: Testing Flask backend locally...${NC}"
python -c "from app import app; print('Flask app imports successfully')"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Flask app loads correctly${NC}"
else
    echo -e "${RED}❌ Flask app has errors${NC}"
    exit 1
fi

# Test 5: Start Flask server briefly
echo -e "\n${YELLOW}Test 5: Testing API endpoints...${NC}"
timeout 5 python app.py &
SERVER_PID=$!

sleep 2

# Test API endpoints
curl -s http://localhost:5000/ | grep -q "BurgTech AI Portfolio Backend"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ API endpoints working${NC}"
else
    echo -e "${RED}❌ API endpoints not responding${NC}"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Test chatbot API
curl -s -X POST -H "Content-Type: application/json" -d '{"message":"hello"}' http://localhost:5000/api/chat | grep -q "response"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Chatbot API working${NC}"
else
    echo -e "${RED}❌ Chatbot API not responding${NC}"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Clean up
kill $SERVER_PID 2>/dev/null
cd ..

echo -e "\n${GREEN}🎉 All tests passed! Ready for deployment.${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Deploy to Railway using the provided scripts"
echo "2. Update the production URL in the frontend files"
echo "3. Test the live deployment"
echo ""
echo "Deployment files created:"
echo "• deploy.sh - Automated deployment script"
echo "• RAILWAY_DEPLOYMENT.md - Detailed deployment guide"
echo "• AI_PORTFOLIO_SETUP.md - Setup instructions"
