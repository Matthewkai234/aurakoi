import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ["icon2.cleanpng.com", 'res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:5257/:path*",
      },
    ];
  },
};

export default nextConfig;
