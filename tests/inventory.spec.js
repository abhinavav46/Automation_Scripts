import { test, expect } from '../fixtures/test-fixtures.js';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('sorting products low to high price', async ({ inventoryPage, page }) => {
  await inventoryPage.sortBy('lohi');
  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numeric = prices.map(p => parseFloat(p.replace('$', '')));
  expect(numeric).toEqual([...numeric].sort((a, b) => a - b));
});