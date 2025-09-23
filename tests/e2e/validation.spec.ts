import { expect, test } from '@playwright/test';

test.describe('Quick Validation Tests', () => {
  test('homepage loads with fixed timeouts', async ({ page }) => {
    // Set extended timeout
    test.setTimeout(180000); // 3 minutes

    console.log('🔄 Starting homepage load test...');

    // Try to load homepage with our new settings
    await page.goto('/', { waitUntil: 'commit', timeout: 90000 });
    console.log('✅ Initial navigation completed');

    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    console.log('✅ DOM content loaded');

    // Basic checks
    await expect(page).toHaveTitle(/Owen Richards/, { timeout: 30000 });
    console.log('✅ Title verification passed');

    await expect(page.getByRole('main').first()).toBeVisible({
      timeout: 30000,
    });
    console.log('✅ Main content visible');

    console.log('🎉 Homepage validation successful!');
  });

  test('work page loads with fixed navigation', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes

    console.log('🔄 Starting work page load test...');

    await page.goto('/work', { waitUntil: 'commit', timeout: 90000 });
    console.log('✅ Work page navigation completed');

    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    console.log('✅ Work page DOM loaded');

    await expect(page.getByRole('main').first()).toBeVisible({
      timeout: 30000,
    });
    console.log('✅ Work page main content visible');

    console.log('🎉 Work page validation successful!');
  });
});
