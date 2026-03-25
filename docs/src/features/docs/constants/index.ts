export const PLATFORM_PATTERN = /(web|ios|android|design)$/i;
export const PLATFORM_TYPES = ['web', 'ios', 'android', 'design'] as const;
export const PLATFORM_PATTERN_WITHOUT_DESIGN = /(web|ios|android)$/i;

export const DOCS_PAGES = [
  {
    title: 'Designer',
    slug: ['getting-started'],
  },
  {
    title: 'Terms of use',
    slug: ['getting-started', 'terms-of-use'],
  },
  {
    title: 'Web',
    slug: ['getting-started', 'platform', 'web'],
    url: 'https://github.com/wanteddev/montage-web/blob/main/packages/wds/README.md',
    isExternal: true,
  },
  {
    title: 'iOS',
    slug: ['getting-started', 'platform', 'ios'],
    url: 'https://github.com/wanteddev/montage-ios/blob/main/GETTINGSTARTED.md',
    isExternal: true,
  },
  {
    title: 'Android',
    slug: ['getting-started', 'platform', 'android'],
    url: 'https://github.com/wanteddev/montage-android/blob/main/GETTING_STARTED.en.md',
    isExternal: true,
  },
  {
    title: 'Overview',
    slug: ['foundations'],
  },
  {
    title: 'Colors',
    slug: ['foundations', 'base-material', 'colors', 'semantic'],
  },
  {
    title: 'Grid',
    slug: ['foundations', 'base-material', 'grid'],
  },
  {
    title: 'Elevation',
    slug: ['foundations', 'base-material', 'elevation', 'normal'],
  },
  {
    title: 'Typography',
    slug: ['foundations', 'base-material', 'typography'],
  },
  {
    title: 'Icons',
    slug: ['foundations', 'base-material', 'icons'],
  },
  {
    title: 'Overview',
    slug: ['components'],
  },
  {
    title: 'Overview',
    slug: ['utilities'],
  },
  {
    title: 'Overview',
    slug: ['release-note'],
  },
];
