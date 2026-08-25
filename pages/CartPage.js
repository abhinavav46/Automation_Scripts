export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('#checkout');
  }

  async removeItem(productName) {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async goToCheckout() {
    await this.checkoutBtn.click();
  }
}