import { Locator, Page } from '@playwright/test';
import { LoginPage } from './login.page';

export class MainPage extends LoginPage {
  constructor(protected page: Page) {
    super(page);
  }

  itemTitleLink(i: number): Locator {
    return this.page.locator(`#item_${i}_title_link`);
  }
}
