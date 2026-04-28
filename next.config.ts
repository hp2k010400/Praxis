import type { NextConfig } from "next";

const allowedOrigins = ["localhost:3000"];
if (process.env.NEXT_PUBLIC_APP_URL) {
  try {
    allowedOrigins.push(new URL(process.env.NEXT_PUBLIC_APP_URL).host);
  } catch {
    // invalid URL — skip
  }
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { allowedOrigins },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
