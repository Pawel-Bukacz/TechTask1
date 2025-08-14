import test, { expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { MainMenuComponent } from '../src/components/main-menu.components';
import { loginData } from '../src/test-data/login.data';
import { BurgerMenu } from '../src/pages/burger-menu.page';

test.describe('Burger menu tests', () => {
  let loginPage: LoginPage;
  let mainMenuComponent: MainMenuComponent;
  let burgerMenu: BurgerMenu;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainMenuComponent = new MainMenuComponent(page);
    burgerMenu = new BurgerMenu(page);

    await loginPage.goto();
    await loginPage.login(loginData.username, loginData.password);
  });

  test('Check All Items button', async ({ page }) => {
    await mainMenuComponent.burgerMenuButton.click();
    await burgerMenu.allItemsButton.click();

    expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Check About button', async ({ page }) => {
    await mainMenuComponent.burgerMenuButton.click();
    await burgerMenu.aboutButton.click();

    expect(page).toHaveURL('https://saucelabs.com/');
  });

  test('Check Logout button', async ({ page }) => {
    await mainMenuComponent.burgerMenuButton.click();
    await burgerMenu.logoutButton.click();

    expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Check Reset App State button', async ({ page }) => {
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(mainMenuComponent.cartBadge).toHaveText('1');
    await mainMenuComponent.burgerMenuButton.click();
    await burgerMenu.resetButton.click();

    await expect(page.getByTestId('shopping-cart-badge')).toBeHidden();
  });

  test('Check close button', async ({ page }) => {
    await mainMenuComponent.burgerMenuButton.click();
    await expect(burgerMenu.allItemsButton).toHaveText('All Items');
    await burgerMenu.closeButton.click();

    await expect(burgerMenu.allItemsButton).toBeHidden();
  });
});
