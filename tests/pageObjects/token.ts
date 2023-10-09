import { expect, Page, Locator } from "@playwright/test";
export class TokenPage {
  public readonly phone: Locator;
  public readonly email: Locator;
  public readonly sendlink: Locator;
  public readonly smsnotification: Locator;
  public readonly emailnotification: Locator;
  public readonly smsemailnotification: Locator;
  public readonly logo: Locator;
  public readonly title: Locator;
  public readonly phonenw: Locator;
  public readonly phoneless: Locator;
  public readonly invalidemail: Locator;
  public readonly digitsonly: Locator;
  public readonly validphone: Locator;
  public readonly phoneemail: Locator;

  constructor(private readonly page: Page) {
    this.phone = this.page.locator(`//input[@id='phone']`);
    this.email = this.page.locator(`#email`);
    this.sendlink = this.page.locator(`//button[@type='submit']`);
    this.smsnotification = this.page.locator(
      `text='SMS notification sent successfully.'`
    );
    this.emailnotification = this.page.locator(
      `text='Email notification sent successfully.'`
    );
    this.smsemailnotification = this.page.locator(
      `text='Email and SMS notifications sent successfully.'`
    );
    this.logo = this.page.locator(`//img[@alt='SHS Logo']`);
    this.title = this.page.locator(
      `//h2[normalize-space()='CUSTOMER TOKENIZATION']`
    );
    this.phonenw = this.page.locator(
      `text="SMS notification failed, please verify the phone number and try again."`
    );
    this.phoneless = this.page.locator(
      `text='Phone number should be 10 digits'`
    );
    this.invalidemail = this.page.locator(`text='Invalid email address'`);
    this.digitsonly = this.page.locator(
      `text='Phone number should only contain digits'`
    );
    this.validphone = this.page.locator(
      `text='phone must be a valid phone number'`
    );
    this.phoneemail = this.page.locator(
      `text='Please enter either phone or email'`
    );
  }

  async smstoken() {
    await this.phone.fill("6128507696");
    await this.sendlink.click();
  }

  async emailtoken() {
    await this.email.fill("saiaditya.yatthapu@transformco.com");
    await this.sendlink.click();
  }

  async smsemailtoken() {
    await this.phone.fill("6128507696");
    await this.email.fill("saiaditya.yatthapu@transformco.com");
    await this.sendlink.click();
  }
}
