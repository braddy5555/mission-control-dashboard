const { chromium } = require('playwright');

(async () => {
  console.log('Testing TikTok login...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'projects/ai-personas/tiktok_auth.json'
  });
  
  const page = await context.newPage();
  
  await page.goto('https://www.tiktok.com/', { timeout: 15000 });
  await page.waitForTimeout(3000);
  
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check if logged in
  const content = await page.content();
  const isLoggedIn = content.includes('emma_roseeexx') || 
                     content.includes('For You') || 
                     !content.includes('Log in');
  
  console.log('Logged in:', isLoggedIn);
  
  await page.screenshot({ path: 'tiktok_test.png' });
  console.log('Screenshot saved');
  
  await browser.close();
})();
