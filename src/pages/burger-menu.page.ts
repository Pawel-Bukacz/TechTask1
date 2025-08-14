import { Locator, Page } from '@playwright/test';

export class BurgerMenu {
  allItemsButton: Locator;
  aboutButton: Locator;
  logoutButton: Locator;
  resetButton: Locator;
  closeButton: Locator;

  constructor(protected page: Page) {
    this.allItemsButton = page.getByTestId('inventory-sidebar-link');
    this.aboutButton = page.locator('#about_sidebar_link');
    this.logoutButton = page.locator('#logout_sidebar_link');
    this.resetButton = page.getByTestId('reset-sidebar-link');
    this.closeButton = page.locator('#react-burger-cross-btn');
  }
}
