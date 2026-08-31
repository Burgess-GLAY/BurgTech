# Burtech Solution — Setup Guide

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Express.js, TypeScript, Prisma ORM |
| Database | PostgreSQL (Neon) |
| Real-time | Socket.io (in-memory) |
| AI Chatbot | OpenAI GPT-4o-mini |
| Email | Resend |
| Auth | JWT (custom) |
| Containers | Docker + Docker Compose (for app deployment only) |

---

## Quick Start — Local Development

### Prerequisites
- Node.js 20+
- Git

### 1. Clone and configure environment

```bash
git clone <your-repo-url> BurgTech
cd BurgTech
cp .env.example .env
# Open .env and fill in JWT_SECRET, OPENAI_API_KEY, RESEND_API_KEY, ADMIN_EMAIL
```

### 2. Start the backend

PostgreSQL is hosted on Neon — no local containers needed.
Just ensure DATABASE_URL and DIRECT_URL are set in .env.

```bash
cd backend
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

The API will be running at **http://localhost:4000**

### 3. Start the frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

The website will be running at **http://localhost:3000**

---

## Default Login Credentials

| Field | Value |
|---|---|
| URL | http://localhost:3000/admin |
| Email | admin@burtech.io |
| Password | Admin@Burtech2024! |

> Change this password immediately after first login in production.

---

## Project Structure

```
BurgTech/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Full database schema
│   └── src/
│       ├── index.ts               # Express + Socket.io server entry
│       ├── controllers/           # Business logic (auth, projects)
│       ├── routes/                # API route definitions
│       ├── middleware/            # auth.ts, rateLimiter, errorHandler
│       ├── services/              # socketService, aiService, emailService
│       ├── lib/prisma.ts          # Prisma singleton
│       └── seed.ts                # Initial data seeder
│
├── frontend/
│   └── src/
│       ├── app/                   # Next.js App Router pages
│       │   ├── page.tsx           # Home
│       │   ├── about/             # About page
│       │   ├── team/              # Team page
│       │   ├── services/          # Services index + [slug] detail
│       │   ├── projects/          # Projects portfolio
│       │   ├── contact/           # Contact form
│       │   └── admin/             # Protected admin dashboard
│       │       ├── layout.tsx     # Sidebar shell (RBAC protected)
│       │       ├── page.tsx       # Overview dashboard
│       │       ├── projects/      # Projects CRUD
│       │       └── messages/      # Inbox
│       ├── components/
│       │   ├── layout/            # Navbar, Footer, Providers
│       │   ├── sections/          # All homepage sections
│       │   └── chat/              # ChatWidget (AI + live Socket.io)
│       ├── hooks/useAuth.ts       # Zustand auth store
│       └── lib/
│           ├── api.ts             # Axios client with JWT interceptor
│           └── utils.ts           # cn(), formatDate(), slugify()
│
├── docker-compose.yml             # API + Web containers (db/redis externally hosted)
├── .env.example                   # Environment variable template
└── docs/SETUP.md                  # This file
```

---

## API Endpoints

### Public
| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/auth/login` | Login, returns JWT |
| POST | `/api/v1/auth/register` | Register new user |
| GET | `/api/v1/team` | List team members |
| GET | `/api/v1/services` | List services |
| GET | `/api/v1/services/:slug` | Get single service |
| GET | `/api/v1/projects` | List projects |
| GET | `/api/v1/projects/:slug` | Get single project |
| GET | `/api/v1/testimonials` | List testimonials |
| GET | `/api/v1/blog` | List blog posts |
| POST | `/api/v1/messages` | Submit contact form |
| POST | `/api/v1/ai/chat` | AI chatbot response |

