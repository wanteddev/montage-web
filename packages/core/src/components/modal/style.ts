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
  background-color: ${theme.semantic.material.dimmer};

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

    &[data-snap='peek'],
    &[data-largest-undimmed-snap='half'][data-snap='half'] {
      pointer-events: none;
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

        [data-role='modal-container-scroll-area']:has(
          [data-component='top-navigation'][data-variant='floating']
        ) {
          background: initial;
          will-change: unset;
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

        [data-role='modal-container-scroll-area']:has(
          [data-component='top-navigation'][data-variant='floating']
        ) {
          background: initial;
          will-change: unset;
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

        [data-role='modal-container-scroll-area']:has(
          [data-component='top-navigation'][data-variant='floating']
        ) {
          background: inherit;
          will-change: backdrop-filter;
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
    background-color: ${theme.semantic.background.elevated.normal};

    [data-component='top-navigation'] {
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
    case 'small':
      return css`
        width: 360px;
        min-width: 320px;
        max-width: 100%;
        height: initial;
        max-height: 100%;

        ${resize === 'fixed' &&
        css`
          height: 400px;
        `}

        --modal-popup-border-radius: 12px;
        --modal-content-margin: 20px;
        --top-navigation-padding-x: 16px;
        --top-navigation-padding-y: 16px;
        --top-navigation-padding: var(--top-navigation-padding-y)
          var(--top-navigation-padding-x);
        --top-navigation-min-height: 56px;
        --action-area-margin-x: var(--modal-content-margin);
        --action-area-margin-y: var(--modal-content-margin);

        [data-component='top-navigation'] {
          --tab-list-padding: var(--modal-content-margin);
        }

        [data-role='action-area-extra-content'] {
          margin-top: calc(
            var(--action-area-margin-x) - var(--action-area-margin-y)
          );
          margin-bottom: calc(4px + var(--action-area-margin-y, 20px));
        }

        [data-role='navigation-title'] {
          padding: 0px 4px;
        }
      `;
    case 'medium':
      return css`
        width: 400px;
        min-width: 320px;
        max-width: 100%;
        height: initial;
        max-height: 100%;

        ${resize === 'fixed' &&
        css`
          height: 480px;
        `}

        --modal-popup-border-radius: 12px;
        --modal-content-margin: 20px;
        --top-navigation-padding-x: 16px;
        --top-navigation-padding-y: 20px;
        --top-navigation-padding: var(--top-navigation-padding-y)
          var(--top-navigation-padding-x);
        --top-navigation-min-height: 64px;
        --action-area-margin-x: var(--modal-content-margin);
        --action-area-margin-y: var(--modal-content-margin);

        [data-component='top-navigation'] {
          --tab-list-padding: var(--modal-content-margin);
        }

        [data-role='action-area-extra-content'] {
          margin-top: calc(
            var(--action-area-margin-x) - var(--action-area-margin-y)
          );
          margin-bottom: calc(4px + var(--action-area-margin-y, 20px));
        }

        [data-role='navigation-title'] {
          padding: 0px 4px;
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

        --modal-popup-border-radius: 20px;
        --modal-content-margin: 24px;
        --top-navigation-padding-x: 20px;
        --top-navigation-padding-y: 20px;
        --top-navigation-padding: var(--top-navigation-padding-y)
          var(--top-navigation-padding-x);
        --top-navigation-min-height: 64px;
        --action-area-margin-x: var(--modal-content-margin);
        --action-area-margin-y: var(--modal-content-margin);

        [data-component='top-navigation'] {
          --tab-list-padding: var(--modal-content-margin);
        }

        [data-role='action-area-extra-content'] {
          margin-top: calc(
            var(--action-area-margin-x) - var(--action-area-margin-y)
          );
          margin-bottom: var(--action-area-margin-y);
        }

        [data-role='navigation-title'] {
          padding: 0px 4px;
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

        --modal-popup-border-radius: 20px;
        --modal-content-margin: 32px;
        --top-navigation-padding-x: 28px;
        --top-navigation-padding-y: 24px;
        --top-navigation-padding: var(--top-navigation-padding-y)
          var(--top-navigation-padding-x);
        --top-navigation-min-height: 72px;
        --action-area-margin-x: var(--modal-content-margin);
        --action-area-margin-y: 24px;
        --action-area-extra-content-margin: var(--action-area-margin, 20px);

        [data-component='top-navigation'] {
          --tab-list-padding: var(--modal-content-margin);
        }

        [data-role='action-area-extra-content'] {
          margin-top: calc(
            var(--action-area-margin-x) - var(--action-area-margin-y)
          );
          margin-bottom: var(--action-area-margin-y);
        }

        [data-role='navigation-title'] {
          padding: 0px 4px;
        }
      `;
  }
};

const modalContainerVariant = (variant: ModalContainerProps['variant']) => {
  switch (variant) {
    case 'full':
      return css`
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
        border-radius: var(--modal-popup-border-radius, 12px);
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
        padding: 0px 0px env(safe-area-inset-bottom, 0px) 0px;
        height: var(--modal-max-height, auto);
        max-height: var(--modal-max-height, var(--modal-default-max-height));
        border-radius: 12px 12px 0px 0px;
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
    case 'hug':
    default:
      return null;
  }
};

export const modalNavigationStyle = ({ variant }: ModalNavigationProps) => {
  switch (variant) {
    case 'emphasized':
      return css`
        [data-role='top-navigation-wrapper'] {
          padding: var(--top-navigation-padding-y, 16px)
            var(--top-navigation-padding-x, 16px);
          min-height: var(--top-navigation-min-height, 64px);
          gap: 16px;
          width: 100%;
          justify-content: initial;
        }

        [data-role='top-navigation-leading-content-wrapper'],
        [data-role='top-navigation-trailing-content-wrapper'] {
          flex: 0 0 auto;
          position: relative;
          right: initial;
          top: initial;
          left: initial;
        }

        [data-role='navigation-title'] {
          flex: 1 1 auto;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          max-height: 24px;
          width: initial;
          justify-content: initial;

          h2 {
            width: initial;
            ${typographyStyle('heading2', 'bold')}
            ${ellipsisTypographyStyle(2)}
          -webkit-line-clamp: 1;
          }
        }
      `;
  }
};

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

  &::before {
    content: '';
    background-color: ${theme.semantic.background.elevated.normal};
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
    background-color: ${theme.semantic.fill.strong};
  }
`;

export const modalContentStyle =
  ({ gap, xs, sm, md, lg, xl }: ModalContentProps) =>
  (theme: Theme) => css`
    width: 100%;
    padding-top: var(--modal-content-margin, 20px);
    padding-bottom: var(--modal-content-margin, 20px);

    ${gap !== undefined
      ? css`
          gap: calc(var(--modal-content-margin, 20px));
        `
      : css`
          gap: ${toCssValue(gap)};
        `}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.gap !== undefined &&
        css`
          gap: ${toCssValue(params.gap)};
        `}
        ${params?.sx}
      `,
    )}
  `;

export const modalContentItemStyle = () => css`
  padding: 0px calc(var(--modal-content-margin, 20px));
`;
