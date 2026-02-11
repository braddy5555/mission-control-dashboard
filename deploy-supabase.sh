#!/bin/bash
# Auto-deploy Supabase schemas
# Usage: ./deploy-supabase.sh

set -e

echo "═══════════════════════════════════════"
echo "  SUPABASE AUTO-DEPLOY"
echo "═══════════════════════════════════════"

SUPABASE_URL="https://kbdhsddyvjaefuhijrgq.supabase.co"
SUPABASE_KEY="sb_publishable_gSVQEq2A5LfZspn5hqc5_w_TyubFph3"

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "Error: curl is required"
    exit 1
fi

# Function to execute SQL via Supabase REST API
execute_sql() {
    local file=$1
    local name=$2
    
    echo ""
    echo "Deploying $name..."
    
    # Note: This requires the DB password, not the anon key
    # For now, we'll document the manual method
    echo "  File: $file"
    echo "  Status: ⚠️ Manual step required below"
}

# Show what needs to be done
echo ""
echo "Schema files to deploy:"
echo "  1. cosmic_puppies.sql"
echo "  2. tribes.sql"
echo "  3. ai_personas.sql"
echo "  4. dashboard.sql"

echo ""
echo "═══════════════════════════════════════"
echo "OPTION 1: Use Supabase CLI (Recommended)"
echo "═══════════════════════════════════════"
echo ""
echo "Install Supabase CLI:"
echo "  npm install -g supabase"
echo ""
echo "Login and link project:"
echo "  supabase login"
echo "  supabase link --project-ref kbdhsddyvjaefuhijrgq"
echo ""
echo "Deploy all schemas:"
echo "  supabase db execute --file dashboard/sql/cosmic_puppies.sql"
echo "  supabase db execute --file dashboard/sql/tribes.sql"
echo "  supabase db execute --file dashboard/sql/ai_personas.sql"
echo "  supabase db execute --file dashboard/sql/dashboard.sql"

echo ""
echo "═══════════════════════════════════════"
echo "OPTION 2: Use psql with connection string"
echo "═══════════════════════════════════════"
echo ""
echo "Get your connection string from:"
echo "  https://app.supabase.com/project/kbdhsddyvjaefuhijrgq/settings/database"
echo ""
echo "Then run:"
echo "  psql 'postgresql://postgres:[DB_PASSWORD]@db.kbdhsddyvjaefuhijrgq.supabase.co:5432/postgres' -f dashboard/sql/cosmic_puppies.sql"

echo ""
echo "═══════════════════════════════════════"
echo "OPTION 3: Auto-migrate via Node.js API"
echo "═══════════════════════════════════════"
echo ""
echo "Run: node dashboard/auto-migrate.js"
echo ""

# Check if we have the service role key
if [ -f ".env" ]; then
    source .env 2>/dev/null || true
fi

if [ -n "$SUPABASE_SERVICE_KEY" ]; then
    echo "Service key found! Attempting auto-migration..."
    node dashboard/auto-migrate.js
else
    echo "⚠️ SUPABASE_SERVICE_KEY not found in environment"
    echo "   Manual SQL execution required (Options 1 or 2)"
fi