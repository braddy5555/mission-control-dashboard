const { chromium } = require('playwright');

(async () => {
  console.log('Testing Instagram login...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'projects/ai-personas/instagram_auth.json'
  });
  
  const page = await context.newPage();
  
  await page.goto('https://www.instagram.com/', { timeout: 15000 });
  await page.waitForTimeout(3000);
  
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check if logged in by looking for feed or profile
  const content = await page.content();
  const isLoggedIn = content.includes('Emma_Roseeexx') || 
                     content.includes('Home') || 
                     !content.includes('Log in');
  
  console.log('Logged in:', isLoggedIn);
  
  await page.screenshot({ path: 'instagram_test.png' });
  console.log('Screenshot saved');
  
  await browser.close();
})();
