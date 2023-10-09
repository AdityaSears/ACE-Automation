import { expect, test } from "@playwright/test";
import { AuthPage } from "../pageObjects/authPage";
import { TokenPage } from "../pageObjects/token";
//const CryptoJS=require("crypto-js");
const newphonenumber = "6302154267";

test.describe(`token`, async () => {
  test.beforeEach(async ({ page }) => {
    let authobj = new AuthPage(page);
    await page.goto(
      "https://agent-tokenization-development.searshomeservices.com"
    );
    await authobj.auth();
  });

  test(`Validate SMS message is successfully sent TC-3`, async ({ page }) => {
    let tokenobj = new TokenPage(page);

    await test.step(`verify Logo and title TC-1,2`, async () => {
      await expect(tokenobj.logo).toBeVisible();
      await expect(tokenobj.title).toBeVisible();
    });

    await test.step(`Verify SMS sent`, async () => {
      await tokenobj.smstoken();
    });
    await test.step(`Verify SMS send through popup`, async () => {
      await expect(tokenobj.smsnotification).toBeVisible({ timeout: 10000 });
    });
  });

  test(`Validate Email sent Successfully TC-5`, async ({ page }) => {
    let tokenobj = new TokenPage(page);

    await tokenobj.emailtoken();
    await expect(tokenobj.emailnotification).toBeVisible({ timeout: 15000 });
  });

  test(`Validate both the flows TC-6`, async ({ page }) => {
    let tokenobj = new TokenPage(page);

    await tokenobj.smsemailtoken();
    await expect(tokenobj.smsemailnotification).toBeVisible({ timeout: 15000 });
  });

  test(`Validate Tokenization by passing Not white Listed Number TC-4`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);

    await tokenobj.phone.fill(newphonenumber, { timeout: 10000 });
    await tokenobj.sendlink.click({ timeout: 15000 });
    await expect(tokenobj.phonenw).toBeVisible({ timeout: 15000 });
  });

  test(`Validate Tokenization by passing not white listed along with mail TC-7`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.phone.fill(newphonenumber, { timeout: 10000 });
    await tokenobj.emailtoken();
    await expect(tokenobj.emailnotification).toBeVisible({ timeout: 15000 });
    await expect(tokenobj.phonenw).toBeVisible({ timeout: 15000 });
  });

  test(`Validate Invalid Phone number by passing less than 10 TC-10`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.phone.fill("123456789", { timeout: 20000 });
    await tokenobj.sendlink.click();
    await expect(tokenobj.phoneless).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Invalid Phone number by passing non numeric TC-12`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.phone.fill("1234@#$%a1", { timeout: 20000 });
    await tokenobj.sendlink.click();
    await expect(tokenobj.digitsonly).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Invalid Phone number by passing Random Value TC-13`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.phone.fill("1234567890", { timeout: 20000 });
    await tokenobj.sendlink.click();
    await expect(tokenobj.validphone).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Email by not passing @ symbol  TC-14`, async ({ page }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.email.fill("saiaditya.yatthapu", { timeout: 20000 });
    await tokenobj.sendlink.click();
    await expect(tokenobj.invalidemail).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Email by not passing domain  TC-15`, async ({ page }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.email.fill("saiaditya.yatthapu@transformco", {
      timeout: 20000,
    });
    await tokenobj.sendlink.click();
    await expect(tokenobj.invalidemail).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Email by passing double @@  TC-17`, async ({ page }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.email.fill("saiaditya.yatthapu@@transformco.com", {
      timeout: 20000,
    });
    await tokenobj.sendlink.click();
    await expect(tokenobj.invalidemail).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Email by passing double ..  TC-18`, async ({ page }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.email.fill("saiaditya..yatthapu@transformco.com", {
      timeout: 20000,
    });
    await tokenobj.sendlink.click();
    await expect(tokenobj.invalidemail).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Tokenization by not passing any parameters TC-19`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.phone.fill("", { timeout: 20000 });
    await tokenobj.email.fill("", { timeout: 20000 });
    await tokenobj.sendlink.click();
    await expect(tokenobj.phoneemail).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Tokenization by passing Invalid Phone and valid email TC-20`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.phone.fill("1234567890", { timeout: 20000 });
    await tokenobj.email.fill("saiaditya.yatthapu@transformco.com", {
      timeout: 20000,
    });
    await tokenobj.sendlink.click();
    await expect(tokenobj.validphone).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Tokenization by passing Invalid email and valid mail TC-21`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.phone.fill("6128507696", { timeout: 20000 });
    await tokenobj.email.fill("saiaditya.yatthapu@transformco", {
      timeout: 20000,
    });
    await tokenobj.sendlink.click();
    await expect(tokenobj.invalidemail).toBeVisible({ timeout: 15000 });
  });
  test(`Validate Tokenization by passing Invalid email and invalid mail TC-22`, async ({
    page,
  }) => {
    let tokenobj = new TokenPage(page);
    await tokenobj.phone.fill("612850712", { timeout: 20000 });
    await tokenobj.email.fill("saiaditya.yatthapu@transformco", {
      timeout: 20000,
    });

    await tokenobj.sendlink.click();
    await expect(tokenobj.phoneless).toBeVisible({ timeout: 15000 });
    await expect(tokenobj.invalidemail).toBeVisible({ timeout: 15000 });
  });
});
