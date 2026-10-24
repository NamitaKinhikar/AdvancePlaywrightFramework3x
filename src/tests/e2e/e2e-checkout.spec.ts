import { expect, test } from '@playwright/test';
import { Cartpage } from '../../pages/CartPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { Inventorypage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test('completes checkout for the first inventory item', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'tta_secret');
    await expect(page).toHaveTitle('TTACart - Products');

    const inventory = new Inventorypage(page);
    const itemName = await inventory.addFirstItemToCart();
    await inventory.openCart();

    const cart = new Cartpage(page);
    await expect(cart.itemName).toContainText(itemName);
    await cart.checkout.click();

    const checkoutStepOne = new CheckoutStepOnePage(page);
    await checkoutStepOne.assertLoaded();
    await checkoutStepOne.fillGuest({
        firstName: 'Taylor',
        lastName: 'Tester',
        postalCode: '12345',
    });
    await checkoutStepOne.continue();

    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    await checkoutStepTwo.assertLoaded();
    const subtotal = await checkoutStepTwo.subtotal();
    const tax = await checkoutStepTwo.tax();
    expect(await checkoutStepTwo.total()).toBeCloseTo(subtotal + tax, 2);
    await checkoutStepTwo.finish();

    const complete = new CheckoutCompletePage(page);
    await complete.assertOrderComplete();
});
