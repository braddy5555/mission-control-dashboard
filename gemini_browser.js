const { chromium } = require('playwright');

(async () => {
  console.log('Starting browser for Google Gemini...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  // Navigate to Google Gemini
  console.log('Navigating to gemini.google.com...');
  await page.goto('https://gemini.google.com', { waitUntil: 'networkidle' });
  
  console.log('Current URL:', page.url());
  console.log('Page title:', await page.title());
  
  // Take screenshot to see the state
  await page.screenshot({ path: 'gemini_screenshot.png', fullPage: true });
  console.log('Screenshot saved to gemini_screenshot.png');
  
  // Check if login is required
  const loginButton = await page.$('text=Sign in');
  if (loginButton) {
    console.log('Login button detected - Google account sign-in required');
  }
  
  await browser.close();
  console.log('Browser closed.');
})();