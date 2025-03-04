import { test, expect } from '../tests/fixtures';

test.describe('Using Fixtures', () => {

    test('should access secure page', async ({ page, login }) => {
        await login(); // ✅ Логін всередині тесту
        await expect(page.locator('h2')).toHaveText('Secure Area');
    });

});

test.afterEach(async ({ page }) => {
    // Виконуємо вихід після кожного тесту
    await page.locator('a[href="/logout"]').click();
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
});
