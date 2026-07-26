import { css, ellipsisTypographyStyle, respondMore } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const lnbItemStyle = (theme: Theme) => css`
  && {
    --list-cell-horizontal-padding: 0px;
    --list-cell-vertical-padding: 7px;
  }

  &[data-depth='0'] {
    && {
      --list-cell-vertical-padding: 8px;
    }
  }

  border-radius: 12px;

  & > [data-component='with-interaction'] {
    width: calc(100% + var(--lnb-padding) * 2);
  }

  [data-role='lnb-group-item-arrow'] {
    margin: 4px 3px;
    color: transparent;
    transition:
      color 0.2s ease,
      transform 0.2s ease;
    transform: translateX(-10px);
  }

  [data-role='list-text-content'] {
    transition: color 0.2s ease;
  }

  @media (pointer: fine) {
    &:hover {
      [data-role='lnb-group-item-arrow'] {
        color: ${theme.semantic.foreground.neutral.primary};
        transform: translateX(0px);
      }

      &[aria-current='page'] > [data-component='with-interaction'] {
        opacity: ${theme.opacity[5]};
      }
    }
  }

  &[aria-current='page'] {
    [data-role='lnb-group-item-arrow'] {
      color: ${theme.semantic.foreground.neutral.primary};
      transform: translateX(0px);
    }

    [data-role='list-text-content'] {
      color: ${theme.semantic.foreground.neutral.primary};
    }

    & > [data-component='with-interaction'] {
      opacity: 0.02;
    }

    &:active {
      & > [data-component='with-interaction'] {
        opacity: ${theme.opacity[12]};
      }
    }
  }

  ${respondMore(theme.breakpoint.lg)} {
    [data-role='list-text-content'] {
      ${ellipsisTypographyStyle(1)}
      white-space: nowrap;
      overflow-wrap: anywhere;
      word-break: keep-all;
    }
  }
`;
