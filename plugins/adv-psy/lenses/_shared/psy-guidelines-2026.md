```yaml
title: "Psy Guidelines 2026 — калибровочный синтез"
lens: advisor-psy-guidelines-2026
prefix: PG26
role: synthesis
data_as_of: 2026-08
source_parts: 5
```

# Psy Guidelines 2026 — digest

## What this lens is for

Calibration layer for the psychoeducation council (NOT therapy): it holds evidence weights, base rates, self-help contraindications, and the corrections produced by triple adversarial verification (Codex GPT-5.6 Sol + Fable 5 + Grok 4.5) of five reports — Р1 method selection, Р2 lenses & self-help boundaries, Р3 alliance/homework/monitoring, Р4 effective sessions & AI's place, Р5 chatbot harms & safeguards. Method lenses consult this lens before citing any number: everything under Verification corrections is usable only in post-correction form. It also fixes the operation-level SELF vs REQUIRES-THERAPIST boundary all other lenses inherit.

## Evidence weights

GRADE-like levels; origin report in parentheses. Meta-rules (Р1/Р2): VERY LOW = unmeasured, not refuted; an advantage seen only in small trials is an artifact (Egger p<0.001 in depression literature); "several meta-analyses agree" is downweighted where Cuijpers-group authorship overlaps; developer-affiliated trials inflate effects ~30%.

- Bona fide psychotherapy vs waitlist/TAU, depression: MODERATE; between-method differences ≈ zero — MODERATE for depression ONLY (Barth 2013) (Р1).
- Equivalence does NOT transfer to PTSD/GAD (real differences, MODERATE), OCD-like targets, or to ACT/schema therapy (absent from the network) (Р1).
- BA and cognitive restructuring as standalone components: MODERATE; IPT for depression: MODERATE (Р1).
- Schema therapy, cluster-C PD: pooled g=0.359 MODERATE but neither format arm significant; ST ≥ CBT: LOW; subclinical ST: VERY LOW (Р1). DBT ≈ ST for BPD (BOOTS): HIGH with caveats — superiority design, motivated cohort, p=0.27 ≠ equivalence (Р2).
- Target arrows (Р1): perfectionism→CBT-P MODERATE (untested vs generic CBT); self-criticism→CFT LOW (passive-control-inflated); loneliness interventions MODERATE (Hickin 2021), mechanism LOW; grief-CBT superiority LOW (refuted); grief work at elevated PG symptoms only MODERATE; IU experiments LOW, transdiagnostic IU VERY LOW; DBT skills standalone LOW; matching algorithms VERY LOW.
- Author-issued contraindications (Paivio & Greenberg chair work; Arntz 2025 rescripting), NICE NG222/APA timelines, unguided<guided: HIGH; adverse-event base rates 5–20%, deterioration rates, therapists' blindness to deterioration: MODERATE; all community-derived heuristics (sequencing, style matching, buffers, AI anti-patterns): LOW — failure modes, never prevalence (Р2).
- Alliance r=.278: LOW (invalid upgrade removed); homework d=0.48: LOW (demoted); adherence→outcome null: MODERATE — Р3's best-evidenced claim; 2×/wk acute d=0.55: MODERATE acute-only, no effect at 12–24 mo; ROM: LOW overall, off-track subgroup LOW-at-lower-boundary, deterioration prevention VERY LOW; rupture-repair r=.29, sudden gains, therapist effects ≈5%: LOW; dropout 19.7%: MODERATE (Р3).
- Processes>techniques (r=.291/.267 vs .102), setup-quality>checking, dropout structure effects, Cochrane debriefing harm, graded-exposure standard: MODERATE; US AI-law facts, APA 2026 survey, app retention 3.3%: HIGH; AI-adjunct d≈0.56: LOW (Р4).
- Chatbots vs inactive, depression 4–8 wks: MODERATE (pub-bias clean); vs active / at 3 mo: LOW — "effect not shown", not "no effect"; anxiety: LOW; LLM subgroup: VERY LOW; crisis-failure and sycophancy: LOW (demoted — shared-method convergence, not replication); AI→psychosis: VERY LOW; guided>unguided for adherence/monitoring MODERATE, for symptoms LOW (< MCID) (Р5).

## Base rates & honest expectations

