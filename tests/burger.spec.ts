import test, { expect } from "@playwright/test";

test.describe('Login tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    });
  test('Check all items button', async ({page})=>{
    await page.getByTestId('shopping-cart-link').click();
    await page.locator('#react-burger-menu-btn').click();
    await page.getByTestId('inventory-sidebar-link').click();
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
});
  test('Check about button', async ({page})=>{
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#about_sidebar_link').click();
        expect(page.url()).toBe('https://saucelabs.com/');
    });
  test('Check logout button', async ({page})=>{
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#logout_sidebar_link').click();
        expect(page.url()).toBe('https://www.saucedemo.com/');
    });

  test('Check reset store button', async ({page})=>{
        
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
        await page.locator('#react-burger-menu-btn').click();
        await page.getByTestId('reset-sidebar-link').click();
        await expect(page.getByTestId('shopping-cart-badge')).toBeHidden();
    });
});