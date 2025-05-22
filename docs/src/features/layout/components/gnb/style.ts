import { addOpacity, css, respondMore, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const gnbWrapperStyle = (theme: Theme) => css`
  position: sticky;
  z-index: ${theme.zIndex.modal};
  top: 0;
  padding: 12px 20px;
  backdrop-filter: blur(32px);
  background-color: ${addOpacity(
    theme.semantic.background.normal.normal,
    theme.opacity[88],
  )};
  border-bottom: 1px solid ${theme.semantic.line.normal.alternative};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  ${respondMore(theme.breakpoint.sm)} {
    padding: 12px 40px;
  }
`;

export const searchFieldStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.fill.normal};
  border-radius: 12px;
  padding: 8px 10px;
  width: 280px;
  align-items: center;
  position: relative;
  color: ${theme.semantic.label.assistive};
  font-size: 20px;

  ${respondTo(theme.breakpoint.sm)} {
    display: none;
  }

  ${respondMore(theme.breakpoint.xl)} {
    width: calc((100dvw - 240px - 840px - 32px) / 2);
    max-width: 480px;
  }
`;

export const gnbSearchMobileStyle = (theme: Theme) => css`
  ${respondMore(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const kbdStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.fill.normal};
  border-radius: 6px;
  padding: 2px 6px;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
  display: flex;
  align-items: center;
  justify-content: center;

  & > kbd {
    width: 16px;
    display: inline-block;
  }
`;

export const gnbActionsStyle = (theme: Theme) => css`
  background-color: transparent;
  border-radius: 12px;
  padding: 8px;
  position: relative;
  font-size: 22px;
  color: ${theme.semantic.label.normal};
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};

  &[aria-expanded='true'] {
    & > [wds-component='with-interaction'] {
      opacity: ${theme.opacity[8]};
    }
  }
`;

export const gnbMenuStyle = (theme: Theme) => css`
  display: none;

  ${respondTo(theme.breakpoint.lg)} {
    display: flex;
  }
`;
