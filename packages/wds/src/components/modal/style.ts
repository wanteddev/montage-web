import { css, keyframes } from '@emotion/react';

import { typographyStyle } from '../../utils/typography';
import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/responsive-props';
import { gradient } from '../../utils/color';

import type { Theme } from '@emotion/react';
import type {
  ModalActionAreaProps,
  ModalContainerProps,
  ModalContentProps,
  ModalNavigationProps,
} from './types';

export const modalDimmerStyle = (theme: Theme) => css`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: ${theme.palette.material.dimmer};
`;

export const modalContainerWrapperStyle =
  ({ variant, xs, sm, md, lg, xl }: ModalContainerProps) =>
  (theme: Theme) => css`
    position: fixed;
    display: flex;
    inset: 0;
    z-index: ${theme.zIndex.modal};

    ${modalContainerWrapperVariant(variant)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${Boolean(params?.variant) &&
        modalContainerWrapperVariant(params!.variant)}

        ${params?.css}
      `,
    )}
  `;

const modalContainerWrapperVariant = (
  variant: ModalContainerProps['variant'],
) => {
  switch (variant) {
    case 'full':
      return css`
        justify-content: center;
      `;
    case 'popup':
      return css`
        align-items: center;
        justify-content: center;
        padding: 20px;
      `;
    case 'bottom':
      return css`
        align-items: flex-end;
        justify-content: center;
      `;
  }
};

const modalBottomMountKeyframes = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(var(--wds-modal-translate, 0px));
  }
`;

export const modalBottomUnmountKeyframes = keyframes`
  0% {
    transform: translateY(var(--wds-modal-translate, 0px));
  }
  100% {
    transform: translateY(100%);
  }
`;

