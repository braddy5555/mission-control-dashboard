# Emma Rose - Daily Content Automation System

## 🎯 DOEL
- Dagelijks nieuwe content posten op Instagram & TikTok
- Target: "Lonely men" demographic aantrekken
- Bouwen van volgers voor affiliate monetisatie
- Consistente Emma Rose persona behouden

## 📅 POSTING SCHEDULE

### Daily Posting Times (Amsterdam timezone)
- **09:00** - Morning post (coffee/yoga)
- **15:00** - Afternoon post (casual/lifestyle)
- **21:00** - Evening post (cozy/intimate)

### Content Rotation
| Day | Theme | Outfit | Setting |
|-----|-------|--------|---------|
| Monday | Yoga Morning | Yoga pants, sports bra | Park/garden |
| Tuesday | Coffee Date | Casual dress | Café terrace |
| Wednesday | Workout | Gym wear | Gym mirror selfie |
| Thursday | Cozy Home | Comfy sweater | Living room |
| Friday | Night Out | Dress | City lights |
| Saturday | Beach Day | Swimsuit | Beach/sunset |
| Sunday | Self Care | Robe/towel | Bedroom mirror |

## 📝 CAPTION TEMPLATES

### Morning Posts
- "Good morning sunshine ☀️ Coffee first, then conquer the day 💕"
- "Rise and grind ✨ Morning yoga session done 🧘‍♀️"
- "Who else needs coffee to function? ☕😅"

### Afternoon Posts
- "Just vibing through the day ✨💕"
- "Casual Tuesday energy ☕"
- "Living my best life in Amsterdam 📍"

### Evening Posts
- "Cozy night in ✨ Perfect way to unwind 💕"
- "Goodnight vibes only 🌙"
- "Self care Sunday 🛁💕"

## 🎨 IMAGE GENERATION PROMPTS

### Base Emma Description (ALTIJD gebruiken)
```
Hyper-realistic photo of Emma Rose, 25 years old woman, long wavy dark brown hair, warm brown eyes, olive skin tone, natural makeup, slight smile, looking at camera
```

### Scene Prompts

**Yoga Morning:**
```
{base_description}, wearing black yoga pants and sports bra, doing yoga pose in a sunny park with green grass and trees, morning light, peaceful atmosphere, shot on iPhone, casual Instagram photo style
```

**Coffee Date:**
```
{base_description}, wearing casual beige summer dress, sitting at outdoor café terrace, holding coffee cup, Amsterdam canal in background, golden hour lighting, candid photo style
```

**Gym Mirror:**
```
{base_description}, wearing matching grey gym set, taking mirror selfie in gym locker room, holding phone, slightly sweaty after workout, confident pose, iPhone camera quality
```

**Cozy Home:**
```
{base_description}, wearing oversized cream sweater, sitting on couch with blanket, warm lighting, living room background, cozy atmosphere, Netflix and chill vibes
```

**Beach Sunset:**
```
{base_description}, wearing black swimsuit, standing on beach at sunset, golden hour, ocean waves in background, wind in hair, silhouette lighting, vacation vibes
```

**Bedroom Mirror:**
```
{base_description}, wearing silk robe, taking mirror selfie in bedroom, morning light through curtains, bed visible in background, intimate but tasteful, iPhone photo
```

## 🔧 AUTOMATION SETUP

### Cron Job (Dagelijks om 09:00)
```bash
# Generate and post Emma content
0 9 * * * cd /root/.openclaw/workspace && node emma_daily_post.js
```

### Daily Script Flow
1. Bepaal dag van de week → kies thema
2. Genereer prompt voor die dag
3. Genereer afbeelding (via Gemini of API)
4. Upload afbeelding naar Postiz
5. Post naar Instagram + TikTok
6. Log resultaat

## 📊 SUCCESS METRICS

- **Volgers per dag:** Target +50-100 per platform
- **Engagement rate:** Target >5%
- **Posts per week:** 21 (3 per dag)
- **Content variatie:** 7 thema's roterend

## 🎯 MONETISATIE PAD

1. **Fase 1 (0-1000 volgers):** Gratis content, volgers bouwen
2. **Fase 2 (1000+ volgers):** Linktree met affiliate links
3. **Fase 3 (5000+ volgers):** Sponsored posts, brand deals
4. **Fase 4 (10000+ volgers):** OnlyFans/premium content promotie

## ⚠️ BELANGRIJKE NOTITIES

- **Geen expliciete content:** Houd het suggestief maar niet pornografisch
- **Consistentie:** Emma Rose persona altijd behouden
- **Timing:** Posten op piekuren (09:00, 15:00, 21:00)
- **Engagement:** Reageren op comments binnen 1 uur
- **Veiligheid:** Nooit persoonlijke info delen

---

**Systeem gereed voor dagelijkse automatisering!**
