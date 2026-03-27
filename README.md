# Kept Protocol

A secure DeFi protocol for individual users, focusing on wallet integration and user interface.

## Features

- **Smart Wallet Integration**: Biconomy Smart Accounts (ERC-4337) with social login via Web3Auth
- **Gasless Transactions**: Sponsored transactions using Biconomy Paymaster
- **Multi-Chain Support**: Ethereum Sepolia and Polygon Amoy testnets
- **Social Login**: Connect with Google, Apple, Twitter, and other social accounts
- **Light/Dark Theme**: Beautiful theme system with customization
- **Responsive Design**: Mobile-friendly interface
- **TypeScript**: Full type safety
- **Modern Tools**: ESLint, Prettier, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd keptprotocol
npm install
```

2. The project is pre-configured with testnet credentials for Biconomy and Web3Auth
   - For production deployment, see [WALLET_INTEGRATION.md](./WALLET_INTEGRATION.md) for configuration details

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build and Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── common/         # Shared/UI components (Button, Theme, etc.)
│   └── wallet/         # Wallet components (WalletProvider, WalletConnectButton)
├── config/             # Configuration files (chains, env)
├── contracts/          # Smart contract ABIs
├── hooks/              # Custom React hooks (useWallet, useContract)
├── lib/               # Utility functions
├── styles/            # Global styles and theme
└── types/             # TypeScript type definitions
```

## Technologies

### Core Framework
- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

### Web3 & Wallet
- [Biconomy SDK](https://www.biconomy.io/) - Smart Account & Paymaster (ERC-4337)
- [Web3Auth](https://web3auth.io/) - Social login and wallet management
- [Ethers.js](https://docs.ethers.org/) - Ethereum library

### UI & Styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Toast notifications
- [Class Variance Authority](https://cva.style/) - Component variants

### Development Tools
- [ESLint](https://eslint.org/) - JavaScript linter
- [Prettier](https://prettier.io/) - Code formatter

## Wallet Integration

This project uses **Biconomy Smart Accounts** with **Web3Auth** for seamless wallet connectivity:

- **Social Login**: Connect using Google, Apple, Twitter, etc.
- **Smart Accounts**: Each user gets a Biconomy Smart Account (ERC-4337)
- **Gasless Transactions**: Transactions sponsored by Biconomy Paymaster
- **Multi-Chain**: Support for Ethereum Sepolia and Polygon Amoy testnets

For detailed documentation on the wallet integration, see [WALLET_INTEGRATION.md](./WALLET_INTEGRATION.md).

### Quick Start with Wallet

```typescript
import { useWalletContext } from '@/components/wallet/WalletProvider';

function YourComponent() {
  const { connect, disconnect, address, isConnected } = useWalletContext();
  
  return (
    <button onClick={() => connect()}>
      {isConnected ? `Connected: ${address}` : 'Connect Wallet'}
    </button>
  );
}
```

## License

MIT
