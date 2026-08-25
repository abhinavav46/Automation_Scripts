import { test, expect } from '../fixtures/test-fixtures.js';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('adding a product updates the cart badge', async ({ inventoryPage }) => {
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('removing a product clears the cart', async ({ inventoryPage, cartPage, page }) => {
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.removeItem('Sauce Labs Backpack');
  await expect(page.locator('.cart_item')).toHaveCount(0);
});