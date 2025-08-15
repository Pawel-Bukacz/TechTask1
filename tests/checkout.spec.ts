import { expect, test } from '@playwright/test';

test.describe('Checkout functionality tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
  });

  test('Add item to the cart', async ({ page }) => {
    const itemTitle: string = await page
      .locator('#item_4_title_link')
      .getByTestId('inventory-item-name')
      .innerText();
    const items: string[] = ['add-to-cart-sauce-labs-backpack'];
    items.forEach(async (item) => {
      await page.getByTestId(item).click();
    });
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await page.getByTestId('shopping-cart-badge').click();
    await expect(page.getByTestId('inventory-item-name')).toHaveText(itemTitle);
  });

  test('Check out', async ({ page }) => {
    const itemTitle: string = await page
      .locator('#item_4_title_link')
      .getByTestId('inventory-item-name')
      .innerText();
    const items: string[] = ['add-to-cart-sauce-labs-backpack'];
    items.map(async (item) => {
      await page.getByTestId(item).click();
    });
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await page.getByTestId('shopping-cart-badge').click();
    await expect(page.getByTestId('inventory-item-name')).toHaveText(itemTitle);

    await page.getByTestId('checkout').click();
    await page.getByTestId('firstName').fill('First Name');
    await page.getByTestId('lastName').fill('Last Name');
    await page.getByTestId('postalCode').fill('12-345');
    await page.getByTestId('continue').click();
    await page.getByTestId('finish').click();
    await page.getByTestId('back-to-products').click();

    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  });
});