- Depression: vs waitlist d=−0.62…−0.92; between methods d=0.01…−0.30 (sole significant contrast vanishes in large trials); response 41% vs 17% — most people do NOT respond within ~2 months (Р1/Р3/Р4).
- Deterioration: 5–10% leave worse (median 4% vs 12–13% controls); corrected NNT against deterioration 9.7 (CAU) / 5.7 (waitlist); clinicians catch ~3% (3 of 40 cases) (Р2/Р3).
- Adverse events in 5–20%; 57.8% report unpleasant memories surfacing; temporary worsening is baseline, not a switch signal; deep solo work costs 1–2 days of exhaustion early on (Р2).
- Dropout 19.7% weighted; 17.8% time-limited vs 29.0% not; 18.3% manualized vs 28.3% not — the lever is structure, not school; strongest early predictor: a missed session in the first four (Р3/Р4).
- Dose: 4–26 sessions in routine practice, log curve, naturalistic mean <5; improved share does NOT grow with count; 2×/wk speeds acute response and halves dropout, no 12–24 mo advantage (Р3).
- Homework: presence d=0.48 (LOW), compliance r=.22–.27, quality beats quantity (g=1.07 vs 0.51); NO reliable completion benchmark exists (Р3/Р4).
- ROM mean d≈0.13–0.27; off-track alert payoff: plan close to zero (independent d=0.21 ns; zero with independent scale) — build it anyway, it is cheap and targets the tail (Р3). Sudden gains: 14–62% of patients, g=0.62–0.72, visible only with per-session measurement (Р3).
- Self-help: unguided CBT weaker than every guided format, no better than usual care, but not harmful per IPD (5.8% vs 9.1% deterioration); lay guidance closes most of the gap; negative effects in 14–92% of self-help interventions; ~18% of self-help books carry harmful advice (Р2/Р3).
- Apps: day-1 retention 69.4% → day-30 3.3%; RCT engagement ≈4× real-world; mood-diary adherence ~64%; surviving formats ≤1 step, ≤5 min, skip-forgiving (Р4).
- Chatbots vs inactive: g≈0.26–0.31 (NNT 11–12), peak week 8, gone by 3 months; vs active g=−0.08; guided-vs-unguided symptom gain MD −0.8 PHQ-9 < MCID — real difference is adherence (g≈0.26–0.29) and response at PHQ-9>9 (48% vs 37%) (Р5).
- Adolescents (N=3466): 47.1% hit ≥1 risk, 14.7% self-harm messaging, 13.0% suicidal content; 63.3% of youth users tell no one (Р4/Р5).
- Timelines: review at 2–4 weeks, zero-response checkpoint 4–6 weeks (NICE); "6–12 sessions" (APA) is a conversation trigger, not a threshold; early responders recover 6× more often, yet a quarter of early non-improvers still recover by end (Р2).

## Self-help contraindications & tier boundary

The boundary runs by the technique's OPERATION, not by school (Р2). Two indirectness layers cap everything: clinical→subclinical populations and live-therapist→AI delivery — no study tested a clinician-free format; every solo application operates outside the evidence base (Р1/Р3).

- SELF: observing, naming, regulating, skills training, psychoeducation, pattern mapping, defusion, diaries, executing (not escalating) a therapist-agreed exposure hierarchy, EMDR stabilization layer.
- REQUIRES-THERAPIST: anything reactivating and reprocessing traumatic memory — trauma-memory rescripting (therapist performs early rescripting even in-therapy, Arntz 2025), chair work with vulnerable material (author-contraindicated at retraumatization/self-harm/suicidality risk), wounded-child parts contact / schema mode-work, grief exposure (no solo format exists), loss/rejection exposure, hierarchy design and escalation, detailed retelling of fresh trauma (debriefing does not prevent PTSD; OR ~2.5 harm signal).
- The state gate before experiential work — stable sense of self + intact reality testing — cannot be self-administered; failed solo exposure reinforces the fear (Р2). IFS parts literalization is dangerous at psychosis/severe dissociation/unstable identity (Р2). Mindfulness pushed through worsening in trauma histories → stop practice, not "try harder" (Р4).
- Grief protocols only after measurement (elevated PG symptoms are the entry condition); for normal grief therapy is usually ineffective and potentially harmful; measure PHQ-9 before deciding on BA or grief-complication questions (Р1/Р2).
- Crisis is a separate mandatory circuit: suspicion of suicidality, self-harm, psychosis/mania, violence, severe ED, or a minor in distress → stop the frame, give crisis contacts, refuse to resume — trigger on suspicion, not explicit intent; models miss indirect signals (Р3/Р5).
- No AI-only work above the subclinical threshold: at PHQ-9>9 a human in the loop is mandatory (adherence + deterioration monitoring, not symptom gain). Never solo/AI: diagnosis, medication advice, treatment-plan changes, emotion/mental-state attribution (Illinois WOPR bans all four); vulnerable groups (active suicidality, psychosis, bipolar, severe ED) are outside the chatbot tier (Р5). Unattended remote measurement for high-risk users crosses the boundary; rupture repair is therapist work (Р3).

## Normative guardrails (moves)

