English · [Русский](README.md)

# Weeks pass between "things got bad" and the appointment, and all that time you are on your own with it

Not therapy and not a crisis service: the conversation runs inside one named methodological frame,
and a gate sits in front of it that stops the analysis at any sign of risk and hands you your own
crisis contacts.

```
claude plugin marketplace add https://github.com/beCyborg/jadlis-start.git
claude plugin install advisor-psychologist@jadlis
```

No keys and no MCP servers are needed; a memory folder is — its path is set at install, and until
your country's crisis contacts are written into it, the council is never convened.

![A conversation inside one named frame, and in front of it a gate that stops the analysis at any sign of risk](docs/img/hero-jadlis-advisor-psychologist.webp)

In words: on the left, what you bring in plain language; in front of it a gate with two exits — a
stop with crisis contacts, or a conversation inside one lens — plus a separate branch, the full
council, which only your command opens.

This is my workbench published as it is, not a product: whatever I stopped using, I removed.

## Before → after

| By hand | With an AI chat | With this plugin |
|---|---|---|
| **What the episode gets read with.** The episode happened on Wednesday, the appointment is on Monday — all that is left for it is a retelling from memory. | It reads it with anything and in any direction: the frame is never named, and next time it will be a different one. | It runs the conversation inside one lens, named out loud with a line of reasoning; a change of frame is announced separately. |
| **What happens when risk comes up.** The conversation goes on: there is no one to stop it. | It returns to the ordinary analysis the moment you say "never mind, I'm fine". | The risk screen goes first and does not depend on the content of the analysis: a hit means SAFE-STOP, grounding and the contacts from your file verbatim; walking it back does not bring the ordinary mode back. |
| **Where the self-help boundary runs.** What may be done alone and what only in a live session is written down nowhere. | It answers all of it, including moves that open traumatic material. | It draws the boundary by operation: rescripting, chair work, exposure to loss and work with dissociative material carry the REQUIRES-THERAPIST tier and go into the "take this to the live session" section. |
| **Who argues with the advice you got.** There is nobody to argue with: there is only one version. | It agrees with the frame you used to present the situation yourself. | It runs the claims past three skeptics one by one — harm, agreeing with your position, the self-help boundary; a refuted claim never reaches "What to do", and a safety reviewer reads the finished verdict last, with the right to rewrite or block it. |
| **What is left after the conversation.** A month later you remember the mood, not what you settled on. | The history dissolves into chats and never adds up to a map. | It writes the session journal by appending, the schema map in dated blocks, and verdicts as files with neutral dated names in a folder on your own disk. |

## How it works

![The triage gate routes the request into modes, the eleven-lens council convenes only on command, the safety reviewer reads the verdict last](docs/img/how-jadlis-advisor-psychologist.webp)

Going in — what you bring in plain language, and a config gate: the memory folder and filled-in
crisis contacts.
Inside — the risk screen, then triage: a conversation inside one frame, a short format at night and
at high acuity, or, on your command, the full council with its skeptics.
Coming out — a verdict read by the safety reviewer, and an entry in the journal.

In words: request → risk screen → triage into a mode → conversation inside one lens → the
eleven-lens council on command → a ledger with skeptics → synthesis → safety review → an entry in
the memory folder.

The triage gate picks the mode, and there are five: **SAFE-STOP** when the risk screen fires —
grounding, contacts verbatim, a route to a live clinician, no analysis; **DIALOGUE** by default —
one lens in the main session, no subagents and no dossier; **LIGHT** at night, at high acuity and
when closing a conversation — exactly one step; **COUNCIL** only on the command "convene the
council"; **REVIEW** — rebuilding the maps and scoring past predictions. The full council is read
by eleven methodological lenses: schema therapy, Beckian CBT, common factors and motivational
interviewing, CFT and self-compassion, a calibration synthesis of guidelines, behavioral activation
with exposure, ACT, attachment and IPT, grief, DBT skills, perfectionism and intolerance of
uncertainty. What reaches them is not the raw context but an anonymized dossier — names replaced by
roles, locations, dates and legal facts removed. A curator then pulls out checkable claims, the
skeptics vote on them, the synthesizer writes a verdict with a plain-language front page, and the
safety reviewer reads it last and decides: pass, rewrite or block. A separate frequency detector
counts requests over a rolling week — when the council starts standing in for live contact, it says
so out loud.

## Installing and the first run

**a) Text to paste to an agent.** Copy the whole thing into a Claude Code chat:

