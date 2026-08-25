import { test, expect } from '../fixtures/test-fixtures.js';

test.beforeEach(async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
});

test('completes a full checkout', async ({ cartPage, checkoutPage }) => {
  await cartPage.goToCheckout();
  await checkoutPage.fillInfo('Abhinav', 'AV', '670001');
  await checkoutPage.finish();
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});

test('checkout blocks empty required fields', async ({ cartPage, checkoutPage }) => {
  await cartPage.goToCheckout();
  await checkoutPage.continueBtn.click(); // nothing filled in
  await expect(checkoutPage.errorMsg).toBeVisible();
});