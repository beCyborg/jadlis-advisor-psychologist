# Changelog — adv-psy

Формат: [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/), версии — [SemVer](https://semver.org/lang/ru/).

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
