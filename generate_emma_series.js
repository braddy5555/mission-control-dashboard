const { chromium } = require('playwright');
const fs = require('fs');

const EMMA_PROMPTS = [
  {
    name: 'emma_yoga_park',
    prompt: 'A hyper-realistic photo of the same woman Emma, 25 years old, with long wavy dark brown hair, warm brown eyes, flawless olive skin, natural warm smile. She is doing yoga in a sunny park, wearing yoga leggings and a sports bra. Morning sunlight, peaceful atmosphere. Shot on iPhone, casual authentic style.'
  },
  {
    name: 'emma_coffee_city',
    prompt: 'A hyper-realistic photo of the same woman Emma, 25 years old, with long wavy dark brown hair, warm brown eyes, flawless olive skin, natural warm smile. She is holding a coffee cup walking in a European city street, wearing a casual oversized sweater and jeans. Autumn vibes, candid street photography style. Shot on iPhone.'
  },
  {
    name: 'emma_cozy_home',
    prompt: 'A hyper-realistic photo of the same woman Emma, 25 years old, with long wavy dark brown hair, warm brown eyes, flawless olive skin, natural warm smile. She is relaxing on a cozy couch at home, wrapped in a soft blanket, holding a tea mug. Warm indoor lighting, comfortable living room setting. Shot on iPhone, lifestyle aesthetic.'
  },
  {
    name: 'emma_mirror_selfie',
    prompt: 'A hyper-realistic mirror selfie of the same woman Emma, 25 years old, with long wavy dark brown hair, warm brown eyes, flawless olive skin, natural warm smile. She is taking a selfie in a full-length mirror, wearing a cute casual outfit. Bathroom or bedroom setting, typical mirror selfie angle with phone visible. Authentic social media style.'
  },
  {
    name: 'emma_beach_sunset',
    prompt: 'A hyper-realistic photo of the same woman Emma, 25 years old, with long wavy dark brown hair, warm brown eyes, flawless olive skin, natural warm smile. She is standing on a beach during golden hour sunset, wearing a summer dress. Wind in her hair, dreamy vacation vibes. Shot on iPhone, travel aesthetic.'
  },
  {
    name: 'emma_gym_workout',
    prompt: 'A hyper-realistic photo of the same woman Emma, 25 years old, with long wavy dark brown hair tied in a ponytail, warm brown eyes, flawless olive skin, natural warm smile. She is at the gym, taking a post-workout selfie in the mirror, wearing workout clothes. Slightly sweaty, fitness motivation vibe. Shot on iPhone, gym lighting.'
  }
];

(async () => {
  console.log('='.repeat(60));
  console.log('GENERATING EMMA ROSE IMAGE SERIES');
  console.log('='.repeat(60));

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
  });

  let context;
  try {
    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      storageState: '/root/.openclaw/workspace/google_auth.json'
    });
    console.log('✓ Loaded auth state');
  } catch (e) {
    console.log('✗ Auth failed:', e.message);
    await browser.close();
    return;
  }

  const page = await context.newPage();

  // Navigate to Gemini
  console.log('\n[INIT] Opening Gemini...');
  await page.goto('https://gemini.google.com', { waitUntil: 'networkidle', timeout: 30000 });

  const title = await page.title();
  console.log('    Page:', title);

  // Check if signed in
  const isSignedIn = await page.locator('text=Hallo Nadim').first().isVisible().catch(() => false);
  if (!isSignedIn) {
    console.log('✗ Not signed in');
    await browser.close();
    return;
  }
  console.log('✓ Signed in as Nadim');

  // Create output directory
  const outputDir = '/root/.openclaw/workspace/projects/ai-personas/emma_images';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate each image
  for (let i = 0; i < EMMA_PROMPTS.length; i++) {
    const { name, prompt } = EMMA_PROMPTS[i];
    console.log(`\n[${i + 1}/${EMMA_PROMPTS.length}] Generating: ${name}...`);

    try {
      // First time: click Afbeelding maken, subsequent: new chat then click
      if (i === 0) {
        const afbeeldingMaken = await page.locator('text=Afbeelding maken').first();
        await afbeeldingMaken.click({ timeout: 10000 });
        console.log('    Clicked: Afbeelding maken');
      } else {
        // Start new chat
        await page.goto('https://gemini.google.com', { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(2000);
        const afbeeldingMaken = await page.locator('text=Afbeelding maken').first();
        await afbeeldingMaken.click({ timeout: 10000 });
        console.log('    Started new chat, clicked: Afbeelding maken');
      }

      // Wait for input field
      await page.waitForTimeout(1000);

      // Find input field
      const inputField = await page.locator('[contenteditable="true"]').first();
      if (!inputField) {
        console.log('    ✗ Input field not found');
        continue;
      }

      // Type prompt
      await inputField.fill(prompt);
      console.log('    Prompt entered');

      // Submit
      await inputField.press('Enter');
      console.log('    Generating...');

      // Wait for generation (longer wait for images)
      await page.waitForTimeout(25000);

      // Take screenshot
      const screenshotPath = `${outputDir}/${name}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`    ✓ Saved: ${screenshotPath}`);

      // Also try to download the actual image if available
      try {
        const generatedImage = await page.locator('img[alt="Generated image"]').first();
        if (await generatedImage.isVisible({ timeout: 5000 }).catch(() => false)) {
          const imageUrl = await generatedImage.getAttribute('src');
          if (imageUrl) {
            fs.writeFileSync(`${outputDir}/${name}_url.txt`, imageUrl);
            console.log(`    Image URL saved`);
          }
        }
      } catch (e) {
        // Image might not be directly accessible
      }

    } catch (error) {
      console.log(`    ✗ Error: ${error.message}`);
    }

    // Wait between generations
    await page.waitForTimeout(5000);
  }

  // Final screenshot
  await page.screenshot({ path: `${outputDir}/final_state.png`, fullPage: true });

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log('EMMA SERIES GENERATION COMPLETE');
  console.log(`Images saved to: ${outputDir}`);
  console.log('='.repeat(60));
})();
