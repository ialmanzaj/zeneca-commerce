import { ConnectAccount } from '@coinbase/onchainkit/wallet';

import { useAccount, useChainId, useConnect, useDisconnect } from 'wagmi';
import { AccountDropdown } from './AccountDropdown';
import { AccountInfoPanel } from './AccountInfoPanel';
import BlueCreateWalletButton from '../../Button/BlueCreateWalletButton';
import { EXPECTED_CHAIN } from '@/constants';

/**
 * AccountConnect
 *  - Connects to the wallet
 *  - Disconnects from the wallet
 *  - Displays the wallet network
 */
function AccountConnect() {
  const account = useAccount();
  const { status } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  return (
    <div
      className="flex flex-grow"
      {...(status === 'pending' && {
        'aria-hidden': true,
        style: {
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        },
      })}
    >
      {(() => {
        if (account.status === 'disconnected') {
          return <BlueCreateWalletButton />;
        }

        if (account.status === 'connected' && chainId !== EXPECTED_CHAIN.id) {
          return (
            <button onClick={() => disconnect()} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <>
            <div className="flex flex-grow flex-col md:hidden">
              <AccountInfoPanel />
            </div>
            <div className="flex  md:block">
              <AccountDropdown />
            </div>
          </>
        );
      })()}
    </div>
  );
}

export default AccountConnect;
