import { createContext, useContext } from 'react';
import { C } from './components/ui';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Resolved = 'light' | 'dark';

export const palettes: Record<Resolved, Partial<typeof C>> = {
  dark: {
    bg: '#0D1117', card: '#1C1F2E', elevated: '#252A3A', border: '#2D3548',
    text: '#FFFFFF', sub: '#A0AEC0', muted: '#8590A6', cyan: '#00D2FF', indigo: '#6366F1', violet: '#7C3AED',
    success: '#00E676', warning: '#FFC107', error: '#FF5252',
    headerBg: 'linear-gradient(160deg,#0D1117,#141A2A)', cardGrad: 'linear-gradient(145deg,#1C1F2E,#202545)', cardGrad2: 'linear-gradient(135deg,#1C1F2E,#171B2B)',
    drawerBg: 'linear-gradient(160deg,#0F1320,#111827 60%,#0D1117)', track: '#12151F', shadow: '0 4px 20px rgba(0,0,0,0.25)',
    overlay: 'rgba(0,0,0,0.65)', overlayStrong: 'rgba(13,17,23,0.96)', onAccent: '#0D1117', disabledBg: '#252A3A',
    outer: 'linear-gradient(135deg, #050709 0%, #0D1117 50%, #0A0D16 100%)', splash: 'radial-gradient(ellipse at 50% 40%, #131B33 0%, #0D1117 65%)',
    dashHeader: 'linear-gradient(160deg,#0D1117,#111525 60%,#141A2A)', frameShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.15), 0 0 60px rgba(99,102,241,0.06)',
  },
  light: {
    bg: '#F3F6FB', card: '#FFFFFF', elevated: '#E9EFF8', border: '#D3DCEA',
    text: '#0F172A', sub: '#475569', muted: '#64748B', cyan: '#0891B2', indigo: '#4F46E5', violet: '#6D28D9',
    success: '#059669', warning: '#B45309', error: '#DC2626',
    headerBg: 'linear-gradient(160deg,#FFFFFF,#EAF0FA)', cardGrad: 'linear-gradient(145deg,#FFFFFF,#EEF2FD)', cardGrad2: 'linear-gradient(135deg,#FFFFFF,#F1F5FB)',
    drawerBg: 'linear-gradient(160deg,#FFFFFF,#F1F5FB 60%,#E9EFF8)', track: '#E2E8F0', shadow: '0 4px 18px rgba(30,41,90,0.08)',
    overlay: 'rgba(15,23,42,0.45)', overlayStrong: 'rgba(243,246,251,0.97)', onAccent: '#FFFFFF', disabledBg: '#E2E8F0',
    outer: 'linear-gradient(135deg, #DDE5F2 0%, #EEF2F9 50%, #E3EAF6 100%)', splash: 'radial-gradient(ellipse at 50% 40%, #FFFFFF 0%, #E6ECF7 70%)',
    dashHeader: 'linear-gradient(160deg,#FFFFFF,#EEF3FB 60%,#E6EDF9)', frameShadow: '0 40px 90px rgba(30,41,90,0.28), 0 0 0 1px rgba(99,102,241,0.2)',
  },
};

export const resolveMode = (m: ThemeMode): Resolved =>
  m === 'system' ? (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : m;

export function applyTheme(r: Resolved) {
  Object.assign(C, palettes[r]);
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = r;
    document.documentElement.style.colorScheme = r;
    document.body.style.background = C.bg;
    document.body.style.color = C.text;
  }
}

export const readStoredMode = (): ThemeMode => {
  try { const v = localStorage.getItem('fm-theme'); if (v === 'light' || v === 'dark' || v === 'system') return v; } catch { /* ignore */ }
  return 'system';
};

export interface ThemeCtxValue { mode: ThemeMode; resolved: Resolved; setMode: (m: ThemeMode) => void; toggle: () => void }
export const ThemeCtx = createContext<ThemeCtxValue>({ mode: 'dark', resolved: 'dark', setMode: () => {}, toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);
