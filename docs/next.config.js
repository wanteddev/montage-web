const { exec } = require('shelljs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

const assetPrefix = `https://wanteddev.github.io/wds`;

const commitHash = exec('git rev-parse HEAD').stdout.substring(0, 9);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/wds',
  output: 'export',
  generateBuildId: () => {
    return commitHash;
  },
  assetPrefix: isProduction ? assetPrefix : undefined,
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizePackageImports: ['@wanteddev/wds-icon'],
  },
  env: {
    APP_BUILD_ID: commitHash,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
