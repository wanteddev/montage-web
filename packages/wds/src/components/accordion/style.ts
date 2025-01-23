import { css } from '@wanteddev/wds-engine';

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

  [data-role='accordion-divider'] {
    will-change: opacity;
    transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  ${!expanded &&
  css`
    &:hover,
    &:active {
      [data-role='accordion-divider'] {
        opacity: 0;
      }
    }
  `}
`;

export const accordionSummaryStyle = css`
  & ~ [wds-component='accordion-details'] {
    --wds-accordion-details-padding-top: calc(
      16px - var(--wds-list-cell-padding, 16px)
    );
    --wds-accordion-details-padding-bottom: var(--wds-list-cell-padding, 16px);
    --wds-accordion-details-gap: var(--wds-list-cell-padding, 16px);
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

export const accordionDetailsBoxStyle = () => css`
  flex-direction: column;
  gap: var(--wds-accordion-details-gap);
  padding-top: var(--wds-accordion-details-padding-top);
  padding-bottom: var(--wds-accordion-details-padding-bottom);
`;
