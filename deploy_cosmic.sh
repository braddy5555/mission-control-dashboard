#!/bin/bash
# Deploy cosmic-puppies schema to Supabase

SUPABASE_URL="https://mocalplhdzvuiobltcqu.supabase.co"
SUPABASE_KEY="sb_publishable_f-6OeV7Gk6R2skcAX3t2Gg_5pSUBp-0"
DB_PASS="TUap46cLNK3T!_-"

# Get the connection string from Supabase dashboard
# Format: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
DB_HOST="db.mocalplhdzvuiobltcqu.supabase.co"

echo "🚀 Deploying Cosmic Puppies schema..."
echo "📡 Connecting to: $DB_HOST"

# Deploy using psql if available, otherwise use SQL Editor approach
if command -v psql &> /dev/null; then
    echo "📦 Using psql..."
    PGPASSWORD="$DB_PASS" psql \
        -h "$DB_HOST" \
        -U postgres \
        -d postgres \
        -f /root/.openclaw/workspace/dashboard/supabase/cosmic/schema.sql \
        2>&1
else
    echo "⚠️  psql not available. Schema file ready for manual deployment:"
    echo "   /root/.openclaw/workspace/dashboard/supabase/cosmic/schema.sql"
    echo ""
    echo "🔗 Open Supabase SQL Editor: $SUPABASE_URL/project/sql"
    echo "📋 Copy and paste the schema.sql content"
fi
