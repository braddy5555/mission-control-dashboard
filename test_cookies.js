const { chromium } = require('playwright');

(async () => {
  console.log('Testing fresh cookies...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'google_auth.json'
  });
  
  const page = await context.newPage();
  
  await page.goto('https://gemini.google.com', { timeout: 15000 });
  await page.waitForTimeout(3000);
  
  // Check if logged in
  const content = await page.content();
  const hasProfile = content.includes('profile') || content.includes('account');
  const hasSignOut = content.includes('Sign out') || content.includes('Uitloggen');
  
  console.log('Has profile indicator:', hasProfile);
  console.log('Has sign out:', hasSignOut);
  
  await page.screenshot({ path: 'gemini_cookie_test.png' });
  console.log('Screenshot saved');
  
  await browser.close();
})();
