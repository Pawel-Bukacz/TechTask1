import { Locator, Page } from '@playwright/test';
import { MainPage } from './main.page';

export class ProductDescription extends MainPage {
  invItemName: Locator;
  invItemDesc: Locator;
  invItemPrice: Locator;
  constructor(protected page: Page) {
    super(page);
    this.invItemName = page.getByTestId('inventory-item-name');
    this.invItemDesc = page.getByTestId('inventory-item-desc');
    this.invItemPrice = page.getByTestId('inventory-item-price');
  }
}
