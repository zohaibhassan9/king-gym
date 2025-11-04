#!/bin/bash

# Simple script to execute SQL via Supabase SQL Editor API
# This uses curl to execute the SQL migration

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL"
SERVICE_KEY="$SUPABASE_SERVICE_ROLE_KEY"

if [ -z "$SUPABASE_URL" ] || [ -z "$SERVICE_KEY" ]; then
    echo "❌ Error: Missing Supabase credentials in .env.local"
    exit 1
fi

# Extract project reference
PROJECT_REF=$(echo $SUPABASE_URL | sed -n 's|https://\([^.]*\)\.supabase\.co|\1|p')

if [ -z "$PROJECT_REF" ]; then
    echo "❌ Error: Could not extract project reference from URL"
    exit 1
fi

echo "🚀 Setting up Supabase database..."
echo "📍 Project: $PROJECT_REF"
echo ""

# Read SQL file
SQL_FILE="supabase-migrations.sql"

if [ ! -f "$SQL_FILE" ]; then
    echo "❌ Error: $SQL_FILE not found"
    exit 1
fi

echo "📄 Found SQL migration file"
echo "⚠️  Note: Supabase doesn't allow direct SQL execution via API"
echo ""
echo "💡 Please run the SQL manually:"
echo "   1. Go to: https://supabase.com/dashboard/project/$PROJECT_REF"
echo "   2. Click on 'SQL Editor' in the left sidebar"
echo "   3. Click 'New query'"
echo "   4. Copy and paste the contents of $SQL_FILE"
echo "   5. Click 'Run' to execute"
echo ""
echo "📋 Or use Supabase CLI:"
echo "   npm install -g supabase"
echo "   supabase db push"
echo ""

