# Mission Control Dashboard

Real-time dashboard for Cosmic Puppies, Tribes Community, and AI Personas projects.

## Supabase Database Auto-Deployment

This repository automatically deploys database schemas to Supabase using GitHub Actions.

### Projects

1. **Cosmic Puppies** - Lead management, orders, traffic tracking
2. **Tribes Community** - Community management, members, subscriptions

### Setup Required

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

| Secret | Value |
|--------|-------|
| `SUPABASE_ACCESS_TOKEN` | Get from https://supabase.com/dashboard/account/tokens |
| `COSMIC_DB_PASSWORD` | TUap46cLNK3T!_- |
| `TRIBES_DB_PASSWORD` | n7*_Q&a66L*3kwF |

### How to Deploy Schemas

**Option 1: Automatic (on push)**
Push changes to `supabase/migrations/` folder on main branch.

**Option 2: Manual trigger**
Go to Actions > Deploy Supabase Schema > Run workflow
Choose which project to deploy: cosmic-puppies, tribes-community, or both.

### Database Structure

```
supabase/
├── config.toml              # Supabase CLI configuration
├── migrations/
│   ├── 20250211180000_cosmic_initial.sql    # Cosmic Puppies schema
│   └── 20250211180001_tribes_initial.sql    # Tribes Community schema
└── ...
```

### Manual SQL Deployment (if GitHub Actions fails)

**Cosmic Puppies:**
- SQL Editor: https://supabase.com/dashboard/project/mocalplhdzvuiobltcqu/sql/new

**Tribes Community:**
- SQL Editor: https://supabase.com/dashboard/project/shriiexysllxlvjncwol/sql/new

## Dashboard

Live at: http://165.22.194.60:8081

### API Endpoints

- `/api/data` - All project metrics
- `/api/health` - Health check
- `/api/metrics` - System metrics

## Development

```bash
# Start dashboard
cd dashboard && node server.js

# Deploy schemas manually
supabase login
supabase link --project-ref mocalplhdzvuiobltcqu
supabase db push
```

## Credentials

**Cosmic Puppies:**
- URL: https://mocalplhdzvuiobltcqu.supabase.co
- Anon Key: sb_publishable_f-6OeV7Gk6R2skcAX3t2Gg_5pSUBp-0

**Tribes Community:**
- URL: https://shriiexysllxlvjncwol.supabase.co
- Anon Key: sb_publishable_eF2FO6BTKf2QX3cDDxWYQQ_6LZGBI66
