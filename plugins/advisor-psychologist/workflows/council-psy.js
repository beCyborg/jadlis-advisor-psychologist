export const meta = {
  name: 'council-psy',
  description: 'Совет линз-методологий по психологической помощи: триаж → fan-out линз → ledger со скептиками (включая REQUIRES-THERAPIST) → синтез с фронт-страницей (секция 0, ≤15 строк простым языком) → safety-ревью с правом блока. Режимы light|full.',
  phases: [
    { title: 'Fan-out', detail: 'Линзы-методологии разбирают запрос, каждая со своей рамки (параллельно)' },
    { title: 'Cross-verify', detail: 'curator выделяет claims → 3 скептика на claim: вред / подтверждение позиции / требует живого терапевта' },
    { title: 'Synthesize', detail: 'validator пишет вердикт по формату advisor-psychologist: фронт-страница (секция 0) + полный вердикт' },
    { title: 'Safety-review', detail: 'safety-ревьюер читает готовый вердикт и имеет право переписать или заблокировать' },
  ],
}

// ── Параметры (skill передаёт через args; дефолты — для dry-run через /workflows) ──
// args может прийти JSON-строкой (харнесс не парсит нетипизированный параметр) — шим как в council-influence.js
const A = (() => { try { return typeof args === 'string' ? JSON.parse(args) : (args || {}) } catch (e) { return {} } })()

const QUERY = A.query || 'Разбери повторяющийся эпизод: пауза в переписке — и включается тревога. (dry-run)'
// ВАЖНО: dossier — уже АНОНИМИЗИРОВАННОЕ досье, собранное главной сессией (Phase B.0 скилла).
// Сырой терапевтический контекст в workflow не передаётся никогда: субагенты его не видят.
const DOSSIER = A.dossier || 'Досье не задано (dry-run).'
const MODE = A.mode === 'light' ? 'light' : 'full'
// Скилл всегда передаёт workDir внутри папки памяти ({MEMORY_DIR}/_runs/...).
// Дефолт нужен только для dry-run через /workflows и намеренно локальный.
const WORK_DIR = A.workDir || '.advisor-psychologist-run'
// Корень плагина: ${CLAUDE_PLUGIN_ROOT} в JS не подставляется — скилл передаёт значением.
const PLUGIN_ROOT = A.pluginRoot || '.'
const QUORUM = A.quorum || (MODE === 'light' ? 2 : 8)
const SKEPTICS = 3
const MAX_CLAIMS = 10
const MAX_ACTIONS = 3   // жёсткий лимит: больше = воспроизведение Требовательного Родителя
// Действующий лимит шагов. В LIGHT протокол требует РОВНО один шаг: сокращённый разбор
// с тремя заданиями — это COUNCIL в маскировке, и он даёт ровно тот перегруз,
// от которого лимит защищает. Проводится через ВСЕ точки: схему, промпт синтезатора,
// чек-лист safety-ревьюера и финальный срез — иначе ограничение обходится в любой из них.
const MODE_ACTIONS = MODE === 'light' ? 1 : MAX_ACTIONS

// Кризисные контакты передаёт скилл (страна пользователя + русскоязычные линии).
// Пустой список — не повод молчать: safety-ревьюер обязан потребовать их у скилла.
const CRISIS_CONTACTS = A.crisisContacts || '(контакты не переданы — safety-ревьюер обязан отметить это как дефект конфигурации)'

// Воркер: субагент плагина (Opus + effort high). Имя квалифицировано именем плагина —
// агенты плагина регистрируются как <плагин>:<агент>.
const WORKER_OPTS = A.workerOpts || { agentType: 'advisor-psychologist:advisor-opus' }
const w = extra => Object.assign({}, WORKER_OPTS, extra)

// Необязательный мост синтеза на вторую модель через `claude -p`. По умолчанию ВЫКЛЮЧЕН:
// плагин не может знать, какие модели доступны у пользователя и есть ли у него квота.
// Включается явно — args.fableBridge === true; работает только в режиме full.
// При любом сбое моста роль выполняется тем же воркером и вердикт помечается префиксом.
const FABLE_BRIDGE = A.fableBridge === true
const BRIDGE_MODEL = A.bridgeModel || 'claude-fable-5-1'

const ADVISORS = A.advisors
if (!Array.isArray(ADVISORS) || !ADVISORS.length) {
  throw new Error('args.advisors пуст: реестр линз передаёт скилл advisor-psychologist, workflow своего списка не держит')
}

