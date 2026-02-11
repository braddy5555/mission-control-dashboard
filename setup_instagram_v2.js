const { chromium } = require('playwright');

(async () => {
  console.log('Setting up Emma Rose Instagram Profile...\n');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'projects/ai-personas/instagram_auth.json'
  });
  
  const page = await context.newPage();
  
  // Step 1: Go to Emma's profile
  console.log('[1/5] Going to profile page...');
  await page.goto('https://www.instagram.com/emma_roseeexx/', { 
    waitUntil: 'networkidle',
    timeout: 30000 
  });
  await page.waitForTimeout(3000);
  
  await page.screenshot({ path: 'instagram_profile_start.png' });
  console.log('    ✓ Profile page loaded');
  
  // Step 2: Look for Edit Profile button
  console.log('\n[2/5] Looking for Edit Profile button...');
  const editProfileBtn = await page.locator('text=/edit profile/i').first();
  const hasEditButton = await editProfileBtn.isVisible().catch(() => false);
  
  if (hasEditButton) {
    console.log('    ✓ Edit Profile button found');
    await editProfileBtn.click();
    await page.waitForTimeout(3000);
    console.log('    ✓ Clicked Edit Profile');
  } else {
    console.log('    ℹ Edit Profile button not visible, checking page...');
    // Try alternative selectors
    const altEditBtn = await page.locator('a[href*="accounts/edit"], button:has-text("Edit"), a:has-text("Edit")').first();
    if (await altEditBtn.isVisible().catch(() => false)) {
      await altEditBtn.click();
      await page.waitForTimeout(3000);
      console.log('    ✓ Clicked alternative Edit button');
    }
  }
  
  await page.screenshot({ path: 'instagram_edit_page.png' });
  
  // Step 3: Fill in Bio
  console.log('\n[3/5] Filling in bio...');
  const bioField = await page.locator('textarea[name="biography"], textarea[aria-label*="Bio"], textarea[placeholder*="Bio"]').first();
  
  if (await bioField.isVisible().catch(() => false)) {
    const bioText = '🌙 Just a girl sharing my journey\n💕 Lifestyle & vibes\n☕ Coffee lover\n📍 Amsterdam\n💌 DM for collabs';
    await bioField.fill(bioText);
    console.log('    ✓ Bio text entered');
  } else {
    console.log('    ✗ Bio field not found');
  }
  
  // Step 4: Fill in Name
  console.log('\n[4/5] Setting name...');
  const nameField = await page.locator('input[name="first_name"], input[name="name"]').first();
  if (await nameField.isVisible().catch(() => false)) {
    await nameField.fill('Emma Rose');
    console.log('    ✓ Name set to Emma Rose');
  }
  
  // Step 5: Submit
  console.log('\n[5/5] Submitting changes...');
  const submitBtn = await page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Save"), div[role="button"]:has-text("Save")').first();
  
  if (await submitBtn.isVisible().catch(() => false)) {
    await submitBtn.click();
    console.log('    ✓ Changes submitted');
    await page.waitForTimeout(3000);
  } else {
    console.log('    ℹ Submit button not found');
  }
  
  // Final screenshot
  await page.screenshot({ path: 'instagram_profile_final.png', fullPage: true });
  console.log('\n✓ Final screenshot saved');
  
  await browser.close();
  
  console.log('\n========================================');
  console.log('PROFILE SETUP COMPLETE');
  console.log('========================================');
})();
