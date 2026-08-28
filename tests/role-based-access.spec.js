import { test, expect } from '../fixtures/test-fixtures.js';

// "Roles" here map to identity states you'd verify in an IAM context —
// an active/provisioned account vs. a disabled/deprovisioned one.
const roles = [
  { role: 'Active (provisioned) user', user: 'standard_user', pass: 'secret_sauce', expectAccess: true },
  { role: 'Disabled (deprovisioned) user', user: 'locked_out_user', pass: 'secret_sauce', expectAccess: false },
];

test.describe('Role-based access control', () => {
  for (const r of roles) {
    test(`${r.role} — login attempt`, async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login(r.user, r.pass);

      if (r.expectAccess) {
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.inventory_list')).toBeVisible();
      } else {
        await expect(page).not.toHaveURL(/inventory/);
        await expect(loginPage.errorMsg).toBeVisible();
      }
    });
  }

  test('unauthenticated user cannot directly access a protected page', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(loginPage.errorMsg).toContainText('You can only access');
  });

  test('session is revoked after logout — protected page is inaccessible again', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    // terminate the session
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    // re-attempt access to the same protected resource
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(loginPage.errorMsg).toContainText('You can only access');
  });
});