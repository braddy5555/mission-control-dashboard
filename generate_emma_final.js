const { chromium } = require('playwright');

(async () => {
  console.log('========================================');
  console.log('GENERATING EMMA ROSE - AI PERSONA');
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
  console.log('[1/4] Opening Gemini...');
  await page.goto('https://gemini.google.com', { timeout: 15000 });
  await page.waitForTimeout(3000);
  console.log('    ✓ Gemini loaded');
  
  // Click on "Afbeelding maken" (Make image)
  console.log('\n[2/4] Clicking "Afbeelding maken"...');
  const imageBtn = await page.locator('text=Afbeelding maken').first();
  if (await imageBtn.isVisible().catch(() => false)) {
    await imageBtn.click();
    console.log('    ✓ Image generation mode activated');
    await page.waitForTimeout(2000);
  }
  
  // Generate Emma Rose portrait
  console.log('\n[3/4] Generating Emma Rose portrait...');
  const prompt = `A hyper-realistic portrait photo of Emma, a beautiful 25-year-old woman. She has long wavy dark brown hair, warm brown eyes, flawless olive skin, and a natural warm smile. She's wearing a simple white tank top. The photo looks like a casual selfie taken with natural lighting in a bedroom. Soft, warm lighting. High quality, photorealistic, 4K. Looking directly at camera with a slight flirty smile.`;
  
  const inputField = await page.locator('[contenteditable="true"]').first();
  if (await inputField.isVisible().catch(() => false)) {
    await inputField.fill(prompt);
    console.log('    ✓ Prompt entered');
    
    // Press Enter to generate
    await inputField.press('Enter');
    console.log('    ✓ Generating image...');
    console.log('    Waiting 30 seconds for generation...');
    await page.waitForTimeout(30000);
    
    await page.screenshot({ path: 'emma_portrait_generated.png', fullPage: true });
    console.log('    ✓ Screenshot saved: emma_portrait_generated.png');
  }
  
  // Generate second image - Yoga
  console.log('\n[4/4] Generating Emma yoga photo...');
  const prompt2 = `A hyper-realistic photo of Emma, the same 25-year-old woman with long wavy dark brown hair and warm brown eyes. She's doing a yoga pose in a park at sunrise, wearing black yoga leggings and a grey sports bra. Natural morning light, peaceful atmosphere. Same face as the portrait. Photorealistic, high quality. Full body shot from the side.`;
  
  // Click new chat for fresh generation
  const newChatBtn = await page.locator('text=Nieuwe chat').first();
  if (await newChatBtn.isVisible().catch(() => false)) {
    await newChatBtn.click();
    await page.waitForTimeout(2000);
  }
  
  // Click image button again
  const imageBtn2 = await page.locator('text=Afbeelding maken').first();
  if (await imageBtn2.isVisible().catch(() => false)) {
    await imageBtn2.click();
    await page.waitForTimeout(2000);
  }
  
  const inputField2 = await page.locator('[contenteditable="true"]').first();
  if (await inputField2.isVisible().catch(() => false)) {
    await inputField2.fill(prompt2);
    await inputField2.press('Enter');
    console.log('    ✓ Yoga prompt submitted');
    console.log('    Waiting 30 seconds...');
    await page.waitForTimeout(30000);
    
    await page.screenshot({ path: 'emma_yoga_generated.png', fullPage: true });
    console.log('    ✓ Screenshot saved: emma_yoga_generated.png');
  }
  
  console.log('\n========================================');
  console.log('IMAGE GENERATION COMPLETE');
  console.log('========================================');
  
  await browser.close();
})();
