import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const pickerActionAreaStyle = (theme: Theme) => css`
  --wds-action-area-margin-x: 18px;
  --wds-action-area-margin-y: 2px;

  border-color: ${theme.palette.line.solid.alternative};

  [data-role='action-area-wrapper'] {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    gap: 24px;
  }
`;
