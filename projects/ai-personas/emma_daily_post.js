#!/usr/bin/env node
/**
 * Emma Rose Daily Post Automation
 * Runs daily to generate and post Emma Rose content
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  postizApiKey: '91d6443485a3b4d1f3b545e1b14b08f4b35b41baebd993acc7486754cc73c974',
  instagramIntegrationId: 'cmlh2df5s000uog0yqq638ltb',
  tiktokIntegrationId: 'cmlh2fh9e000yog0y55znac7e',
  emmaPortraitPath: '/root/.openclaw/workspace/emma_portrait_generated.png'
};

// Content templates by day of week
const CONTENT_ROTATION = {
  0: { // Sunday
    theme: 'Self Care Sunday',
    outfit: 'robe/towel',
    setting: 'bedroom',
    caption: 'Self care Sunday 🛁💕 Taking time for me today ✨',
    hashtags: '#selfcare #sunday #relax #me time #vibes'
  },
  1: { // Monday
    theme: 'Yoga Morning',
    outfit: 'yoga pants and sports bra',
    setting: 'park',
    caption: 'Starting the week with zen 🧘‍♀️✨ Morning yoga session in the park',
    hashtags: '#yoga #morning #monday #fitness #wellness'
  },
  2: { // Tuesday
    theme: 'Coffee Date',
    outfit: 'casual dress',
    setting: 'café',
    caption: 'Coffee first, adulting later ☕✨ Who else needs caffeine?',
    hashtags: '#coffee #morning #amsterdam #cafe #vibes'
  },
  3: { // Wednesday
    theme: 'Workout Wednesday',
    outfit: 'gym wear',
    setting: 'gym',
    caption: 'Midweek grind 💪✨ No excuses, just results',
    hashtags: '#workout #gym #fitness #wednesday #motivation'
  },
  4: { // Thursday
    theme: 'Cozy Home',
    outfit: 'comfy sweater',
    setting: 'living room',
    caption: 'Cozy night in ✨ Perfect way to unwind 💕',
    hashtags: '#cozy #home #thursday #relax #netflix'
  },
  5: { // Friday
    theme: 'Night Out',
    outfit: 'dress',
    setting: 'city',
    caption: 'Friday night ready ✨💕 Time to shine',
    hashtags: '#friday #nightout #amsterdam #weekend #dressup'
  },
  6: { // Saturday
    theme: 'Beach Day',
    outfit: 'swimsuit',
    setting: 'beach',
    caption: 'Beach vibes only 🌊✨ Sun, sand, and serenity',
    hashtags: '#beach #saturday #summer #sunset #vacation'
  }
};

// Get today's content
function getTodayContent() {
  const dayOfWeek = new Date().getDay();
  return CONTENT_ROTATION[dayOfWeek];
}

// Generate image using available method
async function generateEmmaImage(content) {
  // For now, use the existing portrait
  // TODO: Implement actual image generation when cookies/API available
  console.log(`📸 Would generate: ${content.theme}`);
  console.log(`   Outfit: ${content.outfit}`);
  console.log(`   Setting: ${content.setting}`);
  return CONFIG.emmaPortraitPath;
}

// Upload image to Postiz
async function uploadToPostiz(imagePath) {
  console.log('📤 Uploading image to Postiz...');
  
  const curlCmd = `curl -s -X POST "https://api.postiz.com/public/v1/upload" \
    -H "Authorization: ${CONFIG.postizApiKey}" \
    -F "file=@${imagePath}"`;
  
  try {
    const result = execSync(curlCmd, { encoding: 'utf-8' });
    const data = JSON.parse(result);
    console.log(`✅ Uploaded: ${data.name}`);
    return {
      id: data.id,
      path: data.path,
      name: data.name
    };
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    throw error;
  }
}

// Create and publish post
async function createPost(integrationId, message, imageData, platform) {
  console.log(`📝 Creating ${platform} post...`);
  
  const now = new Date().toISOString();
  const isTikTok = platform === 'tiktok';
  
  let settings = {};
  if (isTikTok) {
    settings = {
      privacy_level: "PUBLIC_TO_EVERYONE",
      duet: true,
      stitch: true,
      comment: true,
      autoAddMusic: "yes",
      brand_content_toggle: false,
      brand_organic_toggle: false,
      content_posting_method: "DIRECT_POST"
    };
  } else {
    settings = {
      post_type: "post"
    };
  }
  
  const payload = {
    type: "now",
    shortLink: false,
    date: now,
    tags: [],
    posts: [{
      integration: { id: integrationId },
      value: [{
        content: message,
        image: [{ id: imageData.id, path: imageData.path }]
      }],
      settings: settings
    }]
  };
  
  const curlCmd = `curl -s -X POST "https://api.postiz.com/public/v1/posts" \
    -H "Authorization: ${CONFIG.postizApiKey}" \
    -H "Content-Type: application/json" \
    -d '${JSON.stringify(payload)}'`;
  
  try {
    const result = execSync(curlCmd, { encoding: 'utf-8' });
    const data = JSON.parse(result);
    console.log(`✅ ${platform} post created: ${data[0]?.postId || 'success'}`);
    return data;
  } catch (error) {
    console.error(`❌ ${platform} post failed:`, error.message);
    throw error;
  }
}

// Log daily activity
function logActivity(content, results) {
  const logPath = '/root/.openclaw/workspace/projects/ai-personas/daily_posts.log';
  const logEntry = {
    date: new Date().toISOString(),
    theme: content.theme,
    caption: content.caption,
    results: results
  };
  
  fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
}

// Main execution
async function main() {
  console.log('╔════════════════════════════════════╗');
  console.log('║    EMMA ROSE DAILY POST SYSTEM     ║');
  console.log('╚════════════════════════════════════╝');
  console.log(`⏰ Run time: ${new Date().toLocaleString()}`);
  console.log('');
  
  try {
    // Get today's content
    const content = getTodayContent();
    console.log(`📅 Today: ${content.theme}`);
    console.log('');
    
    // Generate/prepare image
    const imagePath = await generateEmmaImage(content);
    
    // Upload to Postiz
    const imageData = await uploadToPostiz(imagePath);
    
    // Create posts
    const fullMessage = `${content.caption}\n${content.hashtags}`;
    
    const igResult = await createPost(
      CONFIG.instagramIntegrationId,
      fullMessage,
      imageData,
      'instagram'
    );
    
    const tiktokResult = await createPost(
      CONFIG.tiktokIntegrationId,
      fullMessage,
      imageData,
      'tiktok'
    );
    
    // Log results
    logActivity(content, {
      instagram: igResult,
      tiktok: tiktokResult,
      image: imageData
    });
    
    console.log('');
    console.log('✅ Daily post complete!');
    console.log(`📊 Posted to Instagram + TikTok`);
    console.log(`📝 Theme: ${content.theme}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, getTodayContent };
