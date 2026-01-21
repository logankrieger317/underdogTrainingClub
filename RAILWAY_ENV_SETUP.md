# Railway Environment Variables Setup

## Current Deployment: Single Service (Monorepo)

Your app is deployed as **one service** at:
- Public URL: `underdogtrainingclub-production.up.railway.app` (port 8080)

## Required Environment Variables

Add these in Railway's Variables section:

```
NODE_ENV=production
FRONTEND_URL=https://underdogtrainingclub-production.up.railway.app
VITE_API_URL=https://underdogtrainingclub-production.up.railway.app/api
```

**Note:** `PORT` is automatically set by Railway - you don't need to add it manually.

## How It Works

- **Single Service**: Both frontend and backend run in one Railway service
- **Express serves everything**: 
  - API routes: `/api/*` → handled by Express
  - Frontend: All other routes → served as static files from `dist/`
- **Port**: Railway automatically sets `PORT` environment variable (usually 8080)
- **Build**: Railway runs `npm run build` which builds both frontend and backend
- **Start**: Railway runs `node server/dist/index.js` which starts Express and serves both API and frontend

## Architecture

```
Railway Service (Port 8080)
├── Express Server
│   ├── /api/* → API routes (leads, contact, dashboard, auth)
│   └── /* → Static frontend files (React app)
└── Frontend (built to dist/)
```

## Testing

After setting environment variables and redeploying:

1. Visit: `https://underdogtrainingclub-production.up.railway.app`
2. Should see: Your React frontend
3. API calls: Will go to `/api/*` on the same domain
4. Health check: `https://underdogtrainingclub-production.up.railway.app/health`

## Alternative: Split into 2 Services (Future)

If you want separate frontend/backend services later:

1. Create a new service in Railway for frontend
2. Keep current service as backend API only
3. Update CORS and API URLs accordingly
4. More complex but allows independent scaling

For now, single-service is simpler and works great!
