const { chromium } = require('playwright');

(async () => {
  console.log('========================================');
  console.log('GENERATING MORE EMMA IMAGES');
  console.log('Same woman, different settings');
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
  await page.goto('https://gemini.google.com', { timeout: 15000 });
  await page.waitForTimeout(3000);
  
  // Define Emma consistently
  const emmaBase = "Emma, same beautiful 25-year-old woman with long wavy dark brown hair, warm brown eyes, flawless olive skin";
  
  const prompts = [
    {
      name: "coffee_city",
      prompt: `${emmaBase}. She's walking in a European city street holding a coffee cup, wearing casual jeans and a cozy beige sweater. Morning light, candid street photography style. Looking away from camera, natural pose.`
    },
    {
      name: "yoga_park", 
      prompt: `${emmaBase}. She's doing yoga in a park at sunrise, wearing black yoga leggings and a grey sports bra. Peaceful nature background. Side profile view.`
    },
    {
      name: "home_cozy",
      prompt: `${emmaBase}. She's sitting on a couch at home with a blanket, wearing comfortable loungewear. Cozy living room, warm lighting. Relaxed smile, looking at camera.`
    },
    {
      name: "mirror_selfie",
      prompt: `${emmaBase}. She's taking a mirror selfie in a bathroom, wearing workout clothes after gym. Holding phone, slight smile. Modern bathroom interior.`
    }
  ];
  
  for (let i = 0; i < prompts.length; i++) {
    const { name, prompt } = prompts[i];
    console.log(`\n[${i+1}/${prompts.length}] Generating: ${name}...`);
    
    try {
      // Click image button
      const imageBtn = await page.locator('text=Afbeelding maken').first();
      if (await imageBtn.isVisible().catch(() => false)) {
        await imageBtn.click();
        await page.waitForTimeout(2000);
      }
      
      // Enter prompt
      const input = await page.locator('[contenteditable="true"]').first();
      if (await input.isVisible().catch(() => false)) {
        await input.fill(prompt);
        await input.press('Enter');
        console.log('    ✓ Prompt submitted');
        
        // Wait for generation
        console.log('    Waiting 35 seconds...');
        await page.waitForTimeout(35000);
        
        await page.screenshot({ path: `emma_${name}.png`, fullPage: true });
        console.log(`    ✓ Saved: emma_${name}.png`);
      }
    } catch (e) {
      console.log(`    ⚠ Error: ${e.message}`);
    }
  }
  
  console.log('\n========================================');
  console.log('ALL IMAGES GENERATED');
  console.log('========================================');
  
  await browser.close();
})();
