import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      // Added placeholder for example URLs, replace if actual API returns different domains
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io', // Added for league table logos
        port: '',
        pathname: '/**',
      },
      { // Added for history page image
        protocol: 'https',
        hostname: 'publish-p47754-e237306.adobeaemcloud.com',
        port: '',
        pathname: '/**',
      },
      { // Added for player images
        protocol: 'https',
        hostname: 'scontent.ftun19-1.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
