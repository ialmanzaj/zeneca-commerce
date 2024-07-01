import { generateMetadata } from '../generateMetadata';

describe('generateMetadata', () => {
  it('should set metadataBase default', () => {
    const metadata = generateMetadata({
      title: 'Shopping online with Zeneca',
      description: 'Shop with stablecoins anywhere online',
      images: 'themes.png',
      pathname: '',
    });
    expect(metadata.metadataBase).toEqual(new URL('http://localhost:3000'));
  });

  const envs = [
    ['BOAT_DEPLOY_URL', 'boat-deploy-url.com', 'https://boat-deploy-url.com'],
    ['VERCEL_URL', 'vercel-url.com', 'https://vercel-url.com'],
  ];
  describe.each(envs)(
    'generateMetadata with different environment variables',
    (envVar, envValue, expectedUrl) => {
      it(`should set metadataBase from ${envVar}`, async () => {
        envs.forEach(([v]) => delete process.env[v]);
        process.env[envVar] = envValue;
        jest.resetModules();

        const { generateMetadata: generateMetadata2 } = await import('../generateMetadata');
        const metadata = generateMetadata2({
          title: 'Zeneca Pay',
          description:
            'Help merchants accept crypto payment links and instantly receive local currency',
          images: 'themes.png',
          pathname: '',
        });

        expect(metadata.metadataBase).toEqual(new URL(expectedUrl));
      });
    },
  );
});