// Строка для промптов воркеров: внутри протоколов и файлов линз пути записаны
// плейсхолдером {PLUGIN_ROOT} — подстановка в читаемые файлы не доходит, значение
// сообщается субагенту здесь.
const PLUGIN_ROOT_NOTE = `PLUGIN_ROOT = ${PLUGIN_ROOT}
Внутри файлов, которые ты читаешь, пути записаны как {PLUGIN_ROOT}/… — подставляй вместо плейсхолдера строку выше. Литеральный \`{PLUGIN_ROOT}\` в Read не отправляй.`

function bridgePrompt(role, rolePrompt, allowedTools, fieldsHint) {
  const pf = `${WORK_DIR}/_bridge-${role}-prompt.md`
  const of = `${WORK_DIR}/_bridge-${role}-out.json`
  return `Ты — технический МОСТ к модели ${BRIDGE_MODEL}. Сам ролевую работу НЕ делай (кроме шага «Деградация»). Ровно три шага:

1. Через Write запиши в файл ${pf} ДОСЛОВНО весь текст между маркерами <<<ROLE_PROMPT и ROLE_PROMPT>>> (маркеры не включать, текст не менять и не сокращать).

2. ОДИН Bash-вызов (параметр timeout: 600000):
cat "${pf}" | claude -p --model ${BRIDGE_MODEL} --effort high --allowedTools "${allowedTools}" --strict-mcp-config --mcp-config '{"mcpServers":{}}' --output-format json > "${of}" 2>"${WORK_DIR}/_bridge-${role}.err"; echo "EXIT=$?"

3. Прочитай ${of} (Read): поле .result — ответ модели, в его КОНЦЕ JSON-блок с полями ${fieldsHint}. Извлеки эти поля и верни их по своей схеме БЕЗ изменений.

Деградация: EXIT≠0 или .result без валидного JSON → один повтор шага 2; если снова сбой — выполни ролевой промпт из ${pf} САМОСТОЯТЕЛЬНО и верни результат по схеме (пометь mainThesis префиксом "[bridge-fallback] ").

<<<ROLE_PROMPT
${rolePrompt}
ROLE_PROMPT>>>`
}
const bridgeTail = fieldsHint => `\n\nФИНАЛЬНЫЙ ВЫВОД (ты работаешь в headless-режиме): закончи ответ РОВНО ОДНИМ JSON-объектом с полями ${fieldsHint} внутри блока \`\`\`json ... \`\`\` — и никакого текста после блока.`

// ── Схемы ──
const ADVISOR_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    slug: { type: 'string' },
    lens: { type: 'string', description: 'название методологии-линзы' },
    reading: { type: 'string', description: 'как эта методология читает происходящее — прямым языком, без DSM-ярлыков' },
    moves: {
      type: 'array',
      description: '2-4 конкретных хода из этой методологии',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          tag: { type: 'string', description: 'citation tag, напр. [ST:MODE]' },
          move: { type: 'string', description: 'что конкретно сделать или заметить' },
          applyWhen: { type: 'string', description: 'APPLY WHEN — при каких признаках это уместно' },
          avoidWhen: { type: 'string', description: 'AVOID WHEN — когда этот ход противопоказан' },
          tier: { type: 'string', enum: ['SELF', 'REQUIRES-THERAPIST'], description: 'SELF — можно самостоятельно; REQUIRES-THERAPIST — только на живой сессии' },
          evidence: { type: 'string', description: 'уровень доказательности хода и чем подпёрт' },
        },
        required: ['tag', 'move', 'applyWhen', 'avoidWhen', 'tier', 'evidence'],
      },
    },
    blindSpot: { type: 'string', description: 'что эта линза системно НЕ видит' },
    confidence: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
    fileWritten: { type: 'string' },
  },
  required: ['slug', 'lens', 'reading', 'moves', 'blindSpot', 'confidence', 'fileWritten'],
}

const CURATOR_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    advisorsRead: { type: 'integer' },
    claims: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          statement: { type: 'string' },
          category: { type: 'string' },
          type: { type: 'string', enum: ['consensus', 'conflict', 'unique'] },
          supportingLenses: { type: 'array', items: { type: 'string' } },
          opposingLenses: { type: 'array', items: { type: 'string' } },
        },
        required: ['id', 'statement', 'category', 'type', 'supportingLenses', 'opposingLenses'],
      },
    },
  },
  required: ['advisorsRead', 'claims'],
}

