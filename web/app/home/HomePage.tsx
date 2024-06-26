'use client';
import { useAccount } from 'wagmi';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';

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

        <h1>Home</h1>
      </Main>
      <Footer />
    </>
  );
}
