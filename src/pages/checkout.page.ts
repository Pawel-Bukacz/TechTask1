import { expect, Page } from '@playwright/test';
import { MainPage } from './main.page';
import { MainMenuComponent } from '../components/main-menu.components';
import { productList } from '../test-data/product.data';
import { checkoutData } from '../test-data/checkout.data';

export class CheckOut extends MainPage {
  mainMenuComponent: MainMenuComponent;
  itemList: object[];
  productList: any;
  constructor(protected page: Page) {
    super(page);
    this.mainMenuComponent = new MainMenuComponent(page);
    this.itemList = [];
    this.productList = productList;
  }

  async addItemsToCart(): Promise<void> {
    for (let i = 0; i < this.productList.length; i++) {
      await this.page
        .getByTestId(this.productList[i].addToCartButtonId)
        .click();
    }

    await this.mainMenuComponent.cartButton.click();
    await this.page.getByTestId('checkout').click();

    await this.verifyItemsInCart();

    await this.page.getByTestId('finish').click();
  }

  async checkoutFormValidation(
    firstName?: string,
    lastName?: string,
    postalCode?: string,
  ): Promise<void> {
    await this.mainMenuComponent.cartButton.click();
    await this.page.getByTestId('checkout').click();
    await this.page.getByTestId('firstName').fill(firstName ?? '');
    await this.page.getByTestId('lastName').fill(lastName ?? '');
    await this.page.getByTestId('postalCode').fill(postalCode ?? '');
    await this.page.getByTestId('continue').click();
  }

  async verifyItemsInCart(): Promise<void> {
    await this.checkoutFormValidation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );

    for (let i = 0; i < this.productList.length; i++) {
      const bodyText = await this.page.locator('body').innerText();
      expect(bodyText).toContain(this.productList[i].title);
      expect(bodyText).toContain(this.productList[i].price);
      expect(bodyText).toContain(this.productList[i].description);
    }

    await expect(this.page.getByTestId('subtotal-label')).toContainText(
      '129.94',
    );
    await expect(this.page.getByTestId('total-label')).toContainText('140.34');
    await expect(this.page.getByTestId('tax-label')).toContainText('10.40');
  }
}
