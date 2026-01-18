import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        // Updated from deprecated 'domains' to 'remotePatterns'
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/**",
            },
        ],
    },
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
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
