/**
 * Example test file demonstrating Vitest + Testing Library setup
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { cn } from '@/lib/utils/cn';

// Example component to test
function TestButton({
  onClick,
  disabled = false,
  variant = 'primary',
}: {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn('rounded px-4 py-2 font-medium transition-colors', {
        'bg-blue-500 text-white hover:bg-blue-600':
          variant === 'primary' && !disabled,
        'bg-gray-500 text-white hover:bg-gray-600':
          variant === 'secondary' && !disabled,
        'cursor-not-allowed opacity-50': disabled,
      })}
    >
      Click me
    </button>
  );
}

describe('Vitest + Testing Library Setup', () => {
  describe('cn utility', () => {
    it('should merge classes correctly', () => {
      const result = cn('px-2 py-1', 'px-4', 'bg-blue-500');
      expect(result).toBe('py-1 px-4 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('btn', isActive && 'btn-active');
      expect(result).toBe('btn btn-active');
    });

    it('should handle arrays and objects', () => {
      const result = cn(['flex', 'items-center'], {
        'bg-red': true,
        'text-white': false,
      });
      expect(result).toBe('flex items-center bg-red');
    });
  });

  describe('TestButton component', () => {
    it('should render with correct text', () => {
      render(<TestButton />);
      expect(
        screen.getByRole('button', { name: /click me/i })
      ).toBeInTheDocument();
    });

    it('should apply primary variant styles by default', () => {
      render(<TestButton />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-500', 'text-white');
    });

    it('should apply secondary variant styles', () => {
      render(<TestButton variant="secondary" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-500', 'text-white');
    });

    it('should handle disabled state', () => {
      render(<TestButton disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<TestButton onClick={handleClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<TestButton onClick={handleClick} disabled />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should be accessible', () => {
      render(<TestButton />);
      const button = screen.getByRole('button');

      expect(button).toBeVisible();
      expect(button).toHaveAccessibleName('Click me');
    });
  });

  describe('Environment setup', () => {
    it('should have DOM matchers available', () => {
      const element = document.createElement('div');
      element.textContent = 'Test content';
      document.body.appendChild(element);

      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent('Test content');

      document.body.removeChild(element);
    });

    it('should have mocked browser APIs', () => {
      expect(window.matchMedia).toBeDefined();
      expect(global.IntersectionObserver).toBeDefined();
      expect(global.ResizeObserver).toBeDefined();
    });

    it('should mock localStorage', () => {
      localStorage.setItem('test', 'value');
      expect(localStorage.setItem).toHaveBeenCalledWith('test', 'value');
    });
  });
});
