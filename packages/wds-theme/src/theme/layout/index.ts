import spacing from '../spacing';

const lg = {
  spacingX: {
    globalGutter: spacing[20],
    gap: {
      foregroundGapSm: spacing[6],
      foregroundGapMd: spacing[8],
      foregroundGapLg: spacing[12],
      foregroundGapXl: spacing[16],
      cardGap: spacing[20],
      iconButtonGap: spacing[16],
    },
  },
  spacingY: {
    marginTop: {
      contentMarginTop: spacing[40],
      sectionHeaderMarginBottom: spacing[20],
    },
    marginBottom: {
      screenMarginBottom: spacing[160],
    },
    gap: {
      componentGap: spacing[12],
      contentGap: spacing[60],
      textGap: spacing[6],
      cardGap: spacing[40],
    },
  },
  component: {
    gnbHeight: {
      normal: spacing[56],
    },
  },
} as const;

const xs = {
  spacingX: {
    globalGutter: spacing[20],
    gap: {
      foregroundGapSm: spacing[6],
      foregroundGapMd: spacing[8],
      foregroundGapLg: spacing[12],
      foregroundGapXl: spacing[16],
      cardGap: spacing[20],
      iconButtonGap: spacing[16],
    },
  },
  spacingY: {
    marginTop: {
      contentMarginTop: spacing[40],
      sectionHeaderMarginBottom: spacing[20],
    },
    marginBottom: {
      screenMarginBottom: spacing[48],
    },
    gap: {
      componentGap: spacing[12],
      contentGap: spacing[48],
      textGap: spacing[6],
      cardGap: spacing[32],
    },
  },
  component: {
    gnbHeight: {
      normal: spacing[56],
    },
  },
} as const;

const layout = {
  xs,
  lg,
} as const;

export default layout;
