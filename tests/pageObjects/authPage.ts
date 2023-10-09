import { expect, Page, Locator } from "@playwright/test";
//const CryptoJS=require("crypto-js");
export class AuthPage {
  public readonly ldapid: Locator;
  public readonly password: Locator;
  public readonly login: Locator;

  constructor(private readonly page: Page) {
    this.ldapid = this.page.locator("#username");
    this.password = this.page.locator("#password");
    this.login = this.page.locator(`//input[@value="Login"]`);
  }

  async auth() {
    await this.ldapid.fill("Enter Your LDAP ID"); //Enter your ldap id
    await this.password.fill("Enter Your Password"); // enter your password.

    await this.login.click();
  }
}
