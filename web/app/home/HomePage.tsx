'use client';
import { useAccount } from 'wagmi';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import Banner from '@/components/layout/banner/banner';
/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  const account = useAccount();

  return (
    <>
      <Header />
      <Main>
        <Banner pageName="Mint NFT" pageUrl="mint" />
        <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <li className="aspect-square transition-opacity animate-fadeIn">
            <a
              className="relative inline-block h-full w-full"
              href="/product/acme-slip-on-shoes"
            >
              <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-indigo-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                <img
                  alt="Acme Slip-On Shoes"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src="https://m.media-amazon.com/images/I/41o9rvyYZPL._SY445_SX342_.jpg"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: 0,
                    color: "transparent"
                  }}
                />
                <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
                  <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                      Read Write Own: Building the Next Era of the Internet
                    </h3>
                    <p className="flex-none rounded-full bg-indigo-600 p-2 text-white">
                      20.00
                      <span className="ml-1 inline ">
                        USDC
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>


      </Main>
      <Footer />
    </>
  );
}
