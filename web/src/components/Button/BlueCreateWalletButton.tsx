import React, { useCallback } from 'react';
import { useConnect } from 'wagmi';
//import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';

export default function BlueCreateWalletButton() {
    const { connectors, connect, data } = useConnect();

    const createWallet = useCallback(() => {
        const coinbaseWalletConnector = connectors.find(
            (connector) => connector.id === 'coinbaseWalletSDK'
        );
        if (coinbaseWalletConnector) {
            connect({ connector: coinbaseWalletConnector });
        }
    }, [connectors, connect]);
    return (
        <button className="mt-4 block w-full rounded-full py-3.5 text-lg font-bold text-white transition duration-300 cursor-pointer bg-blue-600 hover:bg-blue-700" onClick={createWallet}>
            Conectar billetera
        </button>
    );
}