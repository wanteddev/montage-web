import { css, keyframes } from '@wanteddev/wds-engine';

import type { AccordionSummaryContentProps } from './types';

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

export const accordionSummaryContentStyle = ({
  expanded,
  disableAnimation,
  rotate,
  variant,
}: {
  rotate: boolean;
  expanded: boolean;
  disableAnimation: boolean;
  variant: AccordionSummaryContentProps['variant'];
}) => css`
  min-width: 20px;
  font-size: 20px;
  min-height: 24px;
  z-index: 1;

  ${variant === 'icon' &&
  css`
    &[data-role='list-item-trailing-content'],
    &[data-role='accordion-summary-expand-icon'] {
      padding: 2px 0px;
    }

    &:not(
        :is(
            [data-role='list-item-trailing-content'],
            [data-role='accordion-summary-expand-icon']
          )
      ) {
      padding: 2px;
    }
  `}

  [wds-component='icon-button'] {
    width: 100%;
    height: 100%;
  }

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
    height: var(--wds-accordion-height);
    overflow: var(--wds-accordion-overflow);
  }
`;

const unmountKeyframes = keyframes`
  from {
    height: var(--wds-accordion-height);
    overflow: var(--wds-accordion-overflow);
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
  padding-top: calc(16px - var(--wds-list-cell-vertical-padding, 16px));
  padding-bottom: var(--wds-list-cell-vertical-padding, 16px);
  padding-left: calc(var(--wds-list-cell-horizontal-padding, 0px));
  padding-right: calc(var(--wds-list-cell-horizontal-padding, 0px));
`;

export const accordionDividerStyle = ({
  disableAnimation,
}: {
  disableAnimation: boolean;
}) => css`
  margin: 0 auto;
  width: calc(100% - (var(--wds-list-cell-horizontal-padding, 0px) * 2));
  will-change: opacity;

  ${!disableAnimation &&
  css`
    transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  `}
`;

export const accordionContentStyle = css`
  margin-top: var(--wds-list-cell-vertical-padding, 16px);
`;
