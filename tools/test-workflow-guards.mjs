#!/usr/bin/env node
// test-workflow-guards.mjs — the args guard of council-psy stops a run before the first agent.
//
// The script in plugins/advisor-psychologist/workflows/ is loaded as text and run in a vm context with stubbed
// `args`, `agent`, `parallel`, `phase`, `log`. The stub `agent` counts calls and throws a sentinel,
// so a run never goes past the first agent. Cases per script:
//   no args (resume without args)       → guard throws, 0 agents
//   string args with „“ / bare " quotes → guard throws "not valid JSON", 0 agents
//   valid args with a relative workDir  → guard throws "absolute", 0 agents
//   one required key missing            → guard throws "missing", 0 agents
//   full valid args (object and string) → passes the guard and reaches agent()
// Usage: node tools/test-workflow-guards.mjs   (exit 1 on any failure)
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WF = join(ROOT, 'plugins/advisor-psychologist/workflows')

const ABS = '/home/u/advisors-memory/Психотерапевт/_runs/test-run'
const PR = '/home/u/.claude/plugins/advisor-psychologist'
const adv = n => Array.from({ length: n }, (_, i) => ({ slug: `a${i}`, prefix: `P${i}`, book: `Book ${i}`, author: `Author ${i}`, skillPath: `${PR}/lenses/advisor-a${i}` }))

const SPECS = {
  'council-psy.js': {
    valid: { query: 'Q', dossier: 'D (анонимизировано)', mode: 'full', advisors: adv(11), quorum: 8, crisisContacts: 'C', workDir: ABS, pluginRoot: PR },
    drop: 'dossier',
  },
}

const SENTINEL = '__AGENT_CALLED__'

async function run(file, argsValue) {
  const src = readFileSync(join(WF, file), 'utf8').replace(/^export const meta/m, 'const meta')
  const state = { agents: 0 }
  const ctx = vm.createContext({
    args: argsValue,
    agent: () => { state.agents++; throw new Error(SENTINEL) },
    parallel: async fns => Promise.all(fns.map(f => f())),
    phase: () => {}, log: () => {}, console,
  })
  let error = null, result
  try {
    result = await new vm.Script(`(async () => {\n${src}\n})()`, { filename: file }).runInContext(ctx)
  } catch (e) { error = e }
  return { error, result, agents: state.agents }
}

let fails = 0
const check = (name, ok, detail) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : `  — ${detail}`}`); if (!ok) fails++ }
const msg = r => (r.error ? String(r.error.message) : `no error, result=${JSON.stringify(r.result)}`).slice(0, 200)
const guardThrow = (r, script, needle) => r.agents === 0 && r.error && r.error.message.startsWith(`${script}:`) && r.error.message.includes(needle)

for (const [file, s] of Object.entries(SPECS)) {
  const script = file.replace(/\.js$/, '')
  let r = await run(file, undefined)
  check(`${script}: no args → throws before any agent`, guardThrow(r, script, 'missing'), msg(r))

  const valid = JSON.stringify(s.valid)
  const curly = valid.replace('"Q"', '„Q“').replace(/"workDir"/, '“workDir”')
  r = await run(file, curly)
  check(`${script}: curly-quote string → throws`, guardThrow(r, script, 'not valid JSON') && r.error.message.includes('resume does not inherit args'), msg(r))

  const bare = valid.replace(`"${ABS}"`, `"${ABS}/он сказал "да""`)
  r = await run(file, bare)
  check(`${script}: unescaped " in a value → throws`, guardThrow(r, script, 'not valid JSON'), msg(r))

  r = await run(file, { ...s.valid, workDir: 'adv-x/.tmp-run' })
  check(`${script}: relative workDir → throws`, guardThrow(r, script, 'absolute'), msg(r))

  const dropped = { ...s.valid }; delete dropped[s.drop]
  r = await run(file, dropped)
  check(`${script}: missing ${s.drop} → throws`, guardThrow(r, script, s.drop), msg(r))

  r = await run(file, s.valid)
  check(`${script}: full valid args (object) → passes the guard`, r.agents >= 1 && (!r.error || r.error.message === SENTINEL), msg(r))

  r = await run(file, valid)
  check(`${script}: full valid args (JSON string) → passes the guard`, r.agents >= 1 && (!r.error || r.error.message === SENTINEL), msg(r))

  if (s.dryRunPasses) {
    r = await run(file, { dryRun: true })
    check(`${script}: dryRun: true alone → dry-run defaults still reachable`, r.agents >= 1, msg(r))
  }
}

console.log(fails ? `\n${fails} check(s) failed` : '\nall guard checks passed')
process.exit(fails ? 1 : 0)
