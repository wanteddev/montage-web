import { css, keyframes } from '@montage-ui/engine';

import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';
import { ellipsisTypographyStyle, typographyStyle } from '../../utils';
import { toCssValue } from '../../utils/internal/css';

import {
  BOTTOM_SHEET_SETTLE_DURATION_MS,
  BOTTOM_SHEET_SETTLE_TRANSITION,
  BOTTOM_SHEET_SHADOW,
} from './constants';

import type { Theme } from '@montage-ui/engine';
import type {
  ModalContainerProps,
  ModalContentProps,
  ModalNavigationProps,
} from './types';

export const modalDimmerStyle = (theme: Theme) => css`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: ${theme.semantic.effect.dimmer.primary};

  &[data-snap='full'],
  &[data-snap='half'] {
    transition: opacity ${BOTTOM_SHEET_SETTLE_TRANSITION};
    opacity: 1;
  }

  &[data-snap='peek'] {
    transition: opacity ${BOTTOM_SHEET_SETTLE_TRANSITION};
    pointer-events: none;
    opacity: 0;
  }

  /*
   * iOS \`largestUndimmedDetentIdentifier\`-style override. When the largest
   * undimmed snap is \`half\`, the dimmer must also be transparent and
   * non-blocking at \`half\` so pointer events fall through to the content
   * behind the sheet. Only \`full\` keeps a visible dimmer.
   */
  &[data-largest-undimmed-snap='half'][data-snap='half'] {
    pointer-events: none;
    opacity: 0;
  }
`;

export const modalContainerWrapperStyle =
  ({ variant, xs, sm, md, lg, xl }: ModalContainerProps) =>
  (theme: Theme) => css`
    position: fixed;
    display: flex;
    z-index: ${theme.zIndex.modal};
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;

    /*
     * \`data-status='close'\`: with \`forceMount\` the full-viewport wrapper stays
     * mounted after close and would otherwise swallow every click on the page.
     */
    &[data-snap='peek'],
    &[data-largest-undimmed-snap='half'][data-snap='half'],
    &[data-status='close'] {
      pointer-events: none;
    }

    [data-role='modal-container-scroll-area']:has(
      [data-component='modal-navigation']
        [data-role='modal-navigation-floating-background']
    ) {
      background: inherit;
      will-change: backdrop-filter;
    }

    @supports (height: 100dvh) {
      height: 100dvh;
    }

    ${modalContainerWrapperVariant(variant)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${Boolean(params?.variant) &&
        modalContainerWrapperVariant(params!.variant)}

        ${params?.sx}
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
        align-items: initial;
        padding: 0px;

        [data-role='modal-dimmer'][data-status='close'] {
          opacity: initial;
          pointer-events: none;
          transition: initial;
        }
      `;
    case 'popup':
      return css`
        align-items: center;
        justify-content: center;
        padding: 20px;

        [data-role='modal-dimmer'][data-status='close'] {
          opacity: initial;
          pointer-events: none;
          transition: initial;
        }
      `;
    case 'bottom':
      return css`
        padding: 0px;
        align-items: flex-end;
        justify-content: center;

        [data-role='modal-dimmer'][data-status='close'] {
          opacity: 0;
          pointer-events: none;
          transition: opacity ${BOTTOM_SHEET_SETTLE_TRANSITION};
        }
      `;
  }
};

const modalBottomMountKeyframes = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(var(--modal-translate, 0px));
  }
