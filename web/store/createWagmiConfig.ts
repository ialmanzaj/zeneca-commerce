import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { EXPECTED_CHAIN } from '@/constants';

export function createWagmiConfig(rpcUrl: string, projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }

  // Temporary hack, until we configure a FE page in OnchainKit to copy just the API key
  const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');
  const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base-sepolia/');

  return createConfig({
    chains: [EXPECTED_CHAIN],
    connectors: [
      coinbaseWallet({
        appName: 'zeneca-pay',
        preference: 'smartWalletOnly',
      }),
    ],
    ssr: true,
    transports: {
      [base.id]: http(baseUrl),
      [baseSepolia.id]: http(baseSepoliaUrl),
    },
  });
}
