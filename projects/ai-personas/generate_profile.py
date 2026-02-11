import os
import json
import requests
from pathlib import Path
from datetime import datetime

# Emma Rose profile picture generation
# Based on PERSONA_SPECS.md

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    print("Error: OPENAI_API_KEY not set")
    exit(1)

# Emma Rose profile specs
prompt = """Professional portrait photo of Emma Rose, a 25-year-old woman with the following features:
- Long, dark brown wavy hair cascading over shoulders
- Large, warm expressive brown eyes
- Flawless olive/medium skin tone with natural glow
- Slim but curvy figure
- Warm, genuine smile that lights up her face
- Natural makeup - nude lip gloss, subtle eye makeup
- Wearing a casual cream-colored knit sweater
- Soft natural lighting from window
- Blurred home interior background (cozy, warm aesthetic)
- Shot at golden hour for warm skin tones
- Shallow depth of field, professional DSLR quality
- Instagram-worthy portrait style
- Friendly, approachable "girl next door" vibe
- Confident but not arrogant expression
- Photorealistic, highly detailed"""

print("Generating Emma Rose profile picture...")
print(f"Prompt length: {len(prompt)} characters")

# Generate image
response = requests.post(
    "https://api.openai.com/v1/images/generations",
    headers={
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "model": "gpt-image-1",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1536",  # Portrait orientation for profile pic
        "quality": "high"
    }
)

if response.status_code != 200:
    print(f"Error: {response.status_code}")
    print(response.text)
    exit(1)

data = response.json()

# Create output directory
output_dir = Path("/root/.openclaw/workspace/projects/ai-personas/assets")
output_dir.mkdir(parents=True, exist_ok=True)

# Download image
image_url = data["data"][0]["url"]
image_response = requests.get(image_url)

if image_response.status_code != 200:
    print(f"Error downloading image: {image_response.status_code}")
    exit(1)

# Save image
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
filename = f"emma_rose_profile_{timestamp}.png"
filepath = output_dir / filename

with open(filepath, "wb") as f:
    f.write(image_response.content)

print(f"✓ Image saved to: {filepath}")

# Save metadata
metadata = {
    "filename": filename,
    "filepath": str(filepath),
    "prompt": prompt,
    "created_at": datetime.now().isoformat(),
    "model": "gpt-image-1",
    "purpose": "Emma Rose AI persona profile picture"
}

metadata_path = output_dir / f"emma_rose_profile_{timestamp}.json"
with open(metadata_path, "w") as f:
    json.dump(metadata, f, indent=2)

print(f"✓ Metadata saved to: {metadata_path}")
print(f"\nGenerated Emma Rose profile picture successfully!")
print(f"File: {filename}")
print(f"Location: {filepath}")