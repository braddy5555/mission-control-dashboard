// Migrate existing local data to Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://kbdhsddyvjaefuhijrgq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_gSVQEq2A5LfZspn5hqc5_w_TyubFph3';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrateLeads() {
  console.log('Migrating Cosmic Puppies leads...');
  
  const leadsPath = '/workspace/projects/cosmic/leads';
  if (!fs.existsSync(leadsPath)) {
    console.log('No leads directory found');
    return;
  }
  
  const files = fs.readdirSync(leadsPath).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(leadsPath, file), 'utf8'));
      
      if (content.leads && Array.isArray(content.leads)) {
        for (const lead of content.leads) {
          const { error } = await supabase.from('cosmic_leads').insert({
            source: lead.source || 'unknown',
            name: lead.name || lead.company || 'Unknown',
            email: lead.email || null,
            company: lead.company || null,
            status: lead.status || 'new',
            qualified: lead.qualified || false,
            notes: JSON.stringify(lead)
          });
          
          if (error) {
            console.error(`Error inserting lead: ${error.message}`);
          }
        }
        console.log(`Migrated ${content.leads.length} leads from ${file}`);
      }
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  }
}

async function migratePosts() {
  console.log('\nMigrating AI Persona posts...');
  
  const postsPath = '/workspace/projects/ai-personas/daily_posts.log';
  if (!fs.existsSync(postsPath)) {
    console.log('No posts log found');
    return;
  }
  
  const content = fs.readFileSync(postsPath, 'utf8').trim();
  const lines = content.split('\n').filter(line => line.trim() && line.trim().startsWith('{'));
  
  for (const line of lines) {
    try {
      const post = JSON.parse(line);
      
      // Insert into ai_posts
      const { error } = await supabase.from('ai_posts').insert({
        persona_id: null, // Will be linked later
        platform: 'instagram',
        content: post.caption || '',
        caption: post.caption || '',
        image_url: post.results?.image?.path || null,
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        posted_at: post.date || new Date().toISOString()
      });
      
      if (error) {
        console.error(`Error inserting post: ${error.message}`);
      }
    } catch (e) {
      console.error(`Error parsing post:`, e.message);
    }
  }
  
  console.log(`Migrated ${lines.length} posts`);
}

async function verifyMigration() {
  console.log('\nVerifying migration...');
  
  // Check leads
  const { count: leadsCount, error: leadsError } = await supabase
    .from('cosmic_leads')
    .select('*', { count: 'exact', head: true });
  
  if (leadsError) {
    console.error('Error counting leads:', leadsError.message);
  } else {
    console.log(`✓ Leads in database: ${leadsCount}`);
  }
  
  // Check posts
  const { count: postsCount, error: postsError } = await supabase
    .from('ai_posts')
    .select('*', { count: 'exact', head: true });
  
  if (postsError) {
    console.error('Error counting posts:', postsError.message);
  } else {
    console.log(`✓ Posts in database: ${postsCount}`);
  }
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  SUPABASE DATA MIGRATION');
  console.log('═══════════════════════════════════════\n');
  
  await migrateLeads();
  await migratePosts();
  await verifyMigration();
  
  console.log('\n═══════════════════════════════════════');
  console.log('  MIGRATION COMPLETE');
  console.log('═══════════════════════════════════════');
}

main().catch(console.error);