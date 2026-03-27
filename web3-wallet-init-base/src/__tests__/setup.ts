import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.ethereum for wallet tests
Object.defineProperty(window, 'ethereum', {
  writable: true,
  value: {
    isMetaMask: false,
    isRainbow: false,
    request: vi.fn(),
    on: vi.fn(),
    removeListener: vi.fn(),
  },
});

// Create a proper localStorage mock that actually stores data
const localStorageStore: Record<string, string> = {};

const localStorageMock = {
  getItem: (key: string): string | null => {
    return localStorageStore[key] || null;
  },
  setItem: (key: string, value: string): void => {
    localStorageStore[key] = value;
  },
  removeItem: (key: string): void => {
    delete localStorageStore[key];
  },
  clear: (): void => {
    Object.keys(localStorageStore).forEach(key => {
      delete localStorageStore[key];
    });
  },
  get length(): number {
    return Object.keys(localStorageStore).length;
  },
  key: (index: number): string | null => {
    const keys = Object.keys(localStorageStore);
    return keys[index] || null;
  },
};

// Replace global localStorage with our mock
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Also set it on window for browser-like environment
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
