import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe('API + UI tests for Petstore', () => {
    
    const userData = {
        id: faker.number.int({ min: 1000, max: 9999 }), // Унікальний ID
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: 'Test@12345',
        phone: faker.phone.number(),
        userStatus: 1
    };

    test('should create user via API and verify via API & UI', async ({ page, request }) => {
        
        // 1️⃣ Створюємо користувача через API
        const createResponse = await request.post('https://petstore.swagger.io/v2/user', {
            data: userData
        });

        expect(createResponse.status()).toBe(200);
        const responseBody = await createResponse.json()
        console.log(responseBody)

        console.log('✅ User created:', userData);

        // 2️⃣ Перевіряємо, що користувач є через API
        const getResponse = await request.get(`https://petstore.swagger.io/v2/user/${userData.username}`);
        expect(getResponse.status()).toBe(200);

        const userFromAPI = await getResponse.json();
        console.log('✅ User found via API:', userFromAPI);

        expect(userFromAPI.username).toBe(userData.username);
        expect(userFromAPI.email).toBe(userData.email);
        expect(userFromAPI.firstName).toBe(userData.firstName);

        // 3️⃣ Відкриваємо UI Petstore та шукаємо користувача
        await page.goto('https://petstore.swagger.io/');
        await page.getByRole('link', { name: 'User' }).click();

        // Перевіряємо, що поле введення доступне
        const usernameInput = page.locator('input[placeholder="username"]');
        await expect(usernameInput).toBeVisible();

        // Вводимо юзернейм і натискаємо "Get User"
        await usernameInput.fill(userData.username);
        await page.getByRole('button', { name: 'Get user' }).click();

        // Очікуємо, що ім'я користувача з'явиться на сторінці
        await expect(page.locator('body')).toContainText(userData.username);
        await expect(page.locator('body')).toContainText(userData.email);

        console.log('✅ User found in UI');
    });
});
