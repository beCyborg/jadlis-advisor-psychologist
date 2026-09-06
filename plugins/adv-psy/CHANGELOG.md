# Changelog — adv-psy

Формат: [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/), версии — [SemVer](https://semver.org/lang/ru/).

## [1.1.0] — 2026-09-07 — режим диалога и фронт-страница вердикта / dialogue mode and verdict front page

### Для человека
- Основной режим теперь диалог: совет слушает, называет одну линзу-рамку и разговаривает в ней; полный разбор из 11 линз созывается только командой «созывай совет».
- У вердикта появилась фронт-страница — callout «Коротко» до 15 строк простым языком: что происходит, цепочка, что делать, что вынести терапевту.
- Диалог обязательно закрывается коротким итогом: брошенный без итога разговор — задокументированный режим вреда.

### For agents
- Added: режим `DIALOGUE` (Phase A' в `skills/adv-psy/SKILL.md`), выбор рамки в A.5 по колонке «Первая линза» из `references/cross-method-patterns.md`, явный список запрещённых в диалоге REQUIRES-THERAPIST-ходов.
- Added: секция 0 «Фронт-страница» — `protocols/validator-protocol.md`, `FRONT_PAGE_SPEC` в `workflows/council-psy.js`, поле `frontPage` в `VERDICT_SCHEMA` и `verdictMeta`, п.8 чек-листа в `protocols/safety-protocol.md` и в промпте safety-ревьюера.
- Added: правила языка вердикта (перевод терминов, ≤15 слов в предложении, запрет citation-тегов и ledger-статусов на фронте) — `protocols/validator-protocol.md`, `workflows/council-psy.js`.
- Added: `skills/adv-psy/references/gotchas.md` — смещение синтезатора в сторону REQUIRES-THERAPIST-шагов; обязательность safety-ревью не трогать ни в одном режиме.
- Added: необязательный мост синтеза на вторую модель через `claude -p` (`args.fableBridge === true`, `args.bridgeModel`), по умолчанию ВЫКЛЮЧЕН и работает только в `full`; при сбое роль исполняет тот же воркер.
- Changed: шаг анонимизации переехал A.6 → B.0 (`SKILL.md`, `protocols/triage-gate.md`, комментарий в `workflows/council-psy.js`); Phase B вызывается только по команде.
- Changed: `args` workflow принимает `dialogueSummary` и `dialogueLens` (совет обязан оспорить рамку диалога, а не подтвердить её).
- Changed: `protocols/triage-gate.md` — строка `DIALOGUE` в таблице режимов, COUNCIL гейтом не выбирается; `protocols/memory-protocol.md` — режим и рамка диалога в журнале, объём чтения для `DIALOGUE`.
- Migration: не требуется. Формат папки памяти, реестр линз и гейт конфигурации не менялись.

## [1.0.1] — 2026-09-06 — двуязычный README и гейты передачи / bilingual README and handover gates

### Для человека
- README переписан по пяти секциям (Зачем / Как выглядит / Как поставить / Как пользоваться / Границы и стоимость), рядом появился английский `README.en.md`.
- Основной путь установки теперь через хаб `jadlis`; свой маркетплейс `becyborg-psy` остался как альтернатива.
- В CI добавлена проверка на утечку секретов; в репозитории появились конвенции для агентов (`CLAUDE.md`) и этот changelog.

### For agents
- Added: `README.en.md`, `CHANGELOG.md`, `CLAUDE.md`, `docs/img/10-overview.v2-04.webp`.
- Changed: `README.md` — 5 секций + «Обновление» и «Права», установка через `https://github.com/beCyborg/jadlis-plugins.git` → `claude plugin install adv-psy@jadlis --config PSY_MEMORY_DIR=~/adv-psy`; убран shorthand-путь с `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1`.
- Changed: `.github/workflows/plugin-validate.yml` — job `gitleaks` (`gitleaks/gitleaks-action@v2`, `fetch-depth: 0`) рядом с job `validate`.
- Changed: `plugins/adv-psy/.claude-plugin/plugin.json` — `version` 1.0.0 → 1.0.1.
- Migration: не требуется, поведение скилла и линз не менялось.

## [1.0.0] — 2026-09-01 — первый релиз плагина / first plugin release

### Для человека
- Совет из 11 методологий-линз с триаж-гейтом (SAFE-STOP / LIGHT / COUNCIL / REVIEW), скептиками и safety-ревьюером с правом заблокировать вердикт.
- Память совета — обычные markdown-файлы в папке `PSY_MEMORY_DIR`, её путь задаётся при установке.
- Репозиторий приведён к домашнему стандарту: явный semver, `$schema` в манифестах, LICENSE, CI-валидация плагина.

### For agents
- Added: `plugins/adv-psy/` — скилл `adv-psy` (протоколы триажа, safety, вердикта, памяти), `lenses/` (11 линз + общий калибровочный дайджест), `workflows/council-psy.js`, `agents/advisor-opus-xhigh.md`, `shared/`, `assets/`.
- Added: маркетплейс `becyborg-psy` в `.claude-plugin/marketplace.json`; `NOTICE.md` (лицензии нет намеренно); `.github/workflows/plugin-validate.yml`.
- Added: `userConfig.PSY_MEMORY_DIR` в `plugins/adv-psy/.claude-plugin/plugin.json`.
- Changed: README — `--config` объявлен обязательным (значение по умолчанию из манифеста не подставляется).
