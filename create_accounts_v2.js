const { chromium } = require('playwright');

(async () => {
  console.log('========================================');
  console.log('SOCIAL MEDIA ACCOUNT CREATION - ATTEMPT 2');
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
  
  // ===== INSTAGRAM (Best success rate) =====
  console.log('[1/3] Creating Instagram account...');
  try {
    await page.goto('https://www.instagram.com/accounts/emailsignup/', { 
      timeout: 20000, 
      waitUntil: 'networkidle' 
    });
    console.log('    Page loaded, waiting for form...');
    
    // Wait for the signup form to appear
    await page.waitForSelector('input[name="emailOrPhone"]', { timeout: 10000 });
    console.log('    ✓ Signup form detected');
    
    // Fill in the form
    await page.fill('input[name="emailOrPhone"]', 'harborboy88@hotmail.com');
    console.log('    ✓ Email filled');
    
    await page.fill('input[name="fullName"]', 'Emma Rose');
    console.log('    ✓ Full name filled');
    
    // Generate username
    await page.fill('input[name="username"]', 'emmarose.ai.official');
    console.log('    ✓ Username filled');
    
    await page.fill('input[name="password"]', 'SecurePass2026!');
    console.log('    ✓ Password filled');
    
    await page.screenshot({ path: 'instagram_form_filled.png' });
    console.log('    ✓ Screenshot saved');
    
    // Click signup button
    const signupBtn = await page.locator('button[type="submit"]').first();
    if (await signupBtn.isVisible().catch(() => false)) {
      await signupBtn.click();
      console.log('    ✓ Signup button clicked');
      await page.waitForTimeout(3000);
      await page.screenshot({ path: 'instagram_after_submit.png' });
    }
    
  } catch (e) {
    console.log('    ⚠ Error:', e.message);
    await page.screenshot({ path: 'instagram_error.png' });
  }
  
  // ===== TIKTOK =====
  console.log('\n[2/3] Creating TikTok account...');
  try {
    await page.goto('https://www.tiktok.com/signup', { 
      timeout: 20000, 
      waitUntil: 'networkidle' 
    });
    console.log('    Page loaded');
    await page.waitForTimeout(3000);
    
    // Dismiss GDPR banner if present
    const gotItBtn = await page.locator('text=Got it').first();
    if (await gotItBtn.isVisible().catch(() => false)) {
      await gotItBtn.click();
      console.log('    ✓ Dismissed GDPR banner');
      await page.waitForTimeout(1000);
    }
    
    // Click "Use phone or email"
    const emailOption = await page.locator('text=Use phone or email').first();
    if (await emailOption.isVisible().catch(() => false)) {
      await emailOption.click();
      console.log('    ✓ Selected email signup');
      await page.waitForTimeout(2000);
    }
    
    await page.screenshot({ path: 'tiktok_progress.png' });
    console.log('    ✓ Screenshot saved');
    
  } catch (e) {
    console.log('    ⚠ Error:', e.message);
    await page.screenshot({ path: 'tiktok_error.png' });
  }
  
  // ===== PINTEREST =====
  console.log('\n[3/3] Creating Pinterest account...');
  try {
    await page.goto('https://www.pinterest.com/', { 
      timeout: 20000, 
      waitUntil: 'networkidle' 
    });
    console.log('    Page loaded');
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'pinterest_home.png' });
    console.log('    ✓ Screenshot saved');
    
    // Look for signup button
    const signupBtns = await page.locator('text=/sign up/i').all();
    console.log(`    Found ${signupBtns.length} signup buttons`);
    
    for (const btn of signupBtns.slice(0, 3)) {
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        console.log('    ✓ Clicked signup button');
        await page.waitForTimeout(3000);
        await page.screenshot({ path: 'pinterest_signup.png' });
        break;
      }
    }
    
  } catch (e) {
    console.log('    ⚠ Error:', e.message);
    await page.screenshot({ path: 'pinterest_error.png' });
  }
  
  console.log('\n========================================');
  console.log('ACCOUNT CREATION ATTEMPT 2 COMPLETE');
  console.log('========================================');
  
  await context.storageState({ path: 'hotmail_auth_updated.json' });
  await browser.close();
})();
