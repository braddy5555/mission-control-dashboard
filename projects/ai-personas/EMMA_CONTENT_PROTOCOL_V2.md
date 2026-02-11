# Emma Rose Content Protocol - VERSION 2.0
## STRICTE GOEDKEURINGSWERKFLOW

---

## ⚠️ BELANGRIJKE REGELS

1. **NOOIT automatisch posten zonder goedkeuring**
2. **ALTIJD unieke content per post** (geen hergebruik)
3. **ALTJIJD downloaden** (geen screenshots)
4. **ALTIJD uploaden naar Google Drive** voor review
5. **Video's > Foto's** waar mogelijk (Veo3)

---

## 📋 STAP-VOOR-STAP PROTOCOL

### STAP 1: Content Planning (DAGELIJKSE ROUTINE)

**Voordat er ook maar iets wordt gemaakt:**

1. Check content kalender:
   - Maandag: Yoga Morning
   - Dinsdag: Coffee Date  
   - Woensdag: Workout Wednesday
   - Donderdag: Cozy Home
   - Vrijdag: Night Out
   - Zaterdag: Beach Day
   - Zondag: Self Care

2. Bepaal format:
   - **Video (PREFERRED):** TikTok, Reels (9:16, 15-30 sec)
   - **Foto:** Instagram post (4:5 of 1:1)
   - **Mix:** Carousel voor Instagram

3. Genereer **UNIEKE** prompt voor die dag/specifieke setting

---

### STAP 2: Content Generatie

#### OPTIE A: Video (Veo3 via Gemini)

**Vereisten:**
- Browser automation actief
- Gemini sessie geopend
- Veo3 tool geselecteerd

**Prompt template:**
```
Emma Rose, 25, [SPECIFIEKE SETTING], [SPECIFIEKE OUTFIT], 
[SPECIFIEKE ACTIE], [TIJD VAN DAG], [WEER/LIGHTING],
hyper-realistic, cinematic, 4K quality, iPhone footage style

NO voice, simple movements, subtle, alluring but tasteful
```

**Voorbeelden per dag:**

**Maandag - Yoga Morning:**
```
Emma Rose, 25, doing yoga poses in a sunny park with green grass,
black yoga pants and sports bra, morning light, peaceful atmosphere,
stretching, tree pose, wide shot and close-up, hyper-realistic video,
4K, smooth camera movements, serene music implied
```

**Dinsdag - Coffee Date:**
```
Emma Rose, 25, sitting at outdoor café terrace, casual beige summer dress,
holding coffee cup, sipping, looking at phone, Amsterdam canal in background,
golden hour lighting, candid style, people walking by in background,
hyper-realistic, 4K video, handheld camera feel
```

**Woensdag - Workout:**
```
Emma Rose, 25, gym locker room, matching grey gym set,
taking mirror selfie video, holding phone, checking hair,
confident pose, post-workout glow, fluorescent lighting,
hyper-realistic, 4K, iPhone front camera style
```

#### OPTIE B: Foto (Imagen3 via Gemini)

**Alleen als video niet lukt**

**Prompt template:**
```
Hyper-realistic photo of Emma Rose, 25 years old woman,
long wavy dark brown hair, warm brown eyes, olive skin tone,
natural makeup, slight smile, looking at camera,
[SPECIFIEKE SETTING], [OUTFIT], [LIGHTING],
shot on iPhone 15 Pro, Instagram photo style, [COMPOSITIE]
```

---

### STAP 3: Download & Opslag (STRICT PROTOCOL)

**NOOIT screenshots gebruiken**

#### Voor Video (Veo3):
1. Wacht tot video is gegenereerd
2. Klik op download knop in Gemini interface
3. Controleer of prompt/chat zichtbaar is in video
   - Zo ja: CROP de video (bovenste/onderste rand)
   - Of genereer opnieuw
4. Sla op als: `emma_[THEMA]_[DATUM]_[VOLGNUMMER].mp4`
   - Voorbeeld: `emma_yoga_2026-02-11_001.mp4`

