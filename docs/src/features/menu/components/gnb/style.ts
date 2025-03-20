import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const gnbWrapperStyle = (theme: Theme) => css`
  position: sticky;
  z-index: ${theme.zIndex.modal};
  top: 0;
  padding: 12px 0px;
  ${theme.semantic.platform.ios.navigation}
  border-bottom: 1px solid ${theme.semantic.line.normal.neutral};
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &[data-is-docs-page='true'] {
    border-color: transparent;
  }

  &[data-is-sticky='true'][data-is-docs-page='true'] {
    background-color: ${theme.semantic.background.normal.normal};
  }
`;

export const gnbItemWrapperStyle = (theme: Theme) => css`
  &:has([data-role='gnb-link']:hover) {
    [data-role='gnb-link']:not(:hover) {
      color: ${theme.semantic.label.assistive};
      ${typographyStyle('label1', 'regular')}
    }

    [data-role='gnb-link']:hover {
      color: ${theme.semantic.label.normal};
      ${typographyStyle('label1', 'bold')}
    }
  }

  [data-role='gnb-link'] {
    transition:
      color 0.2s ease,
      font 0.2s ease;
  }
`;

export const gnbActionsStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.fill.normal};
  border-radius: 14px;
  padding: 8px;
  position: relative;
  font-size: 22px;
  color: ${theme.semantic.label.normal};

  &[aria-expanded='true'] {
    & > [wds-component='with-interaction'] {
      opacity: ${theme.opacity[8]};
    }
  }
`;
