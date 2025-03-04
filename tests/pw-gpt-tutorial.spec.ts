import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    
    await page.goto('https://playwright.dev/');
})

test.describe('My first tests', () => {
    
    test('should open Get started page', async ({ page }) => {
        
        // page locators
        const getStartedBtn = page.getByRole('link', {name: 'Get started'});


        // click Get started btn
        await getStartedBtn.click();

        // verify that page is opened
        await expect(page).toHaveURL(/.*docs\/intro/);
    })
    
})
