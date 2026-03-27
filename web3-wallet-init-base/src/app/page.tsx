'use client';

import { useState } from "react";
import Link from "next/link";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";
import { useWalletContext } from "@/components/wallet/WalletProvider";
import { useContract } from "@/hooks/useContract";
import { BalanceDisplay } from "@/components/wallet/BalanceDisplay";
import { TransactionHistory } from "@/components/common/TransactionHistory";
import { APP } from "@/config/env";
import { useTheme } from "@/components/common/ThemeProvider";
import { Button } from "@/components/common/Button";
import ThemeDemo from "@/components/common/ThemeDemo";
import ThemeSettings from "@/components/common/ThemeSettings";
import { SUPPORTED_CHAINS } from "@/config/chains";
import { formatAddress } from "@/lib/formatBalance";

// Contract addresses for demonstration
const CONTRACT_ADDRESSES: Record<number, string> = {
  11155111: "0xd9ea570eF1378D7B52887cE0342721E164062f5f", // Ethereum Sepolia
  80002: "0xfeec89eC2afD503FF359487967D02285f7DaA9aD", // Polygon Amoy
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { connect, disconnect, isConnecting, address, isConnected, chainId, chainName, walletType } = useWalletContext();
  const { getCount, incrementCount, isLoading: isContractLoading, txHash } = useContract();
  const [count, setCount] = useState<string | null>(null);

  const contractAddress = CONTRACT_ADDRESSES[chainId];

  const handleGetCount = async () => {
    if (!contractAddress) return;
    const result = await getCount(contractAddress);
    if (result) {
      setCount(result);
    }
  };

  const handleIncrementCount = async () => {
    if (!contractAddress) return;
    const hash = await incrementCount(contractAddress);
    if (hash) {
      // Refresh count after increment
      setTimeout(() => handleGetCount(), 2000);
    }
  };

  const currentChain = SUPPORTED_CHAINS.find(c => c.chainId === chainId);
  const explorerUrl = currentChain?.explorerUrl;

  return (
    <div className="relative min-h-screen bg-[var(--bg)]">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 backdrop-blur-lg border-b z-30" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center">
          <div className="w-40 h-12 flex items-center">
            <img
              src="/logo.png"
              alt="Kept Protocol"
              className="h-8"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isConnected && (
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                Settings
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-[var(--text)]"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </nav>

      <main className="flex w-full min-h-screen flex-col items-center justify-center gap-12 p-8 pt-24 relative">
        {/* Gradient Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent-purple opacity-30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent-purple opacity-30 rounded-full blur-3xl" />
        </div>

        <div className="text-center relative z-10">
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-[var(--text)]">
            {APP.NAME}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {APP.DESCRIPTION}
          </p>
        </div>

        {/* Wallet Connection Section */}
        <div className="w-full max-w-2xl relative z-10">
          {!isConnected ? (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-lg">
              <WalletConnectButton
                onConnect={connect}
                isConnecting={isConnecting}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Wallet Info Card */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-lg">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Smart Account Address
                      </p>
                      <p className="text-[var(--text)] font-mono text-sm break-all">
                        {formatAddress(address || '', 6)}
                      </p>
                    </div>
                    <BalanceDisplay />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Network
                      </p>
                      <p className="text-[var(--text)] font-medium">
                        {chainName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Wallet Type
                      </p>
                      <p className="text-[var(--text)] font-medium capitalize">
                        {walletType || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={disconnect}
                    className="w-full"
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              </div>

              {/* Contract Interaction Card */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-[var(--text)] mb-4">
                  Smart Contract Demo
                </h2>
                
                <div className="flex gap-4">
                  {/* Get Count */}
                  <div className="flex-1 flex flex-col items-center gap-3">
                    <Button
                      variant="default"
                      onClick={handleGetCount}
                      className="w-full"
                      disabled={isContractLoading}
                    >
                      Get Count
                    </Button>
                    {count !== null && (
                      <div className="text-center">
                        <p className="text-sm text-[var(--text-secondary)]">Current Count</p>
                        <p className="text-2xl font-bold text-[var(--text)]">{count}</p>
                      </div>
                    )}
                  </div>

                  {/* Increment Count */}
                  <div className="flex-1 flex flex-col items-center gap-3">
                    <Button
                      variant="default"
                      onClick={handleIncrementCount}
                      className="w-full"
                      isLoading={isContractLoading}
                    >
                      Increment Count
                    </Button>
                    {txHash && (
                      <a
                        href={`${explorerUrl}${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent-purple hover:underline"
                      >
                        View Transaction ↗
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] mt-4 text-center">
                  Gasless transactions powered by Biconomy
                </p>
              </div>

              {/* Transaction History */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-lg">
                <TransactionHistory maxItems={5} />
              </div>
            </div>
          )}
        </div>

        {/* Theme demo / examples */}
        {!isConnected && (
          <>
            <div className="relative z-10 w-full flex justify-center">
              <ThemeDemo />
            </div>

            <div className="relative z-10 w-full flex justify-center">
              <ThemeSettings />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
