/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: `/evento`,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

// Setting to open directly in events page
