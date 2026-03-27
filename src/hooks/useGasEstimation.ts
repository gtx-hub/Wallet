'use client';

import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWalletContext } from '@/components/wallet/WalletProvider';
import { SUPPORTED_CHAINS } from '@/config/chains';

export interface GasEstimate {
  gasLimit: ethers.BigNumber;
  gasPrice: ethers.BigNumber;
  maxFeePerGas?: ethers.BigNumber;
  maxPriorityFeePerGas?: ethers.BigNumber;
  estimatedCost: ethers.BigNumber;
  estimatedCostFormatted: string;
}

export function useGasEstimation() {
  const { chainId } = useWalletContext();
  const [isEstimating, setIsEstimating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const estimateGas = useCallback(async (
    to: string,
    data?: string,
    value?: string
  ): Promise<GasEstimate | null> => {
    setIsEstimating(true);
    setError(null);

    try {
      const chain = SUPPORTED_CHAINS.find(c => c.chainId === chainId);
      if (!chain) {
        throw new Error(`Chain ${chainId} not supported`);
      }

      const provider = new ethers.providers.JsonRpcProvider(chain.providerUrl);
      
      // Estimate gas limit
      const gasLimit = await provider.estimateGas({
        to,
        data: data || '0x',
        value: value ? ethers.BigNumber.from(value) : undefined,
      });

      // Get gas price (for legacy transactions)
      const gasPrice = await provider.getGasPrice();

      // Try to get EIP-1559 fee data
      let maxFeePerGas: ethers.BigNumber | undefined;
      let maxPriorityFeePerGas: ethers.BigNumber | undefined;
      
      try {
        const feeData = await provider.getFeeData();
        maxFeePerGas = feeData.maxFeePerGas || undefined;
        maxPriorityFeePerGas = feeData.maxPriorityFeePerGas || undefined;
      } catch (e) {
        // Chain might not support EIP-1559
      }

      // Calculate estimated cost
      const costPerGas = maxFeePerGas || gasPrice;
      const estimatedCost = gasLimit.mul(costPerGas);
      const estimatedCostFormatted = ethers.utils.formatEther(estimatedCost);

      return {
        gasLimit,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        estimatedCost,
        estimatedCostFormatted,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to estimate gas';
      setError(new Error(errorMessage));
      console.error('Gas estimation error:', err);
      return null;
    } finally {
      setIsEstimating(false);
    }
  }, [chainId]);

  return {
    estimateGas,
    isEstimating,
    error,
  };
}
