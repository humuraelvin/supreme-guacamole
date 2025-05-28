'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { mainnet, sepolia } from 'wagmi/chains'

const chains = [mainnet, sepolia]

const config = createConfig(
  getDefaultConfig({
    // Your dApp's info
    appName: "Decentralized Voting System",
    chains,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  }),
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="auto" mode="dark">
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  )
} 