import { addOpacity, css, respondTo, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const gnbWrapperStyle = (theme: Theme) => css`
  position: sticky;
  z-index: ${theme.zIndex.modal};
  top: 0;
  padding: 12px 0px;
  backdrop-filter: blur(32px);
  background-color: ${addOpacity(
    theme.semantic.background.normal.normal,
    theme.opacity[88],
  )};
  transition: background-color 0.2s ease;

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

export const gnbLinkStyle = (theme: Theme) => css`
  display: flex;

  ${respondTo(theme.breakpoint.sm)} {
    display: none;
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

export const gnbMenuStyle = css`
  display: none;

  ${respondTo('1360px')} {
    display: flex;
  }
`;
