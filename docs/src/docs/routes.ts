type Route = {
  label: string;
  pages: Array<{
    title: string;
    slug: string;
    deprecated?: boolean;
    stable?: boolean;
    alpha?: boolean;
  }>;
};

export const routes: Array<Route> = [
  {
    label: 'Overview',
    pages: [
      { title: 'Getting Started', slug: '/docs/overview/getting-started' },
      { title: 'Sx Prop', slug: '/docs/overview/sx-prop' },
      { title: 'Changelog', slug: '/docs/overview/changelog' },
    ],
  },
  {
    label: 'Themes',
    pages: [
      { title: 'Breakpoint', slug: '/docs/themes/breakpoint' },
      { title: 'ForceTheme', slug: '/docs/themes/force-theme' },
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
        title: 'Accordion',
        slug: '/docs/components/accordion',
      },
      {
        title: 'ActionArea',
        slug: '/docs/components/action-area',
      },
      { title: 'Autocomplete', slug: '/docs/components/autocomplete' },
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
      },
      { title: 'Box', slug: '/docs/components/box' },
      { title: 'Button', slug: '/docs/components/button' },
      {
        title: 'Card',
        slug: '/docs/components/card',
      },
      {
        title: 'CardList',
        slug: '/docs/components/card-list',
      },
      { title: 'Checkbox', slug: '/docs/components/checkbox' },
      { title: 'ChipAction', slug: '/docs/components/chip-action' },
      { title: 'ChipFilter', slug: '/docs/components/chip-filter' },
      {
        title: 'ChipMultiSelect',
        slug: '/docs/components/chip-multi-select',
        deprecated: true,
      },
      {
        title: 'CompactTooltip',
        slug: '/docs/components/compact-tooltip',
      },
      {
        title: 'ContentBadge',
        slug: '/docs/components/content-badge',
      },
      {
        title: 'DatePicker',
        slug: '/docs/components/date-picker',
      },
      {
        title: 'DismissableLayer',
        slug: '/docs/components/dismissable-layer',
      },
      { title: 'Divider', slug: '/docs/components/divider' },
      { title: 'EmptyState', slug: '/docs/components/empty-state' },
      { title: 'FlexBox', slug: '/docs/components/flex-box' },
      {
        title: 'FloatingAction',
        slug: '/docs/components/floating-action',
        alpha: true,
      },
      {
        title: 'FocusScope',
        slug: '/docs/components/focus-scope',
      },
      { title: 'Form', slug: '/docs/components/form' },
      { title: 'Grid', slug: '/docs/components/grid' },
      {
        title: 'IconButton',
        slug: '/docs/components/icon-button',
      },
      {
        title: 'ImageLoader',
        slug: '/docs/components/image-loader',
        alpha: true,
      },
      { title: 'Label', slug: '/docs/components/label' },
      { title: 'List', slug: '/docs/components/list' },
      { title: 'Loading', slug: '/docs/components/loading' },
      { title: 'Menu', slug: '/docs/components/menu' },
      { title: 'Modal', slug: '/docs/components/modal' },
      {
        title: 'NestedCheckbox',
        slug: '/docs/components/nested-checkbox',
      },
      { title: 'NoSsr', slug: '/docs/components/no-ssr' },
      {
        title: 'Pagination',
        slug: '/docs/components/pagination',
      },
      {
        title: 'PaginationCounter',
        slug: '/docs/components/pagination-counter',
      },
      { title: 'PaginationDot', slug: '/docs/components/pagination-dot' },
      { title: 'Popover', slug: '/docs/components/popover' },
      { title: 'Portal', slug: '/docs/components/portal' },
      {
        title: 'ProgressIndicator',
        slug: '/docs/components/progress-indicator',
      },
      {
        title: 'ProgressStepIndicator',
        slug: '/docs/components/progress-step-indicator',
        deprecated: true,
      },
      {
        title: 'ProgressTracker',
        slug: '/docs/components/progress-tracker',
      },
      {
        title: 'ProgressTrackerDesktop',
        slug: '/docs/components/progress-tracker-desktop',
      },
      { title: 'PushBadge', slug: '/docs/components/push-badge' },
      {
        title: 'RadioGroup',
        slug: '/docs/components/radio-group',
      },
      {
        title: 'RegionConfig',
        slug: '/docs/components/region-config',
      },
      {
        title: 'RemoveScroll',
        slug: '/docs/components/remove-scroll',
      },
      {
        title: 'RoundCheckbox',
        slug: '/docs/components/round-checkbox',
        deprecated: true,
      },
      {
        title: 'ScrollArea',
        slug: '/docs/components/scroll-area',
      },
      { title: 'Select', slug: '/docs/components/select' },
      { title: 'SelectMultiple', slug: '/docs/components/select-multiple' },
      {
        title: 'SectionMessage',
        slug: '/docs/components/section-message',
      },
      {
        title: 'SegmentedControl',
        slug: '/docs/components/segmented-control',
      },
      { title: 'Skeleton', slug: '/docs/components/skeleton' },
      { title: 'Slider', slug: '/docs/components/slider' },
      { title: 'Switch', slug: '/docs/components/switch' },
      { title: 'Tab', slug: '/docs/components/tab' },
      { title: 'TextArea', slug: '/docs/components/text-area' },
      {
        title: 'TextButton',
        slug: '/docs/components/text-button',
      },
      { title: 'TextInput', slug: '/docs/components/text-input' },
      { title: 'Thumbnail', slug: '/docs/components/thumbnail', alpha: true },
      {
        title: 'ToggleIcon',
        slug: '/docs/components/toggle-icon',
        alpha: true,
      },
      { title: 'Tooltip', slug: '/docs/components/tooltip' },
      {
        title: 'TopNavigation',
        slug: '/docs/components/top-navigation',
      },
      {
        title: 'WithInteraction',
        slug: '/docs/components/with-interaction',
      },
    ],
  },
  {
    label: 'Hooks',
    pages: [
      { title: 'useDialog', slug: '/docs/hooks/use-dialog' },
      { title: 'useMediaQuery', slug: '/docs/hooks/use-media-query' },
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
    pages: [
      { title: 'Loading', slug: '/docs/lottie/loading', deprecated: true },
    ],
  },
];

export const allRoutes = routes.reduce(
  (acc, cur) => {
    return [...acc, ...cur.pages];
  },
  [] as Route['pages'],
);
