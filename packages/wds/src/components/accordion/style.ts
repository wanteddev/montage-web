import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const accordionStyle =
  ({ disabled, divider }: { disabled: boolean; divider: boolean }) =>
  (theme: Theme) => css`
    opacity: ${disabled ? 0.2 : 1};

    ${divider &&
    css`
      border-bottom: 1px solid ${theme.palette.line.normal.alternative};
    `}
  `;

export const accordionSummaryStyle = ({
  expanded,
  disableListCellInteraction,
  disableExpandIconAnimation,
}: {
  expanded: boolean;
  disableListCellInteraction: boolean;
  disableExpandIconAnimation: boolean;
}) => css`
  ${disableListCellInteraction &&
  css`
    cursor: initial;

    > [wds-component='with-interaction'] {
      display: none;
    }
  `}

  ${!disableExpandIconAnimation &&
  css`
    [wds-component='list-item-content'] {
      will-change: transform;
      transform: rotate(0deg);
      transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

      ${expanded &&
      css`
        transform: rotate(180deg);
      `}
    }
  `}

  & ~ [wds-component='accordion-details'] {
    --wds-accordion-details-padding-top: calc(
      16px - var(--wds-list-cell-padding, 16px)
    );
    --wds-accordion-details-padding-bottom: var(--wds-list-cell-padding, 16px);
    --wds-accordion-details-gap: var(--wds-list-cell-padding, 16px);
  }
`;

export const accordionSummaryContentStyle = css`
  min-width: 20px;
  max-width: 20px;
  font-size: 20px;
  height: 20px;

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
