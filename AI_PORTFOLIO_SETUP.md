# BurgTech AI-Powered Portfolio Setup Guide

## Overview
This guide will help you set up and run the AI-powered portfolio website with Flask backend and integrated chatbot functionality.

## Project Structure
```
BurgTech/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── portfolio_data.json # Portfolio data and configuration
│   └── requirements.txt    # Python dependencies
├── assets/
│   ├── js/
│   │   └── portfolio-chatbot.js  # Chatbot frontend integration
│   └── cv/
│       └── burgesscv.pdf   # Resume file
├── index.html              # Main homepage
├── portfolio.html          # Portfolio page with dynamic loading
├── about.html              # About page
└── ...                     # Other existing pages
```

## Backend Setup (Python Flask)

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation Steps

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask application:**
   ```bash
   python app.py
   ```

4. **Verify the backend is running:**
   Open your browser and go to `http://localhost:5000`
   You should see: `{"message": "BurgTech AI Portfolio Backend", "status": "running"}`

### Backend API Endpoints

- `GET /` - Health check
- `POST /api/chat` - Chatbot interaction
- `GET /api/portfolio` - Get all portfolio data
- `GET /api/projects` - Get projects list
- `GET /api/skills` - Get skills list
- `GET /api/experience` - Get experience data

## Frontend Integration

The chatbot is already integrated into your existing portfolio pages. The following files have been updated:

1. **portfolio.html** - Enhanced with dynamic project loading and chatbot integration
2. **assets/js/portfolio-chatbot.js** - New chatbot functionality

### Features Added:

- **AI Chatbot**: Interactive chatbot that answers questions about projects, skills, and experience
- **Dynamic Project Display**: Projects are loaded from the backend API with fallback to static content
- **GitHub & Live Demo Links**: Projects now include links to source code and live demos

## Customization

### Adding New Projects
Edit `backend/portfolio_data.json` to add new projects:

```json
{
  "title": "New Project",
  "category": "Website/Application",
  "description": "Project description",
  "technologies": ["React", "Node.js"],
  "github_url": "https://github.com/username/project",
  "live_url": "https://project-demo.com",
  "image": "assets/img/portfolio/new-project.jpg"
}
```

### Customizing Chatbot Responses
Modify the `PortfolioChatbot` class in `backend/app.py` to customize responses:

- Add new keywords to match user queries
- Update response templates
- Add project-specific information

## Running the Complete Application

1. **Start the backend server:**
   ```bash
   cd backend
   python app.py
   ```

2. **Open your portfolio website:**
   Open `index.html` in your browser or serve it using a local web server

3. **Test the chatbot:**
   - The chatbot button appears in the bottom-right corner
   - Click it to start a conversation
   - Ask about projects, skills, or experience

## Troubleshooting

### Common Issues

1. **Backend connection failed:**
   - Ensure Flask is running on `localhost:5000`
   - Check firewall settings
   - Verify CORS is enabled

2. **Projects not loading dynamically:**
   - Check browser console for errors
   - Ensure backend API is accessible
   - Fallback to static content works automatically

3. **Chatbot not responding:**
   - Verify backend `/api/chat` endpoint
   - Check network connectivity
   - Ensure JSON format in requests

### Development Mode

For development, run the Flask app in debug mode:
```bash
python app.py
```

This enables hot-reloading and better error messages.

## Production Deployment

For production deployment:

1. **Use a production WSGI server:**
   ```bash
   pip install gunicorn
   gunicorn --bind 0.0.0.0:5000 app:app
   ```

2. **Set environment variables:**
   ```bash
   export FLASK_ENV=production
   ```

3. **Configure a reverse proxy** (nginx recommended)

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Verify backend logs for API errors
3. Ensure all dependencies are installed correctly

The system is designed to gracefully fallback to static content if the backend is unavailable, ensuring your portfolio always works.
