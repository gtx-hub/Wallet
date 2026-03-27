'use client';

import { useState } from 'react';
import { useWalletContext } from '@/components/wallet/WalletProvider';
import { useTheme } from '@/components/common/ThemeProvider';
import { Button } from '@/components/common/Button';
import { TransactionHistory } from '@/components/common/TransactionHistory';
import { clearTransactionHistory } from '@/lib/transactionStorage';
import { toast } from 'react-toastify';

export default function SettingsPage() {
  const { disconnect, walletType, address } = useWalletContext();
  const { theme, setTheme } = useTheme();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearHistory = () => {
    clearTransactionHistory();
    toast.success('Transaction history cleared', { autoClose: 2000 });
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[var(--text)]">Settings</h1>

        {/* Wallet Settings */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Wallet</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[var(--text-secondary)]">Connected Wallet</label>
              <div className="text-sm text-[var(--text)] font-medium capitalize">
                {walletType || 'Not connected'}
              </div>
            </div>
            {address && (
              <div>
                <label className="text-sm text-[var(--text-secondary)]">Address</label>
                <div className="font-mono text-sm text-[var(--text)] break-all">
                  {address}
                </div>
              </div>
            )}
            {address && (
              <Button variant="secondary" onClick={disconnect}>
                Disconnect Wallet
              </Button>
            )}
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">Theme</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    theme === 'light'
                      ? 'border-accent-purple bg-accent-purple/10 text-[var(--text)]'
                      : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-accent-purple/50'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-accent-purple bg-accent-purple/10 text-[var(--text)]'
                      : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-accent-purple/50'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--text)]">Transaction History</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowClearConfirm(true)}
            >
              Clear History
            </Button>
          </div>
          <TransactionHistory maxItems={20} showHeader={false} />
        </div>

        {/* Clear History Confirmation */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                Clear Transaction History?
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                This will permanently delete all stored transaction history. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleClearHistory}
                  className="flex-1"
                >
                  Clear History
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
