export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
    this.errorMsg = page.locator('[data-test="error"]');
  }

  async fillInfo(firstName, lastName, zip) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(zip);
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }
}