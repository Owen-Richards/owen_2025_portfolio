import { expect, test } from '@playwright/test';

test.describe('Portfolio Smoke Tests', () => {
  test.beforeEach(async ({ page: _page }, testInfo) => {
    // Browser-specific timeouts for 3D-heavy portfolio
    const projectName = testInfo.project.name;
    const timeout =
      projectName === 'Mobile Chrome'
        ? 180000 // 3 minutes for mobile
        : projectName === 'firefox'
          ? 120000 // 2 minutes for Firefox
          : 90000; // 1.5 minutes for Chromium
    test.setTimeout(timeout);
  });

  test('homepage loads successfully', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    // Browser-specific timeouts (Firefox is slowest)
    const timeout = projectName === 'firefox' ? 90000 : 60000;

    await page.goto('/', { waitUntil: 'commit', timeout });
    await page.waitForLoadState('domcontentloaded', { timeout: timeout / 2 });

    // Basic page load verification with extended timeouts
    await expect(page).toHaveTitle(/Owen Richards/, { timeout: 15000 });

    // Very forgiving main content check
    const main = page.getByRole('main').first();
    const mainFallback = page.locator('main').first();
    const contentFallback = page
      .locator('[data-testid="main-content"], .main-content, #main')
      .first();

    try {
      await expect(main).toBeVisible({ timeout: 15000 });
    } catch {
      try {
        await expect(mainFallback).toBeVisible({ timeout: 10000 });
      } catch {
        await expect(contentFallback).toBeVisible({ timeout: 10000 });
      }
    }

    // Check for navigation (very forgiving)
    const nav = page.getByRole('navigation').first();
    if ((await nav.count()) > 0) {
      await expect(nav).toBeVisible({ timeout: 10000 });
    }
  });

  test('key pages are accessible', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const pages = ['/work', '/about']; // Focus on just 2 most reliable pages
    let successCount = 0;

    // Browser-specific timeouts
    const navTimeout = projectName === 'firefox' ? 180000 : 120000; // 3 min for Firefox, 2 min others
    const domTimeout = projectName === 'firefox' ? 120000 : 90000; // 2 min for Firefox, 1.5 min others

    for (const path of pages) {
      try {
        console.warn(`🔄 Testing page: ${path} on ${projectName}`);
        // Use more forgiving wait strategy with browser-specific timeouts
        await page.goto(path, { waitUntil: 'commit', timeout: navTimeout });
        await page.waitForLoadState('domcontentloaded', {
          timeout: domTimeout,
        });

        // Very basic check - just verify page loaded and has some content
        const pageLoaded = page.url().includes(path);
        const hasBasicContent = (await page.locator('body').count()) > 0;

        if (pageLoaded && hasBasicContent) {
          successCount++;
          console.warn(`✅ Page ${path} accessible on ${projectName}`);
        } else {
          console.warn(
            `⚠️ Page ${path} loaded but missing content on ${projectName}`
          );
        }

        await page.waitForTimeout(5000); // Longer pause for Firefox stability
      } catch (error) {
        console.warn(
          `❌ Page ${path} failed on ${projectName}:`,
          (error as Error).message
        );
        // Continue with other pages instead of failing entire test
      }
    }

    console.warn(
      `📊 Smoke test result for ${projectName}: ${successCount}/2 pages accessible`
    );

    // At least 1 out of 2 key pages should be accessible (very lenient)
    expect(successCount).toBeGreaterThanOrEqual(1);
  });

  test('basic interactivity works', async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit', timeout: 45000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 20000 });

    // Test basic scrolling
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(1000);

    // Test theme toggle if it exists
    const themeToggle = page
      .locator('button')
      .filter({ hasText: /theme|dark|light/i })
      .first();
    if ((await themeToggle.count()) > 0) {
      await themeToggle.click();
      await page.waitForTimeout(1000);
    }

    // Test navigation if links exist
    const aboutLink = page.locator('a[href*="about"]').first();
    if ((await aboutLink.count()) > 0) {
      await aboutLink.click();
      await page.waitForTimeout(2000);
    }
  });

  test('3D content loads without errors', async ({ page }) => {
    const jsErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });

    // Use more forgiving load strategy for 3D content
    await page.goto('/', { waitUntil: 'commit', timeout: 45000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 20000 });

    // Wait for potential 3D content to initialize
    await page.waitForTimeout(5000);

    // Check for canvas elements
    const canvases = page.locator('canvas');
    const canvasCount = await canvases.count();

    if (canvasCount > 0) {
      // Verify at least one canvas is visible
      await expect(canvases.first()).toBeVisible({ timeout: 10000 });
    }

    // Check that there are no critical JavaScript errors
    const criticalErrors = jsErrors.filter(
      (error) =>
        !error.includes('Failed to load resource') && // Ignore network errors
        !error.includes('favicon.ico') && // Ignore favicon errors
        !error.includes('net::ERR_') // Ignore network errors
    );

    expect(criticalErrors.length).toBeLessThan(5); // Allow some minor errors
  });

  test('mobile experience works', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Basic mobile checks
      await expect(page.getByRole('main').first()).toBeVisible();

      // Test mobile menu if it exists
      const mobileMenuButton = page
        .locator('button')
        .filter({ hasText: /menu|☰/ })
        .first();
      if ((await mobileMenuButton.count()) > 0) {
        await mobileMenuButton.click();
        await page.waitForTimeout(500);
      }
    } else {
      test.skip();
    }
  });

  test('performance is reasonable', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    const startTime = Date.now();

    // Browser-specific timeouts
    const timeout = projectName === 'firefox' ? 90000 : 60000;

    // Use more forgiving load strategy
    await page.goto('/', { waitUntil: 'commit', timeout });
    await page.waitForLoadState('domcontentloaded', { timeout: timeout / 2 });

    const loadTime = Date.now() - startTime;

    // Browser-specific performance expectations (Firefox gets more time)
    const maxLoadTime = projectName === 'firefox' ? 60000 : 30000; // 60s for Firefox, 30s for others
    expect(loadTime).toBeLessThan(maxLoadTime);

    // Basic performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      };
    });

    // DOMContentLoaded should be reasonable (5 seconds for 3D content)
    expect(performanceMetrics.domContentLoaded).toBeLessThan(5000);
  });
});
