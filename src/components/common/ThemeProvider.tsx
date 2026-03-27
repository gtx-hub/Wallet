'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { theme as designTheme } from '@/styles/theme';

type Theme = 'dark' | 'light';
type Preference = 'system' | Theme;

interface ThemeContextType {
  theme: Theme; // effective theme
  preference: Preference; // user preference
  toggleTheme: () => void;
  setPreference: (p: Preference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeVars(mode: Theme) {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.style.setProperty('--bg', designTheme.colors.background.dark);
    root.style.setProperty('--card', designTheme.colors.background.card);
    root.style.setProperty('--text', designTheme.colors.text.primary);
    root.style.setProperty('--text-secondary', designTheme.colors.text.secondary);
    root.style.setProperty('--primary', designTheme.colors.accent.primary);
    root.style.setProperty('--accent', designTheme.colors.accent.accent);
    root.style.setProperty('--border', designTheme.colors.border.light);
  } else {
    root.style.setProperty('--bg', designTheme.colors.light.background);
    root.style.setProperty('--card', designTheme.colors.light.card);
    root.style.setProperty('--text', designTheme.colors.light.text);
    root.style.setProperty('--text-secondary', designTheme.colors.light.subtle || '#6B7280');
    root.style.setProperty('--primary', designTheme.colors.accent.primary);
    root.style.setProperty('--accent', designTheme.colors.accent.accent);
    root.style.setProperty('--border', 'rgba(15,23,42,0.06)');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<Preference>('system');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // read stored preference (system | dark | light)
    const stored = localStorage.getItem('themePreference') as Preference | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialPref: Preference = stored || 'system';
    setPreferenceState(initialPref);

    const effective: Theme = initialPref === 'system' ? (prefersDark ? 'dark' : 'light') : initialPref;
    setTheme(effective);

    // apply tailwind dark class and css vars
    if (effective === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    applyThemeVars(effective);

    // remove preload class to re-enable transitions after first paint
    requestAnimationFrame(() => {
      try {
        document.documentElement.classList.remove('preload-theme');
      } catch (e) {}
    });
  }, []);

  const applyPreference = (pref: Preference) => {
    setPreferenceState(pref);
    try { localStorage.setItem('themePreference', pref); } catch (e) {}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effective: Theme = pref === 'system' ? (prefersDark ? 'dark' : 'light') : pref;
    setTheme(effective);
    if (effective === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    applyThemeVars(effective);
  };

  const toggleTheme = () => {
    // toggling will set explicit preference to opposite theme
    const newPref: Preference = theme === 'light' ? 'dark' : 'light';
    applyPreference(newPref);
  };

  const setPreference = (p: Preference) => applyPreference(p);

  return (
    <ThemeContext.Provider value={{ theme, preference, toggleTheme, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}