### Protected (requires JWT)
| Method | Path | Role | Description |
|---|---|---|---|
| GET | `/api/v1/auth/me` | Any | Current user |
| GET | `/api/v1/admin/stats` | Admin | Dashboard stats |
| GET | `/api/v1/messages` | Admin | List messages |
| PATCH | `/api/v1/messages/:id` | Admin | Update message status |
| POST/PUT/DELETE | `/api/v1/projects/:id` | Admin | Manage projects |
| POST/PUT/DELETE | `/api/v1/team/:id` | Admin | Manage team |
| POST/PUT/DELETE | `/api/v1/services/:id` | Admin | Manage services |
| GET | `/api/v1/users` | Super Admin | List users |
| PUT/DELETE | `/api/v1/users/:id` | Super Admin | Manage users |

---

## Socket.io Events

### Client → Server
| Event | Payload | Description |
|---|---|---|
| `chat:join` | `{ visitorId, sessionId? }` | Join or create chat session |
| `chat:message` | `{ content }` | Send a message |
| `chat:typing` | `{ isTyping }` | Typing indicator |
| `chat:adminJoin` | `{ sessionId, adminId }` | Admin joins a session |
| `chat:getSessions` | — | Get all active sessions (admin) |

### Server → Client
| Event | Payload | Description |
|---|---|---|
| `chat:session` | `{ sessionId, history }` | Session info + message history |
| `chat:message` | `{ id, sender, content, createdAt }` | New incoming message |
| `chat:typing` | `{ isTyping, role }` | Typing indicator |
| `chat:adminJoined` | `{ sessionId }` | Admin connected notification |
| `chat:sessions` | `[session]` | Active sessions list |

---

## Admin Roles

| Feature | SUPER_ADMIN | ADMIN | TEAM_MEMBER |
|---|---|---|---|
| Manage users | ✅ | ❌ | ❌ |
| Manage team | ✅ | ✅ | ❌ |
| Manage projects | ✅ | ✅ | ✅ |
| Manage services | ✅ | ✅ | ❌ |
| Manage blog | ✅ | ✅ | ✅ |
| View messages | ✅ | ✅ | ✅ |
| Reply to chat | ✅ | ✅ | ✅ |

---

## Production Deployment

### Option A: Docker (VPS / self-hosted)

```bash
# Copy and fill in production values
cp .env.example .env

# Build and start everything
docker compose up --build -d

# Check logs
docker compose logs -f api
docker compose logs -f web
```

### Option B: Vercel + Render (recommended for MVP)

1. **Backend → Render**
   - Create new web service from GitHub repo
   - Render will automatically detect `render.yaml` in the root
   - PostgreSQL database is provisioned automatically via render.yaml
   - Set remaining environment variables in Render dashboard:
     - `JWT_SECRET` (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
     - `OPENAI_API_KEY` (from OpenAI dashboard)
     - `RESEND_API_KEY` (from Resend dashboard)
   - DATABASE_URL and DIRECT_URL are auto-configured from render.yaml

2. **Frontend → Vercel**
   - Import repo → set Root Directory to `frontend`
   - Set `NEXT_PUBLIC_API_URL` to your Render backend URL (e.g., `https://burgtech-backend.onrender.com`)

### Environment Variables Checklist

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | ✅ | Auto-configured from Render PostgreSQL (render.yaml) |
| `DIRECT_URL` | ✅ | Auto-configured from Render PostgreSQL (render.yaml) |
| `JWT_SECRET` | ✅ | Min 32 chars, random (set in Render dashboard) |
| `OPENAI_API_KEY` | ✅ | For AI chatbot (Buri) - from OpenAI dashboard |
| `RESEND_API_KEY` | ✅ | For contact + chat emails - from Resend dashboard |
| `ADMIN_EMAIL` | ✅ | Where alerts are sent (set in render.yaml) |
| `FRONTEND_URL` | ✅ | For CORS — your production domain (set in render.yaml) |
| `NEXT_PUBLIC_API_URL` | ✅ | Backend URL used by frontend (set in Vercel) |

---

## Useful Commands

```bash
# Backend
npm run dev          # Start dev server with hot reload
npm run db:studio    # Open Prisma Studio (visual DB editor)
npm run db:seed      # Re-seed the database
npm run build        # Compile TypeScript

# Frontend
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run type-check   # TypeScript check without building
```
