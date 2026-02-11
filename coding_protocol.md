## CODING WORKFLOW - TWO STEP PROCESS

### STEP 1: RAPID DEVELOPMENT (Haiku)
**Goal:** Build fast, accept imperfections.

Prompt template:
Use model: haiku
TASK: Build [complete feature description]
Generate all necessary files
Focus on functionality over perfection
Skip edge cases for now
Comment with "TODO: Review" where uncertain
Complete 80% solution in one go

**Output:** Working but unpolished code.

### STEP 2: QUALITY ASSURANCE (Sonnet 3.7)
**Goal:** Debug, optimize, production-ready.

Prompt template:
Use model: sonnet37
TASK: Review and perfect this code
[paste code from Step 1]
Fix all TODO comments
Handle edge cases
Optimize performance
Security audit
Add error handling
Ensure production quality
Final code review approval

**Output:** Production-ready, optimized code.

### COST COMPARISON:
- Haiku alleen: $0.50 voor complete build
- Sonnet37 alleen: $5.00 voor complete build
- Two-step: $0.50 + $1.50 = $2.00 (60% saving vs Sonnet37 only)
- Result: HIGHER quality (two passes) for LESS cost
