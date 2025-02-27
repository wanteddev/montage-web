import { css } from '@wanteddev/wds-engine';

import { gradient } from '../../utils';

import type { ActionAreaProps, ActionButtonProps } from './types';
import type { Merge, Theme } from '@wanteddev/wds-engine';

export const actionAreaStyle =
  ({ divider, sticky, variant, extra }: ActionAreaProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding: var(--wds-action-area-margin-y, 20px)
      var(--wds-action-area-margin-x, 20px);
    position: relative;

    ${actionAreaVariant({ divider, variant, sticky, extra }, theme)}
  `;

const actionAreaVariant = (
  { divider, variant, sticky, extra }: ActionAreaProps,
  theme: Theme,
) => {
  switch (extra) {
    case true:
      return css`
        ${divider &&
        css`
          border-top: 1px solid ${theme.palette.line.normal.neutral};
        `}
        background-color: ${theme.palette.background.elevated.normal};
      `;
    case false:
    default:
      return css`
        ${sticky
          ? css`
              ${variant === 'compact'
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
                        'mask',
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

              ${variant === 'compact' &&
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
  }
};

export const actionButtonCancel = ({
  variant,
  parentVariant,
}: Merge<
  Pick<ActionButtonProps, 'variant'>,
  { parentVariant?: ActionAreaProps['variant'] }
>) => {
  if (parentVariant === 'neutral' && variant !== 'sub') {
    return css`
      flex: 1 1 0;
      padding: 12px 15px;
    `;
  }

  return undefined;
};
