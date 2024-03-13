/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    salesManagement: {
      DEVELOPMENT: {
        baseAPI: 'https://dev.api.globalxtreme-gateway.net',
      },
      PRODUCTION: {
        baseAPI: '',
      },
    },
  },
};

export default nextConfig;
