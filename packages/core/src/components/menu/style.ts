import { css } from '@montage-ui/engine';

import type { MenuActionAreaContentProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const menuPopoverContentStyle = (theme: Theme) => css`
  padding: 0;
  width: min(320px, var(--popper-available-width, 100vw));
  box-shadow: ${theme.semantic.elevation.shadow.normal.small};
  border-radius: 16px;
  backdrop-filter: none;
  background-color: transparent;
`;

export const menuScrollAreaStyle = (theme: Theme) => css`
  width: 100%;
  min-width: 140px;
  max-height: min(400px, var(--popper-available-height, 100vh));
  height: auto;
  border-radius: inherit;
  border: 1px solid ${theme.semantic.line.neutral.secondaryOpaque};
  background-color: ${theme.semantic.surface.elevated.primary};

  [data-radix-scroll-area-content] {
    width: 100%;
    min-width: initial !important;
  }
`;

export const menuGroupTitleStyle = (theme: Theme) => css`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 4px 20px;
  z-index: 10;
  margin: auto auto auto 0;
  background-color: ${theme.semantic.surface.elevated.primary};
`;

export const menuGroupStyle = css`
  width: 100%;
`;

export const menuListStyle = css`
  padding: 8px 0;
`;

export const menuItemStyle = css`
  width: calc(100% - 40px);

  &:focus-visible {
    outline: none;

    > [data-component='with-interaction'] {
      opacity: 0.06;
    }
  }
`;

export const menuActionAreaStyle = (theme: Theme) => css`
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 56px;
  padding: 0 12px;
  max-height: 56px;
  background-color: ${theme.semantic.surface.elevated.primary};
  z-index: 10;
  border-top: 1px solid ${theme.semantic.line.neutral.tertiaryOpaque};
`;

export const menuActionAreaContentStyle = (
  variant: MenuActionAreaContentProps['variant'],
) => css`
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;

  &[data-role='menu-action-area-leading-content'] {
    ${variant === 'icon' &&
    css`
      padding-left: 6px;
    `}

    ${variant === 'text-button' &&
    css`
      padding-left: 8px;
    `}

    ${variant === 'badge' &&
    css`
      padding-left: 6px;
    `}
  }

  &[data-role='menu-action-area-trailing-content'] {
    ${variant === 'badge' &&
    css`
      padding-right: 6px;
    `}
  }
`;
