import { respondMore } from '@wanteddev/wds';
import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const resourceItemStyle = (theme: Theme) => css`
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
  }

  mark {
    background-color: transparent;
    font: inherit;
    color: inherit;
    display: none;
  }

  &[data-interaction='false'] {
    display: none;
  }

  ${respondMore('375px')} {
    mark {
      display: inline;
    }
  }

  ${respondMore('620px')} {
    --wds-list-cell-vertical-padding: 16px;
  }

  ${respondMore('700px')} {
    &[data-interaction='true'] {
      display: none;
    }

    &[data-interaction='false'] {
      display: flex;
    }

    [data-role='list-text-caption'] {
      color: ${theme.semantic.label.neutral};
      font-size: 14px;
      line-height: 160%;
      letter-spacing: -0.196px;
    }
  }

  ${respondMore('780px')} {
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
  color: ${theme.semantic.label.alternative};

  & > span {
    display: none;
  }

  svg {
    font-size: 18px;
  }

  ${respondMore('620px')} {
    svg {
      font-size: 20px;
    }
  }

  ${respondMore('700px')} {
    & > span {
      display: block;
      font-family: var(--font-family-wanted-sans);
      font-size: 14px;
      font-weight: 500;
      line-height: 146.7%;
      letter-spacing: -0.196px;
    }

    svg {
      font-size: 16px;
    }

    color: ${theme.semantic.label.neutral};
  }

  ${respondMore('780px')} {
    & > span {
      font-size: 15px;
      line-height: 146.7%;
      letter-spacing: -0.21px;
    }
  }
`;
