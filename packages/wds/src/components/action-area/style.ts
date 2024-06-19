import { css } from '@wanteddev/wds-engine';

import { gradient } from '../../utils';

import type { ActionAreaProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const actionAreaStyle =
  ({ sticky, variant, priority }: ActionAreaProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding: var(--wds-action-area-margin-y, 20px)
      var(--wds-action-area-margin-x, 20px);
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
                    border-style: solid;
                    border-top-width: 1px;
                    transition: border-color 0.2s ease;
                    border-color: ${theme.palette.line.normal.neutral};
                    background-color: ${theme.palette.background.elevated
                      .normal};
                  `
                : css`
                    &::before {
                      pointer-events: none;
                      ${gradient(
                        theme.palette.background.elevated.normal,
                        'top',
                        'calc(var(--wds-action-area-margin-y, 20px) * 2)',
                      )}
                      height: calc(100% + var(--wds-action-area-margin-y, 20px));
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

              ${priority === 'compact' &&
              css`
                border-style: solid;
                border-top-width: 1px;
                border-color: transparent;
                transition: border-color 0.2s ease;
              `}

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
