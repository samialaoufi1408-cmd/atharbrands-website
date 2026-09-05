/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return ['ar', 'en'].map(locale => ({
      source: `/${locale}/work/qira`,
      destination: `/${locale}/work/naysar`,
      permanent: true,
    }));
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
