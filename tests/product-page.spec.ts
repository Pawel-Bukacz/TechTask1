import { test, expect } from '@playwright/test';
import { loginData } from '../src/test-data/login.data';
import { productList } from '../src/test-data/product.data';
import { ProductDescription } from '../src/pages/product-description.page';

test.describe('Login tests', () => {
  let productDescription: ProductDescription;

  test.beforeEach(async ({ page }) => {
    productDescription = new ProductDescription(page);
    await productDescription.goto();
    await productDescription.login(loginData.username, loginData.password);
  });

  test('Check every product title', async ({ page }) => {
    for (let i = 0; i < 6; i++) {
      expect(productDescription.itemTitleLink(i)).toHaveText(
        productList[i].title,
      );
    }
  });

  test('Check details of each product', async ({ page }) => {
    for (let i = 0; i < 6; i++) {
      await productDescription.itemTitleLink(i).click();
      await expect(productDescription.invItemName).toHaveText(
        productList[i].title,
      );
      await expect(productDescription.invItemDesc).toHaveText(
        productList[i].description,
      );
      await expect(productDescription.invItemPrice).toContainText(
        productList[i].price,
      );
      await page.goBack();
    }
  });
});