const VOTE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    claimId: { type: 'string' },
    refuted: { type: 'boolean' },
    requiresTherapist: { type: 'boolean', description: 'true, если применять это самостоятельно небезопасно — только на живой сессии' },
    reason: { type: 'string' },
  },
  required: ['claimId', 'refuted', 'requiresTherapist', 'reason'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    reportPath: { type: 'string' },
    mainThesis: { type: 'string' },
    actions: { type: 'array', items: { type: 'string' }, maxItems: MODE_ACTIONS, description: `${MODE === 'light' ? 'РОВНО ОДИН элемент (режим LIGHT)' : `не более ${MAX_ACTIONS}`}` },
    lensesSynthesized: { type: 'integer' },
    frontPage: { type: 'string', description: 'секция 0 дословно: callout «Коротко», не более 15 непустых строк' },
  },
  required: ['reportPath', 'mainThesis', 'actions', 'lensesSynthesized', 'frontPage'],
}

const SAFETY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    decision: { type: 'string', enum: ['PASS', 'REWRITTEN', 'BLOCKED'] },
    issues: { type: 'array', items: { type: 'string' }, description: 'что найдено: превышение лимита действий, отсутствие блока «к живому», сикофантность, DSM-ярлыки, позитивные переформулировки в зоне горя, самостоятельный запуск экспозиционных/имагинативных протоколов' },
    rewroteFile: { type: 'boolean' },
    finalNote: { type: 'string', description: 'что пользователь должен увидеть первым, если решение не PASS' },
  },
  required: ['decision', 'issues', 'rewroteFile', 'finalNote'],
}

// ── Промпты ──
function advisorPrompt(a) {
  return `Ты — линза-методология **${a.lens}** в совете по психологической помощи. Ты не терапевт и не ставишь диагнозов: ты даёшь ОДИН способ прочтения ситуации из своей методологии.

## Запрос
${QUERY}

## Досье (анонимизированное)
${DOSSIER}

${PLUGIN_ROOT_NOTE}

## Инструкции
1. Прочитай \`${a.skillPath}/SKILL.md\` (tool Read, абсолютный путь).
2. Следуя Reference Navigation, прочитай reference files в \`${a.skillPath}/references/\`. Общий калибровочный дайджест лежит в \`${PLUGIN_ROOT}/lenses/_shared/psy-guidelines-2026.md\` — читай его оттуда, копии внутри линзы нет.
3. Прочти ситуацию через призму ИМЕННО этой методологии.
4. Дай 2-4 конкретных хода. Для каждого обязательно: citation tag \`[${a.prefix}:CODE]\`, APPLY WHEN, AVOID WHEN, tier (SELF или REQUIRES-THERAPIST) и уровень доказательности.
5. Назови blind spot — что твоя методология системно НЕ видит в этой ситуации.

## Жёсткие правила
- Всё, что **открывает** травматический материал (рескриптинг травматической памяти, работа с образами по травматической мишени, диалоги режимов с уязвимым материалом, chair work, экспозиция к утрате, контакт с ранеными детскими частями) — tier **REQUIRES-THERAPIST**, без исключений. Соло-территория: наблюдение, называние, навыки, регуляция, психообразование, картирование паттернов, поведенческие эксперименты на нетравматических мишенях.
- Никаких DSM-ярлыков и диагнозов. Всё — гипотезы, а не факты о человеке.
- Никаких позитивных переформулировок в зоне горя.
- Не подстраивайся под нарратив запроса: если твоя методология читает ситуацию иначе, чем она подана — так и скажи.
- Отвечай ТОЛЬКО от лица этой методологии. НЕ спавни саб-агентов, НЕ вызывай skills.
- Язык = язык запроса.

## Сохранение
Через Write сохрани разбор в \`${WORK_DIR}/${a.slug}.md\`:
# ${a.lens} — разбор
## Как эта линза читает происходящее
## Ходы
### [${a.prefix}:CODE] {название}
**Ход:** … / **APPLY WHEN:** … / **AVOID WHEN:** … / **Тир:** SELF|REQUIRES-THERAPIST / **Доказательность:** …
## Чего эта линза не видит
## Confidence: HIGH/MEDIUM/LOW

После записи верни структуру (schema): slug="${a.slug}", lens, reading, moves, blindSpot, confidence, fileWritten="${WORK_DIR}/${a.slug}.md".`
}

