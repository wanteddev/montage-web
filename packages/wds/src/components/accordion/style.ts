import { css } from '@wanteddev/wds-engine';

export const accordionStyle = ({ disabled }: { disabled: boolean }) => css`
  & > *:not([data-role='accordion-divider']) {
    opacity: ${disabled ? 0.2 : 1};
  }
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
}: {
  rotate: boolean;
  expanded: boolean;
  disableAnimation: boolean;
}) => css`
  min-width: 20px;
  max-width: 20px;
  font-size: 20px;
  height: 20px;
  z-index: 1;

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

export const accordionDetailsStyle = ({
  initialExpanded,
  disableAnimation,
}: {
  initialExpanded: boolean;
  disableAnimation: boolean;
}) => css`
  will-change: height, overflow;

  ${!disableAnimation &&
  css`
    transition:
      height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      overflow;
  `}

  ${initialExpanded
    ? css`
        overflow: visible;
        height: initial;
      `
    : css`
        overflow: hidden;
        height: 0;
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
  expanded,
  disableAnimation,
}: {
  expanded: boolean;
  disableAnimation: boolean;
}) => css`
  margin: 0 auto;
  width: calc(100% - (var(--wds-list-cell-horizontal-padding, 0px) * 2));
  will-change: opacity;

  ${!disableAnimation &&
  css`
    transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  `}

  ${!expanded &&
  css`
    &:hover,
    &:active {
      opacity: 0;
    }
  `}
`;

export const accordionContentStyle = css`
  margin-top: var(--wds-list-cell-vertical-padding, 16px);
`;
