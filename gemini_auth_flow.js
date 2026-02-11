const { chromium } = require('playwright');

(async () => {
  console.log('='.repeat(60));
  console.log('GOOGLE GEMINI LOGIN FLOW');
  console.log('='.repeat(60));
  
  // Launch browser with persistent context
  const browser = await chromium.launch({ 
    headless: false, // Visible browser for manual login
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
  });
  
  // Try to load existing auth or create new context
  let context;
  try {
    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      storageState: '/root/.openclaw/workspace/google_auth.json'
    });
    console.log('✓ Loaded existing auth state');
  } catch (e) {
    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    console.log('✓ New browser context created');
  }
  
  const page = await context.newPage();
  
  // Navigate to Gemini
  console.log('\n[1/4] Navigating to Gemini...');
  await page.goto('https://gemini.google.com', { waitUntil: 'networkidle' });
  console.log('    URL:', page.url());
  
  // Check for consent/cookie page
  const acceptAllButton = await page.locator('button:has-text("Accept all")').first();
  if (await acceptAllButton.isVisible().catch(() => false)) {
    console.log('[2/4] Accepting cookies...');
    await acceptAllButton.click();
    await page.waitForTimeout(2000);
    console.log('    ✓ Cookies accepted');
  } else {
    console.log('[2/4] No cookie dialog found (already accepted or different state)');
  }
  
  // Check login status
  console.log('[3/4] Checking login status...');
  const signInButton = await page.locator('a:has-text("Sign in")').first();
  const isSignInVisible = await signInButton.isVisible().catch(() => false);
  
  if (isSignInVisible) {
    console.log('    ⚠ Not logged in - Sign in button detected');
    console.log('    → Please LOG IN MANUALLY in the browser window');
    console.log('    → Waiting 60 seconds for you to complete login...');
    
    // Wait for manual login
    await new Promise(resolve => setTimeout(resolve, 60000));
    
    // Save auth state
    console.log('[4/4] Saving auth state...');
    await context.storageState({ path: '/root/.openclaw/workspace/google_auth.json' });
    console.log('    ✓ Auth saved to google_auth.json');
    
  } else {
    console.log('    ✓ Already logged in!');
    
    // Save auth state anyway
    console.log('[4/4] Saving auth state...');
    await context.storageState({ path: '/root/.openclaw/workspace/google_auth.json' });
    console.log('    ✓ Auth saved to google_auth.json');
    
    // Take screenshot of Gemini interface
    await page.screenshot({ path: '/root/.openclaw/workspace/gemini_logged_in.png', fullPage: true });
    console.log('    ✓ Screenshot saved');
  }
  
  await browser.close();
  console.log('\n' + '='.repeat(60));
  console.log('LOGIN FLOW COMPLETE');
  console.log('='.repeat(60));
})();
