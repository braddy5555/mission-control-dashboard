const { chromium } = require('playwright');

(async () => {
  console.log('Testing Gemini access with imported cookies...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'google_auth.json'
  });
  
  const page = await context.newPage();
  
  console.log('Navigating to Gemini...');
  await page.goto('https://gemini.google.com', { waitUntil: 'networkidle' });
  
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  
  // Check if we're logged in
  const pageContent = await page.content();
  const isLoggedIn = pageContent.includes('Gemini') && !pageContent.includes('Sign in');
  
  if (isLoggedIn) {
    console.log('✅ SUCCESS - Logged into Gemini!');
    await page.screenshot({ path: 'gemini_success.png', fullPage: true });
    console.log('Screenshot saved');
  } else {
    console.log('❌ Not logged in - may need fresh cookies');
    await page.screenshot({ path: 'gemini_failed.png', fullPage: true });
  }
  
  await browser.close();
})();
