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
    pages: [
      { title: '시작하기', slug: '/docs/overview/getting-started' },
      { title: '트리 쉐이킹', slug: '/docs/overview/tree-shacking' },
    ],
  },
  {
    label: 'Themes',
    pages: [
      { title: 'Breakpoint', slug: '/docs/themes/breakpoint' },
      { title: 'Icon', slug: '/docs/themes/icon' },
      { title: 'ThemeProvider', slug: '/docs/themes/theme-provider' },
      { title: 'Typography', slug: '/docs/themes/typography' },
    ],
  },
  {
    label: 'Components',
    pages: [
      { title: 'Alert', slug: '/docs/components/alert' },
      { title: 'Avatar', slug: '/docs/components/avatar' },
      { title: 'AvatarButton', slug: '/docs/components/avatar-button' },
      { title: 'AvatarGroup', slug: '/docs/components/avatar-group' },
      { title: 'Button', slug: '/docs/components/button' },
      { title: 'Checkbox', slug: '/docs/components/checkbox' },
      { title: 'ChipAction', slug: '/docs/components/chip-action' },
      { title: 'ContentBadge', slug: '/docs/components/content-badge' },
      { title: 'Divider', slug: '/docs/components/divider' },
      { title: 'FlexBox', slug: '/docs/components/flex-box' },
      { title: 'FloatingAction', slug: '/docs/components/floating-action' },
      { title: 'Grid', slug: '/docs/components/grid' },
      { title: 'IconButton', slug: '/docs/components/icon-button' },
      { title: 'ImageLoader', slug: '/docs/components/image-loader' },
      { title: 'Modal', slug: '/docs/components/modal' },
      { title: 'NestedCheckbox', slug: '/docs/components/nested-checkbox' },
      { title: 'RoundedCheckbox', slug: '/docs/components/rounded-checkbox' },
      { title: 'Tab', slug: '/docs/components/tab' },
      { title: 'TextButton', slug: '/docs/components/text-button' },
    ],
  },
  {
    label: 'Hooks',
    pages: [
      { title: 'useDialog', slug: '/docs/hooks/use-dialog' },
      { title: 'useFocusGuard', slug: '/docs/hooks/use-focus-guard' },
      { title: 'useMedia', slug: '/docs/hooks/use-media' },
      { title: 'useSize', slug: '/docs/hooks/use-size' },
      { title: 'useSnackbar', slug: '/docs/hooks/use-snackbar' },
      { title: 'useThemeControl', slug: '/docs/hooks/use-theme-control' },
      { title: 'useToast', slug: '/docs/hooks/use-toast' },
    ],
  },
  {
    label: 'Utility',
    pages: [
      { title: 'Container', slug: '/docs/utility/container' },
      { title: 'Gradient', slug: '/docs/utility/gradient' },
      { title: 'Media', slug: '/docs/utility/media' },
      { title: 'Navigation', slug: '/docs/utility/navigation' },
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
