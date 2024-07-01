'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from '@privy-io/wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { EXPECTED_CHAIN } from "@/constants";

const queryClient = new QueryClient();


export const wagmiConfig = createConfig({
    chains: [EXPECTED_CHAIN],
    ssr: true,
    transports: {
        [baseSepolia.id]: http(),
        [base.id]: http(),
    },
});


export default function PrivyProviders({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
            config={{
                // Customize Privy's appearance in your app
                appearance: {
                    walletList: ['coinbase_wallet'],
                    theme: 'light',
                    accentColor: '#676FFF',
                    logo: 'https://pay.zeneca.app/zeneca-black.svg',
                },
                externalWallets: {
                    coinbaseWallet: {
                        // Valid connection options include 'eoaOnly' (default), 'smartWalletOnly', or 'all'
                        connectionOptions: 'smartWalletOnly',
                    },
                },
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                    createOnLogin: 'users-without-wallets',
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={wagmiConfig}>
                    {children}
                </WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    );
}