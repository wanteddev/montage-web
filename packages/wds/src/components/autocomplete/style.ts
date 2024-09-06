import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const autocompleteListStyle = (theme: Theme) => css`
  padding: 0px;
  box-shadow: inset 0 1px 2px 0 ${addOpacity(theme.palette.static.black, 0.04)};
  border-radius: 16px;
  background-color: ${theme.palette.background.elevated.normal};
`;

export const autocompleteScrollAreaStyle = (theme: Theme) => css`
  padding: 8px 20px;
  box-shadow: inset 0 0 0 1px ${theme.palette.line.solid.neutral};
  border-radius: 16px;
  min-width: 140px;
  height: auto;
  max-height: 400px;
  border-radius: inherit;
`;

export const autocompleteOptionStyle = (theme: Theme) => css`
  [data-role='autocomplete-option-active-icon-check'] {
    color: ${theme.palette.primary.normal};
  }

  &[data-focus='true'] > [wds-component='with-interaction'] {
    opacity: ${theme.opacity[0]};
  }

  &[data-focus-visible='true'] > [wds-component='with-interaction'] {
    opacity: ${theme.opacity[5]};
  }
`;
