# Automation Suite

End-to-end test automation for the e-commerce demo app, built with Playwright and JavaScript.

## What it tests
- Authentication (valid login, invalid credentials, locked-out user)
- Cart operations (add/remove items)
- Checkout flow (happy path + validation errors)
- Product sorting
- A public API endpoint

## Tech stack
- Playwright Test (JavaScript)
- Page Object Model
- Custom fixtures (dependency injection for page objects)
- Data-driven test cases
- Cross-browser: Chromium, Firefox, WebKit
- CI: GitHub Actions on every push/PR

## Run it locally
\`\`\`bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
\`\`\`

## What this demonstrates
- Page Object Model for maintainable locators/actions
- Fixture-based dependency injection instead of repeated setup code
- Positive + negative + edge-case coverage
- API-layer testing alongside UI
- CI integration with automatic report artifacts