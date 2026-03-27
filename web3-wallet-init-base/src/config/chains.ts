export interface ChainConfig {
  chainId: number;
  name: string;
  providerUrl: string;
  biconomyPaymasterApiKey: string;
  bundlerUrl: string;
  explorerUrl: string;
  web3AuthChainId: string;
  displayName: string;
  blockExplorer: string;
  ticker: string;
  tickerName: string;
  logo: string;
}

export const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    chainId: 11155111,
    name: "Ethereum Sepolia",
    providerUrl: "https://rpc.ankr.com/eth_sepolia",
    biconomyPaymasterApiKey: "gJdVIBMSe.f6cc87ea-e351-449d-9736-c04c6fab56a2",
    bundlerUrl: "https://bundler.biconomy.io/api/v2/11155111/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    explorerUrl: "https://sepolia.etherscan.io/tx/",
    web3AuthChainId: "0xaa36a7",
    displayName: "Ethereum Sepolia",
    blockExplorer: "https://sepolia.etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    chainId: 80002,
    name: "Polygon Amoy",
    providerUrl: "https://rpc.ankr.com/polygon_amoy",
    biconomyPaymasterApiKey: "TVDdBH-yz.5040805f-d795-4078-9fd1-b668b8817642",
    bundlerUrl: "https://bundler.biconomy.io/api/v2/80002/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    explorerUrl: "https://www.oklink.com/amoy/tx/",
    web3AuthChainId: "0x13882",
    displayName: "Polygon Amoy",
    blockExplorer: "https://www.oklink.com/amoy/",
    ticker: "MATIC",
    tickerName: "Polygon Matic",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
];

export const DEFAULT_CHAIN_INDEX = 0;

// Web3Auth Configuration (v10)
export const WEB3AUTH_CONFIG = {
  clientId: "BExrkk4gXp86e9VCrpxpjQYvmojRSKHstPRczQA10UQM94S5FtsZcxx4Cg5zk58F7W1cAGNVx1-NPJCTFIzqdbs",
  uiConfig: {
    appName: "Kept Protocol",
    theme: {
      primary: "#6fd2c0",
      gray: "#0A0A0A",
      red: "#ef4444",
      white: "#FFFFFF",
    },
    mode: "dark" as const,
    loginMethodsOrder: ["google", "apple", "twitter", "github"],
    defaultLanguage: "en" as const,
    uxMode: "popup" as const,
  },
};

