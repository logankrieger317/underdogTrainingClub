# Underdog Training Club

A modern web application for Underdog Training Club - South Austin's premier dog training community. Built with React, TypeScript, and Express, featuring an integrated CRM for lead management and training lifecycle tracking.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Zustand** for state management
- **Lucide React** for icons

### Backend
- **Express.js** with TypeScript
- **RESTful API** architecture
- **Helmet** for security
- **Morgan** for logging
- **CORS** enabled

### DevOps
- **Railway** for hosting
- **GitHub Actions** for CI/CD
- **TypeScript** throughout

## 📁 Project Structure

```
underdog-training/
├── src/                    # Frontend source code
│   ├── api/               # API client and utilities
│   ├── components/        # React components
│   │   ├── forms/        # Form components
│   │   ├── home/         # Homepage sections
│   │   ├── layout/       # Layout components
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   │   └── crm/          # CRM/Admin pages
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── server/                # Backend source code
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── models/           # Data models
│   ├── middleware/       # Express middleware
│   └── config/           # Server configuration
├── .github/
│   └── workflows/        # GitHub Actions workflows
├── public/               # Static assets
└── dist/                 # Build output
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/underdog-training.git
cd underdog-training
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:frontend` | Start only the frontend dev server |
| `npm run dev:server` | Start only the backend dev server |
| `npm run build` | Build both frontend and backend |
| `npm run start` | Start production servers |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler check |
| `npm run test` | Run tests |

## 🌐 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/health` | Health check |

### Protected Endpoints (CRM)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | List all leads |
| GET | `/api/leads/:id` | Get single lead |
| POST | `/api/leads` | Create new lead |
| PATCH | `/api/leads/:id` | Update lead |
| PATCH | `/api/leads/:id/status` | Update lead status |
| POST | `/api/leads/:id/notes` | Add note to lead |
| DELETE | `/api/leads/:id` | Delete lead |
| GET | `/api/dashboard/stats` | Get dashboard statistics |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |

## 🚢 Deployment

### Railway Deployment

1. Create a Railway account at [railway.app](https://railway.app)

2. Install Railway CLI:
```bash
npm install -g @railway/cli
```

3. Login and link project:
```bash
railway login
railway link
```

4. Set environment variables in Railway dashboard

5. Deploy:
```bash
railway up
```

### GitHub Actions

The project includes CI/CD workflows:
- **CI** (`ci.yml`): Runs on all PRs - lint, typecheck, build, test
- **Deploy** (`deploy.yml`): Deploys to Railway on push to main/production

Required secrets:
- `RAILWAY_TOKEN`: Your Railway API token

## 🎨 Features

### Public Website
- Modern, responsive design matching Underdog Training Club branding
- Programs showcase (Puppy Power, Foundations, Private Training, etc.)
- Contact form with CRM integration
- Certifications and trust signals
- Mobile-first approach

### CRM Dashboard
- Lead management with status tracking
- Pipeline visualization
- Activity feed
- Quick actions
- Search and filtering
- Lead lifecycle stages:
  - New → Contacted → Consultation Scheduled → Consultation Completed
  - → Proposal Sent → Enrolled → In Training → Training Completed

## 📝 Lead Lifecycle

```
New Lead → Contacted → Consultation Scheduled → Consultation Completed
                                                       ↓
                              ← Follow Up ← Proposal Sent
                                                       ↓
                                         Enrolled → In Training → Completed
```

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `VITE_API_URL` | API URL for frontend | `http://localhost:3001/api` |

## 📄 License

This project is proprietary software for Underdog Training Club.

## 🐕 About Underdog Training Club

**Underdog Training Club** is South Austin's premier dog training community.

- **Phone**: 512.669.5796
- **Email**: info@underdogtrainingclub.com
- **Address**: 9640 Old Lockhart Rd., Austin, TX 78747
- **Hours**: Sunday – Saturday, 10am – 9pm

*One Pack. One Purpose.*
