const { chromium } = require('playwright');

(async () => {
  console.log('========================================');
  console.log('SOCIAL MEDIA ACCOUNT CREATION');
  console.log('Email: harborboy88@hotmail.com');
  console.log('========================================\n');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'hotmail_auth.json'
  });
  
  const page = await context.newPage();
  
  // ===== TIKTOK =====
  console.log('[1/4] Creating TikTok account...');
  try {
    await page.goto('https://www.tiktok.com/signup', { timeout: 15000, waitUntil: 'domcontentloaded' });
    console.log('    TikTok page loaded');
    console.log('    URL:', page.url());
    
    await page.screenshot({ path: 'tiktok_signup.png' });
    console.log('    Screenshot saved: tiktok_signup.png');
    
    // Check for email signup option
    const emailSignup = await page.locator('text=Use phone or email').first();
    if (await emailSignup.isVisible().catch(() => false)) {
      await emailSignup.click();
      console.log('    Clicked "Use phone or email"');
      await page.waitForTimeout(2000);
    }
    
    // Look for email input
    const emailInput = await page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first();
    if (await emailInput.isVisible().catch(() => false)) {
      await emailInput.fill('harborboy88@hotmail.com');
      console.log('    Email filled in');
    } else {
      console.log('    ⚠ Email input not found - may need manual intervention');
    }
    
    await page.screenshot({ path: 'tiktok_progress.png' });
    
  } catch (e) {
    console.log('    ⚠ TikTok error:', e.message);
    await page.screenshot({ path: 'tiktok_error.png' });
  }
  
  // ===== INSTAGRAM =====
  console.log('\n[2/4] Creating Instagram account...');
  try {
    await page.goto('https://www.instagram.com/accounts/emailsignup/', { timeout: 15000, waitUntil: 'domcontentloaded' });
    console.log('    Instagram page loaded');
    console.log('    URL:', page.url());
    
    await page.screenshot({ path: 'instagram_signup.png' });
    console.log('    Screenshot saved: instagram_signup.png');
    
    // Check for email or phone toggle
    const emailToggle = await page.locator('text=Sign up with email').first();
    if (await emailToggle.isVisible().catch(() => false)) {
      await emailToggle.click();
      console.log('    Selected email signup');
      await page.waitForTimeout(1000);
    }
    
    // Fill email
    const emailInput = await page.locator('input[name="emailOrPhone"], input[type="email"]').first();
    if (await emailInput.isVisible().catch(() => false)) {
      await emailInput.fill('harborboy88@hotmail.com');
      console.log('    Email filled in');
      
      // Fill other required fields
      const fullNameInput = await page.locator('input[name="fullName"]').first();
      if (await fullNameInput.isVisible().catch(() => false)) {
        await fullNameInput.fill('Emma Rose');
        console.log('    Full name filled in');
      }
      
      const usernameInput = await page.locator('input[name="username"]').first();
      if (await usernameInput.isVisible().catch(() => false)) {
        await usernameInput.fill('emmarose.ai');
        console.log('    Username filled in');
      }
      
      const passwordInput = await page.locator('input[name="password"]').first();
      if (await passwordInput.isVisible().catch(() => false)) {
        await passwordInput.fill('SecurePass123!');
        console.log('    Password filled in');
      }
    }
    
    await page.screenshot({ path: 'instagram_progress.png' });
    
  } catch (e) {
    console.log('    ⚠ Instagram error:', e.message);
    await page.screenshot({ path: 'instagram_error.png' });
  }
  
  // ===== X (TWITTER) =====
  console.log('\n[3/4] Creating X (Twitter) account...');
  try {
    await page.goto('https://twitter.com/i/flow/signup', { timeout: 15000, waitUntil: 'domcontentloaded' });
    console.log('    X page loaded');
    console.log('    URL:', page.url());
    
    await page.screenshot({ path: 'x_signup.png' });
    console.log('    Screenshot saved: x_signup.png');
    
  } catch (e) {
    console.log('    ⚠ X error:', e.message);
    await page.screenshot({ path: 'x_error.png' });
  }
  
  // ===== PINTEREST =====
  console.log('\n[4/4] Creating Pinterest account...');
  try {
    await page.goto('https://www.pinterest.com/', { timeout: 15000, waitUntil: 'domcontentloaded' });
    console.log('    Pinterest page loaded');
    console.log('    URL:', page.url());
    
    await page.screenshot({ path: 'pinterest_home.png' });
    console.log('    Screenshot saved: pinterest_home.png');
    
    // Look for signup button
    const signupBtn = await page.locator('text=Sign up').first();
    if (await signupBtn.isVisible().catch(() => false)) {
      await signupBtn.click();
      console.log('    Clicked Sign up');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'pinterest_signup.png' });
    }
    
  } catch (e) {
    console.log('    ⚠ Pinterest error:', e.message);
    await page.screenshot({ path: 'pinterest_error.png' });
  }
  
  console.log('\n========================================');
  console.log('ACCOUNT CREATION ATTEMPT COMPLETE');
  console.log('========================================');
  
  // Save updated auth state
  await context.storageState({ path: 'hotmail_auth_updated.json' });
  console.log('\nUpdated auth saved to hotmail_auth_updated.json');
  
  await browser.close();
})();
