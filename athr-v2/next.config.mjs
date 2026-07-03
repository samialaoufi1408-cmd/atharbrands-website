/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
