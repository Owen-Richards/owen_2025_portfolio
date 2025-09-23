import { expect, test } from '@playwright/test';

test.describe('Performance & Core Web Vitals', () => {
  test('page load performance metrics', async ({ page }) => {
    // Start measuring performance with forgiving wait strategy for 3D content
    await page.goto('/', { waitUntil: 'commit', timeout: 60000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');

      return {
        // Navigation timing
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,

        // Paint timing
        firstPaint:
          paintEntries.find((entry) => entry.name === 'first-paint')
            ?.startTime || 0,
        firstContentfulPaint:
          paintEntries.find((entry) => entry.name === 'first-contentful-paint')
            ?.startTime || 0,
      };
    });

    // Assert realistic performance thresholds for 3D portfolio
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(10000); // FCP < 10s (realistic for 3D)
    expect(performanceMetrics.domContentLoaded).toBeLessThan(5000); // DOMContentLoaded < 5s
  });

  test('lazy loading images work correctly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit', timeout: 60000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });

    // Scroll to trigger lazy loading
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight);
    });

    await page.waitForTimeout(1000);

    // Continue scrolling
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 2);
    });

    await page.waitForTimeout(1000);

    // Check that images have loaded
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          // Check that image has src attribute
          const src = await img.getAttribute('src');
          expect(src).toBeTruthy();
          expect(src).not.toBe('');
        }
      }
    }
  });

  test('3D content loads progressively', async ({ page }) => {
    await page.goto('/');

    // Wait for 3D content to potentially load
    await page.waitForTimeout(3000);

    // Check for canvas after loading
    const canvas = page.locator('canvas');

    if ((await canvas.count()) > 0) {
      await expect(canvas.first()).toBeVisible();

      // Verify WebGL context is working
      const hasWebGL = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return false;

        const gl =
          canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      });

      expect(hasWebGL).toBe(true);
    }
  });

  test('bundle size impact - no excessive JavaScript', async ({
    page,
    browserName,
  }) => {
    const scriptSizes: number[] = [];

    // Listen for response events to track script sizes
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.js') && response.status() === 200) {
        try {
          const body = await response.body();
          scriptSizes.push(body.length);
        } catch {
          // Some responses might not be accessible
        }
      }
    });

    // Use better wait strategy for 3D content
    await page.goto('/', { waitUntil: 'commit', timeout: 90000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

    // Wait a bit longer for all scripts to load
    await page.waitForTimeout(3000);

    // Check that we don't have excessively large JavaScript files
    const totalScriptSize = scriptSizes.reduce(
      (total, size) => total + size,
      0
    );
    const maxIndividualScript = Math.max(...scriptSizes, 0);

    // Browser-specific thresholds (Firefox can be slower/larger in dev mode)
    const totalThreshold =
      browserName === 'firefox' ? 12 * 1024 * 1024 : 8 * 1024 * 1024;
    const individualThreshold =
      browserName === 'firefox' ? 6 * 1024 * 1024 : 4 * 1024 * 1024;

    // Total JS should be reasonable
    expect(totalScriptSize).toBeLessThan(totalThreshold);

    // No single script should be excessively large
    expect(maxIndividualScript).toBeLessThan(individualThreshold);
  });

  test('memory usage stays reasonable', async ({ page }) => {
    await page.goto('/');

    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (
          (performance as { memory?: { usedJSHeapSize: number } }).memory
            ?.usedJSHeapSize || 0
        );
      }
      return 0;
    });

    // Interact with the page (scroll, navigate)
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() =>
        window.scrollTo(0, window.innerHeight * Math.random())
      );
      await page.waitForTimeout(200);
    }

    // Trigger theme changes if theme toggle exists
    const themeToggle = page.getByRole('button', { name: /theme|dark|light/i });
    if ((await themeToggle.count()) > 0) {
      await themeToggle.first().click();
      await page.waitForTimeout(300);
      await themeToggle.first().click();
      await page.waitForTimeout(300);
    }

    // Get final memory usage
    const finalMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (
          (performance as { memory?: { usedJSHeapSize: number } }).memory
            ?.usedJSHeapSize || 0
        );
      }
      return 0;
    });

    // Memory shouldn't increase dramatically (allow for some variance)
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreaseRatio = memoryIncrease / initialMemory;

      // Memory shouldn't increase by more than 200%
      expect(memoryIncreaseRatio).toBeLessThan(2);
    }
  });

  test('smooth scrolling performance', async ({ page }) => {
    await page.goto('/');

    // Test smooth scrolling performance
    const scrollStart = Date.now();

    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        const targetScroll = document.body.scrollHeight - window.innerHeight;
        const startScroll = window.scrollY;
        const startTime = performance.now();

        function smoothScroll(currentTime: number) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / 1000, 1); // 1 second scroll

          const easeInOutQuad = (t: number) =>
            t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const currentScroll =
            startScroll + targetScroll * easeInOutQuad(progress);

          window.scrollTo(0, currentScroll);

          if (progress < 1) {
            requestAnimationFrame(smoothScroll);
          } else {
            resolve();
          }
        }

        requestAnimationFrame(smoothScroll);
      });
    });

    const scrollEnd = Date.now();
    const scrollDuration = scrollEnd - scrollStart;

    // Smooth scroll should complete in reasonable time for 3D content
    expect(scrollDuration).toBeGreaterThan(800); // Should take at least 800ms for smoothness
    expect(scrollDuration).toBeLessThan(5000); // Should complete within 5s (more realistic for 3D)
  });
});
