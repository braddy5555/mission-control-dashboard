const { chromium } = require('playwright');

(async () => {
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
  
  // Accept cookies
  const acceptBtn = await page.locator('button:has-text("Accept all")').first();
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
    await page.waitForTimeout(2000);
  }
  
  // Debug: List all possible input elements
  console.log('Searching for input elements...\n');
  
  const textareas = await page.locator('textarea').all();
  console.log(`Found ${textareas.length} textarea elements`);
  
  const inputs = await page.locator('input[type="text"]').all();
  console.log(`Found ${inputs.length} text input elements`);
  
  const contentEditables = await page.locator('[contenteditable="true"]').all();
  console.log(`Found ${contentEditables.length} contenteditable elements`);
  
  const placeholders = await page.locator('[placeholder]').all();
  console.log(`Found ${placeholders.length} elements with placeholder`);
  
  for (let i = 0; i < placeholders.length && i < 5; i++) {
    const el = placeholders[i];
    const tag = await el.evaluate(e => e.tagName);
    const ph = await el.getAttribute('placeholder');
    console.log(`  ${i+1}. <${tag}> placeholder="${ph}"`);
  }
  
  // Take screenshot for debugging
  await page.screenshot({ path: 'gemini_interface_debug.png', fullPage: true });
  console.log('\n✓ Screenshot saved: gemini_interface_debug.png');
  
  await browser.close();
})();