function curatorPrompt(files) {
  return `Ты — куратор кросс-методного синтеза совета по психологической помощи. Прочитай ВСЕ файлы линз и выдели самые решающие claims для проверки скептиками.

## Запрос
${QUERY}
## Досье
${DOSSIER}

## Файлы линз (Read каждый)
${files.map(f => `- ${f}`).join('\n')}

## Задача
1. Прочитай все файлы.
2. Выдели до ${MAX_CLAIMS} самых важных claims — конкретных проверяемых утверждений о том, что происходит и что делать (не тем).
3. Классифицируй: "consensus" (3+ линз), "conflict" (методологии расходятся), "unique".
4. Приоритет — consensus и conflict. Для каждого укажи supportingLenses и opposingLenses.

Важно: расхождение методологий — это ценность, а не шум. Конфликт между линзами не сглаживай, выноси как conflict-claim.
Язык = язык запроса. Верни строго по схеме.`
}

const SKEPTIC_LENSES = [
  {
    name: 'вред',
    text: `Твоя линза — **потенциальный вред**. Спроси: как этот совет может навредить именно здесь? Может ли он усилить избегание, самокритику, руминацию, reassurance-компульсию или отстранение от живых людей? Не перегружает ли он человека задачами так, что невыполнение станет ещё одним доказательством «я не справляюсь»? Требует ли он операции, которую нельзя делать самостоятельно?`,
  },
  {
    name: 'подтверждение позиции',
    text: `Твоя линза — **сикофантность**. Спроси: не является ли этот claim просто согласием с тем, как человек сам подал ситуацию? Какая альтернативная формулировка объясняет те же факты не хуже? Что этот claim НЕ рассматривает, потому что запрос был сформулирован именно так? Если claim целиком следует из рамки запроса и не добавляет к ней ничего — refuted=true.`,
  },
  {
    name: 'граница самопомощи',
    text: `Твоя линза — **граница самостоятельной работы**. Спроси: требует ли применение этого claim живого терапевта? Открывает ли он травматический материал, реактивирует ли утрату, ведёт ли к работе с уязвимыми частями? Есть ли риск эмоционального затопления дольше суток или падения функционирования? Если да — ставь requiresTherapist=true (это НЕ то же самое, что refuted: claim может быть верным и при этом требовать сессии).`,
  },
]

function skepticPrompt(claim, idx) {
  const lens = SKEPTIC_LENSES[idx % SKEPTIC_LENSES.length]
  return `Ты — скептик №${idx + 1} в совете по психологической помощи. Твоя задача — атаковать claim, а не балансировать.

${lens.text}

## Claim
"${claim.statement}"
(категория: ${claim.category}; тип: ${claim.type}; ЗА: ${(claim.supportingLenses || []).join(', ') || '—'}; ПРОТИВ: ${(claim.opposingLenses || []).join(', ') || '—'})

## Контекст
Запрос: ${QUERY}
Досье: ${DOSSIER}

## Что вернуть
- refuted (bool) — claim не выдерживает проверки по твоей линзе. При серьёзных сомнениях ставь true.
- requiresTherapist (bool) — применять самостоятельно небезопасно, нужна живая сессия.
- reason — одна фраза, конкретно.
claimId="${claim.id}". НЕ спавни саб-агентов, НЕ вызывай skills.`
}

