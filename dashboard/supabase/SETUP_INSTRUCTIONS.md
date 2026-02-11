# SUPABASE SETUP - 2 PROJECTS

## Project 1: Cosmic Puppies

### Stap 1: Maak Project aan
1. Ga naar https://app.supabase.com
2. Click "New Project"
3. Organization: (jouw org)
4. Project name: `cosmic-puppies`
5. Database Password: (maak sterk wachtwoord aan)
6. Region: Amsterdam (West EU)
7. Click "Create new project"

### Stap 2: Kopieer Credentials
Na aanmaken, ga naar Project Settings → API:
- **Project URL**: `https://[PROJECT_ID].supabase.co`
- **anon/public key**: `eyJhbG...`

Sla deze op, je hebt ze nodig voor de dashboard config.

### Stap 3: Deploy Schema
1. Ga naar SQL Editor
2. New Query
3. Kopieer inhoud van: `/dashboard/supabase/cosmic/schema.sql`
4. Click Run

---

## Project 2: Tribes

### Stap 1: Maak Project aan
1. Ga naar https://app.supabase.com
2. Click "New Project"
3. Project name: `tribes-community`
4. Database Password: (maak sterk wachtwoord aan)
5. Region: Amsterdam (West EU)
6. Click "Create new project"

### Stap 2: Kopieer Credentials
Ga naar Project Settings → API:
- **Project URL**: `https://[PROJECT_ID].supabase.co`
- **anon/public key**: `eyJhbG...`

### Stap 3: Deploy Schema
1. Ga naar SQL Editor
2. New Query
3. Kopieer inhoud van: `/dashboard/supabase/tribes/schema.sql`
4. Click Run

---

## Dashboard Configuratie

Na beide projecten aangemaakt, stuur me de 4 credentials:

```
COSMIC_SUPABASE_URL=https://xxxx.supabase.co
COSMIC_SUPABASE_KEY=eyJxxx

TRIBES_SUPABASE_URL=https://xxxx.supabase.co
TRIBES_SUPABASE_KEY=eyJxxx
```

Dan update ik de dashboard code om naar beide databases te verbinden.

---

## Features per Project

### Cosmic Puppies Database:
- ✅ Leads tracking (source, status, qualified)
- ✅ Orders & revenue
- ✅ Website traffic analytics
- ✅ Products inventory
- ✅ Funnel step tracking
- ✅ Real-time updates

### Tribes Database:
- ✅ Communities/Tribes management
- ✅ Members & roles
- ✅ Subscriptions & revenue
- ✅ Posts & content
- ✅ Activities & engagement
- ✅ Events
- ✅ Real-time updates

---

## Kosten

Supabase gratis tier per project:
- 500MB database
- 1GB storage
- 2GB bandwidth
- 50,000 realtime messages
- 100,000 API requests/day

Voor 2 projecten = dubbele limieten. Meer dan genoeg voor start.