/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-check
const { exec } = require('shelljs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const previewHash = process.env.PREVIEW_HASH;

const isProduction = process.env.NODE_ENV === 'production';
const isDev = process.env.NEXT_PUBLIC_SERVER_TYPE?.toLowerCase() === 'dev';
const isPreview = Boolean(previewHash);

const commitHash = exec('git rev-parse --short HEAD').stdout.trim();
const host = isDev
  ? 'https://dev-montage.wanted.co.kr'
  : 'https://montage.wanted.co.kr';

const buildId = previewHash ?? commitHash;

const assetPrefix = isPreview ? `${host}/${buildId}` : host;

const basePath = isDev && isPreview ? `/${buildId}` : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  basePath,
  generateBuildId: () => {
    return buildId;
  },
  reactCompiler: true,
  experimental: {
    scrollRestoration: true,
    staleTimes: {
      static: 30,
    },
  },
  trailingSlash: false,
  assetPrefix: isProduction ? assetPrefix : undefined,
  transpilePackages: ['next-mdx-remote'],
  env: {
    APP_BUILD_ID: buildId,
    NEXT_PUBLIC_BASE_PATH: host,
    NEXT_PUBLIC_ASSET_PREFIX: assetPrefix,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
