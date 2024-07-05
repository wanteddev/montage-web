type Route = {
  label: string;
  pages: Array<{
    title: string;
    slug: string;
    deprecated?: boolean;
    stable?: boolean;
  }>;
};

export const routes: Array<Route> = [
  {
    label: 'Overview',
    pages: [
      { title: 'Getting Started', slug: '/docs/overview/getting-started' },
      { title: 'Sx Prop', slug: '/docs/overview/sx-prop' },
    ],
  },
  {
    label: 'Themes',
    pages: [
      { title: 'Breakpoint', slug: '/docs/themes/breakpoint' },
      { title: 'Icon', slug: '/docs/themes/icon' },
      { title: 'Palette', slug: '/docs/themes/palette' },
      { title: 'ThemeProvider', slug: '/docs/themes/theme-provider' },
      { title: 'Typography', slug: '/docs/themes/typography' },
    ],
  },
  {
    label: 'Components',
    pages: [
      {
        title: 'ActionArea',
        slug: '/docs/components/action-area',
        stable: true,
      },
      { title: 'Alert', slug: '/docs/components/alert' },
      { title: 'Avatar', slug: '/docs/components/avatar' },
      {
        title: 'AvatarButton',
        slug: '/docs/components/avatar-button',
      },
      {
        title: 'AvatarGroup',
        slug: '/docs/components/avatar-group',
      },
      {
        title: 'BottomNavigation',
        slug: '/docs/components/bottom-navigation',
        stable: true,
      },
      { title: 'Box', slug: '/docs/components/box', stable: true },
      { title: 'Button', slug: '/docs/components/button', stable: true },
      { title: 'Checkbox', slug: '/docs/components/checkbox' },
      { title: 'ChipAction', slug: '/docs/components/chip-action' },
      {
        title: 'ChipMultiSelect',
        slug: '/docs/components/chip-multi-select',
      },
      {
        title: 'CompactTooltip',
        slug: '/docs/components/compact-tooltip',
        stable: true,
      },
      {
        title: 'ContentBadge',
        slug: '/docs/components/content-badge',
      },
      {
        title: 'DismissableLayer',
        slug: '/docs/components/dismissable-layer',
        stable: true,
      },
      { title: 'Divider', slug: '/docs/components/divider' },
      { title: 'FlexBox', slug: '/docs/components/flex-box', stable: true },
      {
        title: 'FloatingAction',
        slug: '/docs/components/floating-action',
      },
      {
        title: 'FocusScope',
        slug: '/docs/components/focus-scope',
        stable: true,
      },
      { title: 'Form', slug: '/docs/components/form' },
      { title: 'Form v3', slug: '/docs/components/form-v3' },
      { title: 'Grid', slug: '/docs/components/grid', stable: true },
      {
        title: 'IconButton',
        slug: '/docs/components/icon-button',
        stable: true,
      },
      {
        title: 'ImageLoader',
        slug: '/docs/components/image-loader',
        stable: true,
      },
      { title: 'Label', slug: '/docs/components/label' },
      { title: 'Modal', slug: '/docs/components/modal', stable: true },
      {
        title: 'NestedCheckbox',
        slug: '/docs/components/nested-checkbox',
      },
      { title: 'NoSsr', slug: '/docs/components/no-ssr', stable: true },
      { title: 'Popover', slug: '/docs/components/popover' },
      { title: 'Portal', slug: '/docs/components/portal', stable: true },
      {
        title: 'ProgressIndicator',
        slug: '/docs/components/progress-indicator',
      },
      {
        title: 'ProgressStepIndicator',
        slug: '/docs/components/progress-step-indicator',
      },
      {
        title: 'ProgressTracker',
        slug: '/docs/components/progress-tracker',
      },
      { title: 'PushBadge', slug: '/docs/components/push-badge' },
      { title: 'RadioGroup', slug: '/docs/components/radio-group' },
      {
        title: 'RegionConfig',
        slug: '/docs/components/region-config',
      },
      {
        title: 'RemoveScroll',
        slug: '/docs/components/remove-scroll',
        stable: true,
      },
      {
        title: 'RoundCheckbox',
        slug: '/docs/components/round-checkbox',
      },
      {
        title: 'ScrollArea',
        slug: '/docs/components/scroll-area',
        stable: true,
      },
      { title: 'Select', slug: '/docs/components/select' },
      { title: 'Skeleton', slug: '/docs/components/skeleton' },
      { title: 'Switch', slug: '/docs/components/switch' },
      { title: 'Tab', slug: '/docs/components/tab', stable: true },
      { title: 'TextArea', slug: '/docs/components/text-area' },
      {
        title: 'TextButton',
        slug: '/docs/components/text-button',
        stable: true,
      },
      { title: 'TextField', slug: '/docs/components/text-field' },
      { title: 'Thumbnail', slug: '/docs/components/thumbnail' },
      { title: 'ToggleIcon', slug: '/docs/components/toggle-icon' },
      { title: 'Tooltip', slug: '/docs/components/tooltip', stable: true },
      {
        title: 'WithInteraction',
        slug: '/docs/components/with-interaction',
      },
    ],
  },
  {
    label: 'Hooks',
    pages: [
      { title: 'useDialog', slug: '/docs/hooks/use-dialog', stable: true },
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
  {
    label: 'Lottie',
    pages: [{ title: 'Loading', slug: '/docs/lottie/loading' }],
  },
];

export const allRoutes = routes.reduce(
  (acc, cur) => {
    return [...acc, ...cur.pages];
  },
  [] as Route['pages'],
);
