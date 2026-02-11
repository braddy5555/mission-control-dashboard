#!/bin/bash
# One-command setup for Supabase automation
# This script will be run from the host to setup everything

set -e

echo "═══════════════════════════════════════════════════════"
echo "  SUPABASE SETUP AUTOMATION"
echo "═══════════════════════════════════════════════════════"

# Install Supabase CLI if not present
if ! command -v supabase &> /dev/null; then
    echo ""
    echo "Installing Supabase CLI..."
    npm install -g supabase
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "Error: Docker is not running"
    exit 1
fi

echo ""
echo "Step 1: Login to Supabase"
echo "─────────────────────────────────────────────────────"
echo "A browser window will open. Please login with your GitHub/Google account."
echo ""

# Run supabase login in container
supabase login

echo ""
echo "Step 2: Link to project"
echo "─────────────────────────────────────────────────────"
echo "Project ID: kbdhsddyvjaefuhijrgq"
echo ""

cd /root/.openclaw/workspace/dashboard
supabase link --project-ref kbdhsddyvjaefuhijrgq

echo ""
echo "Step 3: Deploy all schemas"
echo "─────────────────────────────────────────────────────"

for file in sql/*.sql; do
    echo "Deploying $(basename $file)..."
    supabase db execute --file "$file"
    echo "✓ $(basename $file) deployed"
done

echo ""
echo "Step 4: Migrate existing data"
echo "─────────────────────────────────────────────────────"
node migrate-data.js

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  SETUP COMPLETE!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "All schemas are now deployed to Supabase."
echo "Dashboard will use live data from the database."
echo ""
echo "Access your database at:"
echo "  https://app.supabase.com/project/kbdhsddyvjaefuhijrgq"
echo ""
echo "Dashboard URL: http://165.22.194.60:8081"