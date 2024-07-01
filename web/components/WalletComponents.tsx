import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Badge,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';
import { Button } from '@/components/ui/button';

import { usePrivy } from '@privy-io/react-auth';

function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  const disableLogout = !ready || (ready && !authenticated);
  return (
    <>
      {authenticated ? (
        <Button disabled={disableLogout} onClick={logout}>
          Log out
        </Button>
      ) : (
        <Button disabled={disableLogin} onClick={login}>
          Log in
        </Button>
      )}
    </>
  );
}

export function WalletComponents() {
  return (
    <div className="flex justify-end">
      <LoginButton />
    </div>
  );
}