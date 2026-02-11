const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://kbdhsddyvjaefuhijrgq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_gSVQEq2A5LfZspn5hqc5_w_TyubFph3';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Alternative: Use PostgreSQL direct connection
const { Client } = require('pg');

async function deployViaDirectConnection() {
  // This requires the DB password which should be in environment
  const dbPassword = process.env.SUPABASE_DB_PASSWORD;
  
  if (!dbPassword) {
    console.log('❌ No DB password found in environment');
    return false;
  }
  
  const client = new Client({
    host: 'db.kbdhsddyvjaefuhijrgq.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: dbPassword,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log('✓ Connected to PostgreSQL');
    
    const sqlDir = path.join(__dirname, 'sql');
    const files = [
      'cosmic_puppies.sql',
      'tribes.sql',
      'ai_personas.sql',
      'dashboard.sql'
    ];
    
    for (const file of files) {
      const filePath = path.join(sqlDir, file);
      if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf8');
        console.log(`\nExecuting ${file}...`);
        await client.query(sql);
        console.log(`✓ ${file} deployed`);
      }
    }
    
    await client.end();
    return true;
  } catch (e) {
    console.error('❌ PostgreSQL error:', e.message);
    return false;
  }
}

async function deployViaExec() {
  const { execSync } = require('child_process');
  
  // Check if supabase CLI is available
  try {
    execSync('which supabase', { stdio: 'ignore' });
  } catch (e) {
    console.log('❌ Supabase CLI not found');
    return false;
  }
  
  const sqlDir = path.join(__dirname, 'sql');
  const files = [
    'cosmic_puppies.sql',
    'tribes.sql',
    'ai_personas.sql',
    'dashboard.sql'
  ];
  
  try {
    // Check if linked
    try {
      execSync('supabase status', { stdio: 'ignore' });
    } catch (e) {
      console.log('Linking to project...');
      execSync('supabase link --project-ref kbdhsddyvjaefuhijrgq', { stdio: 'inherit' });
    }
    
    for (const file of files) {
      const filePath = path.join(sqlDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`\nExecuting ${file}...`);
        execSync(`supabase db execute --file ${filePath}`, { stdio: 'inherit' });
        console.log(`✓ ${file} deployed`);
      }
    }
    
    return true;
  } catch (e) {
    console.error('❌ Supabase CLI error:', e.message);
    return false;
  }
}

async function showManualInstructions() {
  console.log('\n═══════════════════════════════════════');
  console.log('  MANUAL DEPLOYMENT REQUIRED');
  console.log('═══════════════════════════════════════\n');
  
  console.log('Method 1: Supabase Dashboard (Easiest)');
  console.log('─────────────────────────────────────────');
  console.log('1. Go to: https://app.supabase.com/project/kbdhsddyvjaefuhijrgq');
  console.log('2. Click "SQL Editor" in left sidebar');
  console.log('3. Click "New Query"');
  console.log('4. Copy-paste contents of each file in dashboard/sql/');
  console.log('5. Click "Run" for each file\n');
  
  console.log('Method 2: Supabase CLI');
  console.log('─────────────────────────────────────────');
  console.log('1. Install: npm install -g supabase');
  console.log('2. Login: supabase login');
  console.log('3. Link: supabase link --project-ref kbdhsddyvjaefuhijrgq');
  console.log('4. Deploy:');
  console.log('   supabase db execute --file dashboard/sql/cosmic_puppies.sql');
  console.log('   supabase db execute --file dashboard/sql/tribes.sql');
  console.log('   supabase db execute --file dashboard/sql/ai_personas.sql');
  console.log('   supabase db execute --file dashboard/sql/dashboard.sql\n');
  
  console.log('Method 3: psql with connection string');
  console.log('─────────────────────────────────────────');
  console.log('Get connection string from:');
  console.log('https://app.supabase.com/project/kbdhsddyvjaefuhijrgq/settings/database\n');
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  SUPABASE AUTO-DEPLOY');
  console.log('═══════════════════════════════════════\n');
  
  // Try direct PostgreSQL connection first
  console.log('Trying direct PostgreSQL connection...');
  if (await deployViaDirectConnection()) {
    console.log('\n✓ All schemas deployed successfully!');
    return;
  }
  
  // Try Supabase CLI
  console.log('\nTrying Supabase CLI...');
  if (await deployViaExec()) {
    console.log('\n✓ All schemas deployed successfully!');
    return;
  }
  
  // Show manual instructions
  await showManualInstructions();
  
  console.log('\n⚠️ Automatic deployment failed.');
  console.log('Please use one of the manual methods above.');
  console.log('\nOnce deployed, run: node dashboard/migrate-data.js');
}

main().catch(console.error);