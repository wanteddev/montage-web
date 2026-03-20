/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-check
const { exec } = require('shelljs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const previewHash = process.env.PREVIEW_HASH;
const versionPath = process.env.VERSION_PATH; // e.g., "3.4.x"

const isProduction = process.env.NODE_ENV === 'production';
const isDev = process.env.NEXT_PUBLIC_SERVER_TYPE?.toLowerCase() === 'dev';
const isPreview = Boolean(previewHash);
const isVersioned = Boolean(versionPath);

const commitHash = exec('git rev-parse --short HEAD').stdout.trim();
const host = isDev
  ? 'https://dev-montage.wanted.co.kr'
  : 'https://montage.wanted.co.kr';

const buildId = previewHash ?? commitHash;

const paths = isPreview
  ? {
      basePath: isDev ? `/${buildId}` : undefined,
      assetPrefix: `${host}/${buildId}`,
      publicBasePath: host,
    }
  : isVersioned
    ? {
        basePath: `/${versionPath}`,
        assetPrefix: `${host}/${versionPath}`,
        publicBasePath: `${host}/${versionPath}`,
      }
    : { basePath: undefined, assetPrefix: host, publicBasePath: host };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  basePath: paths.basePath,
  generateBuildId: () => {
    return buildId;
  },
  reactCompiler: true,
  experimental: {
    scrollRestoration: true,
  },
  trailingSlash: false,
  assetPrefix: isProduction ? paths.assetPrefix : undefined,
  transpilePackages: ['next-mdx-remote'],
  env: {
    APP_BUILD_ID: buildId,
    NEXT_PUBLIC_BASE_PATH: paths.publicBasePath,
    NEXT_PUBLIC_ASSET_PREFIX: paths.assetPrefix,
    NEXT_PUBLIC_SERVER_TYPE: process.env.NEXT_PUBLIC_SERVER_TYPE ?? 'dev',
    NEXT_PUBLIC_IS_CUSTOM_VERSION: isVersioned || isPreview ? 'true' : 'false',
  },
  images: {
    unoptimized: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
