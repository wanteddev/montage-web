import { css, ellipsisTypographyStyle, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbItemStyle = (theme: Theme) => css`
  ${respondMore(theme.breakpoint.lg)} {
    [data-role='list-text-content'] {
      ${ellipsisTypographyStyle(1)}
      white-space: nowrap;
      overflow-wrap: anywhere;
      word-break: keep-all;
    }
  }

  && {
    --wds-list-cell-horizontal-padding: 0px;
    --wds-list-cell-vertical-padding: 4px;
  }

  border-radius: 8px;

  & > [wds-component='with-interaction'] {
    width: calc(100% + var(--lnb-padding) * 2);
  }

  [data-role='lnb-group-item-arrow'] {
    color: transparent;
    transition:
      color 0.2s ease,
      transform 0.2s ease;
    transform: translateX(-10px);
  }
  @media (pointer: fine) {
    &:hover {
      [data-role='lnb-group-item-arrow'] {
        color: ${theme.semantic.label.assistive};
        transform: translateX(0px);
      }
    }
  }

  &[aria-current='page'] {
    [data-role='lnb-group-item-arrow'] {
      color: ${theme.semantic.label.normal};
      transform: translateX(0px);
    }

    [data-role='list-text-content'] {
      color: ${theme.semantic.label.normal};
    }

    & > [wds-component='with-interaction'] {
      opacity: 0.02;
    }

    &:hover {
      & > [wds-component='with-interaction'] {
        opacity: ${theme.opacity[5]};
      }
    }

    &:active {
      & > [wds-component='with-interaction'] {
        opacity: ${theme.opacity[12]};
      }
    }
  }
`;
