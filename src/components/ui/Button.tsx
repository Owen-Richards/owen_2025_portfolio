import { cn } from "@/lib/utils";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent",
          variant === "primary" && "bg-accent text-white hover:bg-accent-foreground",
          variant === "secondary" && "bg-neutral-800 text-accent hover:bg-neutral-700",
          variant === "ghost" && "bg-transparent text-accent hover:bg-neutral-900/10",
          size === "sm" && "px-4 py-1 text-sm",
          size === "md" && "px-6 py-2 text-base",
          size === "lg" && "px-8 py-3 text-lg",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
