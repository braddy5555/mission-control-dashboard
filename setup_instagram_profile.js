const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('========================================');
  console.log('SETTING UP EMMA ROSE INSTAGRAM PROFILE');
  console.log('========================================\n');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'projects/ai-personas/instagram_auth.json'
  });
  
  const page = await context.newPage();
  
  // Go to profile edit page
  console.log('[1/4] Navigating to profile...');
  await page.goto('https://www.instagram.com/accounts/edit/', { 
    waitUntil: 'networkidle', 
    timeout: 30000 
  });
  
  const title = await page.title();
  console.log('    Page:', title);
  await page.screenshot({ path: 'instagram_profile_initial.png' });
  
  // Check if we're on the edit page
  const bioField = await page.locator('textarea[name="biography"]').first();
  if (await bioField.isVisible().catch(() => false)) {
    console.log('    ✓ Profile edit page loaded');
    
    // Fill in bio
    console.log('\n[2/4] Setting up bio...');
    const bioText = '🌙 Just a girl sharing my journey\n💕 Lifestyle & vibes\n☕ Coffee lover\n📍 Amsterdam\n💌 DM for collabs';
    await bioField.fill(bioText);
    console.log('    ✓ Bio filled');
    
    // Set name
    const nameField = await page.locator('input[name="first_name"]').first();
    if (await nameField.isVisible().catch(() => false)) {
      await nameField.fill('Emma Rose');
      console.log('    ✓ Name set');
    }
    
    // Check for website field
    const websiteField = await page.locator('input[name="external_url"]').first();
    if (await websiteField.isVisible().catch(() => false)) {
      // We'll add linktree link later
      console.log('    ℹ Website field available (add linktree later)');
    }
    
    await page.screenshot({ path: 'instagram_profile_filled.png' });
    
    // Submit changes
    console.log('\n[3/4] Submitting changes...');
    const submitBtn = await page.locator('button[type="submit"]').first();
    if (await submitBtn.isVisible().catch(() => false)) {
      await submitBtn.click();
      console.log('    ✓ Changes submitted');
      await page.waitForTimeout(3000);
    }
    
    // Check for profile photo upload
    console.log('\n[4/4] Checking profile photo options...');
    await page.goto('https://www.instagram.com/emma_roseeexx/', { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'instagram_profile_final.png' });
    console.log('    ✓ Profile screenshot saved');
    
  } else {
    console.log('    ✗ Could not load edit page, taking screenshot for debug');
    await page.screenshot({ path: 'instagram_profile_error.png' });
  }
  
  await browser.close();
  
  console.log('\n========================================');
  console.log('PROFILE SETUP ATTEMPT COMPLETE');
  console.log('========================================');
})();
