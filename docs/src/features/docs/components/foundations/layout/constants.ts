type LayoutToken = {
  token: string;
  lg: string;
  xs: string;
};

type LayoutSubgroup = {
  title: string;
  tokens: Array<LayoutToken>;
};

type LayoutGroup = {
  title: string;
  description: string;
  subgroups: Array<LayoutSubgroup>;
};

export const LAYOUT_GROUPS: Array<LayoutGroup> = [
  {
    title: 'SpacingX',
    description:
      '가로축 거터와 컴포넌트 간 가로 간격을 정의합니다. 화면 좌우 거터와 카드·아이콘 버튼 사이 간격이 여기에 포함됩니다.',
    subgroups: [
      {
        title: 'Global',
        tokens: [
          {
            token: 'layout.spacingX.globalGutter',
            lg: '20px',
            xs: '20px',
          },
        ],
      },
      {
        title: 'Gap',
        tokens: [
          {
            token: 'layout.spacingX.gap.foregroundGapSm',
            lg: '6px',
            xs: '6px',
          },
          {
            token: 'layout.spacingX.gap.foregroundGapMd',
            lg: '8px',
            xs: '8px',
          },
          {
            token: 'layout.spacingX.gap.foregroundGapLg',
            lg: '12px',
            xs: '12px',
          },
          {
            token: 'layout.spacingX.gap.foregroundGapXl',
            lg: '16px',
            xs: '16px',
          },
          {
            token: 'layout.spacingX.gap.cardGap',
            lg: '20px',
            xs: '16px',
          },
          {
            token: 'layout.spacingX.gap.iconButtonGap',
            lg: '16px',
            xs: '16px',
          },
        ],
      },
    ],
  },
  {
    title: 'SpacingY',
    description:
      '세로축 마진과 섹션·컴포넌트 간 세로 간격을 정의합니다. xs와 lg 두 사이즈에서 값이 크게 달라지는 토큰이 많으니 참고해서 사용하세요.',
    subgroups: [
      {
        title: 'Margin Top',
        tokens: [
          {
            token: 'layout.spacingY.marginTop.contentMarginTop',
            lg: '40px',
            xs: '20px',
          },
          {
            token: 'layout.spacingY.marginTop.sectionHeaderMarginBottom',
            lg: '20px',
            xs: '16px',
          },
        ],
      },
      {
        title: 'Margin Bottom',
        tokens: [
          {
            token: 'layout.spacingY.marginBottom.screenMarginBottom',
            lg: '160px',
            xs: '48px',
          },
        ],
      },
      {
        title: 'Gap',
        tokens: [
          {
            token: 'layout.spacingY.gap.componentGap',
            lg: '12px',
            xs: '12px',
          },
          {
            token: 'layout.spacingY.gap.contentGap',
            lg: '60px',
            xs: '48px',
          },
          {
            token: 'layout.spacingY.gap.textGap',
            lg: '6px',
            xs: '6px',
          },
          {
            token: 'layout.spacingY.gap.cardGap',
            lg: '40px',
            xs: '32px',
          },
        ],
      },
    ],
  },
  {
    title: 'Component',
    description:
      '레이아웃 단위로 사용되는 컴포넌트 사이즈를 정의합니다. 현재는 GNB 높이만 포함되어 있습니다.',
    subgroups: [
      {
        title: 'GNB Height',
        tokens: [
          {
            token: 'layout.component.gnbHeight.normal',
            lg: '56px',
            xs: '56px',
          },
        ],
      },
    ],
  },
];
