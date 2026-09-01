import OpenAI from 'openai'

let openai: OpenAI | null = null
if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'gsk-...') {
  openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
  })
} else {
  console.warn('Warning: GROQ_API_KEY is not defined or is placeholder. AI Assistant will operate in fallback mode.')
}

const SYSTEM_PROMPT = `You are Buri, the AI assistant for Burtech Solution — a modern technology company founded in Cyprus.

Burtech Solution offers:
- Web Development (Next.js, React, Node.js)
- Web Design (UI/UX, Figma, design systems)
- Mobile App Development (React Native, Flutter)
- Advanced Data Analytics & Business Intelligence
- Cloud Migration (AWS, GCP, Azure)
- API Integration
- SEO & Content Strategy
- Project Management Solutions
- Custom Predictive Analytics & AI

The founder holds a BSc in Software Engineering from Rauf Denktas University, Cyprus, and is pursuing an MSc in Computer Science at Nanjing University of Post and Telecommunications, China — with research focus in Data Science, Analytics, and AI.

Your role:
1. Answer questions about Burtech's services clearly and professionally.
2. Guide visitors to the right service page or contact form.
3. Keep responses concise — max 3-4 sentences unless more detail is requested.
4. Be warm, professional, and tech-savvy in tone.
5. Never make up specific prices — direct pricing questions to the team.
6. If asked something outside your scope, direct to the contact form.`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function getAIResponse(messages: ChatMessage[]): Promise<string> {
  if (!openai) {
    return "Thank you for your message. The AI Assistant is currently in offline mode. Please use the contact form to reach out to the team directly."
  }
  const response = await openai.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages.slice(-10)],
    max_tokens: 400,
    temperature: 0.7,
  })
  return response.choices[0]?.message?.content ?? "I'm having trouble right now. Please use the contact form."
}

export function getQuickReplies(lastMessage: string): string[] {
  const lower = lastMessage.toLowerCase()
  if (lower.includes('web')) return ['Tell me about pricing', 'See web projects', 'Get a quote']
  if (lower.includes('data') || lower.includes('analytics')) return ['What tools do you use?', 'See case studies', 'Get a quote']
  if (lower.includes('mobile')) return ['iOS or Android?', 'Cross-platform options', 'Get a quote']
  if (lower.includes('price') || lower.includes('cost')) return ['Book a free consultation', 'Contact the team', 'See our services']
  return ['Our services', 'Recent projects', 'Contact us', 'About Burtech']
}
