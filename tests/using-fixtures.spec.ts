import { test, expect } from './fixtures';

test.describe('Using Fixtures', () => {

    test('should access secure page', async ({ page, login }) => {
        await login(); // ✅ Логін всередині тесту
        await expect(page.locator('h2')).toHaveText('Secure Area');
    });

    test('using fixture', async ({ page, generateRandomUser }) => {
        const { username, email } = generateRandomUser;

        await page.goto('http://the-internet.herokuapp.com/login');
        await page.locator('#username').fill(username);
        await page.locator('#password').fill(email);
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    })
    

});

