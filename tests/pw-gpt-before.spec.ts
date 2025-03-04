import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    
    await page.goto('http://the-internet.herokuapp.com/');
})

test.describe('Checking before and after each', () => {
    
    test('should login user', async ({ page }) => {
        
        // open login form
        await page.getByRole('link', {name: 'Form Authentication'}).click();

        // enter username
        await page.locator('#username').fill('tomsmith');

        // enter password
        await page.locator('#password').fill('SuperSecretPassword!');

        // click login btn
        await page.locator('button[type="submit"]').click();

        // make sure user is logged in
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    })

    test.afterEach(async ({ page }) => {
    
        // click logout btn
        await page.locator('a.button').click();
    
        // make sure user is logged out
        await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
    })
})




