import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle Prisma Client for the browser
      config.module.rules.push({
        test: /node_modules\/@prisma\/client/,
        use: "null-loader",
      });

      config.resolve.fallback = {
        ...config.resolve.fallback,
        "node:async_hooks": false,
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
        zlib: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;