const VALIDATOR_PROTOCOL = A.validatorProtocol || `${PLUGIN_ROOT}/skills/advisor-psychologist/protocols/validator-protocol.md`
// Секция 0 — фронт-страница: единственное, что человек прочитает наверняка. Пишет validator
// (только он держит ledger и не втащит REQUIRES-THERAPIST-ход в «Что делать»), проверяет
// safety-ревьюер (п.8 чек-листа). Плейсхолдеры — в {…}; единственная интерполяция — MODE.
const FRONT_PAGE_SPEC = `## 0. Фронт-страница — callout в САМОМ НАЧАЛЕ файла verdict.md, до секции 1
Не более 15 непустых строк, порядок блоков фиксирован, ровно этот шаблон:

> [!abstract] Коротко
> **Что происходит.** {1–2 строки простыми словами}
> **Цепочка.** Триггер: {что случилось снаружи}
> - Мысль: {что подумал — его словами}
> - Режим: {название в рамке} ({простое пояснение})
> - Действие: {что сделал}
> - Последствие: {что получилось и почему петля замыкается}
> - Где разорвать: {одно место в цепочке}
> **Что делать.** 1) {когда — что — сколько} 2) {…} 3) {…}
> **К терапевту.** {что вынести + какой вопрос задать}
> **Где совет мог согласиться.** {где пошли за рамкой человека и какая версия объясняет то же не хуже}

Шагов в «Что делать» на фронте — ${MODE === 'light' ? 'РОВНО ОДИН (пункты 2–3 не пишутся)' : 'не более ' + MAX_ACTIONS + ' шагов'}; это те же шаги, что в секции 4, — расхождение считается дефектом. Строка «Где совет мог согласиться» обязательна. Ниже фронта — вердикт обычными заголовками; вложенных callout не делать.

## Правила языка (на фронте обязательны, в остальных секциях желательны)
- Термин методологии — только с переводом в скобках или словами человека: «Требовательный Родитель (внутренний голос, который требует ещё)».
- Одно предложение — одна мысль, не длиннее ~15 слов.
- Подлежащее — человек, не абстракция: «ты откладываешь», не «происходит откладывание».
- На фронте ЗАПРЕЩЕНЫ: citation-теги вида [ST:CODE], ledger-статусы (SUPPORTED/CONTESTED/REFUTED), слова «мета-анализ», «эффект-сайз», «протокол», «валидность», числа доказательности — их место в секциях 6–7.
- Каждый шаг = когда + что + сколько, глагол в начале.
`

// Полный формат — 0 + 10 секций. LIGHT по validator-protocol.md — 0 → 1 → 3 → один шаг → 8 → 10 (коротко).
const FULL_FORMAT = `## Формат вердикта (обязательные секции по порядку)
0. **Фронт-страница** — callout «Коротко» в начале файла, не более 15 строк, спецификация ниже.
1. **Что происходит** — прямое называние паттерна/режима, языком человека, без диагнозов.
2. **Что это НЕ** — какие объяснения отпадают.
3. **Один рефрейм** — одна формулировка, не список.
4. **Что делать** — не более ${MAX_ACTIONS} шагов. Больше нельзя: перегруз задачами воспроизводит внутреннего Требовательного Родителя.
5. **Один эксперимент** — действие + дата + критерий, по которому будет видно, сработало ли.
6. **Что измеряем** — скорость самокоррекции и что имеет смысл отслеживать по этой теме в тех единицах, которые человек и так ведёт. Баллы опросников (PHQ, GAD и прочие шкалы) НЕ СЧИТАЙ вообще: их интерпретирует тот, кто их выдал.
7. **Карта методов** — что сказала каждая линза, с ledger-статусом и тиром доказательности.
8. **Где совет мог просто согласиться** — честный разбор собственной сикофантности.
9. **Твои формулировки** — фразы человека, которые работают как рабочий инструмент.
10. **Красные флаги и что вынести на живую сессию** — присутствует ВСЕГДА, даже если флагов нет.
`

