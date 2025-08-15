import { CheckOut } from '../src/pages/checkout.page';
import { checkoutData } from '../src/test-data/checkout.data';
import { loginData } from '../src/test-data/login.data';
import { expect, test } from '@playwright/test';

test.describe('Add items to cart functionality tests', () => {
  let checkOut: CheckOut;
  test.beforeEach(async ({ page }) => {
    checkOut = new CheckOut(page);

    await checkOut.goto();
    await checkOut.login(loginData.username, loginData.password);
  });

  test('Checkout without inputting user information', async ({ page }) => {
    await checkOut.checkoutFormValidation();

    await expect(page.getByTestId('error')).toHaveText(
      'Error: First Name is required',
    );
  });

  test('Checkout with inputting correct user information', async ({ page }) => {
    await checkOut.checkoutFormValidation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );

    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html',
    );
  });

  test('Checkout without inputting first name', async ({ page }) => {
    await checkOut.checkoutFormValidation(
      undefined,
      checkoutData.lastName,
      checkoutData.postalCode,
    );

    await expect(page.getByTestId('error')).toHaveText(
      'Error: First Name is required',
    );
  });

  test('Checkout without inputting last name', async ({ page }) => {
    await checkOut.checkoutFormValidation(
      checkoutData.firstName,
      undefined,
      checkoutData.postalCode,
    );

    await expect(page.getByTestId('error')).toHaveText(
      'Error: Last Name is required',
    );
  });

  test('Checkout without inputting postal code', async ({ page }) => {
    await checkOut.checkoutFormValidation(
      checkoutData.firstName,
      checkoutData.lastName,
      undefined,
    );

    await expect(page.getByTestId('error')).toHaveText(
      'Error: Postal Code is required',
    );
  });

  test('Add product to cart and verify them', async ({ page }) => {
    await checkOut.addItemsToCart();

    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html',
    );
  });
});
