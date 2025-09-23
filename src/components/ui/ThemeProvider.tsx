'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Gets the system theme preference using matchMedia
 * @returns 'dark' | 'light' based on system preference
 */
function getSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'; // Default for SSR
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Safely reads theme from localStorage with fallback
 * @returns stored theme or null if not available/accessible
 */
function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null; // No localStorage in SSR
  }

  try {
    const stored = localStorage.getItem('theme');
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch (error) {
    // localStorage might be disabled or unavailable
    console.warn('Failed to read theme from localStorage:', error);
    return null;
  }
}

/**
 * Safely writes theme to localStorage
 * @param theme - Theme to store
 */
function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') {
    return; // No localStorage in SSR
  }

  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    // localStorage might be disabled or unavailable
    console.warn('Failed to save theme to localStorage:', error);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark'); // Default theme for SSR
  const [isReady, setIsReady] = useState(false);

  // Initialize theme after hydration
  useEffect(() => {
    // Get theme from localStorage or fall back to system preference
    const storedTheme = getStoredTheme();
    const systemTheme = getSystemTheme();

    // Priority: stored theme > system preference > default 'dark'
    const initialTheme = storedTheme || systemTheme;

    setTheme(initialTheme);
    setIsReady(true);
  }, []);

  // Apply theme to document and persist to localStorage
  useEffect(() => {
    if (!isReady) return; // Wait until hydration is complete

    // Apply theme to document root
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);

      // Persist theme to localStorage
      setStoredTheme(theme);
    }
  }, [theme, isReady]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isReady }}>
      {/* Render children only after hydration to prevent mismatch */}
      {isReady ? (
        children
      ) : (
        // Invisible placeholder that maintains layout during hydration
        <div
          style={{
            visibility: 'hidden',
            // Preserve initial layout to prevent flash
            minHeight: '100vh',
            position: 'relative',
          }}
          aria-hidden="true"
        >
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
