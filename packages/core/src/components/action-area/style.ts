import { css, getColorByToken } from '@montage-ui/engine';

import { gradient, typographyStyle } from '../../utils';

import type { ActionAreaButtonProps, ActionAreaProps } from './types';
import type { Merge, Theme } from '@montage-ui/engine';

export const actionAreaStyle =
  ({ divider, background, extra, backgroundColor }: ActionAreaProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding: var(--action-area-margin-y, 20px) var(--action-area-margin-x, 20px);
    position: relative;

    --action-area-background-color: ${getColorByToken(theme, backgroundColor!)};

    [data-role='action-area-compact-content-wrapper'] {
      min-width: 0;
      word-break: keep-all;
      overflow-wrap: anywhere;
    }

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
          border-top: 1px solid ${theme.semantic.line.neutral.tertiary};
        `}
        background-color: var(--action-area-background-color);
      `;
    case false:
    default:
      return css`
        ${background
          ? css`
              &::before {
                pointer-events: none;
                ${gradient(
                  'var(--action-area-background-color)',
                  'top',
                  'calc(var(--action-area-margin-y, 20px) * 2)',
                  'mask',
                )}
                height: calc(100% + var(--action-area-margin-y, 20px));
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

export const captionStyle = (theme: Theme) => css`
  gap: ${theme.spacing[4]};
  color: ${theme.semantic.foreground.neutral.tertiary};
  ${typographyStyle('label2', 'medium')}
  word-break: keep-all;
  overflow-wrap: anywhere;

  svg {
    display: block;
    flex-shrink: 0;
    margin-block: 1px;
    font-size: ${theme.dimension[16]};
  }
`;

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
    `;
  }

  return undefined;
};
