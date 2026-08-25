export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addProductToCart(productName) {
    const item = this.page.locator('.inventory_item', { hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortBy(optionValue) {
    // values: 'az', 'za', 'lohi', 'hilo'
    await this.sortDropdown.selectOption(optionValue);
  }
}