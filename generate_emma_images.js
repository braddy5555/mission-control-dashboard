const { chromium } = require('playwright');

(async () => {
  console.log('========================================');
  console.log('GENERATING AI PERSONA IMAGES - EMMA ROSE');
  console.log('========================================\n');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    storageState: 'google_auth.json'
  });
  
  const page = await context.newPage();
  
  // Go to Gemini
  console.log('[1/3] Opening Gemini...');
  await page.goto('https://gemini.google.com', { 
    timeout: 15000, 
    waitUntil: 'domcontentloaded' 
  });
  console.log('    ✓ Gemini loaded');
  await page.waitForTimeout(2000);
  
  // Accept cookies if present
  const acceptBtn = await page.locator('text=Accept all').first();
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
    console.log('    ✓ Cookies accepted');
    await page.waitForTimeout(1000);
  }
  
  // Find the input field and enter prompt
  console.log('\n[2/3] Generating first image...');
  console.log('    Prompt: Emma Rose portrait');
  
  // Look for input field
  const inputField = await page.locator('textarea, div[contenteditable="true"], input[placeholder*="Ask" i]').first();
  
  if (await inputField.isVisible().catch(() => false)) {
    // Generate Emma Rose portrait
    const prompt = `Create a hyper-realistic portrait of a beautiful 25-year-old woman named Emma. She has long wavy dark brown hair, warm brown eyes, olive skin, and a warm natural smile. She's wearing a simple white tank top. The photo looks like a casual selfie taken with natural lighting. High quality, photorealistic, 4K quality.`;
    
    await inputField.fill(prompt);
    console.log('    ✓ Prompt entered');
    
    // Press Enter to submit
    await inputField.press('Enter');
    console.log('    ✓ Submitted');
    
    // Wait for generation (Gemini takes time)
    console.log('    Waiting for image generation (15s)...');
    await page.waitForTimeout(15000);
    
    await page.screenshot({ path: 'emma_gen_1.png', fullPage: true });
    console.log('    ✓ Screenshot saved: emma_gen_1.png');
    
  } else {
    console.log('    ⚠ Input field not found');
    await page.screenshot({ path: 'gemini_debug.png', fullPage: true });
  }
  
  console.log('\n[3/3] Generating second image (yoga)...');
  
  // Clear and generate second image
  const inputField2 = await page.locator('textarea, div[contenteditable="true"]').first();
  
  if (await inputField2.isVisible().catch(() => false)) {
    const prompt2 = `Create a hyper-realistic photo of the same woman Emma, 25 years old, with long wavy dark brown hair and warm brown eyes. She's doing yoga in a park, wearing black yoga leggings and a sports bra. Natural morning light, peaceful atmosphere. Same face as before. Photorealistic, high quality.`;
    
    await inputField2.fill(prompt2);
    await inputField2.press('Enter');
    console.log('    ✓ Yoga prompt submitted');
    
    await page.waitForTimeout(15000);
    await page.screenshot({ path: 'emma_gen_2.png', fullPage: true });
    console.log('    ✓ Screenshot saved: emma_gen_2.png');
  }
  
  console.log('\n========================================');
  console.log('IMAGE GENERATION COMPLETE');
  console.log('========================================');
  
  await browser.close();
})();
