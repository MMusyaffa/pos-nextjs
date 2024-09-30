/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TOKEN: process.env.TOKEN,
    IS_USE_DUMMY_DATA: process.env.IS_USE_DUMMY_DATA,
    API_URL: process.env.API_URL,
  }
};

export default nextConfig;
