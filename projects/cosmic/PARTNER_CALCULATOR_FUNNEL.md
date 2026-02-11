# Cosmic Puppies - Partner Calculator Funnel

## 🎯 CONCEPT
Interactive calculator waar potentiële partners (dropshippers/affiliates) hun verdienpotentieel kunnen berekenen met Cosmic Puppies diensten.

## 📐 DE CALCULATOR

### Input Velden:
1. **Huidige situatie:**
   - Aantal uur per week beschikbaar: [slider 5-40 uur]
   - Huidige maandelijkse omzet: [€ input]
   - Marketing ervaring: [Beginner/Gemiddeld/Expert]

2. **Doelgroep:**
   - Branche focus: [eCommerce/SaaS/Agency/Consultant/Anders]
   - Regio: [Nederland/Europa/Wereldwijd]

3. **Inzet level:**
   - Actieve acquisitie: [Ja/Nee]
   - Content creatie: [Ja/Nee]
   - Netwerk grootte: [0-100/100-500/500+/1000+]

### Output Berekeningen:

```javascript
// Berekening logica
function calculateEarnings(inputs) {
  const baseCommission = 0.20; // 20% commission
  const avgDealValue = 1497; // Gemiddelde Tier 2 waarde
  const conversionRate = inputs.experience === 'expert' ? 0.05 : 
                        inputs.experience === 'gemiddeld' ? 0.03 : 0.01;
  
  const monthlyLeads = inputs.hoursPerWeek * (inputs.activeAcquisition ? 5 : 2);
  const monthlyDeals = monthlyLeads * conversionRate;
  const monthlyRevenue = monthlyDeals * avgDealValue * baseCommission;
  const yearlyRevenue = monthlyRevenue * 12;
  
  return {
    monthlyLeads,
    monthlyDeals: Math.round(monthlyDeals),
    monthlyRevenue: Math.round(monthlyRevenue),
    yearlyRevenue: Math.round(yearlyRevenue),
    timeToFirstDeal: inputs.experience === 'expert' ? '2-4 weken' : '1-2 maanden'
  };
}
```

### Voorbeeld Output:

**Scenario 1: Side Hustle Beginner**
- Input: 10 uur/week, geen ervaring, passief
- Resultaat: 
  - 20 leads/maand
  - 0.2 deals/maand
  - **€60/maand** (€720/jaar)
  - Eerste deal: 1-2 maanden

**Scenario 2: Actieve Affiliate**
- Input: 20 uur/week, gemiddelde ervaring, actieve acquisitie
- Resultaat:
  - 100 leads/maand
  - 3 deals/maand
  - **€898/maand** (€10,776/jaar)
  - Eerste deal: 2-4 weken

**Scenario 3: Full Partner**
- Input: 40 uur/week, expert, netwerk 500+
- Resultaat:
  - 200 leads/maand
  - 10 deals/maand
  - **€2,994/maand** (€35,928/jaar)
  - Eerste deal: 1-2 weken

## 🔄 FUNNEL FLOW

### Stap 1: Calculator Pagina
```
Hero: "Bereken Je Verdienpotentieel als Cosmic Puppies Partner"
Sub: "Geen investering nodig. Alleen jouw netwerk en tijd."

[CALCULATOR FORM]

[CTA Button]: "Zie Mijn Verdienpotentieel"
```

### Stap 2: Resultaten Pagina
```
[RESULTATEN WEERGAVE]
- Jouw maandelijkse verdienpotentieel: €X,XXX
- Jouw jaarlijkse verdienpotentieel: €XX,XXX

[SOCIAL PROOF]
"Andere partners verdienen gemiddeld €2,400/maand"

[CTA]: "Start als Partner - Gratis Aanmelding"
```

### Stap 3: Aanmeld Formulier
```
Naam: [input]
Email: [input]
Telefoon: [input]
Waarom wil je partner worden: [textarea]

[SUBMIT]: "Verstuur Aanmelding"
```

