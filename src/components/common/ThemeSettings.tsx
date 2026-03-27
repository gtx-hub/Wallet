"use client";

import React from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeSettings() {
  const { preference, setPreference } = useTheme() as any;

  return (
    <div className="mt-4 flex items-center gap-3 text-[var(--text)]">
      <label className="text-sm">Theme:</label>
      <label className="text-sm">
        <input
          type="radio"
          name="theme"
          checked={preference === 'system'}
          onChange={() => setPreference('system')}
        />
        <span className="ml-2">System</span>
      </label>
      <label className="text-sm">
        <input
          type="radio"
          name="theme"
          checked={preference === 'light'}
          onChange={() => setPreference('light')}
        />
        <span className="ml-2">Light</span>
      </label>
      <label className="text-sm">
        <input
          type="radio"
          name="theme"
          checked={preference === 'dark'}
          onChange={() => setPreference('dark')}
        />
        <span className="ml-2">Dark</span>
      </label>
    </div>
  );
}
