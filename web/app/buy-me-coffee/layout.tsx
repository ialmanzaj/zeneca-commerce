import { generateMetadata } from '@/utils/generateMetadata';

export const metadata = generateMetadata({
  title: 'Shopping by Zeneca',
  description:
    'Save weeks of initial app setup and the hassle of integrating onchain components with web2 infrastructure.',
  images: 'themes.png',
  pathname: 'buy-me-coffee',
});

export default async function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
