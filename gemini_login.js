const { chromium } = require('playwright');

(async () => {
  console.log('Starting Gemini login flow...');
  
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false, // Show browser for manual login
    args: ['--no-sandbox']
  });
  
  // Create context with persistent storage
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'google_auth.json' // Load saved auth if exists
  });
  
  const page = await context.newPage();
  
  // Navigate to Gemini
  console.log('Going to Gemini...');
  await page.goto('https://gemini.google.com', { waitUntil: 'networkidle' });
  
  console.log('Current URL:', page.url());
  console.log('Page title:', await page.title());
  
  // Check if we're on consent page
  const acceptAllButton = await page.getByRole('button', { name: 'Accept all' });
  if (await acceptAllButton.isVisible().catch(() => false)) {
    console.log('Accepting cookies...');
    await acceptAllButton.click();
    await page.waitForTimeout(2000);
  }
  
  // Check if logged in or need to sign in
  const isLoggedIn = await page.$('text=Gemini').catch(() => null);
  if (!isLoggedIn) {
    console.log('Not logged in yet. Please log in manually in the browser window.');
    console.log('Browser will stay open for 60 seconds...');
    
    // Wait for manual login
    await new Promise(resolve => setTimeout(resolve, 60000));
    
    // Save auth state
    await context.storageState({ path: 'google_auth.json' });
    console.log('Auth saved to google_auth.json');
  } else {
    console.log('Already logged in!');
    await context.storageState({ path: 'google_auth.json' });
    console.log('Auth saved to google_auth.json');
  }
  
  await browser.close();
  console.log('Browser closed.');
})();
