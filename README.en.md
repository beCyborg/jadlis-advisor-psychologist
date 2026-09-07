[Русский](README.md) · English

# advisor-psychologist — a council of psychological lenses

Eleven psychological approaches examine one situation of yours blind to each other, sceptics test the conclusions, and a safety reviewer reads the finished verdict last — with the right to delete it.

> [!WARNING]
> **This is not therapy and not a crisis service.** The format is structured self-help and psychoeducation alongside a live therapist. On any sign of risk the council stops and routes you to people: **112** (or your local emergency number) and **findahelpline.com**. The safety of the "AI council for psychological help" format has not been established in research — the safeguards here stand in for missing data, they are not a guarantee. Details in [NOTICE.md](NOTICE.md).

## Why

You want to work it out now, and there is no one to work it out with: a live specialist is weeks away, the internet hands you ten contradicting tips, and a chatbot agrees with whichever version of events you brought in.

Here there is no one to agree with. Eleven method lenses receive one anonymised summary and work simultaneously, blind to each other's answers. A separate reviewer hunts for places where the tool merely retold you your own version — and says so in the answer itself.

The ceiling on any answer is three actions, no matter how much the eleven lenses found.

## What it looks like

![A round table: figures in different hats and three arguers around a single document](docs/img/10-overview.v2-04.webp)

<details>
<summary>Synthetic example of a LIGHT-mode answer</summary>

```
Mode: LIGHT (single episode, familiar pattern)

What is happening
A pause in the chat reads as rejection, and what runs after that is not
the event but the forecast: "silence means it is over". There is nothing
to test the forecast against, so it loops and looks like thinking.

A fresh angle
Schema-therapy lens: looks like the "abandoned child" mode — the reaction
is larger than the trigger. The common-factors lens flags that you already
had an episode with the same opening and a different ending.

Step (one)
Before replying, write one line: which event happened, and which forecast
attached itself to it. Those are two different lines — that is the split
to make.

Sycophancy check: the version "he is simply a cold person" was not used —
it explains the facts no better and no worse than plain tiredness.
```

</details>

## Install

Open Claude Code and paste this block into the input line:

```
You are an installer. Do exactly these steps and nothing beyond them:
1. Bash: claude plugin marketplace add https://github.com/beCyborg/jadlis-plugins.git
2. Bash: claude plugin install advisor-psychologist@jadlis --config MEMORY_DIR=~/advisors-memory/Психотерапевт
3. Tell me in one line: "Send /advisor-psychologist hi and fill in the crisis contacts".
```

The same two commands by hand, if Bash is unavailable in the app:

```bash
claude plugin marketplace add https://github.com/beCyborg/jadlis-plugins.git
claude plugin install advisor-psychologist@jadlis --config MEMORY_DIR=~/advisors-memory/Психотерапевт
```

Do not skip `--config`: the manifest default is not substituted automatically. Without it the council stops on the first run and asks for a folder (you can also set it later — `/plugin` → advisor-psychologist → settings).

**Step three — crisis contacts.** Run `/advisor-psychologist hi`: the council unpacks the memory folder, creates `~/advisors-memory/Психотерапевт/_local/crisis-contacts.md` from a template and stops. Fill in the numbers for your country (check them against the services' official sites), delete the `<!-- НЕ ЗАПОЛНЕНО -->` line — and the council starts working. The gate is deliberately hard: a session without working contacts is exactly the failure mode the safety protocol exists to prevent.

The plugin also installs from this repository's own marketplace, `becyborg-psy`:

```bash
claude plugin marketplace add https://github.com/beCyborg/jadlis-advisor-psychologist.git
claude plugin install advisor-psychologist@becyborg-psy --config MEMORY_DIR=~/advisors-memory/Психотерапевт
```

The full HTTPS URL guards against an SSH clone: the `owner/repo` shorthand goes over SSH, and a new user usually has no SSH key on GitHub.

## Usage

One line, in plain language:

```
/advisor-psychologist unpack a recurring episode: a pause in the chat — and anxiety kicks in
/advisor-psychologist I am choosing between two jobs and both pull in different directions
/advisor-psychologist rebuild my maps for the quarter
```

The council picks the mode itself along three axes — acuteness, scale, novelty (tag `advisor-psychologist--v1.2.0`):

| Mode | Trigger | What you get |
|---|---|---|
| **SAFE-STOP** | the risk screen fired | grounding, your crisis contacts, a route to a human — no analysis |
| **LIGHT** | one episode, a familiar pattern, or acute right now | 2–3 lenses, 10–15 lines, **exactly one** step |
| **COUNCIL** | a pattern, a fork, a large new topic | all 11 lenses, sceptics, a verdict written to a file |
| **REVIEW** | quarterly or on a scheduled revisit | maps rebuilt, past predictions scored |

LIGHT is the expected majority of requests; when in doubt the council takes it. Two rules fire unasked: after 23:00 it is LIGHT only (night conclusions rarely survive till morning), and on the fifth request within a week the council says so out loud and asks about a step towards live contact.

Everything the council writes lives as plain markdown files in `MEMORY_DIR`: `Совет.md` (the hub), `Журнал сессий.md`, `Домашка.md`, `Контекст/`, `Вердикты/`, `_local/`. The folder can sit inside an Obsidian vault — then wikilinks and callouts work.

## Limits and cost

What the council never does: no diagnosis and no DSM labels, no questionnaire scoring, nothing about medication, no crisis management (it routes instead), never more than three actions, and it never calls itself therapy. Protocols that open traumatic material are tagged REQUIRES-THERAPIST and go into the "bring to a live session" block.

- **Subscription.** You need Claude Code with plugin and Workflow support and a subscription where Opus is available. No external services, API keys or MCP servers — nothing to pay beyond the subscription.
- **Quota.** COUNCIL is on the order of 44 model calls (11 lenses + curator + three sceptics per claim + synthesiser + safety reviewer), minutes of waiting and a visible chunk of the weekly limit; it is for forks in the road, not for "let's talk".
- **Privacy.** Raw text never reaches the subagents: before the council convenes, an anonymised dossier is assembled (names → roles, dates and cities removed, third parties' medical and legal facts cut). The memory folder is private — check where its parent syncs and keep it out of public git.
- **Common refusals.** "Memory folder not set" → set `MEMORY_DIR`. "Fill in local numbers…" → complete `_local/crisis-contacts.md`. A verdict marked `UNREVIEWED` → the safety reviewer did not run: read with care and repeat the run.

## Update

For third-party marketplaces auto-update is off by default on the recipient's side — a new version arrives on command:

```bash
claude plugin update advisor-psychologist@jadlis
```

Or enable auto-update once: `/plugin` → **Marketplaces** → `jadlis`. If you installed from `becyborg-psy`, use that name instead of `jadlis`. Version history — [CHANGELOG.md](plugins/advisor-psychologist/CHANGELOG.md).

## Rights

There is deliberately no licence — see [NOTICE.md](NOTICE.md). The digests inside the plugin are derivative summaries of commercial literature: personal use yes, redistribution and reuse no.
