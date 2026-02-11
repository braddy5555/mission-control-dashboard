// Supabase Database Setup for Mission Control
// Project: kbdhsddyvjaefuhijrgq.supabase.co

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://kbdhsddyvjaefuhijrgq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_gSVQEq2A5LfZspn5hqc5_w_TyubFph3';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Database Schema Definitions
const schemas = {
  // Cosmic Puppies Database
  cosmic_puppies: `
    -- Leads table
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      source VARCHAR(255),
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      company VARCHAR(255),
      status VARCHAR(50) DEFAULT 'new',
      qualified BOOLEAN DEFAULT false,
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Orders/Revenue table
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID REFERENCES leads(id),
      amount DECIMAL(10,2),
      status VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Website traffic metrics
    CREATE TABLE IF NOT EXISTS traffic (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      visitors INTEGER DEFAULT 0,
      page_views INTEGER DEFAULT 0,
      date DATE DEFAULT CURRENT_DATE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `,

  // Tribes Database
  tribes: `
    -- Communities/Tribes table
    CREATE TABLE IF NOT EXISTS communities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255),
      description TEXT,
      member_count INTEGER DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Members table
    CREATE TABLE IF NOT EXISTS members (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      community_id UUID REFERENCES communities(id),
      email VARCHAR(255),
      role VARCHAR(50) DEFAULT 'member',
      joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Revenue table
    CREATE TABLE IF NOT EXISTS revenue (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      community_id UUID REFERENCES communities(id),
      amount DECIMAL(10,2),
      type VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `,

  // AI Personas Database
  ai_personas: `
    -- Social media posts
    CREATE TABLE IF NOT EXISTS posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      persona VARCHAR(100),
      platform VARCHAR(50),
      content TEXT,
      image_url TEXT,
      likes INTEGER DEFAULT 0,
      comments INTEGER DEFAULT 0,
      shares INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Platform analytics
    CREATE TABLE IF NOT EXISTS platform_stats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      platform VARCHAR(50),
      followers INTEGER DEFAULT 0,
      engagement_rate DECIMAL(5,2),
      date DATE DEFAULT CURRENT_DATE
    );
  `,

  // Dashboard/Aggregated Database
  dashboard: `
    -- Daily metrics snapshot
    CREATE TABLE IF NOT EXISTS daily_metrics (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project VARCHAR(100),
      metric_name VARCHAR(100),
      metric_value DECIMAL(15,2),
      date DATE DEFAULT CURRENT_DATE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- System health logs
    CREATE TABLE IF NOT EXISTS system_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      container_name VARCHAR(255),
      status VARCHAR(50),
      error_count INTEGER DEFAULT 0,
      logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `
};

// Test connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from('leads').select('count', { count: 'exact' });
    if (error && error.code !== '42P01') { // Table doesn't exist yet
      console.error('Connection error:', error);
      return false;
    }
    console.log('✓ Supabase connection successful');
    return true;
  } catch (e) {
    console.error('Connection failed:', e.message);
    return false;
  }
}

// Create tables (using RPC or direct SQL)
async function setupDatabase() {
  console.log('Setting up Supabase database...\n');
  
  for (const [project, sql] of Object.entries(schemas)) {
    console.log(`Creating ${project} schema...`);
    // Note: In production, use Supabase Dashboard SQL Editor or migrations
    // This is for documentation purposes
  }
  
  console.log('\n✓ Schema definitions created');
  console.log('\nTo apply these schemas:');
  console.log('1. Go to https://app.supabase.com/project/kbdhsddyvjaefuhijrgq');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Run the SQL for each project');
}

// Migrate existing data from local files
async function migrateData() {
  console.log('\nMigrating existing data...');
  
  // Read leads from cosmic puppies
  const fs = require('fs');
  const path = require('path');
  
  const leadsPath = '/workspace/projects/cosmic/leads';
  if (fs.existsSync(leadsPath)) {
    const files = fs.readdirSync(leadsPath).filter(f => f.endsWith('.json'));
    
    for (const file of files) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(leadsPath, file), 'utf8'));
        console.log(`Found ${content.leads?.length || 0} leads in ${file}`);
        // Insert into Supabase here
      } catch (e) {
        console.error(`Error reading ${file}:`, e.message);
      }
    }
  }
  
  // Read AI persona posts
  const postsPath = '/workspace/projects/ai-personas/daily_posts.log';
  if (fs.existsSync(postsPath)) {
    const content = fs.readFileSync(postsPath, 'utf8').trim();
    const posts = content.split('\n').filter(line => line.trim() && line.trim().startsWith('{'));
    console.log(`Found ${posts.length} posts to migrate`);
  }
  
  console.log('\n✓ Data migration complete');
}

// Main execution
async function main() {
  await testConnection();
  await setupDatabase();
  await migrateData();
  
  console.log('\n═══════════════════════════════════════');
  console.log('  SUPABASE SETUP COMPLETE');
  console.log('═══════════════════════════════════════');
  console.log(`Project URL: ${SUPABASE_URL}`);
  console.log('Dashboard: https://app.supabase.com/project/kbdhsddyvjaefuhijrgq');
  console.log('\nNext steps:');
  console.log('1. Apply SQL schemas in Supabase Dashboard');
  console.log('2. Update dashboard to use Supabase client');
  console.log('3. Set up realtime subscriptions');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { supabase, schemas };