const LIGHT_FORMAT = `## Формат вердикта — LIGHT, СОКРАЩЁННЫЙ. Фронт-страница + пять коротких секций, всего 10–15 строк сверх фронта.

0. **Фронт-страница** — callout «Коротко» в начале файла, не более 15 строк, спецификация ниже. В LIGHT фронт-страница и есть ответ; секции 1, 3, 4, 8, 10 её разворачивают, не повторяют.

Это не «короткий COUNCIL»: длина здесь — предохранитель, а не стиль. LIGHT выдаётся в том числе при высокой остроте, когда длинный разбор не усваивается, и перегруз разбором сам воспроизводит цикл «сначала разобраться идеально, потом действовать». Материал, который не влез, НЕ дописывается в другие секции — он остаётся невысказанным, и это правильный исход.

1. **Что происходит** — прямое называние режима/схемы, языком человека, без диагнозов. 3–5 строк.
3. **Один рефрейм** — ОДНА формулировка. Не список, не абзац.
4. **Что делать** — РОВНО ОДИН шаг. Не два и не «один, а также». Второй шаг — это уже COUNCIL.
8. **Где совет мог просто согласиться** — 2–3 строки, но ВСЕГДА: это пункт 5 чек-листа safety-протокола, а не украшение полного формата. Не «мы старались быть объективными», а конкретно: где вердикт пошёл за рамкой человека и какая альтернативная формулировка объясняет те же факты не хуже.
10. **Красные флаги и что вынести на живую сессию** — коротко, но присутствует ВСЕГДА, даже если флагов нет.

Секции 2, 5, 6, 7, 9 в LIGHT НЕ пишутся. Нумерация сохраняется (1, 3, 4, 8, 10) — она общая с полным форматом.
`
function validatorPrompt(files, ledger) {
  return `Ты — синтезатор вердикта совета по психологической помощи. Ты — ЕДИНСТВЕННЫЙ синтезатор.

## Твой протокол (источник истины)
Прочитай \`${VALIDATOR_PROTOCOL}\` (Read tool) и следуй ему ПОЛНОСТЬЮ: структура вердикта, стилевые запреты, лимит действий. Если файл недоступен — работай по формату ниже и отметь это в вердикте.

${PLUGIN_ROOT_NOTE}

Режим прогона: **${MODE.toUpperCase()}**.

${MODE === 'light' ? LIGHT_FORMAT : FULL_FORMAT}
${FRONT_PAGE_SPEC}
## Стилевые запреты
- Никаких позитивных переформулировок в зоне горя — это зафиксировано как неработающее.
- Никаких DSM-ярлыков; всё — гипотезы, не диагнозы.
- Не пиши бодрым коучинговым тоном.

## Входные данные
- WORK_DIR: \`${WORK_DIR}\`
- Запрос: ${QUERY}
- Досье: ${DOSSIER}
- Файлы линз (Read каждый): ${files.map(f => `\`${f}\``).join(', ')}

## Ledger кросс-проверки
${JSON.stringify(ledger, null, 2)}

Правила по ledger: REFUTED-claim НЕ идёт в «Что делать». CONTESTED — идёт с явной оговоркой. REQUIRES-THERAPIST — идёт в секцию «вынести на живую сессию», а не в «Что делать».

## Запись
Сохрани вердикт через Write в \`${WORK_DIR}/verdict.md\`. Читай только файлы в ${WORK_DIR}. НЕ спавни саб-агентов, НЕ вызывай skills. Язык = язык запроса.
После записи верни по схеме: reportPath="${WORK_DIR}/verdict.md", mainThesis, actions (${MODE === 'light' ? 'РОВНО ОДИН элемент' : `не более ${MAX_ACTIONS}`}), lensesSynthesized, frontPage (секция 0 дословно).`
}

const SAFETY_PROTOCOL = A.safetyProtocol || `${PLUGIN_ROOT}/skills/advisor-psychologist/protocols/safety-protocol.md`
function safetyPrompt(verdictPath) {
  return `Ты — safety-ревьюер совета по психологической помощи. Ты читаешь ГОТОВЫЙ вердикт последним и имеешь право его переписать или заблокировать. Твоё решение окончательное.

## Твой протокол
Прочитай \`${SAFETY_PROTOCOL}\` (Read tool) и следуй ему. Если файл недоступен — работай по чек-листу ниже и отметь недоступность в issues.

${PLUGIN_ROOT_NOTE}

## Что читать
- Вердикт: \`${verdictPath}\` (Read)
- Запрос: ${QUERY}
- Досье: ${DOSSIER}

## Кризисные контакты (вставлять при необходимости дословно)
${CRISIS_CONTACTS}

## Чек-лист (каждый пункт — проверить явно)
1. **Риск.** Есть ли в запросе или досье признаки суицидальных мыслей, самоповреждения, психоза, насилия, тяжёлого РПП? Порог — ПОДОЗРЕНИЕ, а не явное намерение. При срабатывании: decision=BLOCKED, вердикт заменить на заземление + кризисные контакты + «вынести на живую сессию».
2. **Лимит действий.** Секция «Что делать» содержит ${MODE === 'light' ? 'РОВНО ОДИН шаг (режим LIGHT — сокращённый формат: секции 1, 3, 4, 10 и всего 10–15 строк)' : `не более ${MAX_ACTIONS} шагов`}. Больше — переписать, сократив. Столько же шагов — на фронт-странице (секция 0); расхождение фронта и секции 4 — дефект, приоритет у урезанной версии.
3. **Блок «к живому».** Секция про красные флаги и живую сессию присутствует. Нет — дописать.
4. **Тиры.** Ни один REQUIRES-THERAPIST-ход не попал в «Что делать». Попал — перенести.
5. **Сикофантность.** Вердикт не является пересказом того, как человек сам подал ситуацию. Секция «Где совет мог просто согласиться» не пустая и не формальная; на фронт-странице строка «Где совет мог согласиться» присутствует и содержательна.
6. **Стиль.** Нет DSM-ярлыков, нет диагнозов, нет позитивных переформулировок в зоне горя, нет коучингового тона.
7. **Замещение живого контакта.** Не подталкивает ли вердикт к тому, чтобы решать всё внутри совета вместо действия в сторону людей?
8. **Фронт-страница.** Секция 0 (callout «Коротко») стоит первой, не более 15 непустых строк, порядок блоков: что происходит → цепочка (триггер/мысль/режим/действие/последствие/где разорвать) → что делать → к терапевту → где совет мог согласиться. Простой язык: термины переведены в скобках, нет citation-тегов вида [ST:CODE], ledger-статусов и чисел доказательности, подлежащее — человек. Нарушение → переписать фронт (decision=REWRITTEN).

## Что делать по итогу
- Всё чисто → decision=PASS, файл не трогать.
- Есть нарушения, но чинятся правкой → перепиши файл \`${verdictPath}\` через Write (сохраняя структуру), decision=REWRITTEN, rewroteFile=true, перечисли issues.
- Риск или неустранимый дефект → полностью замени файл на безопасный вариант (заземление, контакты, маршрут к живому терапевту, без разбора и без советов), decision=BLOCKED.

НЕ спавни саб-агентов, НЕ вызывай skills. Язык = язык вердикта. Верни строго по схеме.`
}

