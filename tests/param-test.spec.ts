import { test, Page, expect } from "@playwright/test";

const users = [
    { name: 'Alice', job: 'QA' },
    { name: 'Bob', job: 'Developer' },
    { name: 'Charlie', job: 'Manager' }
];

for (const user of users) {
    test(`Create user ${user.name} with job ${user.job}`, async ({ request }) => {
        const response = await request.post('https://reqres.in/api/users', {
            data: user
        });

        expect([200, 201]).toContain(response.status());

        const responseBody = await response.json();
        console.log(`Created user:`, responseBody);

        expect(responseBody.name).toBe(user.name);
        expect(responseBody.job).toBe(user.job);
    });
}
