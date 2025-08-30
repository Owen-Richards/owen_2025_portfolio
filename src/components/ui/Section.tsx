import { cn } from "@/lib/utils";
import * as React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  id?: string;
}

export function Section({ title, id, children, className, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 px-4 max-w-6xl mx-auto", className)}
      {...props}
    >
      {title && (
        <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight text-accent drop-shadow-lg">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
