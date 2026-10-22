import { type Locator, type Page } from '@playwright/test';

export class Cartpage
{
  readonly page: Page;
  readonly title: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly checkout: Locator;

  constructor(page: Page)
  {
    this.page = page;

    // TTACart uses data-test, not Playwright's default data-testid.
    const byTest = (id: string) => page.locator(`[data-test="${id}"]`);

    this.title = byTest('title');
    this.itemName = byTest('inventory-item-name');
    this.itemPrice = byTest('inventory-item-price');
    this.checkout = byTest('checkout');
  }
  async goto()
  {
    await this.page.goto('https://app.thetestingacademy.com/playwright/ttacart/cart');
  }
}

/*
export class Cartpage {
  readonly page: Page;
  readonly ttacart: Locator;
  readonly document: Locator;
  readonly body: Locator;
  readonly document2: Locator;
  readonly ttacart2: Locator;
  readonly inventoryItemName: Locator;
  readonly linkCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ttacart = page.getByText("TTACart");
    this.document = page.getByRole("document");
    this.body = page.locator("body");
    this.document2 = page.getByRole("document");
    this.ttacart2 = page.getByText("TTACart");
    this.inventoryItemName = page.getByTestId("inventory-item-name").or(page.getByRole("link", { name: "Test.allTheThings() T-Shirt (Red)" })).or(page.getByText("Test.allTheThings() T-Shirt (Red)"));
    this.linkCheckout = page.getByRole("link", { name: "Checkout" }).or(page.getByTestId("checkout")).or(page.getByText("Checkout"));
  }

*/