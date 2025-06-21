import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'

import App from './App.tsx'
import { config } from './wagmi.ts'

import './index.css'

import { createAppKit } from '@reown/appkit/react'

import { arbitrum, mainnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'


globalThis.Buffer = Buffer

const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'dad2f2fefab1a0cf80160aeab530e74f'

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks = [mainnet, arbitrum]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
        <appkit-button />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
