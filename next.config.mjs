/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/mens-intimate-spa", destination: "/body-grooming-toronto", statusCode: 301 },
      { source: "/toronto-adult-massage-guide", destination: "/massage-wellness-guide-toronto", statusCode: 301 },
      { source: "/services/intimate-shaving", destination: "/services/body-grooming", statusCode: 301 },
    ];
  },
};
export default nextConfig;
