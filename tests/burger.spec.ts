import { MainMenuComponent } from '../src/components/main-menu.components';
import { BurgerMenu } from '../src/pages/burger-menu.page';
import { loginData } from '../src/test-data/login.data';
import { expect, test } from '@playwright/test';

test.describe('Burger menu tests', () => {
  let mainMenuComponent: MainMenuComponent;
  let burgerMenu: BurgerMenu;

  test.beforeEach(async ({ page }) => {
    mainMenuComponent = new MainMenuComponent(page);
    burgerMenu = new BurgerMenu(page);

    await burgerMenu.goto();
    await burgerMenu.login(loginData.username, loginData.password);
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

  test('Check close button', async () => {
    await mainMenuComponent.burgerMenuButton.click();
    await expect(burgerMenu.allItemsButton).toHaveText('All Items');
    await burgerMenu.closeButton.click();

    await expect(burgerMenu.allItemsButton).toBeHidden();
  });
});
