import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": join(__dirname, "src"),
      "@assets": join(__dirname, "src/assets"),
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
