import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveWalletState,
  loadWalletState,
  clearWalletState,
  getStoredWalletType,
  getStoredChainIndex,
} from '@/lib/walletPersistence';

describe('walletPersistence', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('saveWalletState', () => {
    it('should save wallet state to localStorage', () => {
      const state = {
        walletType: 'metamask',
        chainIndex: 0,
        address: '0x1234567890123456789012345678901234567890',
        chainId: 11155111,
      };

      saveWalletState(state);

      const saved = loadWalletState();
      expect(saved).toEqual(state);
    });
  });

  describe('loadWalletState', () => {
    it('should load wallet state from localStorage', () => {
      const state = {
        walletType: 'metamask',
        chainIndex: 0,
        address: '0x1234567890123456789012345678901234567890',
        chainId: 11155111,
      };

      localStorage.setItem('kept_wallet_state', JSON.stringify(state));
      const loaded = loadWalletState();
      expect(loaded).toEqual(state);
    });

    it('should return null if no state is stored', () => {
      const loaded = loadWalletState();
      expect(loaded).toBeNull();
    });
  });

  describe('clearWalletState', () => {
    it('should clear wallet state from localStorage', () => {
      const state = {
        walletType: 'metamask',
        chainIndex: 0,
        address: '0x1234567890123456789012345678901234567890',
        chainId: 11155111,
      };

      saveWalletState(state);
      clearWalletState();

      expect(loadWalletState()).toBeNull();
      expect(getStoredWalletType()).toBeNull();
      expect(getStoredChainIndex()).toBeNull();
    });
  });

  describe('getStoredWalletType', () => {
    it('should return stored wallet type', () => {
      localStorage.setItem('kept_wallet_type', 'metamask');
      expect(getStoredWalletType()).toBe('metamask');
    });

    it('should return null if no wallet type is stored', () => {
      expect(getStoredWalletType()).toBeNull();
    });
  });

  describe('getStoredChainIndex', () => {
    it('should return stored chain index', () => {
      localStorage.setItem('kept_chain_index', '1');
      expect(getStoredChainIndex()).toBe(1);
    });

    it('should return null if no chain index is stored', () => {
      expect(getStoredChainIndex()).toBeNull();
    });
  });
});
