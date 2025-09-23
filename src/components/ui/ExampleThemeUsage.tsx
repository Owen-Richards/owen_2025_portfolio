// Example of how to use the improved ThemeProvider with isReady flag

import { useTheme } from '@/components/ui/ThemeProvider';
import { cn } from '@/lib/utils/cn';

export function ExampleComponent() {
  const { theme, isReady, toggleTheme } = useTheme();

  // Render loading state while theme is initializing
  if (!isReady) {
    return (
      <div className="animate-pulse">
        <div className="h-4 w-24 rounded bg-gray-300"></div>
      </div>
    );
  }

  // Render actual component once theme is ready
  return (
    <div
      className={cn(
        'rounded-lg p-4',
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      )}
    >
      <p>Current theme: {theme}</p>
      <button
        onClick={toggleTheme}
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Toggle Theme
      </button>
    </div>
  );
}
