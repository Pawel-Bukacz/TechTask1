import test, { expect } from '@playwright/test';
import { loginData } from '../src/test-data/login.data';
import { FooterPage } from '../src/pages/footer.page';
import { footerData } from '../src/test-data/footer.data';

test.describe('Login tests', () => {
  let footerPage: FooterPage;
  test.beforeEach(async ({ page }) => {
    footerPage = new FooterPage(page);
    await footerPage.goto();
    await footerPage.login(loginData.username, loginData.password);
  });
  test('Check footer for X', async ({ page }) => {
    const twitterFooter = await footerPage.checkSocial(footerData.twitterId);

    expect(twitterFooter).toHaveURL(footerData.twitterURL);
  });

  test('Footer test LI', async ({ page }) => {
    const linkedInFooter = await footerPage.checkSocial(footerData.linkedInId);

    expect(linkedInFooter).toHaveURL(footerData.linkedInURL);
  });

  test('Footer test FB', async ({ page }) => {
    const linkedInFooter = await footerPage.checkSocial(footerData.facebookId);

    expect(linkedInFooter).toHaveURL(footerData.facebookURL);
  });
});
