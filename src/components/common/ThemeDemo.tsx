"use client";

import React from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeDemo() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="z-10 w-full max-w-2xl rounded-xl p-6" aria-live="polite">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--text)]">Theme Demo</h3>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-md bg-[var(--accent)] text-[var(--text)] hover:opacity-90"
        >
          Toggle: {theme}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-transparent">
          <div className="mb-2 text-sm text-[var(--text-secondary)]">Primary</div>
          {/* Use CSS variable for primary so it follows the theme */}
          <div className="h-12 w-full rounded-md bg-[var(--primary)]" />
        </div>

        <div className="p-4 rounded-lg bg-transparent">
          <div className="mb-2 text-sm text-[var(--text-secondary)]">Accent Glow</div>
          {/* Accent with reduced opacity so it reads like a glow */}
          <div className="h-12 w-full rounded-md bg-[var(--accent)] opacity-25" />
        </div>

        <div className="p-4 rounded-lg bg-transparent">
          <div className="mb-2 text-sm text-[var(--text-secondary)]">Text (primary)</div>
          <div className="h-12 w-full rounded-md bg-[var(--card)] flex items-center justify-center text-sm font-medium text-[var(--text)]">Text color preview</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-[var(--text-secondary)]">
        Suggested Light Theme Colors: <strong className="text-[var(--text)]">Background: #FFFFFF, Surface: #F8FAFC, Text: #0F172A</strong>
      </div>
    </div>
  );
}
