# Testing Setup Documentation

## Overview

This project uses **Vitest** as the primary testing framework, providing a fast and modern
alternative to Jest. The setup includes React Testing Library for component testing and
comprehensive mocking for browser APIs and 3D libraries.

## 🚀 Key Features

- **Vitest** - Fast, ESM-native test runner
- **React Testing Library** - Component testing utilities
- **jsdom** - Browser environment simulation
- **Comprehensive Mocks** - Browser APIs, Three.js, GSAP, Lenis
- **TypeScript Support** - Full type safety in tests
- **Coverage Reports** - Built-in coverage with v8 provider

## 📁 Project Structure

```
src/
├── test/
│   ├── setup.ts           # Global test configuration
│   ├── types.d.ts         # TypeScript declarations for tests
│   └── example.test.tsx   # Example test demonstrating patterns
└── components/
    └── **/__tests__/      # Component-specific tests
```

## 🛠 Configuration Files

### `vitest.config.ts`

- Main Vitest configuration
- Path aliases matching project structure
- Coverage settings and thresholds
- Test file patterns and exclusions

### `src/test/setup.ts`

- Global test setup and teardown
- Browser API mocks (IntersectionObserver, ResizeObserver, etc.)
- Three.js WebGL context mocking
- LocalStorage and DOM API mocks

### `src/test/types.d.ts`

- TypeScript declarations for Vitest
- Jest-DOM matcher types
- Global test utility types

## 📝 Available Scripts

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui

# Run tests once (CI mode)
npm run test:run
```

## 🧪 Writing Tests

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<MyComponent onClick={handleClick} />);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Testing Custom Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });

  it('should update state', () => {
    const { result } = renderHook(() => useMyHook());

    act(() => {
      result.current.increment();
    });

    expect(result.current.value).toBe(1);
  });
});
```

### Mocking External Dependencies

```typescript
import { vi } from 'vitest';

// Mock a module
vi.mock('@/lib/utils/api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' }),
}));

// Mock a specific function
const mockFunction = vi.fn();

// Mock with implementation
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
  },
  AnimatePresence: ({ children }: any) => children,
}));
```

## 🎭 Available Mocks

The test setup provides comprehensive mocks for:

### Browser APIs

- `IntersectionObserver`
- `ResizeObserver`
- `MutationObserver`
- `matchMedia`
- `localStorage` / `sessionStorage`
- `requestAnimationFrame`
- `scrollTo` / `scrollIntoView`

### Three.js WebGL

- WebGL context and all WebGL methods
- Canvas element `getContext` method
- WebGL state management functions

### Performance APIs

- `performance.now()`
- `getBoundingClientRect()`

## 📊 Coverage Configuration

Current coverage thresholds:

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

Coverage reports are generated in multiple formats:

- Text (console output)
- HTML (detailed browser view)
- JSON (for CI integration)

## 🚦 Testing Best Practices

### 1. Test User Behavior, Not Implementation

```typescript
// ✅ Good - Tests user interaction
it('should show error message when form is invalid', async () => {
  render(<LoginForm />);
  await user.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});

// ❌ Bad - Tests implementation details
it('should call validateEmail function', () => {
  const spy = vi.spyOn(utils, 'validateEmail');
  render(<LoginForm />);
  expect(spy).toHaveBeenCalled();
});
```

### 2. Use Descriptive Test Names

```typescript
// ✅ Good
it('should disable submit button when email is invalid', () => {});

// ❌ Bad
it('should work correctly', () => {});
```

### 3. Follow AAA Pattern

```typescript
it('should increment counter when button is clicked', async () => {
  // Arrange
  const user = userEvent.setup();
  render(<Counter />);

  // Act
  await user.click(screen.getByRole('button', { name: /increment/i }));

  // Assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 4. Clean Up Side Effects

```typescript
afterEach(() => {
  vi.clearAllMocks();
  cleanup(); // Automatically called by our setup
});
```

## 🔧 Troubleshooting

### Common Issues

1. **Module not found errors**: Check path aliases in `vitest.config.ts`
2. **Mock not working**: Ensure mock is placed before imports
3. **DOM not available**: Verify `environment: 'jsdom'` in config
4. **TypeScript errors**: Check `src/test/types.d.ts` for type declarations

### Debugging Tests

```bash
# Run specific test file
npx vitest run src/components/Button.test.tsx

# Run tests with debug output
npx vitest run --reporter=verbose

# Run tests in watch mode for development
npm run test:watch
```

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [User Event](https://testing-library.com/docs/user-event/intro/)

## 🔄 Migration from Jest

The project has been migrated from Jest to Vitest. Key changes:

1. **Test runner**: Jest → Vitest
2. **Mocking**: `jest.fn()` → `vi.fn()`
3. **Setup**: `jest.setup.js` → `src/test/setup.ts`
4. **Config**: `jest.config.mjs` → `vitest.config.ts`
5. **Scripts**: Updated in `package.json`

All existing tests should work with minimal changes - mainly replacing `jest` references with `vi`.
