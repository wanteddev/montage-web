import { css } from '@wanteddev/wds-engine';

import { gradient } from '../../utils';

import type { ActionAreaProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const actionAreaStyle =
  ({ sticky, variant, priority }: ActionAreaProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding: calc(var(--wds-action-area-margin, 20px));
    position: relative;

    ${actionAreaVariant(theme, { variant, sticky, priority })}
  `;

const actionAreaVariant = (
  theme: Theme,
  { variant, sticky, priority }: ActionAreaProps,
) => {
  switch (variant) {
    case 'normal':
      return css`
        ${sticky
          ? css`
              ${priority === 'compact'
                ? css`
                    background-color: ${theme.palette.background.elevated
                      .normal};
                    border-top: 1px solid ${theme.palette.line.normal.neutral};
                  `
                : css`
                    &::before {
                      pointer-events: none;
                      ${gradient(
                        theme.palette.background.elevated.normal,
                        'top',
                        'calc(var(--wds-action-area-margin, 20px) * 2)',
                      )}
                      height: calc(100% + var(--wds-action-area-margin, 20px));
                      content: '';
                      z-index: 0;
                      position: absolute;
                      left: 0;
                      bottom: 0;
                      width: 100%;
                    }
                  `}

              & > * {
                position: relative;
              }
            `
          : css`
              &::before {
                pointer-events: none;
                content: '';
                z-index: 0;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 100%;
                width: 100%;
              }

              & > * {
                position: relative;
              }
            `}
      `;
    case 'extra':
      return css`
        border-top: 1px solid ${theme.palette.line.normal.neutral};
        background-color: ${theme.palette.background.elevated.normal};
      `;
  }
};

export const actionButtonSingle = (priority: ActionAreaProps['priority']) => {
  if (priority === 'neutral') {
    return css`
      flex: 1 1 0;
      padding: 12px 15px;
    `;
  }

  return undefined;
};
