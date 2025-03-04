import { test as base, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const test = base.extend<{ 
    login: () => Promise<void>;
    generateRandomUser: { username: any, email: any };
 }>({
    login: async ({ page }, use) => {
        await page.goto('http://the-internet.herokuapp.com/login');
        await page.locator('#username').fill('tomsmith');
        await page.locator('#password').fill('SuperSecretPassword!');
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

        await use(async () => {
            // Використовуємо функцію login без параметрів
        });
    },

    generateRandomUser: async ({}, use) => {
        const fakeUser = {
            username: faker.internet.username(),
            email: faker.internet.email()
        };

        await use(fakeUser);
    }
});

export { test, expect };
