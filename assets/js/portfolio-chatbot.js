// Portfolio AI Chatbot Integration
// Add this script to your HTML pages to enable the AI chatbot

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatUI();
        this.bindEvents();
        this.welcomeMessage();
    }

    createChatUI() {
        // Create chat container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'portfolio-chatbot';
        chatContainer.innerHTML = `
            <div class="chatbot-toggle" id="chatbot-toggle">
                <i class="bi bi-chat-dots-fill"></i>
                <span>AI Assistant</span>
            </div>
            <div class="chatbot-container" id="chatbot-container">
                <div class="chatbot-header">
                    <h4><i class="bi bi-robot"></i> Portfolio Assistant</h4>
                    <button class="chatbot-close" id="chatbot-close">&times;</button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages"></div>
                <div class="chatbot-input-container">
                    <input type="text" id="chatbot-input" placeholder="Ask me about projects, skills, experience..." />
                    <button id="chatbot-send"><i class="bi bi-send"></i></button>
                </div>
            </div>
        `;

        // Add styles
        const chatStyles = document.createElement('style');
        chatStyles.textContent = `
            #portfolio-chatbot {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                font-family: 'Poppins', sans-serif;
            }

            .chatbot-toggle {
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                color: #000;
                padding: 12px 20px;
                border-radius: 50px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
                transition: all 0.3s ease;
            }

            .chatbot-toggle:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(255, 215, 0, 0.4);
            }

            .chatbot-container {
                display: none;
                position: absolute;
                bottom: 70px;
                right: 0;
                width: 350px;
                height: 500px;
                background: #fff;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                flex-direction: column;
                overflow: hidden;
            }

            .chatbot-container.show {
                display: flex;
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            .chatbot-header {
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                color: #000;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 600;
            }

            .chatbot-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #000;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .chatbot-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8f9fa;
            }

            .message {
                margin-bottom: 15px;
                padding: 10px 15px;
                border-radius: 18px;
                max-width: 80%;
                word-wrap: break-word;
            }

            .message.user {
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                color: #000;
                margin-left: auto;
                text-align: right;
            }

            .message.bot {
                background: #fff;
                color: #333;
                border: 1px solid #e0e0e0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .chatbot-input-container {
                padding: 20px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                gap: 10px;
                background: #fff;
            }

            #chatbot-input {
                flex: 1;
                padding: 12px 15px;
                border: 2px solid #e0e0e0;
                border-radius: 25px;
                outline: none;
                font-size: 14px;
                transition: border-color 0.3s ease;
            }

            #chatbot-input:focus {
                border-color: #ffd700;
            }

            #chatbot-send {
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                border: none;
                border-radius: 50%;
                width: 45px;
                height: 45px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #000;
                font-size: 18px;
                transition: transform 0.2s ease;
            }

            #chatbot-send:hover {
                transform: scale(1.05);
            }

            @media (max-width: 768px) {
                .chatbot-container {
                    width: 300px;
                    height: 400px;
                }
            }
        `;

        document.head.appendChild(chatStyles);
        document.body.appendChild(chatContainer);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const container = document.getElementById('chatbot-container');

        toggle.addEventListener('click', () => {
            this.toggleChat();
        });

        close.addEventListener('click', () => {
            this.closeChat();
        });

        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) && !toggle.contains(e.target) && this.isOpen) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        const container = document.getElementById('chatbot-container');
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const container = document.getElementById('chatbot-container');
        container.classList.add('show');
        this.isOpen = true;
        document.getElementById('chatbot-input').focus();
    }

    closeChat() {
        const container = document.getElementById('chatbot-container');
        container.classList.remove('show');
        this.isOpen = false;
    }

    welcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hello! I'm your AI portfolio assistant. I can help you learn about Burgess's projects, skills, and experience. What would you like to know?", 'bot');
        }, 1000);
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        try {
            // Use production URL if available, fallback to localhost for development
            const backendUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:5000'
                : 'https://burgtech-production.up.railway.app'; // Your live Railway URL

            const response = await fetch(`${backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            this.hideTyping();
            this.addMessage(data.response, 'bot');

        } catch (error) {
            this.hideTyping();
            this.addMessage('Sorry, I\'m having trouble connecting to the server. Please make sure the backend is running on localhost:5000.', 'bot');
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        // Convert markdown-like formatting
        text = this.formatMessage(text);

        messageDiv.innerHTML = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        // Basic markdown formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<i>AI is typing...</i>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PortfolioChatbot();
});
