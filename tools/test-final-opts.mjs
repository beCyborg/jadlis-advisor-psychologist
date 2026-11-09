#!/usr/bin/env node
// test-final-opts.mjs — the final agents of council-psy (validator + safety, mode full; 1.3.0, 2026-11-09).
// args.finalOpts {model, effort} comes from the PERSONAL ~/.claude/skills/_shared/final-agent.json via the
// skill. Checks per engine, offline (vm, stub agent):
//   no finalOpts / invalid finalOpts  → one call, the default opts (worker, effort xhigh, no model)
//   valid finalOpts                   → the per-call model + effort of the file
//   null answer or throw on finalOpts → ONE retry on the default (no model override), label <label>→opus-retry
//   the final call site goes through finalAgent() at effort xhigh
// Usage: node tools/test-final-opts.mjs   (exit 1 on any failure)
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WF = join(ROOT, 'plugins/advisor-psychologist/workflows')
const SITES = {
  'council-psy.js': "finalCall(validatorPrompt(files, claimLedger), { label: 'validator', phase: 'Synthesize', schema: VERDICT_SCHEMA, effort: MODE === 'full' ? 'xhigh' : 'high' })",
}
const EXTRA = {
  'council-psy.js': [
    ["const finalCall = MODE === 'full' ? finalAgent : (p, extra) => agent(p, w(extra))", 'LIGHT bypasses finalAgent (worker at high)'],
    ["finalCall(safetyPrompt(verdictPath), { label: 'safety-review', phase: 'Safety-review', schema: SAFETY_SCHEMA, effort: MODE === 'full' ? 'xhigh' : 'high' })", 'safety reviewer goes through finalCall()'],
  ],
}
let failed = 0
const check = (ok, name) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`); if (!ok) failed++ }

for (const [file, site] of Object.entries(SITES)) {
  const src = readFileSync(join(WF, file), 'utf8')
  const name = file.replace(/\.js$/, '')
  check(src.includes(site), `${name}: validator goes through finalCall()`)
  for (const [needle, what] of EXTRA[file] || []) check(src.includes(needle), `${name}: ${what}`)
  const a = src.indexOf('const FINAL_OPTS =')
  const b = src.indexOf('\n}\n', src.indexOf('async function finalAgent')) + 3
  check(a > 0 && b > a, `${name}: FINAL_OPTS + finalAgent() block found`)
  if (!(a > 0 && b > a)) continue
  const block = src.slice(a, b)
  const run = async (finalOpts, answers) => {
    const calls = []
    const ctx = {
      A: finalOpts === undefined ? {} : { finalOpts },
      w: extra => Object.assign({ agentType: 'advisor-psychologist:advisor-opus' }, extra),
      log: () => {},
      agent: async (_p, opts) => {
        calls.push(opts)
        const ans = answers[calls.length - 1]
        if (ans instanceof Error) throw ans
        return ans
      },
    }
    vm.createContext(ctx)
    vm.runInContext(block + '\nthis.finalAgent = finalAgent', ctx)
    const r = await ctx.finalAgent('P', { label: 'validator', phase: 'Synthesize', effort: 'xhigh', schema: {} })
    return { r, calls }
  }
  const FABLE = { model: 'claude-fable-5-2', effort: 'high' }
  {
    const { r, calls } = await run(undefined, [{ ok: 1 }])
    check(calls.length === 1 && !calls[0].model && calls[0].effort === 'xhigh' && calls[0].agentType === 'advisor-psychologist:advisor-opus' && r.ok === 1, `${name}: no finalOpts → default (Opus worker, xhigh), one call`)
  }
  for (const bad of [{ model: 'fable', effort: 'high' }, { model: 'claude-fable-5-2', effort: 'ultra' }, 'claude-fable-5-2', null]) {
    const { calls } = await run(bad, [{ ok: 1 }])
    check(calls.length === 1 && !calls[0].model && calls[0].effort === 'xhigh', `${name}: invalid finalOpts ${JSON.stringify(bad)} → default`)
  }
  {
    const { r, calls } = await run(FABLE, [{ ok: 2 }])
    check(calls.length === 1 && calls[0].model === 'claude-fable-5-2' && calls[0].effort === 'high' && calls[0].label === 'validator' && r.ok === 2, `${name}: finalOpts → per-call claude-fable-5-2 · high`)
  }
  for (const first of [null, new Error('stopped by classifier')]) {
    const { r, calls } = await run(FABLE, [first, { ok: 3 }])
    check(calls.length === 2 && calls[1].label === 'validator→opus-retry' && !calls[1].model && calls[1].effort === 'xhigh' && r.ok === 3,
      `${name}: finalOpts + ${first ? 'throw' : 'null'} → one retry on the default`)
  }
}
console.log(failed ? `\n${failed} check(s) failed` : '\nall final-agent checks passed')
process.exit(failed ? 1 : 0)
