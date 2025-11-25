/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-check
const { exec } = require('shelljs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';
const isDev = process.env.NEXT_PUBLIC_SERVER_TYPE?.toLowerCase() === 'dev';

const commitHash = exec('git rev-parse --short HEAD').stdout.trim();
const basePath = isDev
  ? 'https://dev-montage.wanted.co.kr'
  : 'https://montage.wanted.co.kr';

const assetPrefix = isDev
  ? `${basePath}/${commitHash}`
  : 'https://montage.wanted.co.kr';

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
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
