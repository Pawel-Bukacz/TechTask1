import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { loginData } from '../src/test-data/login.data';

test.describe('Login tests', () => {
  let loginPage: LoginPage;
  let username = loginData.username;
  let password = loginData.password;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });
  
  test('Login with correct credentials', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(username, password);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('Login with incorrect username', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(username.slice(-1), password);
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('Login with incorrect password', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(username, password.slice(-1));
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