export const modalContainerStyle =
  ({ variant, size, xs, sm, md, lg, xl }: ModalContainerProps) =>
  (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    outline: none;
    background-color: ${theme.palette.background.elevated.normal};
    transform: translateY(var(--wds-modal-translate, 0px));

    ${modalContainerSize(size)}
    ${modalContainerVariant(variant)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${modalContainerSize(
          getPreviousValue({ xs, sm, md, lg, xl }, 'size', size, breakpoint!),
        )}
        ${modalContainerVariant(
          getPreviousValue(
            { xs, sm, md, lg, xl },
            'variant',
            variant,
            breakpoint!,
          ),
        )}

        ${params?.css}
      `,
    )};
  `;

const modalContainerSize = (size: ModalContainerProps['size']) => {
  switch (size) {
    case 'small':
    case 'small-fixed':
      return css`
        width: 360px;
        min-width: 320px;
        max-width: 360px;

        ${size.includes('fixed') &&
        css`
          height: 400px;
        `}

        --wds-modal-content-margin: 20px;
        --wds-modal-navigation-padding: 20px;
      `;
    case 'normal':
    case 'normal-fixed':
      return css`
        width: 400px;
        min-width: 320px;
        max-width: 400px;
        height: initial;

        ${size.includes('fixed') &&
        css`
          height: 480px;
        `}

        --wds-modal-content-margin: 20px;
        --wds-modal-navigation-padding: 20px;
      `;
    case 'medium':
    case 'medium-fixed':
      return css`
        width: 480px;
        min-width: 320px;
        max-width: 100%;
        height: initial;

        ${size.includes('fixed') &&
        css`
          height: 560px;
        `}

        --wds-modal-content-margin: 24px;
        --wds-modal-navigation-padding: 20px;
      `;
    case 'large':
    case 'large-fixed':
      return css`
        width: 560px;
        min-width: 320px;
        max-width: 100%;
        height: initial;

        ${size.includes('fixed') &&
        css`
          height: 640px;
        `}

        --wds-modal-content-margin: 32px;
        --wds-modal-navigation-padding: 24px;
      `;
  }
};

const modalContainerVariant = (variant: ModalContainerProps['variant']) => {
  switch (variant) {
    case 'full':
      return css`
        min-width: none;
        max-height: none;
        max-width: 100%;
        width: 100%;
        height: 100%;
        animation: none;
        max-height: 100%;
        border-radius: 0px;
        padding: initial;
      `;
    case 'popup':
      return css`
        border-radius: 12px;
        animation: none;
        max-height: 100%;
        padding: initial;
        overflow: hidden;
      `;
    case 'bottom':
      return css`
        padding: 0px 0px env(safe-area-inset-bottom, 0px) 0px;
        max-height: calc(100% - env(safe-area-inset-top, 0px) - 40px);
        border-radius: 12px 12px 0px 0px;
        animation: 0.2s ease ${modalBottomMountKeyframes};
        max-width: 480px;
        width: 100%;
        min-width: none;
        overflow: hidden;
      `;
  }
};

export const modalGrabberStyle = (theme: Theme) => css`
  min-width: inherit;
  position: absolute;
  padding-top: 9px;
  padding-bottom: 5px;
  top: 0;
  left: 0;
  z-index: 10;
  touch-action: pan-y;
  -webkit-transform: translate3d(0, 0, 0);

  &::after {
    content: '';
    border-radius: 1000px;
    margin-bottom: 9px;
    width: 40px;
    height: 5px;
    display: block;
    background-color: ${theme.palette.fill.strong};
  }
`;

export const modalNavigationStyle =
  ({ variant, xs, sm, md, lg, xl }: ModalNavigationProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding: var(--wds-modal-navigation-padding, 20px);
    display: flex;
    align-items: center;
    position: sticky;
    top: 0px;
    left: 0px;
    border-bottom: 1px solid var(--wds-navigation-border-color);
    transition: border-color 0.2s ease;
    z-index: 5;

    ${modalNavigationVariant(variant, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.css}
      `,
    )}
  `;

const modalNavigationVariant = (
  variant: ModalNavigationProps['variant'],
  theme: Theme,
) => {
  const defaultStyle =
    variant !== 'floating' ? theme.platform.ios.navigation : '';

  switch (variant) {
    case 'compact':
      return css`
        ${defaultStyle}
        min-height: 64px;

        justify-content: center;

        h2 {
          width: 80%;
          text-align: center;
        }

        button {
          position: absolute;
          right: var(--wds-modal-navigation-padding, 20px);
          place-self: center end;
        }
      `;
    case 'emphasized':
      return css`
        ${defaultStyle}
        min-height: 64px;
        justify-content: space-between;

        h2 {
          ${typographyStyle('heading2', 'bold')}
          width: 90%;
          max-height: 24px;
        }
      `;
    case 'extended':
      return css`
        ${defaultStyle}
        gap: 16px;
        flex-direction: column-reverse;

        h2 {
          ${typographyStyle('title3', 'bold')}
          width: 100%;
        }

        button {
          align-self: flex-end;
        }
      `;
    case 'floating':
      return css`
        ${defaultStyle}
        padding: 0px;

        button {
          display: flex;
          position: absolute;
          right: var(--wds-modal-navigation-padding, 20px);
          top: var(--wds-modal-navigation-padding, 20px);
        }
      `;
  }
};

export const modalContentStyle =
  ({
    padding,
    paddingExtra,
    paddingInfo,
    xs,
    sm,
    md,
    lg,
    xl,
  }: ModalContentProps) =>
  (theme: Theme) => css`
    width: 100%;
    height: 100%;
    padding-bottom: var(--wds-modal-content-margin, 20px);

    ${modalContentPadding({
      padding: padding || false,
      paddingExtra: paddingExtra || false,
      paddingInfo: paddingInfo || false,
    })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${modalContentPadding(params)}
        ${params?.css}
      `,
    )}
  `;

const modalContentPadding = ({
  padding,
  paddingExtra,
  paddingInfo,
}: Pick<
  ModalContentProps,
  'padding' | 'paddingExtra' | 'paddingInfo'
> = {}) => css`
  ${padding === true &&
  css`
    padding-top: var(--wds-modal-content-margin, 20px);
  `}
  ${padding === false &&
  css`
    padding-top: 0px;
  `}

  ${paddingExtra === true &&
  css`
    margin: var(--wds-modal-content-margin, 20px) 0px;
  `}
  ${paddingExtra === false &&
  css`
    margin: 0px;
  `}

  ${paddingInfo === true &&
  css`
    gap: calc(var(--wds-modal-content-margin, 20px) * 2);
  `}
  ${paddingInfo === false &&
  css`
    gap: calc(var(--wds-modal-content-margin, 20px));
  `}
`;

export const modalContentItemStyle = () => css`
  padding: 0px calc(var(--wds-modal-content-margin, 20px));
`;

export const modalActionAreaStyle =
  ({
    isSticky,
    priority,
    variant,
  }: ModalActionAreaProps & { isSticky?: boolean }) =>
  (theme: Theme) => css`
    width: 100%;
    padding: calc(var(--wds-modal-content-margin, 20px));
    position: sticky;
    bottom: 0;
    left: 0;

    ${modalActionAreaVariant(theme, variant, isSticky)}

    ${priority === 'single' &&
    isSticky === false &&
    css`
      &::before {
        border-top: 1px solid ${theme.palette.line.normal.normal};
      }
    `}
  `;

const modalActionAreaVariant = (
  theme: Theme,
  variant?: ModalActionAreaProps['variant'],
  isSticky?: boolean,
) => {
  switch (variant) {
    case 'normal':
      return css`
        ${isSticky
          ? css`
              &::before {
                pointer-events: none;
                ${gradient(
                  theme.palette.background.elevated.normal,
                  'top',
                  'calc(var(--wds-modal-content-margin, 20px) * 2)',
                )}
                content: '';
                z-index: 0;
                position: absolute;
                left: 0;
                bottom: 0;
                height: calc(
                  100% + (var(--wds-modal-content-margin, 20px) * 2)
                );
                width: 100%;
              }
            `
          : css`
              &::before {
                pointer-events: none;
                background-color: ${theme.palette.background.elevated.normal};
                content: '';
                z-index: 0;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 100%;
                width: 100%;
                height: 100%;
              }
            `}
      `;
    case 'extra':
      return css`
        &::before {
          border-radius: 12px 12px 0px 0px;
          pointer-events: none;
          box-shadow: ${theme.palette.elevation.shadow.heavy};
          background-color: ${theme.palette.background.elevated.normal};
          content: '';
          z-index: 0;
          position: absolute;
          left: 0;
          bottom: 0;
          height: 100%;
          width: 100%;
        }
      `;
  }
};

export const modalActionButtonSingle = (
  priority: ModalActionAreaProps['priority'],
) => {
  if (priority === 'single') {
    return css`
      padding: 12px 28px;
      box-shadow: none;
      width: calc((var(--wds-modal-content-margin, 20px) - 8px) * 2 + 100%);
      margin: calc(var(--wds-modal-content-margin, 20px) * -1 + 8px);
    `;
  }

  if (priority === 'neutral') {
    return css`
      flex: 1 1 0;
      padding: 12px 15px;
    `;
  }

  return css`
    padding: 12px 28px;
  `;
};
