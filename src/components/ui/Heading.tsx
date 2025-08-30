import { cn } from "@/lib/utils";
import * as React from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = `h${HeadingLevel}`;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
}

export function Heading({ level = 2, className, children, ...props }: HeadingProps) {
  const Tag = (`h${level}` as HeadingTag);
  return React.createElement(
    Tag,
    {
      className: cn(
        "font-extrabold tracking-tight text-accent drop-shadow-lg",
        level === 1 && "text-5xl md:text-7xl mb-8",
        level === 2 && "text-3xl md:text-5xl mb-8",
        level === 3 && "text-2xl md:text-3xl mb-6",
        level === 4 && "text-xl md:text-2xl mb-4",
        className
      ),
      ...props
    },
    children
  );
}
