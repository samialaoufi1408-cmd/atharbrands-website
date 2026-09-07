/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const renamedCases = {
      qira: 'aevu',
      naysar: 'aevu',
      'awwal-nafha': 'aevu',
      'awwal-nafha/feasibility': 'aevu/feasibility',
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
