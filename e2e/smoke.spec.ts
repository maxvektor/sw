import { test, expect } from '@playwright/test';

test.describe('Smoke test', () => {
  test('should have a correct title', async ({ page }) => {
    await page.goto('/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Star Wars/);
  });
});

