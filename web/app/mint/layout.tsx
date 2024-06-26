import { generateMetadata } from '@/utils/generateMetadata';

export const metadata = generateMetadata({
  title: 'Zeneca Pay',
  description:
    'Help merchants accept crypto payment links and instantly receive local currency',
  images: 'themes.png',
  pathname: 'mint',
});

export default async function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
