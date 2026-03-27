'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getTransactionHistory,
  getTransactionsByChain,
  getTransactionsByAddress,
  TransactionRecord,
  updateTransactionStatus,
} from '@/lib/transactionStorage';
import { useWalletContext } from '@/components/wallet/WalletProvider';
import { ethers } from 'ethers';
import { SUPPORTED_CHAINS } from '@/config/chains';

export function useTransactionHistory() {
  const { address, chainId } = useWalletContext();
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTransactions = useCallback(() => {
    setIsLoading(true);
    try {
      let history: TransactionRecord[] = [];
      
      if (address) {
        history = getTransactionsByAddress(address);
      } else {
        history = getTransactionHistory();
      }

      // Filter by current chain if needed
      const chainTransactions = getTransactionsByChain(chainId);
      const filtered = address
        ? chainTransactions.filter(tx => 
            tx.from.toLowerCase() === address.toLowerCase() || 
            tx.to.toLowerCase() === address.toLowerCase()
          )
        : chainTransactions;

      // Sort by timestamp (newest first)
      const sorted = filtered.sort((a, b) => b.timestamp - a.timestamp);
      setTransactions(sorted);
    } catch (error) {
      console.error('Failed to load transaction history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [address, chainId]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const checkTransactionStatus = useCallback(async (txHash: string) => {
    try {
      const chain = SUPPORTED_CHAINS.find(c => c.chainId === chainId);
      if (!chain) return;

      const provider = new ethers.providers.JsonRpcProvider(chain.providerUrl);
      const receipt = await provider.getTransactionReceipt(txHash);

      if (receipt) {
        const status = receipt.status === 1 ? 'confirmed' : 'failed';
        updateTransactionStatus(
          txHash,
          status,
          receipt.blockNumber,
          receipt.gasUsed.toString()
        );
        loadTransactions();
      }
    } catch (error) {
      console.error('Failed to check transaction status:', error);
    }
  }, [chainId, loadTransactions]);

  return {
    transactions,
    isLoading,
    refetch: loadTransactions,
    checkTransactionStatus,
  };
}
