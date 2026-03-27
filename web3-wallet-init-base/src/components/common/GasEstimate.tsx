'use client';

import { useState, useEffect } from 'react';
import { useGasEstimation } from '@/hooks/useGasEstimation';
import { ethers } from 'ethers';
import { formatBalance } from '@/lib/formatBalance';

interface GasEstimateProps {
  to: string;
  data?: string;
  value?: string;
  onEstimate?: (estimate: any) => void;
}

export function GasEstimate({ to, data, value, onEstimate }: GasEstimateProps) {
  const { estimateGas, isEstimating, error } = useGasEstimation();
  const [estimate, setEstimate] = useState<any>(null);

  useEffect(() => {
    if (to) {
      estimateGas(to, data, value).then((est) => {
        if (est) {
          setEstimate(est);
          if (onEstimate) onEstimate(est);
        }
      });
    }
  }, [to, data, value, estimateGas, onEstimate]);

  if (isEstimating) {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span>Estimating gas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-error-500">
        Failed to estimate gas: {error.message}
      </div>
    );
  }

  if (!estimate) {
    return null;
  }

  return (
    <div className="space-y-2 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
      <div className="text-sm font-medium text-[var(--text)]">Gas Estimation</div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-[var(--text-secondary)]">Gas Limit:</span>
          <div className="font-mono text-[var(--text)]">{estimate.gasLimit.toString()}</div>
        </div>
        <div>
          <span className="text-[var(--text-secondary)]">Gas Price:</span>
          <div className="font-mono text-[var(--text)]">
            {formatBalance(estimate.gasPrice.toString(), 18, 6)} Gwei
          </div>
        </div>
        {estimate.maxFeePerGas && (
          <div>
            <span className="text-[var(--text-secondary)]">Max Fee:</span>
            <div className="font-mono text-[var(--text)]">
              {formatBalance(estimate.maxFeePerGas.toString(), 18, 6)} Gwei
            </div>
          </div>
        )}
        {estimate.maxPriorityFeePerGas && (
          <div>
            <span className="text-[var(--text-secondary)]">Priority Fee:</span>
            <div className="font-mono text-[var(--text)]">
              {formatBalance(estimate.maxPriorityFeePerGas.toString(), 18, 6)} Gwei
            </div>
          </div>
        )}
        <div className="col-span-2">
          <span className="text-[var(--text-secondary)]">Estimated Cost:</span>
          <div className="font-semibold text-[var(--text)]">
            {estimate.estimatedCostFormatted} ETH
          </div>
        </div>
      </div>
    </div>
  );
}
