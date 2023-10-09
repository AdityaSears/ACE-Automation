import { expect, test } from "@playwright/test";
import { Footer } from "../pageObjects/footer";
import { AuthPage } from "../pageObjects/authPage";

test(`Validate Footer TC-23-27`, async ({ page }) => {
  let authobj = new AuthPage(page);
  let footerobj = new Footer(page);
  await page.goto(
    "https://agent-tokenization-development.searshomeservices.com"
  );
  await authobj.auth();
  await expect(footerobj.privacy).toBeVisible();
  await expect(footerobj.caprivacy).toBeVisible();
  await expect(footerobj.terms).toBeVisible();
  await expect(footerobj.careers).toBeVisible();
  await expect(footerobj.copyrighttag).toBeVisible();
});
