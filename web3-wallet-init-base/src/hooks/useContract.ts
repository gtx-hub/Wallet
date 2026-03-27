'use client';

import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { PaymasterMode } from '@biconomy/account';
import { useWalletContext } from '@/components/wallet/WalletProvider';
import { SUPPORTED_CHAINS } from '@/config/chains';
import { contractABI } from '@/contracts/contractABI';
import { toast } from 'react-toastify';
import { saveTransaction } from '@/lib/transactionStorage';

export function useContract() {
  const { smartAccount, chainId, address } = useWalletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const getChainConfig = useCallback(() => {
    return SUPPORTED_CHAINS.find(chain => chain.chainId === chainId);
  }, [chainId]);

  const getCount = useCallback(async (contractAddress: string): Promise<string | null> => {
    try {
      const chain = getChainConfig();
      if (!chain) {
        throw new Error('Chain configuration not found');
      }

      const provider = new ethers.providers.JsonRpcProvider(chain.providerUrl);
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      
      const countId = await contractInstance.getCount();
      return countId.toString();
    } catch (error) {
      console.error('Error getting count:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get count';
      toast.error(errorMessage, { autoClose: 5000 });
      return null;
    }
  }, [getChainConfig]);

  const incrementCount = useCallback(async (contractAddress: string): Promise<string | null> => {
    if (!smartAccount) {
      toast.error('Please connect your wallet first', { autoClose: 5000 });
      return null;
    }

    setIsLoading(true);
    const toastId = toast('Populating Transaction...', { autoClose: false });

    try {
      const chain = getChainConfig();
      if (!chain) {
        throw new Error('Chain configuration not found');
      }

      const provider = new ethers.providers.JsonRpcProvider(chain.providerUrl);
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const minTx = await contractInstance.populateTransaction.increment();
      console.log('Transaction Data:', minTx.data);

      const tx = {
        to: contractAddress,
        data: minTx.data,
      };

      toast.update(toastId, {
        render: 'Sending Transaction...',
        autoClose: false,
      });

      // Save pending transaction to history
      const pendingTxHash = `pending_${Date.now()}`;
      if (address) {
        saveTransaction({
          hash: pendingTxHash,
          chainId,
          from: address,
          to: contractAddress,
          value: '0',
          timestamp: Date.now(),
          status: 'pending',
          type: 'contract_interaction',
          description: 'Increment Count',
        });
      }

      // @ts-ignore
      const userOpResponse = await smartAccount.sendTransaction(tx, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });

      // @ts-ignore
      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log('Transaction Hash:', transactionHash);

      if (transactionHash) {
        // Update transaction in history with actual hash
        if (address) {
          saveTransaction({
            hash: transactionHash,
            chainId,
            from: address,
            to: contractAddress,
            value: '0',
            timestamp: Date.now(),
            status: 'pending',
            type: 'contract_interaction',
            description: 'Increment Count',
          });
        }

        toast.update(toastId, {
          render: 'Transaction Successful!',
          type: 'success',
          autoClose: 5000,
        });
        
        setTxHash(transactionHash);
        return transactionHash;
      }

      return null;
    } catch (error) {
      console.error('Transaction error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Transaction failed';
      
      // Save failed transaction
      if (address) {
        saveTransaction({
          hash: `failed_${Date.now()}`,
          chainId,
          from: address,
          to: contractAddress,
          value: '0',
          timestamp: Date.now(),
          status: 'failed',
          type: 'contract_interaction',
          description: `Increment Count - ${errorMessage}`,
        });
      }

      toast.update(toastId, {
        render: errorMessage,
        type: 'error',
        autoClose: 5000,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [smartAccount, getChainConfig, chainId, address]);

  return {
    getCount,
    incrementCount,
    isLoading,
    txHash,
  };
}
