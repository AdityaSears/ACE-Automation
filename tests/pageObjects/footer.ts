import { expect, Page, Locator } from "@playwright/test";
export class Footer {
  public readonly privacy: Locator;
  public readonly caprivacy: Locator;
  public readonly terms: Locator;
  public readonly careers: Locator;
  public readonly copyrighttag: Locator;

  constructor(private readonly page: Page) {
    this.privacy = this.page.locator(`//a[normalize-space()='Privacy Policy']`);
    this.caprivacy = this.page.locator(
      `//a[normalize-space()='Privacy Policy']`
    );
    this.terms = this.page.locator(`//a[normalize-space()='Terms Of Use']`);
    this.careers = this.page.locator(`//a[normalize-space()='Careers']`);
    this.copyrighttag = this.page.locator(
      `text="Transform SR Brands LLC.  All Rights Reserved."`
    );
  }
}
