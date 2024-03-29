type Route = {
  label: string;
  pages: Array<{
    title: string;
    slug: string;
    deprecated?: boolean;
  }>;
};

export const routes: Array<Route> = [
  {
    label: 'Overview',
    pages: [{ title: '시작하기', slug: '/docs/overview/getting-started' }],
  },
  {
    label: 'Themes',
    pages: [
      { title: 'Breakpoint', slug: '/docs/themes/breakpoint' },
      { title: 'Icon', slug: '/docs/themes/icon' },
    ],
  },
  {
    label: 'Components',
    pages: [
      { title: 'Alert', slug: '/docs/components/alert' },
      { title: 'Avatar', slug: '/docs/components/avatar' },
      { title: 'Button', slug: '/docs/components/button' },
      { title: 'FloatingAction', slug: '/docs/components/floating-action' },
      { title: 'IconButton', slug: '/docs/components/icon-button' },
      { title: 'ImageLoader', slug: '/docs/components/image-loader' },
      { title: 'Modal', slug: '/docs/components/modal' },
      { title: 'TextButton', slug: '/docs/components/text-button' },
    ],
  },
  {
    label: 'Utility',
    pages: [
      { title: 'Container', slug: '/docs/utility/container' },
      { title: 'Gradient', slug: '/docs/utility/gradient' },
      { title: 'Media', slug: '/docs/utility/media' },
      { title: 'Opacity', slug: '/docs/utility/opacity' },
      { title: 'Typography', slug: '/docs/utility/typography' },
    ],
  },
];

export const allRoutes = routes.reduce(
  (acc, cur) => {
    return [...acc, ...cur.pages];
  },
  [] as Route['pages'],
);
