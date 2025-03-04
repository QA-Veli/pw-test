import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe('Create multiple users with random data', () => {
    
    const users = Array.from({ length: 3 }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        job: faker.person.jobTitle()
    }));

    users.forEach((user, index) => {
        test(`Create user ${index + 1} with random data`, async ({ request }) => {
            
            const response = await request.post('https://reqres.in/api/users', {
                data: user
            });

            expect(response.status()).toBe(201);

            const responseBody = await response.json();
            console.log("Created user:", responseBody);

            expect(responseBody.name).toBe(user.name);
            expect(responseBody.job).toBe(user.job);
        });
    });
});
