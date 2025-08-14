import { Page } from '@playwright/test';
import { LoginPage } from './login.page';

export class FooterPage extends LoginPage {
  constructor(protected page: Page) {
    super(page);
  }

  async checkSocial(id: string): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.getByTestId(id).click(),
    ]);
    return newPage;
  }
}