`;

export const modalContainerStyle =
  ({ resize, variant, size, xs, sm, md, lg, xl }: ModalContainerProps) =>
  (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    outline: none;
    background-color: ${theme.semantic.surface.elevated.primary};

    [data-component='modal-navigation'] {
      z-index: 5;
      position: sticky;
      top: var(--modal-grabber-height-guard, 0px);
      left: 0px;
    }

    [data-component='action-area'] {
      position: sticky;
      z-index: 5;
      bottom: 0;
      left: 0;
    }

    ${modalContainerSize(size, resize)}
    ${modalContainerVariant(variant)}
    ${modalContainerBottomResize(variant, resize)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${(params?.resize || params?.size || params?.variant) &&
        css`
          ${modalContainerSize(
            getPreviousValue({ xs, sm, md, lg, xl }, 'size', size, breakpoint!),
            getPreviousValue(
              { xs, sm, md, lg, xl },
              'resize',
              resize,
              breakpoint!,
            ),
          )}
          ${modalContainerVariant(
            getPreviousValue(
              { xs, sm, md, lg, xl },
              'variant',
              variant,
              breakpoint!,
            ),
          )}
          ${modalContainerBottomResize(
            getPreviousValue(
              { xs, sm, md, lg, xl },
              'variant',
              variant,
              breakpoint!,
            ),
            getPreviousValue(
              { xs, sm, md, lg, xl },
              'resize',
              resize,
              breakpoint!,
            ),
          )}
        `}

        ${params?.sx}
      `,
    )};
  `;

const modalContainerSize = (
  size: ModalContainerProps['size'],
  resize: ModalContainerProps['resize'],
) => {
  switch (size) {
    case 'medium':
      return css`
        width: 360px;
        min-width: 320px;
        max-width: 100%;
        height: initial;
        max-height: 100%;

        ${resize === 'fixed' &&
        css`
          height: 480px;
        `}

        --modal-popup-border-radius: 24px;

        --modal-navigation-padding-x: 24px;
        --modal-navigation-padding-y: 24px;

        --modal-content-margin-x: 28px;
        --modal-content-margin-y: 24px;

        --action-area-margin-x: 24px;
        --action-area-margin-y: 20px;

        [data-component='modal-navigation'] {
          --tab-list-padding: var(--modal-content-margin-x);
        }

        [data-role='action-area-extra-content'] {
          margin-bottom: var(--action-area-margin-y, 20px);
        }
      `;
    case 'large':
      return css`
        width: 480px;
        min-width: 320px;
        max-width: 100%;
        height: initial;
        max-height: 100%;

        ${resize === 'fixed' &&
        css`
          height: 560px;
        `}

        --modal-popup-border-radius: 24px;

        --modal-navigation-padding-x: 24px;
        --modal-navigation-padding-y: 24px;

        --modal-content-margin-x: 28px;
        --modal-content-margin-y: 24px;

        --action-area-margin-x: 24px;
        --action-area-margin-y: 20px;

        [data-component='modal-navigation'] {
          --tab-list-padding: var(--modal-content-margin-x);
        }

        [data-role='action-area-extra-content'] {
          margin-bottom: var(--action-area-margin-y, 20px);
        }
      `;
    case 'xlarge':
      return css`
        width: 560px;
        min-width: 320px;
        max-width: 100%;
        height: initial;
        max-height: 100%;

        ${resize === 'fixed' &&
        css`
          height: 640px;
        `}

        --modal-popup-border-radius: 24px;

        --modal-navigation-padding-x: 24px;
        --modal-navigation-padding-y: 24px;

        --modal-content-margin-x: 28px;
        --modal-content-margin-y: 24px;

        --action-area-margin-x: 24px;
        --action-area-margin-y: 20px;
        --action-area-extra-content-margin: var(--action-area-margin, 20px);

        [data-component='modal-navigation'] {
          --tab-list-padding: var(--modal-content-margin-x);
        }

        [data-role='action-area-extra-content'] {
          margin-bottom: var(--action-area-margin-y, 20px);
        }
      `;
  }
};

const modalContainerVariant = (variant: ModalContainerProps['variant']) => {
  switch (variant) {
    case 'full':
      return css`
        --modal-content-default-padding-top: var(
          --modal-content-margin-y,
          24px
        );
        --modal-content-default-padding-bottom: 0px;
        min-width: initial;
        max-height: initial;
        max-width: 100%;
        width: 100%;
        height: 100%;
        animation: none;
        max-height: 100%;
        border-radius: 0px;
        padding: initial;
        transition: none;

        &[data-status='open'] {
          transform: initial;
          transition: none;
        }

        &[data-status='close'] {
          transform: initial;
        }

        [data-role='navigation-title'] {
          user-select: initial;
        }

        &[data-status='open']:not([data-snap='peek']) {
          box-shadow: none;
          transition: none;
        }

        &[data-status='open'][data-snap='peek'] {
          box-shadow: none;
          transition: initial;
        }
      `;
    case 'popup':
      return css`
        --modal-content-default-padding-top: 0px;
        --modal-content-default-padding-bottom: 0px;
        border-radius: var(--modal-popup-border-radius, 24px);
        animation: none;
        max-height: min(760px, 100%);
        padding: initial;
        overflow: hidden;
        transition: none;

        &[data-status='open'] {
          transform: initial;
          transition: none;
        }

        &[data-status='close'] {
          transform: initial;
        }

        [data-role='navigation-title'] {
          user-select: initial;
        }

        &[data-status='open']:not([data-snap='peek']) {
          box-shadow: none;
          transition: none;
        }

        &[data-status='open'][data-snap='peek'] {
          box-shadow: none;
          transition: initial;
        }
      `;
    case 'bottom':
      return css`
        --modal-default-max-height: calc(
          100% - env(safe-area-inset-top, 0px) - 40px
        );
        --modal-content-default-padding-top: var(
          --modal-content-margin-y,
          24px
        );
        --modal-content-default-padding-bottom: 0px;
        padding: 0px 0px env(safe-area-inset-bottom, 0px) 0px;
        max-height: var(--modal-max-height, var(--modal-default-max-height));
        border-radius: 32px 32px 0px 0px;
        max-width: 480px;
        width: 100%;
        min-width: initial;
        overflow: hidden;
        transition:
          transform ${BOTTOM_SHEET_SETTLE_TRANSITION},
          box-shadow ${BOTTOM_SHEET_SETTLE_TRANSITION};
        pointer-events: auto;
        transform: translateY(var(--modal-translate, 0px));
        animation: ${BOTTOM_SHEET_SETTLE_DURATION_MS}ms ease
          ${modalBottomMountKeyframes};

        &[data-status='open'] {
          transform: translateY(var(--modal-translate, 0px));
        }

        &[data-status='close'] {
          /*
           * Cancel the mount keyframe so the close transition can take over the
           * \`transform\`. If the sheet is dismissed (e.g. Esc) while the rising
           * keyframe is still running, the keyframe keeps owning \`transform\`
           * and the close transition never plays — the container would snap
           * while the dimmer fades. Dropping the animation hands \`transform\`
           * back to the transitioned base value (\`translateY(100%)\`).
           */
          animation: none;
          transform: translateY(100%);
        }

        [data-role='navigation-title'] {
          user-select: none;
        }

        &[data-status='open']:not([data-snap='peek']) {
          box-shadow: none;
        }

        &[data-status='open'][data-snap='peek'],
        &[data-status='open'][data-largest-undimmed-snap='half'][data-snap='half'] {
          box-shadow: ${BOTTOM_SHEET_SHADOW};
          transition:
            transform ${BOTTOM_SHEET_SETTLE_TRANSITION},
            box-shadow ${BOTTOM_SHEET_SETTLE_TRANSITION};
        }
      `;
  }
};

const modalContainerBottomResize = (
  variant: ModalContainerProps['variant'],
  resize: ModalContainerProps['resize'],
) => {
  if (variant !== 'bottom') return null;

  switch (resize) {
    case 'fill':
      return css`
        height: var(--modal-max-height, var(--modal-default-max-height));
      `;
    case 'flexible':
      /**
       * Make the sheet's DOM height equal its full-state height at every
       * non-half snap so the peek state translate (`100% - peekHeight`) is
       * computed against a stable, full-size container:
       * - full: height = max-height
       * - peek: height = max-height (same as full — translate slides it down)
       * - half: height = max-height / 2
       *
       * Mid-drag the inline height tracks the finger in real time so the
       * sheet itself grows or shrinks. On gesture release the spring drives
       * the settle (see hooks.ts:settleToSnap); for programmatic snap
       * changes the `BOTTOM_SHEET_SETTLE_TRANSITION` curve takes over.
       */
      return css`
        height: var(--modal-max-height, auto);
        transition:
          transform ${BOTTOM_SHEET_SETTLE_TRANSITION},
          height ${BOTTOM_SHEET_SETTLE_TRANSITION},
          box-shadow ${BOTTOM_SHEET_SETTLE_TRANSITION};

        &[data-snap='full'] {
          height: var(--modal-max-height, var(--modal-default-max-height));
        }

        &[data-snap='half'],
        &[data-snap='peek'] {
          height: var(
            --modal-max-height,
            calc(var(--modal-default-max-height) * 0.5)
          );
        }
      `;
    case 'fixed':
      return null;
    case 'hug':
    default:
      return css`
        height: var(--modal-max-height, auto);
      `;
  }
};

export const modalNavigationStyle =
  ({ background, variant, xs, sm, md, lg, xl }: ModalNavigationProps) =>
  (theme: Theme) => css`
    width: 100%;
    align-items: center;
    position: relative;
    background-color: transparent;

    ${modalNavigationBackgroundStyle({ variant, background }, theme)}
    ${modalNavigationVariant(variant)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.sx}
      `,
    )}
  `;

