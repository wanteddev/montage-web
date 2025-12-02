import { css } from '@wanteddev/wds-engine';

import { gradient } from '../../utils';

import type { ActionAreaButtonProps, ActionAreaProps } from './types';
import type { Merge, Theme } from '@wanteddev/wds-engine';

export const actionAreaStyle =
  ({ divider, background, extra }: ActionAreaProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding: var(--wds-action-area-margin-y, 20px)
      var(--wds-action-area-margin-x, 20px);
    position: relative;

    ${actionAreaBackgroundStyle({ divider, background, extra }, theme)}
  `;

const actionAreaBackgroundStyle = (
  { divider, background, extra }: ActionAreaProps,
  theme: Theme,
) => {
  switch (extra) {
    case true:
      return css`
        ${divider &&
        css`
          border-top: 1px solid ${theme.semantic.line.normal.neutral};
        `}
        background-color: ${theme.semantic.background.elevated.normal};
      `;
    case false:
    default:
      return css`
        ${background
          ? css`
              &::before {
                pointer-events: none;
                ${gradient(
                  theme.semantic.background.elevated.normal,
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
  }
};

export const actionButtonCancel = ({
  variant,
  parentVariant,
}: Merge<
  Pick<ActionAreaButtonProps, 'variant'>,
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
