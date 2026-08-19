import { css, keyframes } from '@montage-ui/engine';

import type { Theme } from '@montage-ui/engine';

export const accordionStyle = ({
  disabled,
  expanded,
}: {
  disabled: boolean;
  expanded: boolean;
}) => css`
  & > *:not([data-role='accordion-divider']) {
    opacity: ${disabled ? 0.2 : 1};
  }

  ${!expanded &&
  css`
    @media (pointer: fine) {
      &:has(:hover),
      &:hover {
        :not(:has([data-disable-interaction='true'])) {
          [data-role='accordion-divider'] {
            opacity: 0;
          }
        }
      }
    }

    &:has(:hover),
    &:has(:active),
    &:hover,
    &:active {
      :not(:has([data-disable-interaction='true'])) {
        [data-role='accordion-divider'] {
          opacity: 0;
        }
      }
    }
  `}
`;

export const accordionSummaryStyle = ({
  disabled,
}: {
  disabled: boolean;
}) => css`
  ${!disabled &&
  css`
    cursor: pointer;
  `}
`;

export const accordionSummaryTextStyle = css`
  min-height: 24px;
  justify-content: center;
`;

export const accordionSummaryContentStyle =
  ({
    expanded,
    disableAnimation,
    rotate,
  }: {
    rotate: boolean;
    expanded: boolean;
    disableAnimation: boolean;
  }) =>
  (theme: Theme) => css`
    min-width: ${theme.dimension[20]};
    font-size: ${theme.dimension[20]};
    min-height: ${theme.dimension[24]};
    align-items: center;
    justify-content: center;
    z-index: 1;

    ${rotate &&
    css`
      will-change: transform;
      transform: rotate(0deg);

      ${!disableAnimation &&
      css`
        transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      `}

      ${expanded &&
      css`
        transform: rotate(180deg);
      `}
    `}
  `;

const mountKeyframes = keyframes`
  from {
    height: 0px;
    overflow: hidden;
  }
  to {
    height: var(--accordion-height);
    overflow: var(--accordion-overflow);
  }
`;

const unmountKeyframes = keyframes`
  from {
    height: var(--accordion-height);
    overflow: var(--accordion-overflow);
  }

  to {
    height: 0px;
    overflow: hidden;
  }
`;

export const accordionDetailsStyle = ({
  shouldAnimate,
  disableAnimation,
}: {
  shouldAnimate: boolean;
  disableAnimation: boolean;
}) => css`
  will-change: height, overflow;
  height: initial;
  overflow: visible;
  &[data-status='close'] {
    height: 0px;
    overflow: hidden;
  }

  ${!disableAnimation &&
  shouldAnimate &&
  css`
    &[data-status='open'] {
      animation: ${mountKeyframes} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    &[data-status='close'] {
      animation: ${unmountKeyframes} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  `}
`;

export const accordionDetailsWrapperStyle = css`
  flex-direction: column;
  padding-top: calc(16px - var(--list-cell-vertical-padding, 16px));
  padding-bottom: var(--list-cell-vertical-padding, 16px);
  padding-left: calc(var(--list-cell-horizontal-padding, 0px));
  padding-right: calc(var(--list-cell-horizontal-padding, 0px));
`;

export const accordionDividerStyle = ({
  disableAnimation,
}: {
  disableAnimation: boolean;
}) => css`
  margin: 0 auto;
  width: calc(100% - (var(--list-cell-horizontal-padding, 0px) * 2));

  ${!disableAnimation &&
  css`
    transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  `}
`;

export const accordionContentStyle = css`
  margin-top: var(--list-cell-vertical-padding, 16px);
`;
