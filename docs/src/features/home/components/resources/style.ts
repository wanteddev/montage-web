import { respondMore } from '@wanteddev/wds';
import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const resourceItemStyle = (theme: Theme) => css`
  [data-role='list-cell-divider'] {
    border-color: ${theme.semantic.line.normal.alternative};
  }

  [data-role='list-text-content'] {
    font-size: 18px;
    font-weight: 800;
    line-height: 140%;
    letter-spacing: -0.432px;
    font-family: var(--font-family-wanted-sans);
  }

  [data-role='list-text-caption'] {
    font-size: 14px;
    font-weight: 500;
    line-height: 142.9%;
    letter-spacing: -0.336px;
    font-family: var(--font-family-wanted-sans);
    color: ${theme.semantic.label.alternative};
  }

  &[data-interaction='false'] {
    display: none;
  }

  ${respondMore(theme.breakpoint.sm)} {
    &[data-interaction='true'] {
      display: none;
    }

    &[data-interaction='false'] {
      display: flex;
    }

    [data-role='list-text-content'] {
      font-size: 20px;
      line-height: 140%;
      letter-spacing: -0.28px;
    }

    [data-role='list-text-caption'] {
      font-size: 15px;
      line-height: 160%;
      letter-spacing: -0.21px;
    }
  }
`;

export const resourceItemButtonStyle = (theme: Theme) => css`
  gap: 8px;
  border-radius: 8px;
  padding: 8px 0px;
  color: ${theme.semantic.label.alternative};
  transition: color 0.2s ease;

  & > span {
    display: none;
  }

  svg {
    font-size: 18px;
  }

  & > [wds-component='with-interaction'] {
    background-color: transparent;
  }

  ${respondMore(theme.breakpoint.sm)} {
    & > span {
      display: block;
      font-family: var(--font-family-wanted-sans);
      font-size: 15px;
      line-height: 146.7%;
      letter-spacing: -0.21px;
    }

    svg {
      font-size: 20px;
    }

    &:hover {
      color: ${theme.semantic.label.neutral};
    }
  }
`;
