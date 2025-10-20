/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-check
const { exec } = require('shelljs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

const assetPrefix = `https://montage.wanted.co.kr`;

const commitHash = exec('git rev-parse HEAD').stdout.substring(0, 9);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  generateBuildId: () => {
    return commitHash;
  },
  experimental: {
    scrollRestoration: true,
    reactCompiler: true,
    staleTimes: {
      static: 30,
    },
  },
  trailingSlash: false,
  assetPrefix: isProduction ? assetPrefix : undefined,
  transpilePackages: ['next-mdx-remote'],
  env: {
    APP_BUILD_ID: commitHash,
    NEXT_PUBLIC_BASE_PATH: 'https://montage.wanted.co.kr',
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
