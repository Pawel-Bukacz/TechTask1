import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { loginData } from '../../src/test-data/login.data';
import { MainMenuComponent } from '../../src/components/main-menu.components';

test.describe('Main page smoke tests', () => {
  let loginPage: LoginPage;
  let mainMenuComponent: MainMenuComponent;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainMenuComponent = new MainMenuComponent(page);
    await loginPage.goto();
    await loginPage.login(loginData.username, loginData.password);
  });
  test(
    'Verify if product page is available',
    { tag: ['@smoke'] },
    async ({ page }) => {
      await expect(page.getByTestId('title')).toHaveText('Products');
    },
  );
  test(
    'Verify if cart page is available',
    { tag: ['@smoke'] },
    async ({ page }) => {
      await mainMenuComponent.cartButton.click();
      await expect(page.getByTestId('title')).toHaveText('Your Cart');
    },
  );
  test(
    'Verify if burger menu is available',
    { tag: ['@smoke'] },
    async ({ page }) => {
      await mainMenuComponent.burgerMenuButton.click();
      await expect(page.getByTestId('inventory-sidebar-link')).toHaveText(
        'All Items',
      );
    },
  );
});
