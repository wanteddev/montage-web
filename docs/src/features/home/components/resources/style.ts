import { respondTo } from '@wanteddev/wds';
import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const itemDividerStyle = (color: string) => (theme: Theme) => css`
  width: 5px;
  height: 100%;
  border-radius: 2px;
  background: ${color};
  margin: 0px;
  border: none;

  ${respondTo(theme.breakpoint.md)} {
    width: 8px;
    height: 8px;
    border-radius: 5px;
    margin-block: auto;
  }
`;

export const itemLinkStyle = (theme: Theme) => css`
  padding: 0px;

  [data-role='interaction-arrow'] {
    color: ${theme.semantic.label.normal};
    transition: transform 0.2s ease;
    font-size: 26px;
    transform: scale(0);
    padding-block: 1px;
  }

  @media (pointer: fine) {
    &:hover {
      [data-role='interaction-arrow'] {
        transform: scale(1);
      }
    }
  }

  ${respondTo(theme.breakpoint.md)} {
    font-size: 24px;
    padding: 8px 0px;
  }

  ${respondTo('500px')} {
    [data-role='interaction-arrow'] {
      display: none;
    }
  }
`;
