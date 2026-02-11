const { chromium } = require('playwright');

(async () => {
  console.log('Trying to bypass onboarding and access profile...\n');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'projects/ai-personas/instagram_auth.json'
  });
  
  const page = await context.newPage();
  
  // Try direct access to edit page
  console.log('[1/3] Trying direct access to edit page...');
  await page.goto('https://www.instagram.com/accounts/edit/', { 
    waitUntil: 'networkidle',
    timeout: 30000 
  });
  await page.waitForTimeout(3000);
  
  const currentUrl = page.url();
  console.log('    Current URL:', currentUrl);
  
  await page.screenshot({ path: 'instagram_direct_edit.png' });
  
  // Check if we're on the edit page or got redirected
  if (currentUrl.includes('/accounts/edit')) {
    console.log('    ✓ On edit page');
    
    // Look for bio field
    const bioField = await page.locator('textarea').first();
    if (await bioField.isVisible().catch(() => false)) {
      console.log('    ✓ Bio field found');
      
      // Fill bio
      const bioText = '🌙 Just a girl sharing my journey\n💕 Lifestyle & vibes\n☕ Coffee lover\n📍 Amsterdam\n💌 DM for collabs';
      await bioField.fill(bioText);
      console.log('    ✓ Bio filled');
      
      // Look for submit button
      const submitBtn = await page.locator('button[type="submit"]').first();
      if (await submitBtn.isVisible().catch(() => false)) {
        await submitBtn.click();
        console.log('    ✓ Changes saved');
        await page.waitForTimeout(3000);
      }
      
      await page.screenshot({ path: 'instagram_edit_success.png' });
    } else {
      console.log('    ✗ Bio field not found on edit page');
    }
  } else {
    console.log('    ✗ Got redirected to:', currentUrl);
    
    // Try clicking Continue on onboarding page
    const continueBtn = await page.locator('button:has-text("Continue")').first();
    if (await continueBtn.isVisible().catch(() => false)) {
      console.log('    Clicking Continue button...');
      await continueBtn.click();
      await page.waitForTimeout(3000);
      
      await page.screenshot({ path: 'instagram_after_continue.png' });
      console.log('    ✓ Clicked Continue');
    }
  }
  
  await browser.close();
  console.log('\nDone');
})();
