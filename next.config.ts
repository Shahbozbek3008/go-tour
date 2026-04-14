import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
    // Image optimization for marketplace
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // barcha hostlar uchun
            },
            {
                protocol: "http",
                hostname: "**",
            },
            {
                protocol: "https",
                hostname: "api.file.gotour.uz",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "ui-avatars.com",
                pathname: "/**",
                port: "",
            },
        ],
        // Image formats
        formats: ["image/webp", "image/avif"],
        // Cache optimization
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 4096],
        // Image sizes for different breakpoints
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    },

    // // Power-ups for development
    // ...(process.env.NODE_ENV === "development" && {
    //     // Faster refresh in development
    //     reactStrictMode: true,
    // }),

    // Production optimizations
    ...(process.env.NODE_ENV === "production" && {
        // Generate source maps for debugging
        productionBrowserSourceMaps: true,
    }),

    // TypeScript configuration
    typescript: {
        // Type checking during build
        ignoreBuildErrors: true,
    },

    // ESLint configuration
    eslint: {
        // ESLint during build
        ignoreDuringBuilds: true,
    },
} as any

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
