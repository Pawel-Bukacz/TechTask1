import {test, expect} from "@playwright/test";

test.describe('Login tests', () => {
  test('Login with correct credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('title')).toHaveText('Products');
});

test('Login with incorrect username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_use');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login with incorrect password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauc');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});
});