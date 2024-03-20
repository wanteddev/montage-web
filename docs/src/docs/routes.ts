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
    pages: [{ title: 'Icon', slug: '/docs/themes/icon' }],
  },
  {
    label: 'Components',
    pages: [
      { title: 'Alert', slug: '/docs/components/alert' },
      { title: 'Avatar', slug: '/docs/components/avatar' },
    ],
  },
];

export const allRoutes = routes.reduce(
  (acc, cur) => {
    return [...acc, ...cur.pages];
  },
  [] as Route['pages'],
);
