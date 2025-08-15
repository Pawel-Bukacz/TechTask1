import { FooterPage } from '../src/pages/footer.page';
import { footerData } from '../src/test-data/footer.data';
import { loginData } from '../src/test-data/login.data';
import { Page, expect, test } from '@playwright/test';

test.describe('Footer tests', () => {
  let footerPage: FooterPage;
  test.beforeEach(async ({ page }) => {
    footerPage = new FooterPage(page);
    await footerPage.goto();
    await footerPage.login(loginData.username, loginData.password);
  });
  test('Check footer for X', async () => {
    const twitterFooter: Page = await footerPage.checkSocialUrl(
      footerData.twitterId,
    );

    expect(twitterFooter).toHaveURL(footerData.twitterURL);
  });

  test('Footer test LI', async () => {
    const linkedInFooter: Page = await footerPage.checkSocialUrl(
      footerData.linkedInId,
    );

    expect(linkedInFooter).toHaveURL(footerData.linkedInURL);
  });

  test('Footer test FB', async () => {
    const linkedInFooter: Page = await footerPage.checkSocialUrl(
      footerData.facebookId,
    );

    expect(linkedInFooter).toHaveURL(footerData.facebookURL);
  });
});
