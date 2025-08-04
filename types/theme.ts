export interface ThemeColors {
  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  // Object/text colors
  objectPrimary: string;
  objectSecondary: string;
  objectTertiary: string;
  // Primary and UI colors
  primaryColor: string;
  border: string;
  block: string;
  selection: string;
  destructive: string;
  foreground: string;
  error: string;
  success: string;
  warning: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
}

// CSS Custom Property names for easy reference
export const CSS_VARS = {
  BACKGROUND: '--background',
  BACKGROUND_SECONDARY: '--background-secondary',
  BACKGROUND_TERTIARY: '--background-tertiary',
  OBJECT_PRIMARY: '--object-primary',
  OBJECT_SECONDARY: '--object-secondary',
  OBJECT_TERTIARY: '--object-tertiary',
  PRIMARY_COLOR: '--primary-color',
  BORDER: '--border',
  BLOCK: '--block',
  SELECTION: '--selection',
  DESTRUCTIVE: '--destructive',
  FOREGROUND: '--foreground',
  ERROR: '--error',
  SUCCESS: '--success',
  WARNING: '--warning',
} as const; 