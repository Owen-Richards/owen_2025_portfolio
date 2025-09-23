/**
 * Test file to verify ScrollManager refactoring
 * Ensures init() and destroy() methods work correctly without duplicate cursors
 */

'use client';

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { ScrollManager } from '@/lib/scroll/scroll';

// Mock GSAP and Lenis for testing
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    ticker: {
      add: vi.fn(),
      remove: vi.fn(),
      lagSmoothing: vi.fn(),
    },
    to: vi.fn(),
    killTweensOf: vi.fn(),
  },
  ScrollTrigger: {
    update: vi.fn(),
    create: vi.fn(),
    getAll: vi.fn(() => []),
    refresh: vi.fn(),
  },
  MotionPathPlugin: {},
}));

vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    scrollTo: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    destroy: vi.fn(),
    raf: vi.fn(),
    scroll: 0,
  })),
}));

// Mock DOM methods
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ScrollManager', () => {
  let scrollManager: ScrollManager;
  let mockDocumentBody: {
    appendChild: ReturnType<typeof vi.fn>;
    removeChild: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Reset DOM mocks
    mockDocumentBody = {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    };

    Object.defineProperty(document, 'body', {
      value: mockDocumentBody,
      writable: true,
    });

    Object.defineProperty(document, 'createElement', {
      value: vi.fn(() => ({
        style: {},
        className: '',
        parentNode: mockDocumentBody,
      })),
      writable: true,
    });

    Object.defineProperty(document.documentElement, 'classList', {
      value: {
        contains: vi.fn(() => false),
      },
      writable: true,
    });

    // Create fresh instance
    scrollManager = new ScrollManager();
  });

  afterEach(() => {
    scrollManager.destroy();
    vi.clearAllMocks();
  });

  it('should initialize only once when init() is called multiple times', () => {
    scrollManager.init();
    scrollManager.init();
    scrollManager.init();

    // Should only create one cursor element
    expect(mockDocumentBody.appendChild).toHaveBeenCalledTimes(1);
  });

  it('should properly clean up on destroy()', () => {
    scrollManager.init();
    scrollManager.destroy();

    // Should remove cursor element
    expect(mockDocumentBody.removeChild).toHaveBeenCalledTimes(1);
  });

  it('should allow re-initialization after destroy()', () => {
    scrollManager.init();
    scrollManager.destroy();
    scrollManager.init();

    // Should create cursor twice (once for each init)
    expect(mockDocumentBody.appendChild).toHaveBeenCalledTimes(2);
    expect(mockDocumentBody.removeChild).toHaveBeenCalledTimes(1);
  });

  it('should not initialize if window is undefined', () => {
    const originalWindow = global.window;
    // @ts-expect-error - Temporarily removing window for testing
    delete global.window;

    const newManager = new ScrollManager();
    newManager.init();

    expect(mockDocumentBody.appendChild).not.toHaveBeenCalled();

    global.window = originalWindow;
  });
});
