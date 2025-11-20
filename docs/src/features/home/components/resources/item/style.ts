import { respondTo } from '@wanteddev/wds';
import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const itemWrapperStyle = (theme: Theme) => css`
  padding-top: 28px;
  position: relative;

  [data-role='resource-webp'] {
    display: none;
  }

  [data-role='interaction-arrow'] {
    color: ${theme.semantic.label.normal};
    transition: transform 0.2s ease;
    font-size: 24px;
    transform: scale(0);
  }

  @media (pointer: fine) {
    &:hover {
      [data-role='interaction-arrow'] {
        transform: scale(1);
      }

      [data-role='resource-webp'] {
        display: block;
      }

      [data-role='resource-image'] {
        display: none;
      }
    }
  }

  ${respondTo('500px')} {
    [data-role='interaction-arrow'] {
      display: none;
    }
  }

  ${respondTo(theme.breakpoint.md)} {
    padding-block: 20px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 1px;
      background: ${theme.semantic.line.normal.neutral};
      pointer-events: none;
    }
  }
`;

export const itemDividerStyle = (theme: Theme) => css`
  pointer-events: none;

  ${respondTo(theme.breakpoint.md)} {
    display: none;
  }
`;

export const itemWebpStyle = (theme: Theme) => css`
  width: 40px;
  height: 40px;
  margin-left: -4px;

  ${respondTo(theme.breakpoint.md)} {
    height: 32px;
    width: 32px;
    margin-left: -3px;
  }
`;

export const itemLinkStyle = (theme: Theme) => css`
  [data-role='interaction-arrow'] {
    color: ${theme.semantic.label.normal};
    transition: transform 0.2s ease;
    font-size: 24px;
    transform: scale(0);
  }

  @media (pointer: fine) {
    &:hover {
      [data-role='interaction-arrow'] {
        transform: scale(1);
      }
    }
  }

  ${respondTo('500px')} {
    [data-role='interaction-arrow'] {
      display: none;
    }
  }
`;

export const hiddenTextStyle = (theme: Theme) => css`
  ${respondTo(theme.breakpoint.xl)} {
    .max-xl\\:hidden {
      display: none;
    }
  }

  ${respondTo(theme.breakpoint.sm)} {
    .max-sm\\:hidden {
      display: none;
    }
  }
`;
