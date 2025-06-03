import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   
  images: {
    unoptimized: true,
  },

  //Cette option permet de cibler les routes pour le middlewar
  matcher: [
    "/motos/:path*",
    "/clients/:path*",
    "/reservations/:path*"
  ]
};

export default nextConfig;
