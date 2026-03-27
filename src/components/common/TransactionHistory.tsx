'use client';

import { useState } from 'react';
import { useTransactionHistory } from '@/hooks/useTransactionHistory';
import { formatAddress, formatTxHash, formatBalanceWithSymbol } from '@/lib/formatBalance';
import { SUPPORTED_CHAINS } from '@/config/chains';
import { TransactionRecord } from '@/lib/transactionStorage';
import { Button } from './Button';

interface TransactionHistoryProps {
  maxItems?: number;
  showHeader?: boolean;
}

export function TransactionHistory({ maxItems = 10, showHeader = true }: TransactionHistoryProps) {
  const { transactions, isLoading, refetch } = useTransactionHistory();
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);

  const displayTransactions = transactions.slice(0, maxItems);

  const getStatusColor = (status: TransactionRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-[var(--text-secondary)]';
    }
  };

  const getStatusIcon = (status: TransactionRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'failed':
        return '✗';
      case 'pending':
        return '⏳';
      default:
        return '?';
    }
  };

  const getExplorerUrl = (tx: TransactionRecord) => {
    const chain = SUPPORTED_CHAINS.find(c => c.chainId === tx.chainId);
    return chain ? `${chain.explorerUrl}tx/${tx.hash}` : null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    );
  }

  if (displayTransactions.length === 0) {
    return (
      <div className="text-center p-8 text-[var(--text-secondary)]">
        No transaction history
      </div>
    );
  }

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--text)]">Transaction History</h3>
          <Button variant="ghost" size="sm" onClick={refetch}>
            Refresh
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {displayTransactions.map((tx) => {
          const explorerUrl = getExplorerUrl(tx);
          return (
            <div
              key={tx.hash}
              className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              onClick={() => setSelectedTx(tx)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-medium ${getStatusColor(tx.status)}`}>
                      {getStatusIcon(tx.status)} {tx.status.toUpperCase()}
                    </span>
                    {tx.type && (
                      <span className="text-xs text-[var(--text-secondary)]">
                        {tx.type}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-mono truncate">
                    {formatTxHash(tx.hash)}
                  </div>
                  {tx.description && (
                    <div className="text-sm text-[var(--text)] mt-1">
                      {tx.description}
                    </div>
                  )}
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    {new Date(tx.timestamp).toLocaleString()}
                  </div>
                </div>
                {explorerUrl && (
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="ml-4 text-accent-purple hover:underline text-sm"
                  >
                    View ↗
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedTx && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTx(null)}
        >
          <div
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[var(--text)]">Transaction Details</h3>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-[var(--text-secondary)] hover:text-[var(--text)]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-[var(--text-secondary)]">Hash</label>
                <div className="font-mono text-sm text-[var(--text)] break-all">{selectedTx.hash}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">From</label>
                  <div className="font-mono text-sm text-[var(--text)]">{formatAddress(selectedTx.from)}</div>
                </div>
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">To</label>
                  <div className="font-mono text-sm text-[var(--text)]">{formatAddress(selectedTx.to)}</div>
                </div>
              </div>

              <div>
                <label className="text-sm text-[var(--text-secondary)]">Value</label>
                <div className="text-sm text-[var(--text)]">
                  {formatBalanceWithSymbol(selectedTx.value)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">Status</label>
                  <div className={`text-sm font-medium ${getStatusColor(selectedTx.status)}`}>
                    {selectedTx.status.toUpperCase()}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">Chain</label>
                  <div className="text-sm text-[var(--text)]">
                    {SUPPORTED_CHAINS.find(c => c.chainId === selectedTx.chainId)?.name || selectedTx.chainId}
                  </div>
                </div>
              </div>

              {selectedTx.blockNumber && (
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">Block Number</label>
                  <div className="text-sm text-[var(--text)]">{selectedTx.blockNumber}</div>
                </div>
              )}

              {selectedTx.gasUsed && (
                <div>
                  <label className="text-sm text-[var(--text-secondary)]">Gas Used</label>
                  <div className="text-sm text-[var(--text)]">{selectedTx.gasUsed}</div>
                </div>
              )}

              <div>
                <label className="text-sm text-[var(--text-secondary)]">Timestamp</label>
                <div className="text-sm text-[var(--text)]">
                  {new Date(selectedTx.timestamp).toLocaleString()}
                </div>
              </div>

              {getExplorerUrl(selectedTx) && (
                <a
                  href={getExplorerUrl(selectedTx)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-accent-purple hover:underline"
                >
                  View on Block Explorer ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
