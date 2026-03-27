const TRANSACTION_HISTORY_KEY = 'kept_transaction_history';
const MAX_HISTORY_ITEMS = 100;

export interface TransactionRecord {
  hash: string;
  chainId: number;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  gasUsed?: string;
  gasPrice?: string;
  type?: string;
  description?: string;
}

export function saveTransaction(transaction: TransactionRecord): void {
  try {
    const history = getTransactionHistory();
    const updated = [transaction, ...history].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save transaction:', error);
  }
}

export function getTransactionHistory(): TransactionRecord[] {
  try {
    const stored = localStorage.getItem(TRANSACTION_HISTORY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load transaction history:', error);
    return [];
  }
}

export function getTransactionByHash(hash: string): TransactionRecord | null {
  const history = getTransactionHistory();
  return history.find(tx => tx.hash === hash) || null;
}

export function updateTransactionStatus(
  hash: string,
  status: TransactionRecord['status'],
  blockNumber?: number,
  gasUsed?: string
): void {
  try {
    const history = getTransactionHistory();
    const updated = history.map(tx => {
      if (tx.hash === hash) {
        return {
          ...tx,
          status,
          blockNumber: blockNumber ?? tx.blockNumber,
          gasUsed: gasUsed ?? tx.gasUsed,
        };
      }
      return tx;
    });
    localStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update transaction status:', error);
  }
}

export function clearTransactionHistory(): void {
  try {
    localStorage.removeItem(TRANSACTION_HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear transaction history:', error);
  }
}

export function getTransactionsByChain(chainId: number): TransactionRecord[] {
  const history = getTransactionHistory();
  return history.filter(tx => tx.chainId === chainId);
}

export function getTransactionsByAddress(address: string): TransactionRecord[] {
  const history = getTransactionHistory();
  return history.filter(tx => tx.from.toLowerCase() === address.toLowerCase() || tx.to.toLowerCase() === address.toLowerCase());
}
