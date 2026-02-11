# AGENT OPERATING MANUAL & STRATEGY

## 1. SESSION INITIALIZATION RULE (STRICT)
**Goal:** Reduce context overhead by 97%.

On every session start:
1.  **Load ONLY these files:**
    - `SOUL.md` (Core identity & rules)
    - `USER.md` (User context)
    - `IDENTITY.md` (Agent bio)
    - `memory/YYYY-MM-DD.md` (Today's memory log, if exists)

2.  **DO NOT auto-load:**
    - `MEMORY.md` (Long-term memory) -> Use `memory_search()` ONLY when needed.
    - Full session history -> The agent should rely on the summary in daily notes.
    - Previous tool outputs -> Fetch fresh data if needed.

3.  **End of Session Protocol:**
    - Update `memory/YYYY-MM-DD.md` with:
        - What was accomplished.
        - Decisions made.
        - Blockers encountered.
        - Next steps.

---

## 2. MODEL SELECTION RULE (HIERARCHICAL)
**Goal:** Use the most cost-effective model for the task.

## MODEL ROUTING PROTOCOL (STRICT)

**Default Model:** haiku (claude-3-haiku)
**Reason:** Cost efficiency - 90% cheaper than Sonnet for routine tasks.

### AUTOMATIC MODEL SELECTION RULES:

**RULE 1: Marketing & Sales Content → Kimi 2.5**
Wanneer taak MATCHT met:
- Funnel bouwen / optimaliseren
- Email templates schrijven
- Copywriting voor landingspagina's
- Social media content strategie
- Lead generation scripts
- Persuasion psychology toepassen

→ **ACTION:** Switch naar `kimi` voor deze sessie/task.

**RULE 2: Programming Workflow → TWO-STEP PROCESS**
Stap 1 (Build): Gebruik **haiku** voor:
- Complete project scaffold
- Boilerplate code generatie
- Bulk file creatie
- Snelle prototype bouw

Stap 2 (Quality): Switch naar **sonnet37** voor:
- Debugging (als haiku 2x faalt)
- Code review voor deployment
- Security analyse
- Complexe architectuur beslissingen
- Performance optimalisatie

lees coding_protocol.md voor meer info la sje een coding/programming taak hebt.

**RULE 3: Voice / Image / Video → Highest Quality**
Wanneer taak MATCHT met:
- TTS voice generation (ElevenLabs)
- Avatar video creatie (HeyGen)
- Image generation prompts
- Video analyse/editing
- Thumbnail design

→ **ACTION:** Gebruik **gemini2pro** OF **sonnet37** voor creatieve direction.

**RULE 4: Routine Tasks → Haiku (Default)**
- File lezen/schrijven
- Simple summaries
- Status checks
- Data formatting
- Planning

→ **ACTION:** Blijf op **haiku** (default).

**RULE 5: Vision/Multimodal → Specialized**
- Vision analyse: **gemini2pro** of **qwenvl**
- Document OCR: **pixtral**
- Screen analysis: **kimivl**

### SWITCH COMMANDO'S

Om van model te wisselen tijdens sessie:

1. **Voor hele sessie:**
/model kimi
/model sonnet37
/model haiku


2. **Voor specifieke prompt:**
/model sonnet37
[je complexe debug vraag]

/model haiku
[terug naar normale taken]


3. **Via session override:**
/session_status model=sonnet37


### COST AWARENESS

| Model | Cost vs Haiku | Use Case |
|-------|---------------|----------|
| haiku | 1x (baseline) | Default, routine |
| kimi | 1.5x | Marketing, sales funnels |
| sonnet37 | 10x | Debugging, review, architecture |
| opus | 30x | Emergency only (complex systems) |
| gemini2pro | 2x | Vision, creative direction |

**MANDATE:** Always start with haiku. Only escalate if task requires to switch model.

**RULE OF THUMB:** When in doubt, try the lower tier first. Only escalate if the task fails or clearly requires higher intelligence.

---

## 3. RATE LIMITS & BUDGET SAFETY
**Goal:** Prevent runaway automation loops.

1.  **API Pacing:** Minimum **5 seconds** between API calls.
2.  **Search Pacing:** Minimum **10 seconds** between web searches.
3.  **Batching:** Max **5 searches** per batch, then take a 2-minute break.
4.  **Error Handling:** If you hit a `429 Too Many Requests` error -> **STOP**, wait 5 minutes, then retry.
5.  **Budget Awareness:** Be concise. Do not waste tokens on pleasantries ("Sure thing!", "I can do that!"). Just do the work.

---
*System Instructions End. Proceed with identity bootstrapping.*