import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@coinbase/onchainkit/styles.css';
import OnchainProviders from '../components/OnchainProviders';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeneca pay",
  description: "Zeneca pay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-1 flex-col">
        <OnchainProviders>
          {children}
        </OnchainProviders>
      </body>
    </html>
  );
}
