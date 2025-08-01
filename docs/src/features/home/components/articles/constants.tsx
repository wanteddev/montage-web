import { IconLogoBrunch } from '@wanteddev/wds-icon';

import type { ReactNode } from 'react';

type ArticleItem = {
  title: string;
  description: string;
  href: string;
  source: string;
  icon: ReactNode;
};

export const ARTICLE_ITEMS: Array<ArticleItem> = [
  {
    title: 'Design System 제작기',
    description: '원티드의 디자인 시스템, 몽타주\n어떻게 만들어지고 있을까요?',
    href: '#',
    source: '/Home/Article.mp4',
    icon: (
      <IconLogoBrunch
        sx={(theme) => ({
          color: theme.semantic.static.white,
          opacity: theme.opacity[52],
        })}
      />
    ),
  },
  {
    title: '원티드의 목소리, Wanted Sans',
    description:
      '원티드의 정체성을 전달하는\nWanted Sans는 어떻게 만들어졌을까요?',
    href: '#',
    source: '/Home/Article-1.mp4',
    icon: (
      <IconLogoBrunch
        sx={(theme) => ({
          color: theme.semantic.static.white,
          opacity: theme.opacity[52],
        })}
      />
    ),
  },
  {
    title: '디자이너를 위한 디자이너',
    description:
      '원티드의 디자이너들을 위한 디자이너들은\n어떤 문제를 해결하고 있을까요?',
    href: '#',
    source: '/Home/Article-2.mp4',
    icon: (
      <IconLogoBrunch
        sx={(theme) => ({
          color: theme.semantic.static.white,
          opacity: theme.opacity[52],
        })}
      />
    ),
  },
];
