from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import sys
from datetime import datetime
import logging

# Configure logging for Railway
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

logger.info('Flask app initialized')
logger.info(f'Python version: {sys.version}')
logger.info(f'Working directory: {os.getcwd()}')

# Production settings
if os.environ.get('FLASK_ENV') == 'production':
    # Disable debug mode in production
    app.config['DEBUG'] = False
    logger.info('Running in PRODUCTION mode')
else:
    # Enable debug mode in development
    app.config['DEBUG'] = True
    logger.info('Running in DEVELOPMENT mode')

# Load portfolio data (lazy loading)
_portfolio_data = None

def get_portfolio_data():
    """Get portfolio data with lazy loading"""
    global _portfolio_data
    if _portfolio_data is None:
        try:
            json_path = os.path.join(os.path.dirname(__file__), 'portfolio_data.json')
            logger.info(f'Loading portfolio data from: {json_path}')
            with open(json_path, 'r', encoding='utf-8') as f:
                _portfolio_data = json.load(f)
            logger.info(f'Portfolio data loaded successfully: {len(_portfolio_data.get("projects", []))} projects')
        except FileNotFoundError as e:
            logger.error(f'Portfolio data file not found: {e}')
            _portfolio_data = {"error": "Portfolio data not found"}
        except Exception as e:
            logger.error(f'Error loading portfolio data: {e}')
            _portfolio_data = {"error": str(e)}
    return _portfolio_data

# Initialize chatbot with lazy data loading
def get_chatbot():
    """Get chatbot instance with lazy data loading"""
    data = get_portfolio_data()
    return PortfolioChatbot(data)

portfolio_data = get_portfolio_data()  # Keep for backward compatibility

