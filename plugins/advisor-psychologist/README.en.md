[Русский](README.md) · English

# advisor-psychologist — plugin map

One skill, one workflow, one subagent, eleven lenses. No external services and no keys.

User-facing instructions live in the [repository README](../../README.en.md). This file describes the internals.

## Components

| What | Where | Role |
|---|---|---|
| Skill `/advisor-psychologist` | `skills/advisor-psychologist/SKILL.md` | config gate, triage, anonymisation, convening the council, writing to memory |
| Protocols | `skills/advisor-psychologist/protocols/` | triage gate, safety (stop gate, tiers, contacts), verdict format, memory, lens spec |
| Method conflicts | `skills/advisor-psychologist/references/cross-method-patterns.md` | "target → lens" routing and what to do when lenses disagree |
| Workflow | `workflows/council-psy.js` | lens fan-out → curator + sceptics → synthesis → safety review with a block right |
| Worker | `agents/advisor-opus-xhigh.md` | performs any council role; `model: opus`, `effort: xhigh` |
| Lenses | `lenses/advisor-*/` | 11 methods: SKILL.md + `references/` (core, moves, myths, book digests) |
| Shared digest | `lenses/_shared/psy-guidelines-2026.md` | number calibration; **the only copy**, read by every lens |
| Write contract | `shared/memory-write-contract.md` | how to write into the memory folder |
| Templates | `assets/` | crisis contacts, local profile, memory folder skeleton |

## How paths work

- `${CLAUDE_PLUGIN_ROOT}` and `${user_config.MEMORY_DIR}` are substituted **inside the text of SKILL.md and agents** — there you can write them directly.
- In files that are read as files (`protocols/`, `references/`, `lenses/`) substitution does not reach. There you write `{PLUGIN_ROOT}` / `{MEMORY_DIR}`, and the value is supplied by the prompt: the skill inside its own text, the workflow as a separate line in the worker prompt.
- The workflow's JS has no substitution either: the skill passes `pluginRoot` and `workDir` through `args` **by value**. A literal `${CLAUDE_PLUGIN_ROOT}` in `args` travels as a string and the lens will not find its files.
- Working runs live in `{MEMORY_DIR}/_runs/<date>-<session-id>/` and are deleted once the verdict is moved — nothing is written inside the plugin root, which changes on every update.

## Why lenses are not skills

Eleven skills would mean eleven descriptions in the context of every recipient session, always, regardless of topic. Lenses are read with `Read` inside the workflow and need no registration, so they live in `lenses/`, not `skills/`.

If a lens ever needs to be callable directly, `plugin.json` gets `"skills": ["./skills/", "./lenses/"]`; the `skills` field **extends** the default folder rather than replacing it. The price is permanent context.

## Boundaries wired into code, not into prompts

- **The risk stop gate** runs before the council is convened and after synthesis (`protocols/safety-protocol.md` §1, §7). The threshold is suspicion, not certainty. Walking the risk back does not restore normal mode.
- **The REQUIRES-THERAPIST tier** is attached to an operation, not to a school: anything that opens traumatic material goes into the "bring to a live session" block. One sceptic vote is enough — the tier is lexicographic (`council-psy.js`, ledger assembly).
- **The action limit** is enforced at every point: the return schema, the synthesiser prompt, the safety reviewer checklist and the final cut. In LIGHT it is exactly one step; otherwise a "short analysis" becomes COUNCIL in disguise.
- **The safety reviewer goes last** and may rewrite the file or replace it entirely (`decision: BLOCKED`). The synthesiser does not argue with that decision. If the reviewer did not run, the verdict is marked `UNREVIEWED` and the user sees it.
- **Quorum**: 8 of 11 lenses in COUNCIL, 2 of 3 in LIGHT. Below quorum you get partial analyses without synthesis, not a verdict with silently dead lenses.

## Cost of a run

LIGHT is about 5 model calls. COUNCIL is about 44 (11 lenses + curator + up to 10 claims × 3 sceptics + synthesis + safety). That is a visible chunk of the limits and minutes of waiting; the triage gate exists partly for this reason.

## Change with care

- `MAX_ACTIONS`, `QUORUM_*`, `MAX_CLAIMS` each live in exactly one place (SKILL.md and `council-psy.js`). They must not be duplicated into the memory profile: a stale copy would certify a verdict that never happened.
- Numbers inside lenses are calibrated against `lenses/_shared/psy-guidelines-2026.md`. Making a second copy of that file inside a lens is a reliable way to end up with two diverging versions of one number.
- `data_as_of: 2026-08`. The regulatory and AI-specific layer of the calibration lens ages faster than the rest — by its own authors' estimate, in roughly half a year.
