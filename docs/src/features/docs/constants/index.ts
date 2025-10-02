import type { Frontmatter } from '../types';

export const componentOverviewFrontmatter: Frontmatter = {
  title: 'Overview',
  description:
    '컴포넌트는 사용자 인터페이스를 구성하는 재사용 가능한 독립적인 UI 단위입니다. 특정 기능과 시각적 스타일을 가진 요소들로, 일관된 사용자 경험을 제공하기 위해 표준화된 규칙에 따라 설계되었습니다.\n각 컴포넌트는 다양한 상황에서 반복적으로 활용될 수 있으며, 디자인과 개발 효율성을 높이는 동시에 제품 전반의 일관성을 유지합니다.',
  slug: ['components', 'overview'],
  originSlug: ['components', 'overview', 'index'],
};

export const foundationsOverviewFrontmatter: Frontmatter = {
  title: 'Overview',
  description: 'Foundations Overview',
  slug: ['foundations', 'overview'],
  originSlug: ['foundations', 'overview', 'index'],
};

export const getStartedFrontmatter: Frontmatter = {
  title: 'Get started',
  description: 'Welcome to montage',
  slug: ['get-started'],
  originSlug: ['get-started', 'index'],
};

export const shouldNotSerializeMDXFrontmatters = [
  componentOverviewFrontmatter,
  foundationsOverviewFrontmatter,
  getStartedFrontmatter,
];
