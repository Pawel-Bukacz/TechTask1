import { LoginPage } from './login.page';
import { Page } from '@playwright/test';

export class FooterPage extends LoginPage {
  constructor(protected page: Page) {
    super(page);
  }

  async checkSocialUrl(id: string): Promise<Page> {
    const [newPage]: [Page, void] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.getByTestId(id).click(),
    ]);

    return newPage;
  }
}
