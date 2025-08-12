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
      {
        title: 'Card',
        slug: '/docs/components/card',
      },
      {
        title: 'CardList',
        slug: '/docs/components/card-list',
      },
      { title: 'Category', slug: '/docs/components/category' },
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
      { title: 'Alert', slug: '/docs/components/alert' },
      {
        title: 'DismissableLayer',
        slug: '/docs/components/dismissable-layer',
      },
      { title: 'Divider', slug: '/docs/components/divider' },
      { title: 'FallbackView', slug: '/docs/components/fallback-view' },
      { title: 'Grid', slug: '/docs/components/grid' },
      { title: 'List', slug: '/docs/components/list' },
      { title: 'Loading', slug: '/docs/components/loading' },
      { title: 'Menu', slug: '/docs/components/menu' },
      { title: 'Modal', slug: '/docs/components/modal' },
      { title: 'NoSsr', slug: '/docs/components/no-ssr' },
      { title: 'PageCounter', slug: '/docs/components/page-counter' },
      {
        title: 'PaginationDots',
        slug: '/docs/components/pagination-dots',
      },
      {
        title: 'Pagination',
        slug: '/docs/components/pagination',
      },
      { title: 'PlayBadge', slug: '/docs/components/play-badge' },
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
        title: 'Stepper',
        slug: '/docs/components/stepper',
      },
      { title: 'PushBadge', slug: '/docs/components/push-badge' },
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
        title: 'SectionHeader',
        slug: '/docs/components/section-header',
      },
      {
        title: 'SectionMessage',
        slug: '/docs/components/section-message',
      },
      { title: 'Skeleton', slug: '/docs/components/skeleton' },
      { title: 'Snackbar', slug: '/docs/components/snackbar' },
      { title: 'Tab', slug: '/docs/components/tab' },
      { title: 'Table', slug: '/docs/components/table' },
      { title: 'Thumbnail', slug: '/docs/components/thumbnail' },
      { title: 'Toast', slug: '/docs/components/toast' },
      {
        title: 'ToggleIcon',
        slug: '/docs/components/toggle-icon',
      },
      { title: 'Tooltip', slug: '/docs/components/tooltip' },
      {
        title: 'TopNavigation',
        slug: '/docs/components/top-navigation',
      },
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
