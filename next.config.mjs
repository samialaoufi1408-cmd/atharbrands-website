/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const renamedCases = {
      qira: 'awwal-nafha',
      naysar: 'awwal-nafha',
      nawsaq: 'rahb-aldar',
      darwaq: 'tatabu',
    };
    return ['ar', 'en'].flatMap(locale =>
      Object.entries(renamedCases).map(([oldSlug, newSlug]) => ({
        source: `/${locale}/work/${oldSlug}`,
        destination: `/${locale}/work/${newSlug}`,
        permanent: true,
      })),
    );
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wsoomnkzaoglnqjagosc.supabase.co',
        pathname: '/storage/v1/object/public/work-images/**',
      },
    ],
  },
};

export default nextConfig;
