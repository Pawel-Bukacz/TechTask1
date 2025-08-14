import test, { expect } from "@playwright/test";

test.describe('Login tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    });
  test('Footer test X', async ({page})=>{
    const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByTestId('social-twitter').click(),
    ]);

    // Check the URL
    expect(newPage.url()).toBe('https://x.com/saucelabs');
});
  test('Footer test LI', async ({page})=>{
    const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByTestId('social-linkedin').click(),
    ]);

    // Check the URL
    expect(newPage.url()).toBe('https://www.linkedin.com/company/sauce-labs/');
});
  test('Footer test FB', async ({page})=>{
    const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByTestId('social-facebook').click(),
    ]);

    // Check the URL
    expect(newPage.url()).toBe('https://www.facebook.com/saucelabs');
});

test('Show product details', async ({ page }) => {
  const productName = await page.locator('#item_4_title_link').getByTestId('inventory-item-name').innerText();

  // Open the product details
  await page.locator('#item_4_title_link').click();

  // Assert URL and name on the details page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
  await expect(page.getByTestId('inventory-item-name')).toHaveText(productName);
});
});