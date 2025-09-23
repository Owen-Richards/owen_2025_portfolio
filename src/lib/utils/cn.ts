import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function that combines clsx and tailwind-merge for optimal class merging
 *
 * - clsx: Handles conditional classes and filtering falsy values
 * - tailwind-merge: Intelligently merges Tailwind classes, handling conflicts
 *
 * @param inputs - Class values (strings, objects, arrays, booleans, undefined, null)
 * @returns Merged and optimized class string
 *
 * @example
 * cn('px-2 py-1', 'px-4') // → 'py-1 px-4' (px-2 is overridden)
 * cn('text-red-500', condition && 'text-blue-500') // → conditional classes
 * cn(['flex', 'items-center'], { 'bg-red': isError }) // → handles arrays and objects
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Utility to create consistent class name strings with variants
 *
 * @param base - Base class string
 * @param variants - Object with conditional classes
 * @returns Merged class string
 *
 * @example
 * createClassName('btn', { 'btn-primary': isPrimary, 'btn-large': isLarge })
 */
export function createClassName(
  base: string,
  variants?: Record<string, boolean | undefined>
): string {
  if (!variants) return base;

  return cn(base, variants);
}

/**
 * Helper for conditional class application
 *
 * @param condition - Boolean condition
 * @param trueClass - Class to apply when condition is true
 * @param falseClass - Class to apply when condition is false (optional)
 * @returns Appropriate class string
 *
 * @example
 * conditionalClass(isActive, 'bg-blue-500', 'bg-gray-500')
 * conditionalClass(isLoading, 'opacity-50') // falseClass defaults to empty string
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass = ''
): string {
  return condition ? trueClass : falseClass;
}

/**
 * Utility for creating component variants with TypeScript safety
 *
 * @param baseClasses - Base classes that are always applied
 * @param variants - Object mapping variant keys to their class values
 * @param activeVariants - Object specifying which variants are active
 * @returns Merged class string
 *
 * @example
 * const buttonClasses = createVariants(
 *   'px-4 py-2 rounded',
 *   {
 *     size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
 *     variant: { primary: 'bg-blue-500', secondary: 'bg-gray-500' }
 *   },
 *   { size: 'md', variant: 'primary' }
 * )
 */
export function createVariants<
  T extends Record<string, Record<string, string>>,
>(
  baseClasses: string,
  variants: T,
  activeVariants: {
    [K in keyof T]?: keyof T[K];
  }
): string {
  const variantClasses = Object.entries(activeVariants)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      const variantGroup = variants[key];
      return variantGroup?.[value as string] || '';
    })
    .filter(Boolean);

  return cn(baseClasses, ...variantClasses);
}