### Stap 4: Dankuwel + Next Steps
```
"Bedankt! We nemen binnen 24 uur contact op.

[DOWNLOAD] Partner Starter Kit
- Sales scripts
- Email templates
- Commissie structuur"
```

## 🎨 PAGE STRUCTURE

### Hero Section
- Headline: "Word Partner & Verdien tot €3.000/maand"
- Subheadline: "Zonder investering. Zonder voorraad. Alleen jouw netwerk."
- CTA: [Bereken Je Verdienpotentieel]
- Visual: Calculator mockup / Dashboard preview

### Social Proof Section
- "150+ actieve partners"
- "€450K uitbetaald aan partners in 2025"
- Testimonials van bestaande partners

### How It Works
1. **Aanmelden** (2 minuten)
2. **Deel je unieke link** (jouw netwerk)
3. **Verdien 20% commissie** (per deal)
4. **Maandelijkse uitbetaling** (automatisch)

### FAQ Section
- Hoelang duurt het voordat ik mijn eerste deal krijg?
- Wat moet ik precies doen als partner?
- Hoe word ik uitbetaald?
- Wat zijn de vereisten?

### Final CTA
- [Start Nu - Gratis Aanmelding]
- "Geen verborgen kosten. Geen verplichtingen."

## 🛠️ TECH STACK

### Frontend
- Next.js / React
- Tailwind CSS
- Framer Motion (animations)

### Calculator Logic
- Client-side JavaScript
- LocalStorage voor form persistence
- Real-time calculations

### Backend
- Form submission → Zapier/Make
- Email automation (ConvertKit/ActiveCampaign)
- CRM integration (HubSpot/Attio)
- Partner tracking (Rewardful/Tolt)

### Tracking
- Google Analytics 4
- Facebook Pixel
- Hotjar (heatmap)

## 📈 CONVERSIE OPTIMALISATIE

### A/B Testing Ideas
1. **Headline:** "Verdien €3K/maand" vs "Word Partner"
2. **CTA:** "Bereken" vs "Start Nu" vs "Gratis Aanmelden"
3. **Calculator fields:** meer vs minder input velden
4. **Social proof:** video testimonials vs text

### Exit Intent
- Popup: "Wacht! Download gratis Partner Starter Kit"
- Offer: Ebook + Email templates (email capture)

### Retargeting
- Pixel fires op calculator page
- Retargeting ads voor non-converters
- Lookalike audiences van converters

## 💰 MONETISATIE LAYERS

### Layer 1: Affiliate Commissie (20%)
- Tier 1 producten: €47-97 → €9-19 commissie
- Tier 2 producten: €997-1,997 → €199-399 commissie
- Tier 3 producten: €3,997-4,997 → €799-999 commissie

### Layer 2: Recurring Commissie
- Maandelijkse retainer klanten: 10% recurring
- SaaS producten: 20% recurring

### Layer 3: Bonus Structuren
- 5 deals/maand = €500 bonus
- 10 deals/maand = €1,500 bonus
- Top performer van de maand = €2,500 bonus

## 🚀 IMPLEMENTATIE ROADMAP

### Week 1: MVP
- [ ] Calculator frontend bouwen
- [ ] Form submission setup
- [ ] Basic email automation
- [ ] Partner tracking implementeren

### Week 2: Optimalisatie
- [ ] A/B testing setup
- [ ] Retargeting pixels
- [ ] Exit intent popup
- [ ] Social proof verzamelen

### Week 3: Scale
- [ ] Paid ads lanceren
- [ ] Influencer outreach
- [ ] Email sequences
- [ ] Partner onboarding flow

### Week 4: Automatisering
- [ ] CRM integration
- [ ] Automated payouts
- [ ] Reporting dashboard
- [ ] Partner community

## 📊 SUCCES METRICS

- **Calculator conversions:** Target 15%+
- **Partner signups:** Target 50+/maand
- **Active partners:** Target 20% van signups
- **Revenue per partner:** Target €500/maand
- **Total partner revenue:** Target €25K/maand

---

**Dit is de funnel die partners aantrekt, berekent wat ze kunnen verdienen, en direct converteert naar aanmeldingen.**
