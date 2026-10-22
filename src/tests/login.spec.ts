import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('POM with Login Page Simple', () =>
{
    test('Login with valid credns', async ({ page }) =>
    {
        // This is without the POM
        // await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
        // await page.getByRole("textbox", { name: "Username" }).fill;
        // //...

        // With POM
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("standard_user","tta_secret");//this is username=standard_user &
        await expect(page).toHaveTitle("TTACart - Products");

        //inventory page

    });
});
//tta report-
//file:///C:/Users/LENOVO/Desktop/PLayWright%20with%20TS/WorkSpace/AdvancePlaywrightFramework3x/tta-report/report_20261022_092830.html
