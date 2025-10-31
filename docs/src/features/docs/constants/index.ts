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
    isPrivate: true,
  },
  {
    title: 'iOS',
    slug: ['getting-started', 'platform', 'ios'],
    isPrivate: true,
  },
  {
    title: 'Android',
    slug: ['getting-started', 'platform', 'android'],
    isPrivate: true,
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
    title: 'Overview',
    slug: ['components'],
  },
  {
    title: 'Overview',
    slug: ['utilities'],
  },
];
