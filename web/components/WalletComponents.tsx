import { Button } from '@/components/ui/button';
import { usePrivy, useLogin } from '@privy-io/react-auth';

function LoginButton() {
  const { ready, authenticated, logout } = usePrivy();

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
      if (user.wallet && isNewUser) {
        const merchant = await fetch('/api/merchant', {
          method: 'POST',
          body: JSON.stringify({ address: user.wallet.address, email: user.email }),
        });
        console.log("merchant", merchant);
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

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