Deduplicated across Р1–Р5; merged codes note their sources.
### [PG26:TARGET-NOT-BRAND] Pick lens by target, not brand
**Move:** Choose a lens by problem-target and personal acceptability, not claimed method superiority.
**APPLY WHEN:** depressive-anxious targets where CBT/BA/IPT are interchangeable. / **AVOID WHEN:** OCD-like rituals or PTSD-like targets; extending interchangeability to ACT/schema therapy.
**Tier:** SELF / **Evidence:** Р1 cm1 MODERATE (depression only).
### [PG26:PROTOCOL-TARGETS] Protocol-specific targets get protocol treatment
**Move:** Route ritual/trauma-memory targets to protocol-specific treatment (ERP; trauma-focused approaches).
**APPLY WHEN:** compulsion-like rituals, avoidance, traumatic memory. / **AVOID WHEN:** generic worry or mood targets.
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р1 cm4/cm5 MODERATE — equivalence fails there.
### [PG26:ROUTING-AS-HYPOTHESES] Target→method arrows are hypotheses
**Move:** Read all routing arrows (self-criticism→CFT, perfectionism→CBT-P, withdrawal→BA, interpersonal pattern→IPT+schema map, "hard to leave"→DBT skills) as working hypotheses for lens choice, never prescriptions.
**APPLY WHEN:** composing a lens set for a query. / **AVOID WHEN:** presenting an arrow as a treatment assignment.
**Tier:** SELF / **Evidence:** Р1 joint verifier verdict — about half the arrows rest on LOW.
### [PG26:NO-ALGO-MATCHING] No personalized-matching algorithms
**Move:** Do not use "personalized advantage" algorithms to score-and-assign methods per profile.
**APPLY WHEN:** tempted to match method to profile algorithmically. / **AVOID WHEN:** never appropriate as decision authority.
**Tier:** SELF / **Evidence:** Р1 ts1/ts2 VERY LOW — no prospective validation.
### [PG26:SEQ-FIRST] Skills → map → depth; enter by cognitive style
**Move:** Order work regulation/skills → cognitive map → deep trauma/parts work; pick entry lens by cognitive style (intellectualizers via structured-cognitive first; aphantasia → chair work instead of imagery — no material ≠ resistance).
**APPLY WHEN:** choosing a starting lens or ordering a program. / **AVOID WHEN:** user already sequenced with their therapist; treating imagery failure as avoidance.
**Tier:** SELF / **Evidence:** Р2 gw2/r18/ss14/r14/ss16 — community-derived, LOW.
### [PG26:STATE-GATE] State gate before experiential work
**Move:** Before any experiential technique, gate on stable sense of self + intact reality testing; route to session on any doubt.
**APPLY WHEN:** imagery, chair work, parts contact, or exposure is proposed. / **AVOID WHEN:** never skip — the gate is not self-administrable.
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р2 w14·A1, x1·B3, w13·B2.
### [PG26:EXPOSURE-THERAPIST] Exposure design and trauma reprocessing are therapist operations
**Move:** Exposure only graduated, repeated, prolonged, from a clinician-built hierarchy; never initiate loss/rejection exposure or schema mode-work solo — council output stops at formulation + target.
**APPLY WHEN:** any avoidance/fear work or exposure-shaped plan. / **AVOID WHEN:** no exception; never solo flooding.
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р1 safety block + Р4 APA guideline A2.
### [PG26:ERP-NO-ESC] Support the agreed hierarchy, never escalate it
**Move:** Support executing and logging a therapist-agreed exposure hierarchy; never raise difficulty between sessions.
**APPLY WHEN:** hierarchy exists and was agreed in session. / **AVOID WHEN:** no agreed hierarchy, or user pushes to escalate solo (failed exposure reinforces fear).
**Tier:** SELF / **Evidence:** Р2 hn1/hn2 C3.
### [PG26:IMG-NONTRAUMA] Solo imagery rescripting only on non-traumatic targets
**Move:** Permit self-guided imagery rescripting only on non-traumatic targets (e.g., anxious future images in GAD) with mood monitoring and a stop rule.
**APPLY WHEN:** intrusive image without traumatic core. / **AVOID WHEN:** target is a traumatic memory or hotspot — therapist-led per Arntz 2025.
**Tier:** SELF / **Evidence:** Р2 w17/w18 A3, w16 A1.
### [PG26:NO-FRESH-DEBRIEF] No prompted retelling of fresh trauma
**Move:** Prohibit prompted detailed retelling of recent trauma in solo/AI work; trauma processing belongs to the therapist.
**APPLY WHEN:** event is recent or distress is trauma-driven. / **AVOID WHEN:** confusing this with the client spontaneously mentioning events.
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р4 Cochrane A2; OR ~2.5 harm signal.
### [PG26:GRIEF-GATE] Measure grief first; exposure only with a therapist
**Move:** Measure prolonged-grief symptoms + PHQ-9 before any grief work; confirmed prolonged grief gets therapist-led loss exposure + restorative component (a procedure, not a brand) — no solo format exists.
**APPLY WHEN:** "unfinished grief" surfaces as a theme. / **AVOID WHEN:** scores unremarkable — no grief protocol (near-zero effects; potentially harmful in normal grief).
**Tier:** REQUIRES-THERAPIST (measurement step is SELF) / **Evidence:** Р1 gr5 MODERATE, gr6/gr7 LOW; Р2 w26·A2, cx28·B2.
### [PG26:SKELETON] Fixed 7-step session skeleton
**Move:** Run structured sessions on a fixed skeleton: check-in → bridge → joint agenda (1–3 items) → review last practice → one topic → client-words summary → micro-task + feedback.
**APPLY WHEN:** any structured self-session or AI-assisted session. / **AVOID WHEN:** opening with new material before reviewing last practice — teaches "this doesn't matter".
**Tier:** SELF / **Evidence:** Р4 MODERATE (B2 training source + A3 client-experience studies).
### [PG26:MICRO-TASK] One micro-task; quality review; non-completion = design failure
**Move:** Assign exactly one micro-practice (≤1 step, ≤5 min; rationale, goal link, in-session start, written, obstacle plan B); review its QUALITY, not completion; treat non-completion as "wrong homework" and walk the failure taxonomy (unclear goal → unclear instruction → unrealistic size → force majeure).
**APPLY WHEN:** every between-session interval and every missed practice. / **AVOID WHEN:** any 2+-step task (undoable by default); compliance checklists; shaming skips (iatrogenic).
**Tier:** SELF / **Evidence:** Р4 A2 setup-quality MODERATE + Р3 d=0.48 / g=1.07 vs 0.51 LOW.
### [PG26:TRIAD-ROM] Per-session triad; alerts fire scenarios, not graphs
**Move:** Measure each session a triad — symptom scale (PHQ-9/GAD-7/CORE-10) + functioning + brief alliance at session end (5–10 min, scales <10 items) — and run a two-loop deterioration detector (Reliable Change Index worsening; ≥1 SD off expected trajectory); every alert fires a pre-written scenario ending in escalation to a human.
**APPLY WHEN:** any ongoing therapy or structured self-help with per-session data. / **AVOID WHEN:** rare/pre-post-only measurement (no effect); alerts without an action protocol; expecting large payoff — plan near zero.
**Tier:** SELF (escalation branch REQUIRES-THERAPIST) / **Evidence:** Р3 APA MBC consensus + OQ-45 20.1%→5.5% single-lab, LOW.
### [PG26:JUDGE-PROCESS] Judge by episode change and competence, not fidelity or alliance
**Move:** Evaluate progress by "what changed in the episode/behavior" and delivery competence; alliance only as an "is the contact working" validator; protocol fidelity is not quality.
**APPLY WHEN:** any progress or session review. / **AVOID WHEN:** citing alliance correlation (r=.278) as proof method choice is irrelevant.
**Tier:** SELF / **Evidence:** Р3 adherence null MODERATE (pre-registered MA); Р1 cf1 LOW.
### [PG26:DOSE-DENSITY] No fixed session count; density only for the acute phase
**Move:** Never plan a fixed session count — steer by psychometric trajectory; in the acute phase prefer 2 sessions/week (same total) for faster response and half the dropout, framed as an exit-acute tool.
**APPLY WHEN:** planning course length; acute-phase depression with retention at risk. / **AVOID WHEN:** selling density as lasting superiority — gone by 12–24 months, not cost-effective.
**Tier:** SELF (frequency changes agreed in-session) / **Evidence:** Р3 dose LOW; 2×/wk RCT N=200 d=0.55 MODERATE acute-only.
### [PG26:SWITCH-CHECK] Checklist and re-contract before any school switch
**Move:** Review at 2–4 weeks; at zero response by 4–6 weeks run the NICE checklist (circumstances, comorbidity, attendance, diagnosis, adherence incl. homework) BEFORE any school change; then re-contract inside the current method (name what's off → desired outcome → why this technique → concrete pace change → track a few sessions), surfacing rupture markers (goal disagreement, task non-cooperation, strain) for in-session repair.
**APPLY WHEN:** no measurable shift after an honest trial; "therapy feels stuck". / **AVOID WHEN:** reacting to one hard week; expecting repair training alone to lift outcomes (it did not).
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р2 cx19/cx20 A1 + Р3 NICE normative B; rupture r=.29 LOW.
### [PG26:RELAPSE-4S] Close with a relapse-prevention block
**Move:** End a successful course with ≥4 extra sessions holding a "staying well" plan, personal warning signs, and named unhelpful behaviors (avoidance, rumination).
**APPLY WHEN:** closing a successful course. / **AVOID WHEN:** response without remission — higher relapse risk, needs more than a wrap-up.
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р3 NICE normative B.
### [PG26:STOP-RULES] Duration-plus-function stop thresholds; planned buffer
**Move:** Schedule deep solo practice before rest days with a 1–2 day recovery buffer; stop and route to session when thresholds trip (flooding >24h, functional decline, intrusive images, flashbacks, dissociation, panic, worsening sleep, suicidal thoughts); journaling stop-markers: >45 min without resolution, closing tenser than opening, same topic with no perspective shift, anxiety on skipping.
**APPLY WHEN:** any deep solo or writing practice; reported post-practice distress. / **AVOID WHEN:** treating one-off intensity that resolves within a day, or early exhaustion, as a switch signal — that is baseline.
**Tier:** SELF / **Evidence:** Р2 w6/w25 B2, r16/cx1; Р4 rumination mechanism B2 (LOW-MODERATE).
### [PG26:FLAG-TIERS] Two-tier red flags; judge trajectory and reaction
**Move:** Two-tier red-flag layer for therapists and the AI layer itself: Tier 1 "leave now" (sexual/dual relationships, confidentiality breach, shaming, guaranteed results, working outside competence, impairment, harmful methods); Tier 2 "feedback first" (poor listening, no goals, no felt progress, weekly "just talking" for anxiety/OCD/trauma) — give feedback and judge the reaction: discusses → stay; defends → leave.
**APPLY WHEN:** evaluating a therapist or the AI layer; judge content not tone, trajectory not one session. / **AVOID WHEN:** marketplace-authored red-flag lists (COI); one-click "switch specialist" — reproduces avoidance.
**Tier:** SELF / **Evidence:** Р4 BACP disciplinary data B2 + negative-experience MA A3.
### [PG26:CRISIS-STOP] Crisis halts the frame — on suspicion, without resumption
**Move:** On any risk suspicion (suicidality, self-harm, psychosis/mania, violence, severe ED, minor in distress) halt the role frame, surface crisis contacts and the emergency path to a human, refuse to resume normal dialogue even after walk-back.
**APPLY WHEN:** any hint, including indirect signals — LLM policy does not differentiate mid-range risk. / **AVOID WHEN:** controlled therapeutic exercise with no risk signal (over-refusal breaks method fidelity).
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р5 em14/pm8 MODERATE, em12 LOW (22/25 resumed post-walk-back, 2023); Р3 suicidality circuit.
### [PG26:ROUTE-HUMAN] Standing routing detectors, threshold, handoff format
**Move:** Route to a live human when: PHQ-9>9 (human in the loop mandatory — adherence + deterioration monitoring); asked for coping but ended up crying; bot missed and user more dysregulated; bot became the first emotional responder; "it sees me too well" intimacy surge; any crisis signal. Hand off a FORMAT, not a topic: theme + why in-session + what to prepare + question for the therapist + debrief; AI logs go into therapy as session material.
**APPLY WHEN:** continuously, as standing detectors; moderate+ severity programs. / **AVOID WHEN:** waiting for explicit crisis wording; selling the human as a symptom booster (MD −0.8 < MCID); assuming therapist presence alone makes it safe.
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р5 em6 MODERATE (IPD network MA), NICE A; Р4 APA advisory + B3 triggers; Р2 w19·A2.
### [PG26:NO-DIAG-MED] Hard output bans: diagnosis, meds, mind-reading
**Move:** Hard guardrails — no diagnoses, no medication advice (never suggest changing/stopping psychiatric drugs), no emotion/mental-state attribution.
**APPLY WHEN:** always. / **AVOID WHEN:** never.
**Tier:** REQUIRES-THERAPIST / **Evidence:** Р5 Illinois WOPR B, co12 B, pm9 LOW (guardrails held 100% in one RCT).
### [PG26:AI-ANTIPAT] Block the documented AI iatrogenic patterns
**Move:** Block, as a layer above generation: reassurance-feeding (at OCD patterns reassurance IS the compulsion — cap repeat queries on one worry), rescuer role, infinite validation, endless sessions (explicit end + closing ritual, no engagement mechanics — top harm mode is 2 a.m. spiraling), sycophancy (re-check beliefs across whole context, third-person reformulation, permission-to-refuse), silent lens switching (announce and justify every framework change).
**APPLY WHEN:** always, for any AI-mediated psychoeducation; long sessions especially. / **AVOID WHEN:** citing clinical-outcome benefit of these mitigations — none measured.
**Tier:** SELF / **Evidence:** Р5 w3 A (+49% affirmation), mitigations LOW; Р4 APA advisory A2 + community; Р2 hn1/ss10/x19/cx34.
### [PG26:POSITION-SELFHELP] Position as self-help; never "therapy"
**Move:** Position explicitly as guided self-help / psychoeducation — "not therapy, not a crisis service, not a source of clinical decisions"; disclose AI/non-clinician status; keep a no-shame slot "what did you discuss with AI".
**APPLY WHEN:** any US-facing framing (exemptions confirmed IL/NV/RI; Utah disclosure mandate; ≥7 states restrict by 2026-08). / **AVOID WHEN:** assuming transfer to the EU (EU AI Act/MDR/GDPR absent from evidence base) or Maine (no self-help exemption).
**Tier:** SELF / **Evidence:** Р4/Р5 law texts A1, APA/NICE A.
### [PG26:SAFETY-DESIGN] Safety architecture and evidence collection from day one
**Move:** Risk assessment lives in a separate classifier/supervisor layer, never the generation policy; crisis routing and method fidelity are separate axes — refusal must not be the only safeguard; collect adverse events from the first user via three loops (in-dialogue distress detection, periodic human check-ins, spontaneous report channel), tracking reliable deterioration, escalations, stop reasons, emotional dependence; success = help-seeking (referral uptake) and retention, not engagement time.
**APPLY WHEN:** designing or running any conversational psychoeducation deployment. / **AVOID WHEN:** treating the external classifier as validated (high-risk zero-shot sensitivity 0.05–0.06 — validate your own false-negative rate); treating absence of complaints as safety evidence.
**Tier:** SELF / **Evidence:** Р5 em14 MODERATE, oa11 VERY LOW, ct4 registry template, NICE/WHO A–B.

## Verification corrections

Exhaustive merged list of demoted/refuted/bounded items; other lenses must not reuse pre-correction versions. Each item states what to say instead.

**Р1 (method selection):**
- Leichsenring 2003 d=1.46 is psychodynamic pre-post — cannot support schema therapy. Instead: Bamelis 2014 + Zhang 2023, always with magnitudes.
- Zhang 2023: "group ST works, individual ≈ 0" is over-reading — group g=0.859 and individual g=0.163 are BOTH non-significant; pooled g=0.359 barely clears zero; corpus not pure cluster-C. Instead: "small fragile pooled effect; format story unproven".
- Removal-dismantling d≈0.01 demoted MODERATE→LOW (circular: Wampold narrative figure + shared-author dm2). Instead: Bell 2013 "parts as good as the whole".
- Grief-CBT superiority demoted MODERATE→LOW and retracted: Hao 2024 NMA shows five significant modalities with overlapping CIs. Instead: "works at elevated PG symptoms; no winning brand".
- CFT for self-criticism demoted MODERATE→LOW (g=0.51 passive-control-driven). Instead: "better than nothing; not shown superior to active treatment".
- iu1 (Dugas 2022) demoted to LOW (N=60, waitlist, developer-authors); transdiagnostic IU VERY LOW (N=37, completer-only).
- Loneliness re-anchored Masi 2011 → Hickin 2021; "social skills training doesn't work" retracted (k=2 = unmeasured); social-cognition mechanism belongs to Masi. Instead: cite Hickin only.
- Interchangeability must not extend to ACT/schema therapy (absent from Barth network) nor beyond depression (PTSD/GAD/OCD differ).
- Alliance "d=0.57" vs method "d≤0.20" contrast retracted — correlational vs RCT numbers not commensurable. Instead: alliance as association only.
- "Several MAs agree" downweighted: Cuijpers-group overlap across cm/dm/ip items; gr2–gr4 by protocol developers.
- Added indirectness layer: no study tested clinician-free AI delivery — procedures transfer, effect sizes do not.
- pf1 "2 papers" was a corpus counter; real base 15 RCTs/N=912. On GRADE-label conflicts the GRADE table is authoritative. Integrity: only a 10-DOI spot-check + 6/84 fulltexts back the numbers; retractions 0/84.

**Р2 (lenses & boundaries):**
- "Schwartz rule: solo only with protectors + crash at 2–3 weeks" REFUTED — anecdote-derived pseudo-precision; never cite the 2–3-week timeline. Instead: operation-level boundary + state gate.
- "Common factors ≥ modality with exception list OCD/PTSD/BPD/CBT-I" DISPUTED — do not present the list as settled. Instead: lenses as question repertoire, routing as hypothesis.
- "Experiential techniques are ST's core; 'lite' delivery is a failure mode" DISPUTED — "lite" protocols are recognized manualized variants.
- "Online DBT skills raised suicide-attempt risk, HR 1.29" REFUTED (outcome substitution) — never reuse HR 1.29. Instead: "solo skills evidence weaker; harm not shown".
- Bounds: BOOTS p=0.27/d=0.15 ≠ formal equivalence; IFS = "no advantage shown, base small" (PARTS 2026 won only on engagement); per-modality burden figures (humanistic 64.8%, psychodynamic 94.1%) single-study; dropout 19.7% heterogeneous, "half in first 7 sessions" single-center; APA 6–12 a heuristic; allegiance inflates ~30%; Shedler/Zlatkus figures are polemic recomputations — use gates, not statistics; loud testimonials are phase-fit artifacts — communities yield failure modes, never prevalence.

**Р3 (alliance/homework/monitoring):**
- Three GRADE demotions: homework d=0.48 →LOW; deterioration base/protective effect →LOW; alliance r=.278 upgrade invalid →LOW.
- "2×/week is better therapy" refuted long-term (Bruijniks 2023: gone by 12–24 mo, not cost-effective). Instead: acute speed and retention only.
- Detector evidence circular (Barkham 2023 reproduces de Jong 2021 — one line, not two); off-track subgroup bounded toward zero (independent d=0.21 ns; ZERO with independent scale; partly regression to the mean). But "no independent ROM replications" was also wrong: six independent MAs give 0.13–0.27 — circularity inflates the subgroup claim, not the mean.
- Protective-effect: use NNT 9.7/5.7; never RR 0.39 / NNT 20 (pub-bias-uncorrected, ~2× overstated; 89% of response data imputed).
- "Instrument=outcome halves the effect (0.19→0.08)" understates — with an independent scale it zeroes; unknown whether it exists outside vendor instruments.
- de Jong 2021 fulltext: feedback→deterioration OR 1.16, p=0.07 — ROM is not proven deterioration prevention.
- Flückiger 2018 pub-bias check invalid (funnel + fail-safe N; only 2% negative effects = selectivity signal). Instead: "not tested with a valid method".
- Geographic bound: corpus entirely Western; country a significant moderator — nothing validated outside Western samples. "0 industry-funded" ≠ no COI (CBT-app patent, vendor ties, MBC-lobby funding). Two completed ROM/rupture RCTs never published — upward bias.
- Dose/density is not a contradiction: total count unrelated; acute density + between-session consolidation works.
- Housekeeping: Howard 1986 DOI corrected (10.1037/0003-066X.41.2.159); Pejtersen 2020 DOI unverified; retractions 0.

**Р4 (sessions & AI):**
- Homework-compliance figures REFUTED: "41%" traces to a 1998 non-CBT study; "51% vs 72%, 2026 survey" does not exist. Instead: NO completion benchmark; cite completion factors (setup quality, congruence, micro-format).
- Sycophancy→ERP-undermining chain DEMOTED: numbers from an outdated preprint (Science 2026 differs); clinical link is extrapolation. Instead: qualitative risk category only.
- "Expressive writing unsafe by default" BOUNDED: newer MA finds small positive effect. Instead: only unstructured venting during active rumination-driven distress is contraindicated.
- "Behavioral > written assignments in completion" REFUTED (one small study + analog). Instead: no strong format-completability data.
- "Guided self-help main lever, OR 2.76" REFUTED as stated: OR lifted from a different 2014 paper; correct estimate ≈ half, effect small.
- Bounds: "therapy harm" spans 5–50.9% by definition — judge multi-point trajectory, never one session; APA 77% is psychologist-report at 6.3% completion, not patient prevalence; COSRT 99-vs-28 is a Mentimeter anecdote; "90% replay recordings" old small sample; AI-adjunct RCTs ≤8 weeks, young mild/moderate samples; AI conclusions decay in ~6 months.

**Р5 (chatbot safeguards):**
- α=1.00 is rerun reproducibility at T=0, NOT classifier accuracy; expert agreement ≤ α 0.78; high-risk zero-shot sensitivity 0.05–0.06. Instead: external classifier = sensible but unvalidated design.
- DCS 0.91 is on a 0–2 scale (just below "supports"; range 0.26–1.34) — magnitude was ~doubled. Instead: direction stands, magnitude does not.
- Maine has NO self-help exemption (IRB-research only); exemptions confirmed IL/NV/RI; ≥7 states by 2026-08 incl. Tennessee SB 1580 (private right of action).
- Dropout 15% vs 42.6% is ONE German RCT — argue human-in-the-loop from meta-analytic adherence g≈0.26–0.29.
- Gate rewording: not "no proven unacceptable harm" but "safety of the format is not established" (AE collection 3/22 RCTs; 42/51 completed trials unreported) — safeguards mandatory because safety data don't exist.
- The internal critic FABRICATED an em14 error (actual Gemini aOR 0.09, CI 0.08–0.11) — the ban on em14 numbers is lifted; the later AR block supersedes the report body's stale warning.
- Crisis-failure and sycophancy demoted MODERATE→LOW: "replicated on 5/8/17/29 systems" was wrappers over 2–4 base models sharing one method; dose-response upgrade removed (VERY LOW preprint).
- "Zero effect vs active control" → LOW, phrased "effect not shown, not disproven" (n=8, no equivalence margin).
- pm20 (Zenny, N=1345) excluded from depression rows — well-being RCT, depression never measured. NNT 2.7/3.1 (STARS Jordan) is not a benchmark (LMIC, near-inactive comparator, scripted bot + 5 human calls) — never next to NNT 11–12.
- "0/29 agents passed" is a rubric artifact — 51.72% met relaxed criteria; always give the caveat. em14 measured response POLICY, not risk recognition — do not cite as "models cannot recognize mid-range risk".
- Human-in-the-loop justification replaced: adherence + monitoring, not symptom gain. Dropout corrected to 17–24% (weighted 23.6%). "The sickest drop out" is a one-RCT hypothesis — plan for it, don't assert it.
- Jurisdiction bound: regulatory layer US (+UK NICE) only — NOT transferable to the EU. em12 audit is 2023-era models. Generative-subgroup unanimity is false (ep1/w7 vs em1 diverge, GPT-2/BERT-era n=5) — present as divergence. Pub-bias split: efficacy clean, safety/registry heavily biased (82% unreported). w9/BMJ "~0.15% weekly suicidal-planning" is vendor self-report via journalism — scale illustration only.

## Numbers that matter

- Barth 2013: 198 RCTs/N=15,118; between-method d=0.01…−0.30; vs waitlist d=−0.62…−0.92; Egger p<0.001 (Р1).
- Zhang 2023 ST: pooled g=0.359 (CI 0.006–0.711), both format arms n.s. Hao 2024 grief NMA: 55 studies/N=10,330, five modalities, overlapping CIs (Р1).
- Hickin 2021 loneliness: 31 RCTs/N=3,959 — current anchor. Galloway 2021 perfectionism: 15 RCTs/N=912. Wakelin 2021 self-compassion g=0.51 (inflated) (Р1).
- Adverse events 5–20%; deterioration 4–5% vs 12–13% control; corrected NNT 9.7/5.7; therapists caught 3 of 40 deteriorations; feedback d=0.14 (0.36 off-track, contested to ~0) (Р2/Р3).
- Alliance r=.278 (≈8% variance); weak alliance→dropout d=.55; adherence null; competence r=0.17; therapist effects ≈5%; allegiance r=.262; school vs school p=0.39 (Р3).
- Homework d=0.48 (LOW); quality vs quantity g=1.07 vs 0.51; ROM d≈0.13–0.27; sudden gains 14–62% of patients, g=0.62–0.72 (Р3).
- Frequency: 2×/wk acute d=0.55, dropout 16 vs 32, HR 1.48 — gone by 12–24 mo. Dose: 4–26 sessions routine, naturalistic mean <5 (Р3).
- Dropout: 19.7% mean; 17.8/29.0 time-limit, 18.3/28.3 manualization; chatbots 17–24% (weighted 23.6%) (Р3/Р4/Р5).
- BOOTS: n=204, p=0.27, d=0.15, dropout 52% vs 46%. ImRs 17/21 and chair work 15/29 immediate post-session overwhelm, long-term positive (Р2).
- Apps: 3.3% day-30 retention (day 1: 69.4%); RCT engagement ≈4×; mood diaries 64% adherence; Woebot ~7 min/day, often 3–5 a.m. (Р4).
- APA 2026: 77% of psychologists hear of patient AI use (6.3% completion caveat); youth 19.2% used chatbots for MH, 63.3% told no one (Р4).
- Chatbots: vs inactive g≈0.26–0.31 (NNT 11–12), peak wk 8, gone at 3 mo; vs active g=−0.08; AI-adjunct d≈0.56 (LOW); Therabot N=210 needed 15–28 human interventions (Р4/Р5).
- Guided vs unguided: MD −0.8 PHQ-9 (< MCID 1.7–5); adherence g=0.26–0.29; response 48% vs 37% at PHQ-9>9 (Р5).
- Sycophancy +49% affirmation vs humans; crisis: 2/25 gave crisis lines, 22/25 resumed post-walk-back (2023); adolescents 47.1% / 14.7% / 13.0% risk rates (Р5).
- Regulation: ≥7 US states by 2026-08; fines $10k (IL) / $15k (NV); Utah disclosure. Timelines: review 2–4 wks; checkpoint 4–6 wks; ≥4 relapse-prevention sessions; >24h flooding = stop; 40–100 sessions typical ST length (Р2–Р5).

## Blind spots of this lens

- Secondary synthesis of syntheses: each compression step lost qualifiers; when a claim matters, the part-digest and its source report outrank this file, and the source GRADE table outranks report prose.
- Ages faster than method lenses: the AI-safety/regulatory layer decays in ~6 months (Р4's own warning); em12-style audits are 2023-era models; the state-law list went stale once already during verification.
- Jurisdiction and population: evidence is Western (largely US/UK/NL); regulatory layer US+UK only — nothing validated for the EU or non-Western samples.
- Delivery-mode indirectness unresolved everywhere: no study tested a clinician-free AI-lens council; effect sizes describe live or guided human therapy.
- Scale scores (PHQ-9, IUS, UCLA, SCS) are surrogates for behavior change; hard outcomes (hospitalization, attempt, relapse) almost never measured in the AI layer.
- The corpus under-reports harm by construction (AE collection 3/22 RCTs; 82% of safety-relevant registrations unreported) — absence of harm signals here is not evidence of safety.
- This lens calibrates numbers, not methods: it cannot substitute for the lenses it corrects, and its move set is normative scaffolding — mostly LOW-evidence process consensus, not measured efficacy.
