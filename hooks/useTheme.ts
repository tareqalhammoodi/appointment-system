import { useEffect, useState } from 'react';
import { ThemeColors, ThemeMode, CSS_VARS } from '../types/theme';

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [colors, setColors] = useState<ThemeColors>({
    // Light mode defaults
    background: '#FFFFFF',              
    backgroundSecondary: '#F3F3F3',
    backgroundTertiary: '#F8F8F8',
    objectPrimary: '#121212',
    objectSecondary: '#545454',
    objectTertiary: '#888888',
    primaryColor: '#FF3A61',
    border: '#C6C6C6',
    block: '#E5E5E5',
    selection: '#E0F7FF',
    destructive: '#ED6660',
    foreground: '#000000',
    error: '#ED6660',
    success: '#10b981',
    warning: '#f59e0b'
  });

  // Function to get CSS custom property value
  const getCSSVar = (varName: string): string => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    }
    return '';
  };

  // Function to update colors from CSS custom properties
  const updateColors = () => {
    const newColors: ThemeColors = {
      background: getCSSVar(CSS_VARS.BACKGROUND),
      backgroundSecondary: getCSSVar(CSS_VARS.BACKGROUND_SECONDARY),
      backgroundTertiary: getCSSVar(CSS_VARS.BACKGROUND_TERTIARY),
      objectPrimary: getCSSVar(CSS_VARS.OBJECT_PRIMARY),
      objectSecondary: getCSSVar(CSS_VARS.OBJECT_SECONDARY),
      objectTertiary: getCSSVar(CSS_VARS.OBJECT_TERTIARY),
      primaryColor: getCSSVar(CSS_VARS.PRIMARY_COLOR),
      border: getCSSVar(CSS_VARS.BORDER),
      block: getCSSVar(CSS_VARS.BLOCK),
      selection: getCSSVar(CSS_VARS.SELECTION),
      destructive: getCSSVar(CSS_VARS.DESTRUCTIVE),
      foreground: getCSSVar(CSS_VARS.FOREGROUND),
      error: getCSSVar(CSS_VARS.ERROR),
      success: getCSSVar(CSS_VARS.SUCCESS),
      warning: getCSSVar(CSS_VARS.WARNING)
    };
    setColors(newColors);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      updateColors();
    };

    mediaQuery.addEventListener('change', handleChange);
    updateColors(); // Initial update

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    mode,
    setMode,
    colors,
    updateColors,
    getCSSVar,
  };
}; 