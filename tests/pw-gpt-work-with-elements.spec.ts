import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    
    await page.goto('http://the-internet.herokuapp.com/');
})

test.describe('Work with elements', () => {
    
    test('should fill and type text in textfield', async ({ page }) => {
        
        // open text box
        await page.getByRole('link', {name:'Form Authentication'}).click();

        // fill username
        await page.locator('#username').fill('John Smith');
        await expect(page.locator('#username')).toHaveValue('John Smith');

        // fill email
        await page.locator('#password').type('123456');
        await expect(page.locator('#password')).toHaveValue('123456');
    })

    test('should check checkbox', async ({ page }) => {
        
        // open checkbox elements
        await page.getByRole('link', { name: 'Checkboxes' }).click();

        // mark checkbox 
        await page.getByRole('checkbox').first().check();
        await expect(page.getByRole('checkbox').first().isChecked()).toBeTruthy();
    })
    
    test('should chose from dropdown', async ({ page }) => {
        
        // open dropdown
        await page.getByRole('link', { name: 'Dropdown' }).click();

        // chose option 2
        await page.locator('select#dropdown').selectOption('Option 2');
        await expect(page.locator('select#dropdown')).toHaveValue('2')
    })
})
