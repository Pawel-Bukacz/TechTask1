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
    //Arrange
    await loginPage.goto();
    //Act
    await loginPage.login(username, password);
    //Assert
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('Login with incorrect username', async ({ page }) => {
    //Arrange
    await loginPage.goto();
    //Act
    await loginPage.login(username.slice(-1), password);
    //Assert
    await expect(page.getByTestId('error')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('Login with incorrect password', async ({ page }) => {
    //Arrange
    await loginPage.goto();
    //Act
    await loginPage.login(username, password.slice(-1));
    //Assert
    await expect(page.getByTestId('error')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
