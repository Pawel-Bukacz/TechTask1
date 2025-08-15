import { LoginPage } from './login.page';
import { Locator, Page } from '@playwright/test';

export class MainPage extends LoginPage {
  constructor(protected page: Page) {
    super(page);
  }

  itemTitleLink(i: number): Locator {
    return this.page.locator(`#item_${i}_title_link`);
  }
}
