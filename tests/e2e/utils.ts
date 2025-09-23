import { Page } from '@playwright/test';

/**
 * Test utilities for Playwright tests
 */

/**
 * Wait for element to be visible with timeout
 */
export async function waitForVisible(
  page: Page,
  selector: string,
  timeout = 5000
) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Check if element exists without failing the test
 */
export async function elementExists(
  page: Page,
  selector: string
): Promise<boolean> {
  try {
    const element = page.locator(selector);
    const count = await element.count();
    return count > 0;
  } catch {
    return false;
  }
}

/**
 * Safe click that checks if element exists first
 */
export async function safeClick(
  page: Page,
  selector: string
): Promise<boolean> {
  if (await elementExists(page, selector)) {
    await page.locator(selector).first().click();
    return true;
  }
  return false;
}

/**
 * Check for WebGL support
 */
export async function hasWebGLSupport(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  });
}

/**
 * Scroll to element if it exists
 */
export async function scrollToElement(
  page: Page,
  selector: string
): Promise<boolean> {
  if (await elementExists(page, selector)) {
    await page.locator(selector).first().scrollIntoViewIfNeeded();
    return true;
  }
  return false;
}

/**
 * Check for dark mode
 */
export async function isDarkMode(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    return (
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'
    );
  });
}

/**
 * Toggle theme if theme toggle exists
 */
export async function toggleTheme(page: Page): Promise<boolean> {
  const themeToggle = page
    .getByRole('button', { name: /theme|dark|light/i })
    .or(page.locator('[data-testid="theme-toggle"]'));

  if ((await themeToggle.count()) > 0) {
    await themeToggle.first().click();
    await page.waitForTimeout(300); // Wait for theme transition
    return true;
  }
  return false;
}

/**
 * Check viewport size
 */
export async function getViewportSize(page: Page) {
  return await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
}

/**
 * Get performance metrics
 */
export async function getPerformanceMetrics(page: Page) {
  return await page.evaluate(() => {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');

    return {
      domContentLoaded:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint:
        paintEntries.find((entry) => entry.name === 'first-paint')?.startTime ||
        0,
      firstContentfulPaint:
        paintEntries.find((entry) => entry.name === 'first-contentful-paint')
          ?.startTime || 0,
    };
  });
}

/**
 * Check for console errors
 */
export async function checkConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  return errors;
}

/**
 * Accessibility test helper
 */
export async function testKeyboardNavigation(page: Page, steps = 5) {
  // Focus first interactive element
  await page.keyboard.press('Tab');

  let focusedElements = 0;

  // Tab through several elements
  for (let i = 0; i < steps; i++) {
    const focusedElement = page.locator(':focus');
    if ((await focusedElement.count()) > 0) {
      focusedElements++;
    }
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
  }

  return focusedElements > 0;
}

/**
 * Mobile menu test helper
 */
export async function testMobileMenu(page: Page): Promise<boolean> {
  const mobileMenuButton = page
    .getByRole('button', { name: /menu|navigation/i })
    .or(page.locator('[data-testid="mobile-menu-button"]'));

  if ((await mobileMenuButton.count()) > 0) {
    await mobileMenuButton.first().click();
    await page.waitForTimeout(300);

    const mobileNav = page
      .locator('[data-testid="mobile-nav"]')
      .or(page.locator('.mobile-nav'))
      .or(page.locator('nav').nth(1));

    return (await mobileNav.count()) > 0;
  }

  return false;
}
