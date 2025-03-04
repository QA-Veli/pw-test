import { test, expect } from "@playwright/test";

test.describe.parallel('Autentification API => ', () => {
    
    test('Should save token', async ({ request }) => {

        const loginResponse = await request.post('https://reqres.in/api/login', {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })

        expect(loginResponse.status()).toBe(200)

        const loginData = await loginResponse.json();
        const token = loginData.token; // Отримуємо токен з відповіді

        console.log('First token:', token)

        expect(token).toBeDefined();
    })
    test('Should save token 2', async ({ request }) => {

        const loginResponse = await request.post('https://reqres.in/api/login', {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })

        expect(loginResponse.status()).toBe(200)

        const loginData = await loginResponse.json();
        const token = loginData.token; // Отримуємо токен з відповіді

        console.log('Second token:', token)

        expect(token).toBeDefined();
    })
    test('Should save token 3', async ({ request }) => {

        const loginResponse = await request.post('https://reqres.in/api/login', {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })

        expect(loginResponse.status()).toBe(200)

        const loginData = await loginResponse.json();
        const token = loginData.token; // Отримуємо токен з відповіді

        console.log('Third token:', token)

        expect(token).toBeDefined();
    })
    
})