```
You are the installer. Install the plugin advisor-psychologist from the jadlis marketplace on
this Mac. Run exactly these commands, verbatim, shortening nothing:
1. claude plugin marketplace add https://github.com/beCyborg/jadlis-start.git
2. claude plugin install advisor-psychologist@jadlis
3. claude plugin list — show me the line about advisor-psychologist and its version.
The plugin needs one setting — MEMORY_DIR, the folder it writes the journal, homework and
verdicts into. I choose the path myself; the contents are private, so ask me about syncing and
backups of that folder before you suggest a location.
Before each command show it to me in full and wait for "yes". If I say "no", do not run it,
tell me what you skipped, and move on.
If a command returns an error, stop, show me the output, and do not move to the next one.
```

**b) Commands by hand.**

```
claude plugin marketplace add https://github.com/beCyborg/jadlis-start.git
claude plugin install advisor-psychologist@jadlis
claude plugin list
```

The first command installs nothing — it adds the marketplace. Only the second one installs, and one
line removes it: `claude plugin uninstall advisor-psychologist@jadlis --keep-data`.

The memory folder can be passed straight into the install — `claude plugin install
advisor-psychologist@jadlis --config MEMORY_DIR=~/advisors-memory/Психотерапевт` — or set in the
dialog Claude Code shows when the plugin is enabled. The manifest default is not substituted for
you: until the path is set, the council stops on the very first run and says so plainly. On an
already installed plugin the `--config` flag cannot change the folder — only a reinstall can.

**The third step is the crisis contacts.** The first run unpacks the memory folder, puts
`_local/crisis-contacts.md` there from a template, and stops. Write in the service numbers for your
country, checked against the services' official sites, and delete the marker line. The gate is
deliberately hard: an analysis without working contacts is exactly the failure mode the safety
protocol exists to prevent.

**c) The short command.** Open Claude Code in the folder you work in and type:

```
/advisor-psychologist <what is going on>
```

If it is not found, check the name with `claude plugin list`. The full eleven-lens analysis is
opened by a separate command inside the conversation — the words "convene the council"; on its own
it is never convened, however many turns have passed.

## Limits, cost, updating

**What it does not do.** It does not call itself therapy and does not manage a crisis — at any
suspicion of risk it stops and routes you to a live clinician. It does not diagnose and hangs no
DSM labels: everything it gives is a hypothesis about a pattern. It never scores questionnaires, on
any scale at all. It does not touch medication. It runs no REQUIRES-THERAPIST-tier protocols, in
the conversation or in the council. It gives no more than three actions: a list you cannot complete
works against the goal. It convenes no council without your command, and it promises no outcome —
patterns change over months, and setbacks are normal.

**What you need.** No keys and no external CLIs; the plugin brings up no MCP servers. Two things
are needed: the `MEMORY_DIR` memory folder — plain markdown files, and it can sit inside an Obsidian
vault — and a filled-in crisis contacts file inside it. The folder's contents are private: pick the
location with syncing and backups in mind. And a live therapist alongside — the format is built as
self-help and psychoeducation next to one, not instead of one.

**How tokens get spent.** The conversation is light: it runs in the main session, through one lens,
with no subagents and no dossier — which is why it is the default mode. The heavy run is the full
council: dozens of subagents out of your quota, the lenses plus skeptics over the claims, the
synthesis and the safety review. At night the command "convene the council" is served by the short
format instead: conclusions hold worse at night, and the full analysis moves to daytime.

**What is honest about the evidence.** The safety of the format itself — an AI council on
psychological help — is not established in research, and the entire evidence base for the methods
was collected on therapy with a live clinician. The "target → method" routing inside the plugin is a
set of working hypotheses, not prescriptions; for schema therapy it is a map of patterns rather than
a proven method. The safeguards here stand in place of the missing data, not on top of it.

**Verified where I work:** my Mac, my subscription, my memory folder. Where else this works —
[уточнить].

**Terms of use.** There is no license: all rights reserved by the author. You may read it and use it
personally. Commercial use, republishing and bundling it into your own products — by arrangement
with me. The lens digests are derivative summaries of specialist literature: rights to the source
books belong to their authors and publishers.

**Updating.** With a third-party marketplace, auto-update is off on your side: until you run the
first command you keep the version you installed.

```
claude plugin marketplace update jadlis
claude plugin update advisor-psychologist@jadlis
claude plugin list
```

Reinstall, if something ended up crooked:

```
claude plugin uninstall advisor-psychologist@jadlis --keep-data && claude plugin install advisor-psychologist@jadlis
```
