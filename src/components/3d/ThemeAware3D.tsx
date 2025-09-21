'use client';

import { useEffect, useState } from 'react';

import { useTheme } from '@/components/ui/ThemeProvider';

interface ThemeAware3DProps {
  lightColor?: string;
  darkColor?: string;
  children: (colors: {
    primary: string;
    secondary: string;
    accent: string;
    intensity: number;
  }) => React.ReactNode;
}

export default function ThemeAware3D({
  lightColor = '#1e293b', // Professional slate
  darkColor = '#64748b', // Professional slate gray
  children,
}: ThemeAware3DProps) {
  const { theme } = useTheme();
  const [colors, setColors] = useState({
    primary: lightColor,
    secondary: '#334155', // Professional dark slate
    accent: '#475569', // Corporate slate
    intensity: 1,
  });

  useEffect(() => {
    if (theme === 'dark') {
      setColors({
        primary: darkColor, // Professional slate gray for dark theme
        secondary: '#94a3b8', // Professional light slate
        accent: '#cbd5e1', // Corporate light slate
        intensity: 1.1,
      });
    } else {
      setColors({
        primary: lightColor, // Professional slate for light theme
        secondary: '#334155', // Professional dark slate
        accent: '#475569', // Corporate slate
        intensity: 0.85,
      });
    }
  }, [theme, lightColor, darkColor]);

  return <>{children(colors)}</>;
}
