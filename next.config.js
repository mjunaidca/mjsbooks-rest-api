/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    PGHOST: "ep-red-thunder-428017.us-east-2.aws.neon.tech",
    PGDATABASE: "neondb",
    PGUSER: "mr.junaid.ca",
    PGPASSWORD: "Of8jtYhgeH4C",
    JWT_SECRET_KEY: "DbxHHxIAVxgl3dVzut6pmPFUPCIre5FcuEa828VVMqw",
  },
};

module.exports = nextConfig;
