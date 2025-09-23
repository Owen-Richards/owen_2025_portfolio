/**
 * Demonstration of the new shared cn utility
 * This file shows the benefits of using cn over manual string concatenation
 */

import {
  cn,
  conditionalClass,
  createClassName,
  createVariants,
} from '@/lib/utils/cn';

export function CnUtilityExamples() {
  const isActive = true;
  const isLoading = false;
  // Use variables that could potentially have any of the union type values
  const variant = 'primary' as 'primary' | 'secondary' | 'danger';
  const size = 'md' as 'sm' | 'md' | 'lg';

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">cn Utility Examples</h2>

      {/* Example 1: Basic conditional classes with conflict resolution */}
      <div
        className={cn(
          'rounded px-2 py-1', // Base styles
          'px-4', // This will override px-2 thanks to tailwind-merge
          isActive && 'bg-blue-500 text-white',
          isLoading && 'cursor-not-allowed opacity-50'
        )}
      >
        Basic conditional classes (px-2 is overridden by px-4)
      </div>

      {/* Example 2: Using conditionalClass helper */}
      <div
        className={cn(
          'rounded-lg p-4 transition-colors',
          conditionalClass(
            isActive,
            'bg-green-500 text-white',
            'bg-gray-200 text-gray-800'
          )
        )}
      >
        Using conditionalClass helper
      </div>

      {/* Example 3: Using createClassName for variant-based styling */}
      <div
        className={createClassName(
          'rounded px-4 py-2 font-medium transition-colors',
          {
            'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
            'bg-gray-200 text-gray-800 hover:bg-gray-300':
              variant === 'secondary',
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
          }
        )}
      >
        Using createClassName with variants
      </div>

      {/* Example 4: Using createVariants for complex component styling */}
      <div
        className={createVariants(
          'rounded px-4 py-2 font-medium transition-colors',
          {
            variant: {
              primary: 'bg-blue-500 text-white hover:bg-blue-600',
              secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
              danger: 'bg-red-500 text-white hover:bg-red-600',
            },
            size: {
              sm: 'px-2 py-1 text-sm',
              md: 'px-4 py-2 text-base',
              lg: 'px-6 py-3 text-lg',
            },
          },
          { variant: 'primary', size: 'md' }
        )}
      >
        Using createVariants for type-safe component variants
      </div>

      {/* Example 5: Complex conditional styling */}
      <div
        className={cn(
          // Base classes
          'relative overflow-hidden rounded-lg border transition-all duration-300',

          // Theme-based classes
          'bg-white dark:bg-gray-800',
          'border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-gray-100',

          // State-based classes
          isActive && [
            'ring-2 ring-blue-500 ring-opacity-50',
            'border-blue-500 dark:border-blue-400',
          ],

          isLoading && 'animate-pulse',

          // Interactive classes
          !isLoading && [
            'hover:scale-[1.02] hover:shadow-lg',
            'focus-within:ring-2 focus-within:ring-blue-500',
          ]
        )}
      >
        Complex conditional styling with arrays and nested conditions
      </div>
    </div>
  );
}

// Examples of the old vs new patterns:

// ❌ Old pattern - manual concatenation, prone to conflicts
// const oldPattern = `px-2 py-1 ${isActive ? 'px-4 bg-blue-500' : 'bg-gray-200'}`;
// Result: "px-2 py-1 px-4 bg-blue-500" - px-2 and px-4 conflict!

// ✅ New pattern - intelligent merging
// const newPattern = cn('px-2 py-1', isActive ? 'px-4 bg-blue-500' : 'bg-gray-200');
// Result: "py-1 px-4 bg-blue-500" - px-2 is properly overridden by px-4

export default CnUtilityExamples;
