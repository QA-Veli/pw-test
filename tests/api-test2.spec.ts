import { test, expect } from "@playwright/test";

test.describe('Autentification API => ', () => {
    
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

        console.log(token)

        expect(token).toBeDefined();
        // const token = await loginResponse.json()

        // console.log(token)
        
    })
    
})
