import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "framer-motion"],
  },

  // Image optimization configuration
  images: {
    domains: ["i.discogs.com", "st.discogs.com"],
    formats: ["image/webp", "image/avif"],
  },

  // Webpack configuration for proper bundling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle Prisma Client for the browser
      config.module.rules.push({
        test: /node_modules\/@prisma\/client/,
        use: "null-loader",
      });

      // Prevent Node.js modules from being bundled in the browser
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

  // Production optimizations
  poweredByHeader: false,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
