import { test, expect, } from "@playwright/test";

test.describe('API test ->', () => {

    test('GET request for user', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users/2');

        await expect(response.status()).toBe(200);

        const responseBody = await response.json();

        await expect(responseBody.name).toBeDefined();
        console.log(responseBody);
    })

    test('GET request for users', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users');

        await expect(response.status()).toBe(200);

        const responseBody = await response.json();

        // expect(responseBody.id).toBe(10);
        console.log(responseBody)
    })

    test('POST request create user', async ({ request }) => {

        const newUser = {
            name: "John Smith",
            username: "johnsmith",
            email: "jon@smith.com"
        }

        const response = await request.post('https://jsonplaceholder.typicode.com/users', {
            data: newUser
        });

        await expect(response.status()).toBe(201);

        const responseBody = await response.json();

        await expect(responseBody.username).toBe(newUser.username);
        await expect(responseBody.name).toBe(newUser.name);
        await expect(responseBody.email).toBe(newUser.email);

        console.log(responseBody);
    })

    test('PUT update user', async ({ request }) => {
        const updataUser = {
            name: "John-Smith",
            username: "john-smith",
            email: "jon@smith.com"
        }

        const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {
            data: updataUser
        });

        await expect(response.status()).toBe(200);

        const responseBody = await response.json();

        await expect(responseBody.username).toBe(updataUser.username);
        await expect(responseBody.name).toBe(updataUser.name);
        await expect(responseBody.email).toBe(updataUser.email);

        console.log(responseBody);
    })
    
    test('PATCH update user', async ({ request }) => {
        const updataUser = {
            name: "John-Smith-UA",
            username: "john-smith-UA",
            email: "jon@smith.com.ua"
        }

        const response = await request.patch('https://jsonplaceholder.typicode.com/users/1', {
            data: updataUser
        });

        await expect(response.status()).toBe(200);

        const responseBody = await response.json();

        await expect(responseBody.username).toBe(updataUser.username);

        console.log(responseBody);
    })
    
    test('DELETE request - remove user', async ({ request }) => {
        const response = await request.delete(`https://jsonplaceholder.typicode.com/users/1`);

        // Перевіряємо, що статус-код 200 або 204
        expect([200, 204]).toContain(response.status());

        const responseBody = await response.json();
        expect(responseBody).toEqual({}); // Очікуємо порожній об'єкт

        console.log(responseBody);
    });
})