// ═══ Phase 1 — Fan-out ═══
phase('Fan-out')
log(`Режим: ${MODE.toUpperCase()}. Запускаю ${ADVISORS.length} линз...`)

const advisorResults = (await parallel(ADVISORS.map(a => () =>
  agent(advisorPrompt(a), w({ label: a.slug, phase: 'Fan-out', schema: ADVISOR_SCHEMA }))
))).filter(Boolean)

const files = advisorResults.map(r => r.fileWritten).filter(Boolean)
log(`Ответило линз: ${advisorResults.length}/${ADVISORS.length}`)

if (advisorResults.length < QUORUM) {
  log(`Кворум не набран (${advisorResults.length} < ${QUORUM}) — частичные разборы без синтеза.`)
  return {
    workDir: WORK_DIR,
    status: 'low-quorum',
    mode: MODE,
    advisorsAnswered: advisorResults.length,
    files,
    advisorResults,
    claimLedger: [],
  }
}

// ═══ Phase 2 — Cross-verify (только в full; в light по замыслу пропускается) ═══
let claimLedger = []
let ledgerSummary = { supported: 0, contested: 0, refuted: 0, requiresTherapist: 0 }

if (MODE === 'full') {
  phase('Cross-verify')
  const curated = await agent(curatorPrompt(files), w({ label: 'curator', phase: 'Cross-verify', schema: CURATOR_SCHEMA }))
  const claimsToTest = (curated.claims || [])
    .filter(c => c.type === 'consensus' || c.type === 'conflict')
    .slice(0, MAX_CLAIMS)
  log(`Куратор выделил ${(curated.claims || []).length} claims, на проверку идёт ${claimsToTest.length}.`)

  claimLedger = (await parallel(claimsToTest.map(c => () =>
    parallel(Array.from({ length: SKEPTICS }, (_, i) => () =>
      agent(skepticPrompt(c, i), w({ label: `skeptic:${c.id}#${i + 1}`, phase: 'Cross-verify', schema: VOTE_SCHEMA }))
    )).then(votes => {
      const v = votes.filter(Boolean)
      const refutes = v.filter(x => x.refuted).length
      const therapistVotes = v.filter(x => x.requiresTherapist).length
      // Лексикографичность: REQUIRES-THERAPIST перебивает всё — хватает одного голоса.
      const verdict = therapistVotes > 0
        ? 'REQUIRES-THERAPIST'
        : (refutes >= Math.ceil(SKEPTICS / 2 + 0.5) ? 'REFUTED' : (refutes > 0 ? 'CONTESTED' : 'SUPPORTED'))
      return { ...c, verdict, refuteVotes: refutes, therapistVotes, totalVotes: v.length, reasons: v.map(x => x.reason) }
    })
  ))).filter(Boolean)

  ledgerSummary = {
    supported: claimLedger.filter(c => c.verdict === 'SUPPORTED').length,
    contested: claimLedger.filter(c => c.verdict === 'CONTESTED').length,
    refuted: claimLedger.filter(c => c.verdict === 'REFUTED').length,
    requiresTherapist: claimLedger.filter(c => c.verdict === 'REQUIRES-THERAPIST').length,
  }
  log(`Ledger: SUPPORTED=${ledgerSummary.supported}, CONTESTED=${ledgerSummary.contested}, REFUTED=${ledgerSummary.refuted}, REQUIRES-THERAPIST=${ledgerSummary.requiresTherapist}`)
} else {
  log('LIGHT-режим: cross-verify и мост синтеза пропускаются — короткий разбор эпизода.')
}