class PortfolioChatbot:
    """Simple rule-based chatbot for portfolio inquiries"""

    def __init__(self, portfolio_data):
        self.data = portfolio_data
        self.personal_info = portfolio_data.get('personal_info', {})
        self.skills = portfolio_data.get('skills', [])
        self.projects = portfolio_data.get('projects', [])
        self.experience = portfolio_data.get('experience', [])

    def get_response(self, user_message):
        """Generate response based on user message"""
        message = user_message.lower().strip()

        # Greetings
        if any(word in message for word in ['hello', 'hi', 'hey', 'greetings']):
            return f"Hello! I'm the AI assistant for {self.personal_info.get('name', 'Burgess')}'s portfolio. How can I help you learn about their work and experience?"

        # About me/who are you
        elif any(word in message for word in ['about', 'who are you', 'tell me about']):
            if 'burgess' in message or 'you' in message:
                name = self.personal_info.get('name', 'Burgess A. Glay')
                title = self.personal_info.get('title', 'Software Engineer')
                bio = self.personal_info.get('bio', '')

                response = f"I'm {name}, a {title}. {bio}"
                if self.skills:
                    response += f"\n\nMy key skills include: {', '.join(self.skills[:8])}..."
                return response

        # Skills inquiries
        elif any(word in message for word in ['skills', 'technologies', 'tech stack', 'what do you know']):
            if self.skills:
                return f"I have expertise in {len(self.skills)} different technologies including: {', '.join(self.skills)}. I specialize in full-stack development with modern web technologies."
            return "I have a diverse skill set covering web development, databases, and project management."

        # Project inquiries
        elif any(word in message for word in ['projects', 'portfolio', 'work', 'what have you built']):
            project_count = len(self.projects)
            featured_projects = [p for p in self.projects if p.get('featured', False)]

            response = f"I've worked on {project_count} projects across web development, project management, and design. "

            if featured_projects:
                response += "Here are some of my featured projects:\n"
                for project in featured_projects[:3]:
                    response += f"• {project['title']} - {project['description']}\n"
            else:
                response += "Notable projects include:\n"
                for project in self.projects[:3]:
                    response += f"• {project['title']} - {project['description']}\n"

            response += "\nWould you like to know more about any specific project?"
            return response

        # Experience inquiries
        elif any(word in message for word in ['experience', 'work history', 'career', 'background']):
            if self.experience:
                response = "Here's my professional experience:\n"
                for exp in self.experience:
                    response += f"• {exp['title']} at {exp['company']} ({exp['duration']})\n"
                    response += f"  {exp['description']}\n"
                return response
            return "I have extensive experience in software development and project management across various industries."

        # Specific project inquiries
        elif 'project' in message and any(word in message for word in ['tell me about', 'details', 'specific']):
            # Try to find matching projects
            for project in self.projects:
                if project['title'].lower() in message:
                    return self.get_project_details(project)
            return "I'd be happy to tell you about any of my projects! You can ask about AI chatbot, Nigeria Business Registry, Travel Agency, or any other project by name."

        # Contact information
        elif any(word in message for word in ['contact', 'email', 'reach', 'social']):
            social = self.personal_info.get('social_links', {})
            response = "You can reach out through:\n"
            if social.get('linkedin'):
                response += f"• LinkedIn: {social['linkedin']}\n"
            if social.get('twitter'):
                response += f"• Twitter: {social['twitter']}\n"
            response += "\nFeel free to connect for opportunities or questions!"
            return response

        # Resume/CV inquiries
        elif any(word in message for word in ['resume', 'cv', 'download resume']):
            return "You can download my resume from the portfolio website. It's also available in the main navigation under 'Resume'."

        # Help/What can you do
        elif any(word in message for word in ['help', 'what can you do', 'commands']):
            return """I can help you learn about:
• Projects and portfolio work
• Technical skills and expertise
• Professional experience and background
• Contact information and social links
• Resume and CV details

Just ask me about any of these topics, or mention a specific project name!"""

        # Default response
        else:
            return "I'm here to help you learn about Burgess's work and experience! You can ask me about projects, skills, experience, or anything else you're curious about."

    def get_project_details(self, project):
        """Get detailed information about a specific project"""
        response = f"**{project['title']}**\n\n"
        response += f"Category: {project['category']}\n"
        response += f"Description: {project['description']}\n\n"

        if project.get('technologies'):
            response += f"Technologies: {', '.join(project['technologies'])}\n"

        if project.get('details'):
            response += f"\nDetails: {project['details']}\n"

        if project.get('github_url'):
            response += f"\nGitHub: {project['github_url']}"

        if project.get('live_url'):
            response += f"\nLive Demo: {project['live_url']}"

        return response

# Initialize chatbot
chatbot = PortfolioChatbot(portfolio_data)

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat endpoint for AI chatbot"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')

        if not user_message:
            return jsonify({"error": "Message is required"}), 400

        response = chatbot.get_response(user_message)
        return jsonify({
            "response": response,
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/portfolio')
def get_portfolio():
    """Get all portfolio data"""
    return jsonify(portfolio_data)

@app.route('/api/projects')
def get_projects():
    """Get all projects"""
    return jsonify({"projects": portfolio_data.get('projects', [])})

@app.route('/api/skills')
def get_skills():
    """Get skills"""
    return jsonify({"skills": portfolio_data.get('skills', [])})

@app.route('/api/personal')
def get_personal():
    """Get personal information"""
    return jsonify({"personal_info": portfolio_data.get('personal_info', {})})

@app.route('/api/experience')
def get_experience():
    """Get experience"""
    return jsonify({"experience": portfolio_data.get('experience', [])})

@app.route('/')
def home():
    """Home endpoint - Health check for Railway"""
    logger.info('Root route accessed')
    return jsonify({
        "message": "BurgTech AI Portfolio Backend",
        "status": "running",
        "timestamp": datetime.now().isoformat(),
        "endpoints": {
            "chat": "/api/chat",
            "projects": "/api/projects",
            "skills": "/api/skills",
            "experience": "/api/experience",
            "personal": "/api/personal"
        }
    })

if __name__ == '__main__':
    # Use PORT environment variable for production deployment
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=app.config['DEBUG'], host='0.0.0.0', port=port)
