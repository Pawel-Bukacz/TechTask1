import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {
  burgerMenuButton: Locator;
  cartButton: Locator;
  constructor(protected page: Page) {
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.cartButton = page.getByTestId('shopping-cart-link');
  }
}
