'use client';

import { useState } from 'react';
import { Button } from './Button';
import { formatAddress, formatBalanceWithSymbol } from '@/lib/formatBalance';
import { GasEstimate } from './GasEstimate';
import { SecurityWarning } from './SecurityWarning';

interface TransactionConfirmationProps {
  to: string;
  value?: string;
  data?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

export function TransactionConfirmation({
  to,
  value,
  data,
  description,
  onConfirm,
  onCancel,
  isVisible,
}: TransactionConfirmationProps) {
  const [showWarning, setShowWarning] = useState(true);

  if (!isVisible) return null;

  // Check if this is a high-value transaction
  const isHighValue = value && parseFloat(value) > 1; // More than 1 ETH

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-[var(--text)] mb-4">Confirm Transaction</h3>

        {isHighValue && showWarning && (
          <SecurityWarning
            title="High Value Transaction"
            message="You are about to send a large amount. Please verify all details carefully."
            severity="high"
            onConfirm={() => setShowWarning(false)}
            confirmText="I Understand"
          />
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm text-[var(--text-secondary)]">To</label>
            <div className="font-mono text-sm text-[var(--text)] break-all">{formatAddress(to, 8)}</div>
          </div>

          {value && (
            <div>
              <label className="text-sm text-[var(--text-secondary)]">Amount</label>
              <div className="text-sm font-semibold text-[var(--text)]">
                {formatBalanceWithSymbol(value)}
              </div>
            </div>
          )}

          {description && (
            <div>
              <label className="text-sm text-[var(--text-secondary)]">Description</label>
              <div className="text-sm text-[var(--text)]">{description}</div>
            </div>
          )}

          {data && (
            <div>
              <label className="text-sm text-[var(--text-secondary)]">Data</label>
              <div className="font-mono text-xs text-[var(--text-secondary)] break-all">
                {data.substring(0, 100)}...
              </div>
            </div>
          )}

          <GasEstimate to={to} data={data} value={value} />
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm} className="flex-1">
            Confirm Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}
