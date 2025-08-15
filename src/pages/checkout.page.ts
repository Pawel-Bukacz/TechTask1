import { expect, Locator, Page } from '@playwright/test';
import { MainPage } from './main.page';
import { MainMenuComponent } from '../components/main-menu.components';
import { productList } from '../test-data/product.data';
import { checkoutData } from '../test-data/checkout.data';

export class CheckOut extends MainPage {
  mainMenuComponent: MainMenuComponent;
  itemList: object[];
  productList: any;
  checkoutButton: Locator;

  constructor(protected page: Page) {
    super(page);
    this.mainMenuComponent = new MainMenuComponent(page);
    this.itemList = [];
    this.productList = productList;
    this.checkoutButton = page.getByTestId('checkout');
  }

  async addItemsToCart(): Promise<void> {
    for (let i: number = 0; i < this.productList.length; i++) {
      await this.page
        .getByTestId(this.productList[i].addToCartButtonId)
        .click();
    }

    await this.mainMenuComponent.cartButton.click();
    await this.checkoutButton.click();
    await this.verifyItemsInCart();
    await this.page.getByTestId('finish').click();
  }

  async verifyItemsInCart(): Promise<void> {
    await this.checkoutFormValidation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );

    for (let i: number = 0; i < this.productList.length; i++) {
      const bodyText: string = await this.page.locator('body').innerText();
      expect(bodyText).toContain(this.productList[i].title);
      expect(bodyText).toContain(this.productList[i].price);
      expect(bodyText).toContain(this.productList[i].description);
    }

    let expectedSum: number = 0;
    for (let i: number = 0; i < this.productList.length; i++) {
      expectedSum += Number(productList[i].price);
    }
    const expectedTax: number = Number((expectedSum * 0.08).toFixed(2));
    const expectedTotal: number = expectedSum + expectedTax;

    await expect(this.page.getByTestId('subtotal-label')).toContainText(
      String(expectedSum),
    );
    await expect(this.page.getByTestId('tax-label')).toContainText(
      String(expectedTax),
    );
    await expect(this.page.getByTestId('total-label')).toContainText(
      String(expectedTotal),
    );
  }

  async checkoutFormValidation(
    firstName?: string,
    lastName?: string,
    postalCode?: string,
  ): Promise<void> {
    await this.mainMenuComponent.cartButton.click();
    await this.checkoutButton.click();
    await this.page.getByTestId('firstName').fill(firstName ?? '');
    await this.page.getByTestId('lastName').fill(lastName ?? '');
    await this.page.getByTestId('postalCode').fill(postalCode ?? '');
    await this.page.getByTestId('continue').click();
  }
}
