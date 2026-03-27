'use client';

import { WalletSelector } from './WalletSelector';
import { useWalletContext } from './WalletProvider';
import { WalletType } from '@/types/wallet';

export interface WalletConnectButtonProps {
  onConnect?: (walletType: WalletType, chainIndex: number) => void;
  isConnecting?: boolean;
  showChainSelector?: boolean;
}

export function WalletConnectButton({ 
  onConnect, 
  isConnecting,
  showChainSelector = true 
}: WalletConnectButtonProps) {
  const { connect, isConnecting: contextIsConnecting } = useWalletContext();
  const connecting = isConnecting ?? contextIsConnecting;

  const handleSelect = async (walletType: WalletType, chainIndex: number) => {
    if (onConnect) {
      onConnect(walletType, chainIndex);
    } else {
      await connect(walletType, chainIndex);
    }
  };

  return (
    <WalletSelector
      onSelect={handleSelect}
      isConnecting={connecting}
    />
  );
}
