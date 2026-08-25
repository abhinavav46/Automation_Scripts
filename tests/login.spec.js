import { test, expect } from '../fixtures/test-fixtures.js';

const cases = [
  { user: 'standard_user', pass: 'secret_sauce', expectSuccess: true },
  { user: 'locked_out_user', pass: 'secret_sauce', expectSuccess: false },
  { user: 'standard_user', pass: 'wrong_password', expectSuccess: false },
];

test.describe('Swag Labs Login (POM + fixtures)', () => {
  for (const c of cases) {
    test(`login: ${c.user} / ${c.pass}`, async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login(c.user, c.pass);

      if (c.expectSuccess) {
        await expect(page).toHaveURL(/inventory/);
      } else {
        await expect(loginPage.errorMsg).toBeVisible();
      }
    });
  }
});