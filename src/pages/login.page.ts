import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  errorMessage: Locator;

  constructor(protected page: Page) {
    super(page);
    this.url = '/';
    this.errorMessage = page.getByTestId('error');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
  }
}