const modalNavigationBackgroundStyle = (
  { variant, background }: Pick<ModalNavigationProps, 'variant' | 'background'>,
  theme: Theme,
) => {
  if (!background) return;

  switch (variant) {
    case 'floating':
      return css`
        backdrop-filter: none;
        background-color: transparent;
      `;
    default:
      return css`
        ${theme.semantic.platform.ios.navigation}
      `;
  }
};

export const modalNavigationFloatingBackgroundStyle = (theme: Theme) => css`
  pointer-events: none;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 72px;
  z-index: 0;
  background: linear-gradient(
    to top,
    transparent,
    ${theme.semantic.surface.elevated.primary}
  );

  [data-role='modal-navigation-floating-background-layer'] {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    &:nth-child(1) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1) 10%,
        rgba(0, 0, 0, 1) 30%,
        rgba(0, 0, 0, 0) 40%
      );
      backdrop-filter: blur(1px);
    }

    &:nth-child(2) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 10%,
        rgba(0, 0, 0, 1) 20%,
        rgba(0, 0, 0, 1) 40%,
        rgba(0, 0, 0, 0) 50%
      );
      backdrop-filter: blur(2px);
    }

    &:nth-child(3) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 1) 40%,
        rgba(0, 0, 0, 1) 60%,
        rgba(0, 0, 0, 0) 70%
      );
      backdrop-filter: blur(4px);
    }

    &:nth-child(4) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 40%,
        rgba(0, 0, 0, 1) 60%,
        rgba(0, 0, 0, 1) 80%,
        rgba(0, 0, 0, 0) 90%
      );
      backdrop-filter: blur(6px);
    }

    &:nth-child(5) {
      mask: linear-gradient(to top, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%);
      backdrop-filter: blur(8px);
    }

    &:nth-child(6) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 70%,
        rgba(0, 0, 0, 1) 100%
      );
      backdrop-filter: blur(10px);
    }
  }
`;

