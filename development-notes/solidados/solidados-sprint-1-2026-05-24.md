## Entry #13

**createdAt:** 24 May 2026

### Railway Deployment

Deployment of `musicflow-backend` to Railway for public access during frontend development.

### Why Railway

I have compared three options:
- **Render** - free tier, but service sleeps after 15 min of inactivity. Unacceptable for active development - cold start takes up to 60 seconds on every first request. (Declined)
- **Fly.io** – more flexible, but requires CLI setup, Dockerfile, and manual region configuration. Too much overhead for an educational project. (Declined)
- **Railway** - 30-days of free trial (or $5), then $1 per month. Service stays awake, deploys directly from GitHub, zero config for NestJS. Won on simplicity and dev experience. (Accepted)

### Implementation

- [x] Connected `musicflow-backend` GitHub repository via Railway GitHub App (required Organization admin approval from team lead)
- [x] Added all `env` variables via Raw Editor: Supabase credentials, JWT secret, Jamendo API keys, CORS origins
- [x] Fixed port issue – Railway injects its own `PORT` env variable. Updated `main.ts` to parse it as integer and listen on `0.0.0.0` host (for public use)
- [x] Set public networking port to `8080` in Railway `Settings` -> `Networking`
- [x] Updated `CORS_ORIGINS` to include both `http://localhost:4200` and `https://angular2026q2.github.io`

### Result

Swagger UI publicly accessible at:
`https://musicflow-backend-production.up.railway.app/api/docs`

### Problems & Solutions

**Problem:** Railway deployed from `main` branch which had only the project template, not our code.
**Solution:** Created PR `dev` -> `main` and merged. Railway automatically redeployed from the correct branch.

**Problem:** App started but Railway returned "Application failed to respond" – port mismatch.
**Solution:** Railway injected `PORT=8080` but app was configured to fall back to `3000`. Fixed `main.ts` to use `parseInt(configService.get<string>('PORT', '3000'), 10)` and listen on `0.0.0.0`. Set port `8080` explicitly in Railway Networking settings.

**Problem:** `CORS_ORIGINS` was set to `http://localhost:4200` only – production frontend would be blocked.
**Solution:** Updated to comma-separated value: `http://localhost:4200,https://angular2026q2.github.io`.
