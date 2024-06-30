
import { clsx } from 'clsx';
import NextLink from 'next/link';
import Image from 'next/image';
import { WalletComponents } from "./WalletComponents";


export function NavbarLink({
  href,
  children,
  target,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  ariaLabel?: string;
}) {
  return (
    <NextLink
      href={href}
      className="font-robotoMono px-0 text-center text-base font-normal  no-underline"
      target={target}
      aria-label={ariaLabel}
    >
      {children}
    </NextLink>
  );
}

export function NavbarTitle() {
  return (
    <div className="flex h-8 items-center justify-start gap-4">
      <NextLink href="/" passHref className="relative h-8 w-8" aria-label="Home page">
        <Image src="/zeneca-black.svg" alt="Zeneca Logo" width={32} height={32} />
      </NextLink>
      <NextLink
        href="/"
        passHref
        className="font-robotoMono text-center text-xl font-medium  no-underline"
        aria-label="build-onchain-apps Github repository"
      >
        Zeneca Pay
      </NextLink>
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className={clsx(
        'flex flex-1 flex-grow items-center justify-between',
        ' bg-opacity-10 p-4',
      )}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <div className="flex items-center justify-start gap-8">
          <ul className="hidden items-center justify-start gap-8 md:flex">

            {/* <li className="flex">
              <NavigationMenu.Root className="relative">
                <NavigationMenu.List className={clsx('flex flex-row space-x-2')}>
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="group flex h-16 items-center justify-start gap-1">
                      <span className="font-robotoMono text-center text-base font-normal ">
                        Experiences
                      </span>
                      <ChevronDownIcon
                        className="transform transition duration-200 ease-in-out group-data-[state=open]:rotate-180"
                        width="16"
                        height="16"
                      />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content
                      className={clsx(
                        'h-38 inline-flex w-48 flex-col items-start justify-start gap-6',
                        'rounded-lg p-6 shadow backdrop-blur-2xl',
                      )}
                    >
                      <Experiences />
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
                <NavigationMenu.Viewport
                  className={clsx(
                    'absolute flex justify-center',
                    'left-[-20%] top-[100%] w-[140%]',
                  )}
                />
              </NavigationMenu.Root>

            </li> */}
            {/* <NextLink
              href="/payment-link"
              passHref
              className="text-center font-medium  no-underline"
              aria-label="Checkout"
            >
              Products
            </NextLink> */}
          </ul>
          <WalletComponents />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;