#### Voor Foto (Imagen3):
1. Klik op download knop (niet screenshot)
2. Controleer of prompt zichtbaar is
   - Zo ja: CROP de foto
   - Of genereer opnieuw
3. Sla op als: `emma_[THEMA]_[DATUM]_[VOLGNUMMER].png`
   - Voorbeeld: `emma_coffee_2026-02-11_001.png`

---

### STAP 4: Upload naar Google Drive

**Locatie:** `Emma Rose Content/Te Reviewen/`

**Structuur:**
```
Emma Rose Content/
├── Te Reviewen/
│   ├── 2026-02-11_Maandag_Yoga/
│   │   ├── emma_yoga_2026-02-11_001.mp4
│   │   └── emma_yoga_2026-02-11_002.mp4 (backup)
│   ├── 2026-02-12_Dinsdag_Coffee/
│   └── ...
├── Gepubliceerd/
└── Archief/
```

**Upload checklist:**
- [ ] Bestand succesvol geüpload
- [ ] Geen zichtbare prompts/chat in bestand
- [ ] Juiste bestandsnaam
- [ ] Map correct aangemaakt
- [ ] Share link gegenereerd

---

### STAP 5: Goedkeuring Vragen (STRICT)

**Bericht template:**
```
Emma Rose Content Klaar voor Review

📅 Datum: [DATUM]
🎬 Thema: [THEMA]
📁 Bestanden: [AANTAL] video's/foto's
🔗 Drive Link: [SHARE LINK]

Beschrijving:
[SETTING], [OUTFIT], [ACTIE]

Goedkeuring voor:
☐ Instagram post
☐ TikTok post
☐ Beide platforms

Caption suggestie:
"[CAPTION_TEXT]"

Reply met ✅ om te posten
Reply met ❌ + feedback om aan te passen
```

**WACHT op expliciete goedkeuring:**
- ✅ = Mag posten
- ❌ = Niet posten, wacht op nieuwe instructies
- **Geen reactie = Geen post**

---

### STAP 6: Posten (ALLEEN NA GOEDKEURING)

**Alleen uitvoeren na expliciete ✅ van Nadim**

**Stappen:**
1. Download bestand van Google Drive (origineel)
2. Upload naar Postiz
3. Schrijf caption (of gebruik goedgekeurde suggestie)
4. Schedule/plaats post
5. Update Google Drive map naar "Gepubliceerd"
6. Log in tracking sheet

---

## 🚫 STRICTE VERBODEN

**NOOIT:**
- ❌ Dezelfde foto/video hergebruiken
- ❌ Screenshots gebruiken (altijd download)
- ❌ Posten zonder goedkeuring
- ❌ Automatisch posten via cron jobs
- ❌ Content genereren met zichtbare prompts
- ❌ Foto's gebruiken waar video beter is
- ❌ Posten zonder naar Drive te uploaden

---

## 📊 TRACKING

**Bijhouden per post:**
- Datum
- Thema
- Type (video/foto)
- Platform (Instagram/TikTok/both)
- Goedkeuring timestamp
- Post ID's
- Performance metrics (later)

---

## 🔄 BACKUP PLAN

**Als Gemini/Veo3 niet beschikbaar:**
1. Gebruik HeyGen (als credentials beschikbaar)
2. Of: Inference.sh API (FLUX video)
3. Of: Vraag Nadim om handmatig te genereren
4. **NOOIT** posten zonder unieke content

---

## ✅ PRE-POST CHECKLIST

- [ ] Unieke prompt gebruikt voor deze dag/thema
- [ ] Video gegenereerd (of foto als backup)
- [ ] Bestand gedownload (geen screenshot)
- [ ] Geen zichtbare prompts/chat in bestand
- [ ] Bestand geüpload naar Google Drive
- [ ] Share link gedeeld
- [ ] Goedkeuring gevraagd
- [ ] Expliciete ✅ ontvangen
- [ ] Dan pas posten

---

**Dit protocol is BINDEND.**
**Geen uitzonderingen.**
**Geen shortcuts.**

*Laatste update: 2026-02-10*
*Versie: 2.0*
*Status: ACTIEF*