const modalNavigationVariant = (variant: ModalNavigationProps['variant']) => {
  switch (variant) {
    case 'floating':
      return css`
        position: relative;
        height: fit-content;
      `;
  }
};

export const modalNavigationWrapperStyle = (
  variant: ModalNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
    case 'emphasized':
      return css`
        width: 100%;
        padding: var(--modal-navigation-padding-y, 24px)
          var(--modal-navigation-padding-x, 24px);
        justify-content: center;
        position: relative;
      `;

    case 'floating':
      return css`
        padding: var(--modal-navigation-padding-y, 24px)
          var(--modal-navigation-padding-x, 24px);
        top: 0px;
        left: 0px;
        position: absolute;
        justify-content: center;
        width: 100%;
      `;
    case 'search':
      return css`
        padding: var(--modal-navigation-padding-y, 24px)
          var(--modal-navigation-padding-x, 24px);
        gap: 12px;
        width: 100%;
        position: relative;
      `;
  }
};

export const modalNavigationContentStyle = (
  variant?: ModalNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
    case 'floating':
      return css`
        position: relative;
        width: 100%;
        justify-content: center;
        padding-block: 2px;
      `;
    case 'emphasized':
      return css`
        position: relative;
        width: 100%;
        justify-content: center;
        padding-block: 2px;
        gap: 16px;
      `;
    case 'search':
      return css`
        position: relative;
        width: 100%;
        justify-content: center;
        gap: 12px;
      `;
  }
};

