# Advance Playwright Framework 3x

An end-to-end browser testing framework built with [Playwright](https://playwright.dev/) and TypeScript. It currently includes a Page Object Model login test, environment-based base URL configuration, reusable test-data utilities, and Playwright's HTML report alongside a custom TTA report.

## Tech stack

- Playwright Test
- TypeScript
- dotenv for optional local environment configuration
- Custom TTA and Playwright HTML reporters
- CSV, YAML, Excel, and MySQL utility dependencies

## Project structure

```text
.
├── docs/                    # Project documentation
├── rules/                   # Project rules
├── src/
│   ├── ai/                  # AI-related helpers
│   ├── api/                 # API support
│   ├── config/              # Configuration
│   ├── fixtures/            # Playwright fixtures
│   ├── pages/               # Page objects
│   ├── testdata/            # Test data
│   ├── tests/               # Playwright test specs
│   └── utils/               # Reporters, data readers, and helpers
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js and npm

## Installation

```bash
npm ci
npx playwright install chromium
```

## Running tests

Run the complete suite:

```bash
npx playwright test
```

Run a specific spec:

```bash
npx playwright test src/tests/login.spec.ts
```

Run with a visible browser:

```bash
npx playwright test --headed
```

The configured browser project is Chromium. The current login test uses the TTACart training application at `https://app.thetestingacademy.com/playwright/ttacart/`.

## Configuration

`playwright.config.ts` loads a `.env` file when present. You can set `BASE_URL` directly or select a target with `TTA_ENV`:

| `TTA_ENV` value | Base URL override |
|---|---|
| `qa` (default) | `QA_BASE_URL` |
| `dev` or `local` | `DEV_BASE_URL` |
| `stg`, `stage`, or `staging` | `STG_BASE_URL` |
| `prod` or `production` | `PROD_BASE_URL` |
| `api` | `API_BASE_URL` |

If a target-specific variable is not set, the configuration uses its built-in default URL. Keep credentials and other private values in your local `.env` file; do not commit them.

## Reports and artifacts

Each test run is configured to collect screenshots, video, and trace data. Playwright's HTML report and the custom TTA report are also configured. After a run, open the Playwright report with:

```bash
npx playwright show-report
```

Generated reports and test artifacts are written to `playwright-report/`, `tta-report/`, and `test-results/`.
