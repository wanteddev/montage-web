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
  disableExpandIconAnimation,
}: {
  expanded: boolean;
  disableExpandIconAnimation: boolean;
}) => css`
  min-width: 20px;
  max-width: 20px;
  font-size: 20px;
  height: 20px;
  z-index: 1;

  ${!disableExpandIconAnimation &&
  css`
    will-change: transform;
    transform: rotate(0deg);
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

    ${expanded &&
    css`
      transform: rotate(180deg);
    `}
  `}

  [wds-component='icon-button'] {
    width: 100%;
    height: 100%;
  }
`;

export const accordionDetailsStyle = ({
  initialExpanded,
}: {
  initialExpanded: boolean;
}) => css`
  will-change: height, overflow;
  transition:
    height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    overflow;

  ${initialExpanded
    ? css`
        height: auto;
        overflow: visible;
      `
    : css`
        overflow: hidden;
        height: 0px;
      `}
`;

export const accordionDetailsWrapperStyle = css`
  flex-direction: column;
  padding-top: calc(16px - var(--wds-list-cell-padding, 16px));
  padding-bottom: var(--wds-list-cell-padding, 16px);
  padding-left: calc(var(--wds-list-cell-fill-width-padding, 0px));
  padding-right: calc(var(--wds-list-cell-fill-width-padding, 0px));
`;

export const accordionDividerStyle = ({
  expanded,
}: {
  expanded: boolean;
}) => css`
  margin: 0 auto;
  width: calc(100% - (var(--wds-list-cell-fill-width-padding, 0px) * 2));
  will-change: opacity;
  transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

  ${!expanded &&
  css`
    &:hover,
    &:active {
      opacity: 0;
    }
  `}
`;

export const accordionContentStyle = css`
  margin-top: var(--wds-list-cell-padding, 16px);
`;
