/**
 * Simple class name utility
 * TODO: Install clsx and tailwind-merge for better class merging
 */
export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Utility to create consistent class name strings
 */
export function createClassName(
  base: string,
  variants?: Record<string, boolean | undefined>
) {
  const classes = [base];

  if (variants) {
    Object.entries(variants).forEach(([key, condition]) => {
      if (condition) {
        classes.push(key);
      }
    });
  }

  return cn(...classes);
}

/**
 * Helper for conditional class application
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass = ''
) {
  return condition ? trueClass : falseClass;
}
