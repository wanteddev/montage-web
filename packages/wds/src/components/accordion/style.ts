import { css } from '@wanteddev/wds-engine';

export const accordionStyle = ({ disabled }: { disabled: boolean }) => css`
  & > *:not([data-role='accordion-divider']) {
    opacity: ${disabled ? 0.2 : 1};
  }
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
  expanded,
}: {
  expanded: boolean;
}) => css`
  display: grid;
  grid-template-rows: 0fr;
  will-change: grid-template-rows;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${expanded &&
  css`
    grid-template-rows: 1fr;
  `}

  > div {
    overflow: hidden;
  }
`;

export const accordionDetailsWrapperStyle = css`
  flex-direction: column;
  gap: var(--wds-list-cell-padding, 16px);
  padding-top: calc(16px - var(--wds-list-cell-padding, 16px));
  padding-bottom: var(--wds-list-cell-padding, 16px);
  padding-left: var(--wds-list-cell-fill-width-padding, 0px);
  padding-right: var(--wds-list-cell-fill-width-padding, 0px);
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
