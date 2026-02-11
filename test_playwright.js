const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright test...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.google.com');
  const title = await page.title();
  console.log('Page title:', title);
  
  await browser.close();
  console.log('Playwright test SUCCESS - Browser automation werkt!');
})();