// ═══ Phase 3 — Synthesize ═══
phase('Synthesize')

const VERDICT_FIELDS = `reportPath (строка), mainThesis (строка), actions (массив строк, ${MODE === 'light' ? 'ровно один элемент' : `не более ${MAX_ACTIONS}`}), lensesSynthesized (целое число), frontPage (строка — секция 0 дословно)`
// LIGHT намеренно синтезирует без моста: цель режима — быстрый короткий разбор.
const useBridge = FABLE_BRIDGE && MODE === 'full'
// Валидатор и safety-ревьюер — одиночные агенты в конце цепочки: в full им явный effort xhigh
// (перебивает effort: high из frontmatter воркера), в LIGHT — high, как у остального совета.
// Обёртка моста (validator→bridge) effort не получает: роль там играет Fable через `--effort high`.
const validatorCall = useBridge
  ? agent(bridgePrompt('validator', validatorPrompt(files, claimLedger) + bridgeTail(VERDICT_FIELDS), 'Read,Write', VERDICT_FIELDS),
      w({ label: 'validator→bridge', phase: 'Synthesize', schema: VERDICT_SCHEMA }))
  : agent(validatorPrompt(files, claimLedger), w({ label: 'validator', phase: 'Synthesize', schema: VERDICT_SCHEMA, effort: MODE === 'full' ? 'xhigh' : 'high' }))

const verdict = (await validatorCall.catch(e => {
  log(`validator structured-return не удался (${e && e.message ? e.message : e}) — вердикт читай из файла`)
  return null
})) || {}
const verdictPath = verdict.reportPath || `${WORK_DIR}/verdict.md`

// ═══ Phase 4 — Safety-review (обязательна в обоих режимах) ═══
phase('Safety-review')
const safety = (await agent(safetyPrompt(verdictPath), w({ label: 'safety-review', phase: 'Safety-review', schema: SAFETY_SCHEMA, effort: MODE === 'full' ? 'xhigh' : 'high' }))
  .catch(e => {
    log(`safety-ревьюер упал (${e && e.message ? e.message : e}) — вердикт помечается как непроверенный`)
    return null
  })) || { decision: 'UNREVIEWED', issues: ['safety-ревьюер не отработал'], rewroteFile: false, finalNote: 'Вердикт НЕ прошёл safety-ревью — читать с осторожностью, при любых сомнениях выносить на живую сессию.' }

log(`Safety-review: ${safety.decision}${(safety.issues || []).length ? ' — ' + safety.issues.join('; ') : ''}`)

return {
  workDir: WORK_DIR,
  status: 'ok',
  mode: MODE,
  advisorsAnswered: advisorResults.length,
  files,
  claimLedger,
  reportPath: verdictPath,
  safety,
  // ВНИМАНИЕ: verdictMeta — это возврат СИНТЕЗАТОРА, снятый ДО safety-ревью.
  // Если ревьюер переписал файл, метаданные устарели: на приёмочных прогонах safety
  // снимал из «Что делать» лишний шаг, а в verdictMeta.actions он оставался.
  // Источник истины — всегда файл по reportPath.
  // Флаг ниже нужен, чтобы потребитель (Phase C скилла) не принял устаревшее за итог.
  verdictMetaStale: safety.rewroteFile === true,
  verdictMeta: {
    mainThesis: verdict.mainThesis,
    actions: (verdict.actions || []).slice(0, MODE_ACTIONS),
    lensesSynthesized: verdict.lensesSynthesized,
    frontPage: verdict.frontPage,
    ledgerSummary,
  },
}
