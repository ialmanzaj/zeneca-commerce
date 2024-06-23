import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';

type BannerProps = {
  pageName: string;
  pageUrl: string;
  wip?: boolean;
};

export default function Banner({ pageName, pageUrl, wip }: BannerProps) {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:gap-0',
        `rounded-lg border border-zinc-400 border-opacity-10 bg-neutral-900  ${wip ? 'text-boat-color-yellow-70' : 'text-white'
        }`,
      )}
    >
      <div className="flex items-start justify-start gap-2 md:gap-6">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center md:h-12 md:w-12">
          <Image
            src="/checkout.svg"
            width={10}
            height={10}
            alt="hammerandpick"
            className="h-6 w-6 md:h-12 md:w-12"
          />
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-2">
          <h1 className="font-inter  font-semibold leading-normal text-xl">
            Shop online with Zeneca
          </h1>
          <div className="text-base font-normal leading-normal gap-2">
            Shop with stablecoins online. Enables customers to shop directly from the smart wallet + stablecoins to shop online(amazon, alibaba, etc) and merchants receive fiat.
          </div>
        </div>
      </div>
      
    </section>
  );
}
