const { chromium } = require('playwright');

(async () => {
  console.log('Testing Gemini access...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'google_auth.json'
  });
  
  const page = await context.newPage();
  
  console.log('Navigating to Gemini (10s timeout)...');
  try {
    await page.goto('https://gemini.google.com', { timeout: 10000, waitUntil: 'domcontentloaded' });
    console.log('Page loaded');
    console.log('URL:', page.url());
    console.log('Title:', await page.title());
    
    await page.screenshot({ path: 'gemini_test.png' });
    console.log('Screenshot saved');
    
    // Check content
    const content = await page.content();
    if (content.includes('Gemini') || content.includes('gemini')) {
      console.log('✅ Gemini page accessed!');
    } else {
      console.log('⚠️ Page loaded but content unclear');
    }
  } catch (e) {
    console.log('Error:', e.message);
    console.log('Current URL:', page.url());
  }
  
  await browser.close();
})();
