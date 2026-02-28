/**
 * EcoShield – Centralized Theme Tokens
 *
 * Facebook-inspired light theme.  Every hardcoded color in the app should
 * reference a token from this file so the entire visual identity can be
 * changed from one place.
 *
 * Usage:  import { theme } from '@/constants/theme';
 *         style={{ backgroundColor: theme.colors.background }}
 */

import { Platform } from 'react-native';

// ─── Color Palette ──────────────────────────────────────────────────────────
export const palette = {
  // Facebook blue ramp
  blue50: '#E7F3FF',
  blue100: '#C3DAFE',
  blue200: '#90B8F8',
  blue400: '#4599F7',
  blue500: '#1877F2', // primary
  blue600: '#1565C0',
  blue700: '#0F4C99',

  // Neutrals (Facebook-style)
  white: '#FFFFFF',
  gray50: '#F0F2F5',
  gray100: '#E4E6EB',
  gray200: '#CED0D4',
  gray300: '#BCC0C4',
  gray400: '#8A8D91',
  gray500: '#65676B',
  gray600: '#4B4F56',
  gray700: '#3A3B3C',
  gray800: '#242526',
  gray900: '#1C1E21',
  black: '#000000',

  // Semantic status
  green500: '#42B72A',
  green700: '#2E7D32',
  orange500: '#F7B928',
  orange600: '#FF9800',
  red500: '#FA3E3E',
  red600: '#D64545',
} as const;

// ─── Semantic Theme Tokens ──────────────────────────────────────────────────
export const theme = {
  colors: {
    // ── Backgrounds ─────────────────────────────────────────────────────
    /** Main app / screen background */
    background: palette.gray50,
    /** Cards, modals, bottom sheets */
    surface: palette.white,
    /** Subtle section separators (e.g. list container) */
    surfaceSecondary: palette.gray50,

    // ── Brand / Primary ─────────────────────────────────────────────────
    primary: palette.blue500,
    primaryLight: palette.blue50,
    primaryDark: palette.blue600,

    // ── Text ────────────────────────────────────────────────────────────
    textPrimary: palette.gray900,
    textSecondary: palette.gray500,
    textMuted: palette.gray400,
    textInverse: palette.white,
    textLink: palette.blue500,

    // ── Borders / Dividers ──────────────────────────────────────────────
    border: palette.gray200,
    borderLight: palette.gray100,

    // ── Icons ───────────────────────────────────────────────────────────
    icon: palette.gray500,
    iconActive: palette.blue500,

    // ── Interactive states ──────────────────────────────────────────────
    selected: palette.blue500,
    selectedText: palette.white,
    pressed: palette.gray100,
    disabled: palette.gray300,

    // ── Tab bar ─────────────────────────────────────────────────────────
    tabActive: palette.blue500,
    tabInactive: palette.gray400,

    // ── Shadows ─────────────────────────────────────────────────────────
    shadow: palette.black,

    // ── Overlay ─────────────────────────────────────────────────────────
    overlay: 'rgba(0, 0, 0, 0.5)',

    // ── Semantic / Status ───────────────────────────────────────────────
    success: palette.green500,
    successDark: palette.green700,
    warning: palette.orange500,
    warningDark: palette.orange600,
    error: palette.red500,
    errorDark: palette.red600,
    info: palette.blue500,
    pending: palette.blue500,

    // ── Calendar-specific ───────────────────────────────────────────────
    calendarActiveWeek: palette.blue50,
    calendarOtherMonth: palette.gray300,
    calendarHandle: palette.gray200,
    calendarToday: palette.blue500,
    calendarTodayText: palette.blue500,

    // ── Status badge colors (job statuses) ──────────────────────────────
    statusPending: palette.blue500,
    statusCompleted: palette.green500,
    statusCancelled: palette.orange600,
    statusDefault: palette.gray500,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 32,
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
  },

  fontSize: {
    'xs': 11,
    'sm': 12,
    'md': 14,
    'base': 15,
    'lg': 16,
    'xl': 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
  },

  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  shadow: {
    sm: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
  },
} as const;

// ─── Legacy Colors (kept for ThemedText / ThemedView / useThemeColor) ────
// Maps to the new theme tokens so existing components keep working.
export const Colors = {
  light: {
    text: theme.colors.textPrimary,
    background: theme.colors.background,
    tint: theme.colors.primary,
    icon: theme.colors.icon,
    tabIconDefault: theme.colors.tabInactive,
    tabIconSelected: theme.colors.tabActive,
  },
  dark: {
    text: theme.colors.textPrimary,
    background: theme.colors.background,
    tint: theme.colors.primary,
    icon: theme.colors.icon,
    tabIconDefault: theme.colors.tabInactive,
    tabIconSelected: theme.colors.tabActive,
  },
};

// ─── Fonts ───────────────────────────────────────────────────────────────────
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
