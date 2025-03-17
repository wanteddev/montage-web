import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const pickerActionAreaStyle = (theme: Theme) => css`
  --wds-action-area-margin-x: 12px;
  --wds-action-area-margin-y: 10px;

  border-top: 1px solid ${theme.semantic.line.solid.alternative};
  background-color: ${theme.semantic.background.elevated.normal};

  [data-role='action-area-wrapper'] {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
`;