export const modalNavigationTitleStyle = (
  variant?: ModalNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
    case 'floating':
    case 'emphasized':
      return css`
        width: 100%;
        justify-content: ${variant === 'emphasized' ? 'initial' : 'center'};
        max-height: 24px;
        padding: 0px 4px;

        h2 {
          width: var(
            --modal-navigation-title-width,
            ${variant === 'emphasized' ? 'initial' : '80%'}
          );
          text-align: center;
          ${ellipsisTypographyStyle(2)}
          -webkit-line-clamp: 1;
          word-break: keep-all;
          overflow-wrap: anywhere;
        }
      `;
    case 'search':
      return css`
        width: 100%;
        flex: 1 1 auto;
        padding: 0px;

        [data-component='search-field'] {
          width: 100%;
        }
      `;
  }
};

export const modalNavigationRightIconStyle = (
  variant?: ModalNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
      return css`
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
      `;
    case 'floating':
      return css`
        position: absolute;
        right: 0px;
        top: auto;
      `;
  }
};

export const modalNavigationLeftIconStyle = (
  variant?: ModalNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
      return css`
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
      `;
    case 'floating':
      return css`
        position: absolute;
        left: 0px;
        top: auto;
      `;
  }
};

/*
 * Lays the 36px background button out in the same 24×24 slot as the normal
 * button (whose interaction area overflows its 24px icon), overflowing it from
 * the center so toggling `background` doesn't shift the icon.
 */
export const modalNavigationBackgroundButtonStyle = css`
  flex-shrink: 0;
  margin: -6px;
`;

export const modalNavigationButtonTextStyle = css`
  padding: 0px;
  flex-shrink: 0;
  min-height: initial;

  & > span {
    ${typographyStyle('headline2', 'regular')}
  }

  [data-component='with-interaction'] {
    height: calc(100% + 8px);
  }
`;

export const modalGrabberStyle = (theme: Theme) => css`
  min-width: inherit;
  position: absolute;
  padding: 7px 2px;
  width: 100%;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  touch-action: pan-y;
  user-select: none;

  &::before {
    content: '';
    background-color: ${theme.semantic.surface.elevated.primary};
    width: 100%;
    height: calc(100% - 7px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &::after {
    content: '';
    border-radius: 1000px;
    width: 40px;
    height: 5px;
    margin: 0 auto;
    display: block;
    background-color: ${theme.semantic.surface.neutral.strong};
  }
`;

export const modalContentStyle =
  ({
    gap,
    verticalPadding,
    horizontalPadding,
    xs,
    sm,
    md,
    lg,
    xl,
  }: ModalContentProps) =>
  (theme: Theme) => css`
    width: 100%;
    ${modalContentMarginStyle({ gap, verticalPadding, horizontalPadding })}

    ${verticalPadding === undefined &&
    css`
      padding-top: var(--modal-content-default-padding-top, 0px);
      padding-bottom: var(--modal-content-default-padding-bottom, 0px);
    `}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${modalContentMarginStyle({
          gap: params?.gap,
          verticalPadding: params?.verticalPadding,
          horizontalPadding: params?.horizontalPadding,
        })}
        ${params?.sx}
      `,
    )}
  `;

const modalContentMarginStyle = ({
  gap,
  verticalPadding,
  horizontalPadding,
}: Pick<
  ModalContentProps,
  'gap' | 'verticalPadding' | 'horizontalPadding'
>) => {
  const getVerticalPaddingStyle = () => {
    switch (verticalPadding) {
      case 'top-only':
        return css`
          padding-top: var(--modal-content-margin-y, 24px);
          padding-bottom: 0px;
        `;
      case 'bottom-only':
        return css`
          padding-top: 0px;
          padding-bottom: var(--modal-content-margin-y, 24px);
        `;
      case 'both':
        return css`
          padding-top: var(--modal-content-margin-y, 24px);
          padding-bottom: var(--modal-content-margin-y, 24px);
        `;
      case 'none':
        return css`
          padding-top: 0px;
          padding-bottom: 0px;
        `;
    }
  };

  const getHorizontalPaddingStyle = () => {
    switch (horizontalPadding) {
      case 'both':
        return css`
          padding-left: var(--modal-content-margin-x, 20px);
          padding-right: var(--modal-content-margin-x, 20px);
        `;
      case 'none':
        return css`
          padding-left: 0px;
          padding-right: 0px;
        `;
    }
  };

  return css`
    ${getVerticalPaddingStyle()}
    ${getHorizontalPaddingStyle()}

   ${gap !== undefined &&
    css`
      gap: ${toCssValue(gap)};
    `}
  `;
};
