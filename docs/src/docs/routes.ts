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
      { title: 'DismissableLayer', slug: '/docs/components/dismissable-layer' },
      { title: 'Divider', slug: '/docs/components/divider' },
      { title: 'FlexBox', slug: '/docs/components/flex-box' },
      { title: 'FloatingAction', slug: '/docs/components/floating-action' },
      { title: 'FocusScope', slug: '/docs/components/focus-scope' },
      { title: 'Form', slug: '/docs/components/form' },
      { title: 'Grid', slug: '/docs/components/grid' },
      { title: 'IconButton', slug: '/docs/components/icon-button' },
      { title: 'ImageLoader', slug: '/docs/components/image-loader' },
      { title: 'Label', slug: '/docs/components/label' },
      { title: 'Modal', slug: '/docs/components/modal' },
      { title: 'NestedCheckbox', slug: '/docs/components/nested-checkbox' },
      { title: 'NoSsr', slug: '/docs/components/no-ssr' },
      { title: 'Popover', slug: '/docs/components/popover' },
      { title: 'Portal', slug: '/docs/components/portal' },
      {
        title: 'ProgressIndicator',
        slug: '/docs/components/progress-indicator',
      },
      {
        title: 'ProgressStepIndicator',
        slug: '/docs/components/progress-step-indicator',
      },
      { title: 'ProgressTracker', slug: '/docs/components/progress-tracker' },
      { title: 'PushBadge', slug: '/docs/components/push-badge' },
      { title: 'RadioGroup', slug: '/docs/components/radio-group' },
      { title: 'RegionConfig', slug: '/docs/components/region-config' },
      { title: 'RemoveScroll', slug: '/docs/components/remove-scroll' },
      { title: 'RoundCheckbox', slug: '/docs/components/round-checkbox' },
      { title: 'ScrollArea', slug: '/docs/components/scroll-area' },
      { title: 'Tab', slug: '/docs/components/tab' },
      { title: 'TextButton', slug: '/docs/components/text-button' },
      { title: 'ToggleIcon', slug: '/docs/components/toggle-icon' },
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
      { title: 'List', slug: '/docs/utility/list' },
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
