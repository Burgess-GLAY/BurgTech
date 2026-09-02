
<div align="center">

```
██████╗ ██╗   ██╗██████╗ ████████╗███████╗ ██████╗██╗  ██╗
██╔══██╗██║   ██║██╔══██╗╚══██╔══╝██╔════╝██╔════╝██║  ██║
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║     ███████║
██╔══██╗██║   ██║██╔══██╗   ██║   ██╔══╝  ██║     ██╔══██║
██████╔╝╚██████╔╝██║  ██║   ██║   ███████╗╚██████╗██║  ██║
╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝

                      S O L U T I O N
```

# Burtech Solution

**Advanced digital solutions — web, mobile, data analytics, AI, and cloud.**

A production and development -ready full-stack company website and content management platform built with Next.js 14, Express, PostgreSQL, and OpenAI.

[![Next.js](https://img.shields.io/badge/Next.js-14.1-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.10-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Admin Dashboard](#admin-dashboard)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Scripts Reference](#scripts-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Burtech Solution is a technology company based in Liberia and China, offering advanced digital services across web development, mobile applications, data analytics, cloud infrastructure, and artificial intelligence.

This repository contains the **full-stack platform** that powers the Burtech Solution website — including the public-facing marketing site, a protected admin dashboard for content management, a real-time live chat system, and an AI-powered chatbot assistant named **Buri**.

The platform is designed to be a scalable, production-ready MVP that a development team can extend with confidence.

> **Founder:** Burhan Altiparmak — BSc Software Engineering, Rauf Denktas University, Cyprus. MSc Computer Science candidate at Nanjing University of Post and Telecommunications, China. Research focus: Data Science, Data Analytics, and Artificial Intelligence.

---

## Features

### Public Website
- **Home page** — animated hero, stats, services overview, featured projects, founder section, testimonials, blog preview, and CTA
- **About page** — company story, mission, values, and founder background
- **Services** — 9 individual service pages (Web Development, Web Design, Mobile Apps, Data Analytics, Cloud Migration, API Integration, SEO & Content, Project Management, Predictive Analytics)
- **Projects portfolio** — filterable project grid with status, technologies, and live links
- **Team page** — profile cards with skills, bio, and social links
- **Insights / Blog** — categorised articles with full article detail pages
- **Contact page** — validated form that stores submissions and sends email alerts

### Admin Dashboard (`/admin`)
- **Role-based access control** — Super Admin, Admin, Team Member roles
- **Overview dashboard** — stats cards and recent message inbox
- **Projects management** — full CRUD with search and status filtering
- **Messages inbox** — read, reply, archive, and delete contact submissions
- **Team management** — add, edit, remove team members
- **Services management** — publish/unpublish and edit all 9 services
- **Testimonials management** — feature, publish, and manage client testimonials
- **Blog management** — write, publish, and delete articles
- **Users management** — Super Admin can manage all user accounts

### AI Chatbot — Buri
- Floating chat widget on every public page
- Powered by **OpenAI GPT-4o-mini**
- Knows all Burtech services, pricing guidance, and company background
- Rate-limited to prevent abuse
- Falls back gracefully when OpenAI is unavailable

### Infrastructure
- **Docker Compose** — one-command startup for the full stack
- **JWT authentication** with 7-day token expiry
- **Transactional email** via Resend
- **Rate limiting** — global 200 req/15min, 10 req/15min on auth, 20 req/min on AI
- **Helmet, CORS, compression** middleware on all Express routes

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | Next.js (App Router) | 14.1.0 |
| UI language | TypeScript | 5.3.3 |
| Styling | Tailwind CSS | 3.4.1 |
| Animations | Framer Motion | 11.0.3 |
| Server state | TanStack React Query | 5.18.1 |
| Client state | Zustand | 4.5.0 |
| Forms | React Hook Form + Zod | 7.50 / 3.22 |
| HTTP client | Axios | 1.6.7 |
| Icons | Lucide React | 0.323.0 |
| Backend framework | Express.js | 4.18.3 |
| Backend language | TypeScript | 5.3.3 |
| ORM | Prisma | 5.10.0 |
| Database | PostgreSQL | 16 |
| AI | OpenAI SDK (GPT-4o-mini) | 4.28.0 |
| Email | Resend | 3.1.0 |
| Auth | JSON Web Tokens | 9.0.2 |
| Password hashing | bcryptjs | 2.4.3 |
| Validation | Zod | 3.22.4 |
| Containers | Docker + Docker Compose | — |

---

## Project Structure

```
BurgTech/
│
├── backend/                          # Express API server
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   └── schema.prisma             # Database schema (8 models)
│   └── src/
│       ├── index.ts                  # Server entry — Express
│       ├── seed.ts                   # Database seeder
│       ├── lib/
│       │   └── prisma.ts             # Prisma client singleton
│       ├── controllers/
│       │   ├── authController.ts     # Login, register, /me
│       │   └── projectsController.ts # Projects CRUD
│       ├── middleware/
│       │   ├── auth.ts               # JWT verification + RBAC guards
│       │   ├── errorHandler.ts       # Global error handler
│       │   └── rateLimiter.ts        # Rate limiting config
│       ├── routes/
│       │   ├── auth.ts               # POST /login, /register, GET /me
│       │   ├── projects.ts           # CRUD /projects
│       │   ├── team.ts               # CRUD /team
│       │   ├── services.ts           # CRUD /services
│       │   ├── testimonials.ts       # CRUD /testimonials
│       │   ├── blog.ts               # CRUD /blog
│       │   ├── messages.ts           # CRUD /messages
│       │   ├── users.ts              # CRUD /users (Super Admin)
│       │   ├── ai.ts                 # POST /ai/chat
│       │   └── admin.ts              # GET /admin/stats
│       └── services/
│           ├── aiService.ts          # OpenAI integration (Buri)
│           └── emailService.ts       # Resend email templates
│
├── frontend/                         # Next.js 14 App Router
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── src/
│       ├── app/                      # File-system routing
│       │   ├── layout.tsx            # Root layout (Navbar, Footer, ChatWidget)
│       │   ├── globals.css           # Tailwind + custom utilities
│       │   ├── page.tsx              # / — Home
│       │   ├── about/page.tsx        # /about
│       │   ├── team/page.tsx         # /team
│       │   ├── contact/page.tsx      # /contact
│       │   ├── projects/page.tsx     # /projects
│       │   ├── services/
│       │   │   ├── page.tsx          # /services
│       │   │   └── [slug]/page.tsx   # /services/:slug (9 pages)
│       │   └── admin/
│       │       ├── layout.tsx        # Protected sidebar shell
│       │       ├── login/page.tsx    # /admin/login
│       │       ├── page.tsx          # /admin — Overview dashboard
│       │       ├── projects/page.tsx # /admin/projects
│       │       └── messages/page.tsx # /admin/messages
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.tsx        # Sticky nav with services dropdown
│       │   │   ├── Footer.tsx        # Full footer with links
│       │   │   └── Providers.tsx     # React Query + Toaster
│       │   ├── sections/
│       │   │   └── index.tsx         # All homepage section components
│       │   └── chat/
│       │       └── ChatWidget.tsx    # AI assistant chat widget
│       ├── hooks/
│       │   └── useAuth.ts            # Zustand auth store (persist)
│       └── lib/
│           ├── api.ts                # Axios client with JWT interceptor
│           └── utils.ts              # cn(), formatDate(), slugify()
│
├── docs/
│   └── SETUP.md                      # Full developer setup guide
├── docker-compose.yml                # PostgreSQL + Redis + API + Web
├── .env.example                      # Environment variable template
├── .gitignore
└── README.md                         # This file
```

---

## Getting Started

### Prerequisites

| Tool | Minimum version |
|---|---|
| Node.js | 20.0.0 |
| Docker Desktop | 4.0+ |
| Git | Any recent version |

### 1. Clone the repository

```bash
git clone https://github.com/Burgess-GLAY/BurgTech.git
cd BurgTech
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the required values. At minimum you need:

```env
JWT_SECRET=any-random-string-at-least-32-characters-long
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
ADMIN_EMAIL=your@email.com
```

### 3. Start the backend

PostgreSQL is hosted on Neon — no local containers needed.
Just ensure DATABASE_URL and DIRECT_URL are set in .env.

```bash
cd backend
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

The API will be running at `http://localhost:4000`
You can verify it with: `curl http://localhost:4000/health`

### 4. Start the frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

The website will be running at `http://localhost:3000`

### 5. Access the platform

| URL | Description |
|---|---|
| `http://localhost:3000` | Public website |
| `http://localhost:3000/admin` | Admin dashboard |
| `http://localhost:4000/health` | API health check |
| `http://localhost:5555` | Prisma Studio (run `npm run db:studio` in backend) |

### Default Admin Credentials

```
Email:    admin@burtech.io
Password: Admin@Burtech2024!
```

> **Important:** Change this password immediately before deploying to production.

---

## Environment Variables

All variables are documented in `.env.example`. Here is a summary:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Neon pooled connection string (with pgbouncer=true) |
| `DIRECT_URL` | ✅ | Neon direct connection string (for Prisma migrations) |
| `REDIS_URL` | ✅ | Upstash Redis connection string (with TLS enabled) |
| `JWT_SECRET` | ✅ | Secret for signing JWTs — min 32 chars |
| `OPENAI_API_KEY` | ✅ | Powers the Buri AI chatbot |
| `RESEND_API_KEY` | ✅ | Sends contact and chat alert emails |
| `ADMIN_EMAIL` | ✅ | Inbox for contact form submissions and chat alerts |
| `FRONTEND_URL` | ✅ | Allowed CORS origin for the API |
| `NEXT_PUBLIC_API_URL` | ✅ | API base URL — used by the browser |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Public site URL — used for SEO metadata |
| `PORT` | ⬜ | API port (default: 4000) |

---

## API Reference

All endpoints are prefixed with `/api/v1`.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | Public | Login with email + password, returns JWT |
| `POST` | `/auth/register` | Public | Create a new client account |
| `GET` | `/auth/me` | 🔒 Any | Get the current authenticated user |

### Content (Public Read, Admin Write)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/services` | Public | List all published services |
| `GET` | `/services/:slug` | Public | Get a single service by slug |
| `GET` | `/projects` | Public | List projects (filter: `?featured=true`, `?status=COMPLETED`) |
| `GET` | `/projects/:slug` | Public | Get a single project by slug |
| `GET` | `/team` | Public | List visible team members |
| `GET` | `/testimonials` | Public | List testimonials (filter: `?featured=true`) |
| `GET` | `/blog` | Public | List published posts (filter: `?category=TECH_INSIGHTS`) |
| `GET` | `/blog/:slug` | Public | Get a single blog post |

### Contact & Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/messages` | Public | Submit contact form |
| `GET` | `/messages` | 🔒 Admin | List all messages |
| `PATCH` | `/messages/:id` | 🔒 Admin | Update message status |
| `GET` | `/admin/stats` | 🔒 Admin | Dashboard overview stats |
| `GET` | `/users` | 🔒 Super Admin | List all users |
| `PUT` | `/users/:id` | 🔒 Super Admin | Update user |
| `DELETE` | `/users/:id` | 🔒 Super Admin | Delete user |

### AI Chatbot

| Method | Endpoint | Auth | Rate Limit | Description |
|---|---|---|---|---|
| `POST` | `/ai/chat` | Public | 20/min | Get a response from Buri (AI assistant) |

### Rate Limits

| Endpoint | Limit |
|---|---|
| Global | 200 req / 15 min |
| Auth endpoints (`/login`, `/register`) | 10 req / 15 min |
| AI chat (`/ai/chat`) | 20 req / min |

---

## Admin Dashboard

Navigate to `/admin` and sign in with your admin credentials.

### Role Permissions

| Feature | SUPER_ADMIN | ADMIN | TEAM_MEMBER |
|---|---|---|---|
| View dashboard | ✅ | ✅ | ✅ |
| View & reply to messages | ✅ | ✅ | ✅ |
| Manage projects | ✅ | ✅ | ✅ |
| Manage blog posts | ✅ | ✅ | ✅ |
| Manage team members | ✅ | ✅ | ❌ |
| Manage services | ✅ | ✅ | ❌ |
| Manage testimonials | ✅ | ✅ | ❌ |
| Manage users | ✅ | ❌ | ❌ |

### Seeded Data

The `npm run db:seed` command creates the following data automatically:

- 1 Super Admin account (`admin@burtech.io`)
- 4 team member accounts
- All 9 services (fully described with technologies, use cases, benefits)
- 3 featured testimonials
- 1 sample project (Retail Analytics Dashboard)

---

## Database Schema

The Prisma schema at `backend/prisma/schema.prisma` defines 8 models:

```
User             → Authentication, roles, profile
TeamMember       → Staff profiles linked to User
Service          → The 9 service offerings
Project          → Portfolio projects
Testimonial      → Client testimonials
BlogPost         → News and insights articles
Message          → Contact form submissions
SiteSetting      → Key-value store for global settings
```

**Enums:**
- `Role` — `SUPER_ADMIN`, `ADMIN`, `TEAM_MEMBER`, `CLIENT`
- `ProjectStatus` — `COMPLETED`, `IN_PROGRESS`, `ARCHIVED`
- `MessageStatus` — `UNREAD`, `READ`, `REPLIED`, `ARCHIVED`
- `PostCategory` — `COMPANY_NEWS`, `TECH_INSIGHTS`, `PROJECT_ANNOUNCEMENT`, `AI_DATA_SCIENCE`, `TUTORIAL`

---

## Deployment

### Option A — Docker Compose (VPS / Self-Hosted)

```bash
# 1. Clone and configure
git clone https://github.com/your-username/BurgTech.git && cd BurgTech
cp .env.example .env
# Fill in .env with production values

# 2. Build and start all services
docker compose up --build -d

# 3. Verify all containers are running
docker compose ps

# 4. View logs
docker compose logs -f api
docker compose logs -f web
```

**Recommended VPS:** Ubuntu 22.04 LTS, 2 vCPU, 4GB RAM minimum.

Add an Nginx reverse proxy in front pointing:
- Port 80/443 → `localhost:3000` (frontend)
- `/api` → `localhost:4000` (backend)

### Option B — Vercel + Railway (Recommended for MVP)

**Backend → Railway**
1. Create a new Railway project
2. Deploy from GitHub, set root directory to `backend`
3. Set all environment variables from `.env.example`
4. PostgreSQL is externally hosted on Neon (set DATABASE_URL, DIRECT_URL)
5. Railway will auto-detect the Dockerfile and deploy

**Frontend → Vercel**
1. Import your GitHub repository into Vercel
2. Set the root directory to `frontend`
3. Add `NEXT_PUBLIC_API_URL` pointing to your Railway backend URL
4. Deploy

> After deploying both, update `FRONTEND_URL` in Railway to your Vercel domain so CORS works correctly.

---

## Scripts Reference

### Backend (`cd backend`)

```bash
npm run dev          # Start dev server with hot reload (tsx watch)
npm run build        # Compile TypeScript to /dist
npm run start        # Run compiled production build
npm run db:generate  # Regenerate Prisma client after schema changes
npm run db:migrate   # Run pending migrations (creates tables)
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio visual database editor
npm run lint         # Run ESLint on /src
```

### Frontend (`cd frontend`)

```bash
npm run dev          # Start Next.js dev server with hot reload
npm run build        # Create optimised production build
npm run start        # Serve production build
npm run lint         # Run Next.js ESLint config
npm run type-check   # Run tsc --noEmit (type check without building)
```

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Write your code following the existing TypeScript patterns
4. Ensure type checking passes: `npx tsc --noEmit` in both `backend/` and `frontend/`
5. Commit with a clear message: `git commit -m "feat: add testimonials export endpoint"`
6. Push and open a Pull Request against `main`

**Commit message convention:**

```
feat:     New feature
fix:      Bug fix
refactor: Code change that neither fixes a bug nor adds a feature
docs:     Documentation changes
style:    Formatting, missing semicolons, etc.
chore:    Build process, dependency updates
```

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Burtech Solution

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

**Built with precision by Burtech Solution**

[Website](https://burtech.io) · [LinkedIn](https://linkedin.com/company/burtech) · [GitHub](https://github.com/burtech) · [hello@burtech.io](mailto:hello@burtech.io)

*Founded in Cyprus · Research at Nanjing University of Post and Telecommunications, China*

</div>
