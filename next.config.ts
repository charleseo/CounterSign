import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/studio',
        destination: '/evaluation',
        permanent: true,
      },
      {
        source: '/countries/uk',
        destination: '/countries/gb',
        permanent: true,
      },
      {
        source: '/countries/ng',
        destination: '/countries/nigeria',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
