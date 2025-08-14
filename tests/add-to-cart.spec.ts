import test, { expect } from "@playwright/test";

test.describe('Login tests', () => {
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    });
test('Add item to the cart', async ({ page }) => {
  const itemTitle = await page.locator('#item_4_title_link').getByTestId('inventory-item-name').innerText();
  const items: string[] = ['add-to-cart-sauce-labs-backpack']
  items.forEach(async item => {
    await page.getByTestId(item).click();
  }); 
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await page.getByTestId('shopping-cart-badge').click();
  await expect(page.getByTestId('inventory-item-name')).toHaveText(itemTitle);
});
});