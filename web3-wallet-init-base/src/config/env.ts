// Environment configuration
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Blockchain Configuration
  NEXT_PUBLIC_DEFAULT_CHAIN_ID: process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || '1', // Ethereum Mainnet
  NEXT_PUBLIC_SUPPORTED_CHAINS: (process.env.NEXT_PUBLIC_SUPPORTED_CHAINS || '1,5,137').split(','), // Mainnet, Goerli, Polygon
  
  // API Keys and External Services
  NEXT_PUBLIC_ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '',
  NEXT_PUBLIC_INFURA_KEY: process.env.NEXT_PUBLIC_INFURA_KEY || '',
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_TESTNET: ENV.NODE_ENV === 'development',
  ENABLE_WALLET_CONNECT: true,
  ENABLE_COINBASE_WALLET: true,
  ENABLE_METAMASK: true,
} as const;

// API Endpoints
export const API = {
  MAINNET_RPC: `https://eth-mainnet.alchemyapi.io/v2/${ENV.NEXT_PUBLIC_ALCHEMY_KEY}`,
  TESTNET_RPC: `https://eth-goerli.alchemyapi.io/v2/${ENV.NEXT_PUBLIC_ALCHEMY_KEY}`,
} as const;

// App Constants
export const APP = {
  NAME: 'Kept Protocol',
  DESCRIPTION: 'Secure DeFi Protocol for Individual Users',
  VERSION: '1.0.0',
} as const;