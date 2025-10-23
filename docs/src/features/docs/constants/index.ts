import type { Frontmatter } from '../types';

export const utilitiesOverviewFrontmatter: Frontmatter = {
  title: 'Utilities',
  description: 'Utilities Overview',
  slug: ['utilities'],
  originSlug: ['utilities', 'index'],
};

export const componentOverviewFrontmatter: Frontmatter = {
  title: 'Components',
  description:
    '컴포넌트는 사용자 인터페이스를 구성하는 재사용 가능한 독립적인 UI 단위입니다. 특정 기능과 시각적 스타일을 가진 요소들로, 일관된 사용자 경험을 제공하기 위해 표준화된 규칙에 따라 설계되었습니다.\n각 컴포넌트는 다양한 상황에서 반복적으로 활용될 수 있으며, 디자인과 개발 효율성을 높이는 동시에 제품 전반의 일관성을 유지합니다.',
  slug: ['components'],
  originSlug: ['components', 'index'],
};

export const foundationsOverviewFrontmatter: Frontmatter = {
  title: 'Foundations',
  description:
    '파운데이션은 모든 디자인 요소의 기반이 되는 가장 원자적인 단위들입니다. 컬러, 타이포그래피, 스페이싱, 그리드 등 시각적 언어의 최소 단위들로 구성됩니다.',
  slug: ['foundations'],
  originSlug: ['foundations', 'index'],
};

export const foundationsTypographyFrontmatter: Frontmatter = {
  title: 'Typography',
  description:
    '타이포그래피는 텍스트를 읽기 쉽고 아름답게 표현하는 시각적 체계로 폰트 선택, 크기, 굵기, 행간, 자간 등의 요소들을 조합하여 정보의 위계와 가독성을 만들어냅니다. 원티드랩에서는 일관된 타이포그래피 규칙을 통해 브랜드의 목소리를 전달하고 사용자 경험을 향상시킵니다.',
  slug: ['foundations', 'base-material', 'typography'],
  originSlug: ['foundations', 'base-material', 'typography'],
  image: '/adsfasdf.png',
};

export const foundationsGridFrontmatter: Frontmatter = {
  title: 'Grid',
  description:
    '원티드의 그리드 시스템은 8px 기반의 일관된 간격 체계를 사용하여 모든 화면에서 조화로운 비율과 정렬을 만들어냅니다. 반응형 그리드는 다양한 디바이스 환경에서 콘텐츠가 자연스럽게 재배치되도록 지원함으로써 가독성과 시각적 안정감을 보장합니다.',
  slug: ['foundations', 'base-material', 'grid'],
  originSlug: ['foundations', 'base-material', 'grid'],
  image: '/adsfasdf.png',
};

export const foundationsElevationFrontmatter: Frontmatter = {
  title: 'Elevation',
  description:
    'Elevation은 Z축을 기준으로 두 표면 사이의 거리를 나타내는 시각적 체계로, 그림자와 빛 등의 요소들을 조합하여 UI 컴포넌트 간의 명확한 깊이감과 시각적 계층을 만들어냅니다. 원티드랩에서는 일관된\nElevation 규칙을 통해 사용자에게 직관적인 UI 구조를 전달하고 정교한 사용자 경험을 제공합니다.',
  slug: ['foundations', 'base-material', 'elevation'],
  originSlug: ['foundations', 'base-material', 'elevation'],
  image: '/adsfasdf.png',
};

export const getStartedFrontmatter: Frontmatter = {
  title: 'Get started',
  description: 'Welcome to montage',
  slug: ['get-started'],
  originSlug: ['get-started', 'index'],
};

export const shouldNotSerializeMDXFrontmatters = [
  utilitiesOverviewFrontmatter,
  componentOverviewFrontmatter,
  foundationsOverviewFrontmatter,
  foundationsTypographyFrontmatter,
  foundationsGridFrontmatter,
  foundationsElevationFrontmatter,
  getStartedFrontmatter,
];
