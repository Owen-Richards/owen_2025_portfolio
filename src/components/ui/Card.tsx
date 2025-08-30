import { cn } from "@/lib/utils";
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 border border-neutral-700 rounded-xl shadow-lg p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
