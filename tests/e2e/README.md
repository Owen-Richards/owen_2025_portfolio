# End-to-End Testing with Playwright

This directory contains Playwright end-to-end tests for Owen's 2025 Portfolio.

## Test Structure

- `essential.spec.ts` - **RECOMMENDED**: Minimal, robust tests for CI/CD
- `smoke.spec.ts` - Basic functionality verification
- `home.spec.ts` - Comprehensive homepage functionality
- `pages.spec.ts` - Navigation between different pages
- `performance.spec.ts` - Performance metrics and Core Web Vitals
- `utils.ts` - Shared test utilities and helpers

## Running Tests

### Prerequisites

**IMPORTANT**: Make sure you have the development server running:

```bash
npm run dev
```

Wait for the server to show "Ready" status before running tests.

### Quick Tests (Recommended)

```bash
# Run essential functionality tests (fastest, most reliable)
npm run test:e2e:essential

# Run basic smoke tests
npm run test:e2e:smoke
```

### Full Test Suite

```bash
# Run all e2e tests (can be slow for 3D portfolio)
npm run test:e2e

# Run with UI mode for debugging
npm run test:e2e:ui

# Run in headed mode to see browser
npm run test:e2e:headed

# Debug mode with step-by-step execution
npm run test:e2e:debug
```

### Running Specific Tests

```bash
# Run only home page tests
npx playwright test home.spec.ts

# Run only performance tests
npx playwright test performance.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
```

### Viewing Test Reports

```bash
# Show last test report
npm run test:e2e:report

# Generate and show new report
npx playwright test --reporter=html && npx playwright show-report
```

## Test Coverage

### Core Functionality Tests (`home.spec.ts`)

- ✅ Page loads with essential elements
- ✅ Navigation links work correctly
- ✅ Scroll progress indicator functionality
- ✅ Theme toggle behavior
- ✅ 3D elements rendering
- ✅ Mobile navigation
- ✅ Contact form interaction
- ✅ Performance: page load time
- ✅ Accessibility: keyboard navigation
- ✅ Responsive design across screen sizes

### Page Navigation Tests (`pages.spec.ts`)

- ✅ All main pages load correctly (/work, /about, /contact, /blog, /recruiter)
- ✅ 404 handling for invalid routes
- ✅ Navigation between pages
- ✅ Portfolio 3D page specific tests

### Performance Tests (`performance.spec.ts`)

- ✅ Page load performance metrics (FCP, DOMContentLoaded)
- ✅ Lazy loading image verification
- ✅ Progressive 3D content loading
- ✅ Bundle size impact analysis
- ✅ Memory usage monitoring
- ✅ Smooth scrolling performance

## Browser Coverage

Tests run across multiple browsers and devices:

- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome on Pixel 5, Safari on iPhone 12

## Test Configuration

The Playwright configuration (`playwright.config.ts`) includes:

- **Base URL**: `http://localhost:3000` (configurable via `PLAYWRIGHT_BASE_URL`)
- **Parallel execution**: Enabled for faster test runs
- **Retry policy**: 2 retries on CI, 0 on local development
- **Reporters**: HTML, JSON, and JUnit for various integrations
- **Screenshots**: Captured on test failures
- **Video**: Recorded on first retry
- **Trace**: Collected when retrying failed tests

## Debugging Tests

### Using Playwright Inspector

```bash
# Debug specific test
npx playwright test home.spec.ts --debug

# Debug with specific browser
npx playwright test --project=chromium --debug
```

### Using Trace Viewer

When tests fail, traces are automatically collected:

```bash
# View trace for failed test
npx playwright show-trace test-results/[test-name]/trace.zip
```

### Console Logs and Screenshots

Failed tests automatically capture:

- Screenshots at point of failure
- Console logs and network activity
- Full page trace for debugging

## Writing New Tests

### Test Patterns

1. **Page Object Pattern**: Use `page.locator()` for element selection
2. **Conditional Testing**: Check if elements exist before interacting
3. **Wait Strategies**: Use appropriate wait conditions (`waitForTimeout`, `waitForSelector`)
4. **Cross-browser**: Write tests that work across different browsers

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform expected behavior', async ({ page }) => {
    // Arrange
    const element = page.locator('[data-testid="element"]');

    // Act
    await element.click();

    // Assert
    await expect(element).toHaveClass('active');
  });
});
```

### Best Practices

1. **Use data-testid attributes** for reliable element selection
2. **Make tests resilient** by checking element existence before interaction
3. **Use page.waitForTimeout() sparingly** - prefer specific wait conditions
4. **Test user flows**, not implementation details
5. **Keep tests independent** - each test should be able to run in isolation

## CI/CD Integration

These tests are designed to run in CI environments:

- **GitHub Actions**: Configure with Playwright GitHub Action
- **Docker**: Tests can run in containerized environments
- **Parallel execution**: Optimized for CI performance
- **Report artifacts**: HTML reports and traces saved as CI artifacts

## Troubleshooting

### Common Issues

1. **Tests failing locally but passing in CI**
   - Check browser versions
   - Verify environment variables
   - Check for timing issues

2. **WebGL/3D tests failing**
   - Ensure browser supports WebGL
   - Check for hardware acceleration
   - Consider headless mode limitations

3. **Performance tests inconsistent**
   - Run on stable environment
   - Check for background processes
   - Consider CI resource limitations

### Environment Variables

- `PLAYWRIGHT_BASE_URL`: Override default localhost URL
- `CI`: Automatically detected, affects retry and worker settings
- `PLAYWRIGHT_BROWSERS_PATH`: Custom browser installation path

## Maintenance

### Updating Tests

When adding new features:

1. Add corresponding e2e tests
2. Update existing tests if UI/UX changes
3. Consider performance impact of new features
4. Test across all supported browsers

### Browser Updates

Playwright browsers are updated with:

```bash
npx playwright install
```

Regular updates ensure compatibility with latest browser versions.
