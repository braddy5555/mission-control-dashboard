const fs = require('fs');
const path = require('path');

// Check if Emma portrait exists
const emmaPortrait = 'emma_portrait_generated.png';
const emmaPath = path.join('/root/.openclaw/workspace', emmaPortrait);

console.log('Emma Rose Image Status Check');
console.log('=============================\n');

if (fs.existsSync(emmaPath)) {
  const stats = fs.statSync(emmaPath);
  console.log('✅ Emma portrait found');
  console.log(`   File: ${emmaPortrait}`);
  console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`   Location: ${emmaPath}`);
  console.log('\n📁 Ready for Google Drive upload');
} else {
  console.log('❌ Emma portrait not found');
  console.log('   Need to regenerate via Gemini');
}

// List all Emma related files
console.log('\n📂 All Emma Files:');
const files = fs.readdirSync('/root/.openclaw/workspace');
const emmaFiles = files.filter(f => f.toLowerCase().includes('emma'));

if (emmaFiles.length > 0) {
  emmaFiles.forEach(f => {
    const fstats = fs.statSync(path.join('/root/.openclaw/workspace', f));
    console.log(`   - ${f} (${(fstats.size / 1024).toFixed(2)} KB)`);
  });
} else {
  console.log('   No Emma files found');
}
