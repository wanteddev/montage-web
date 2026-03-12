export default [
  {
    name: '@montage-ui/core',
    path: 'packages/core/dist/index.mjs',
    limit: '5 KB',
    gzip: true,
  },
  {
    name: '@montage-ui/icon',
    path: 'packages/icon/dist/index.mjs',
    limit: '10 KB',
    gzip: true,
  },
  {
    name: '@montage-ui/lottie',
    path: 'packages/lottie/dist/index.mjs',
    limit: '100 KB',
    gzip: true,
  },
  {
    name: '@montage-ui/theme',
    path: 'packages/theme/dist/index.mjs',
    limit: '1 KB',
    gzip: true,
  },
  {
    name: '@montage-ui/engine',
    path: 'packages/engine/dist/index.mjs',
    limit: '1 KB',
    gzip: true,
  },
  {
    name: '@montage-ui/nextjs',
    path: 'packages/nextjs/dist/index.mjs',
    limit: '1 KB',
    gzip: true,
  },
];
