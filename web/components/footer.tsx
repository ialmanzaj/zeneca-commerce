'use client';


import NextLink from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex flex-col justify-end bg-gray-900">
      <div className="flex flex-col justify-between gap-16 py-12">
        <div className="container mx-auto flex w-full flex-col justify-between gap-16 px-8 md:flex-row">
          <div className="flex flex-col justify-between">
            <div className="flex h-8 items-center justify-start gap-4">
              <NextLink href="/" passHref className="relative h-8 w-8" aria-label="Home page">
                <Image src="/zeneca-black.svg" alt="Zeneca Logo" width={40} height={40} />
              </NextLink>
              <NextLink
                href="/"
                passHref
                className="font-robotoMono text-center text-xl font-medium text-white no-underline"
              >
                Zeneca®
              </NextLink>

            </div>

            <div className="mt-8 flex flex-col items-center justify-center">
              <p className="text-base font-normal leading-7 text-gray-300">
                This project is was created for the On-Chain Summer 2024 Hackathon.
              </p>
            </div>
          </div>


        </div>
      </div>
    </footer>
  );
}