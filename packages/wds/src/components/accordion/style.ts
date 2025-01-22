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

    [data-padding='16px'] ~ [wds-component='accordion-details'] {
      --wds-accordion-details-padding-top: 0;
      --wds-accordion-details-padding-bottom: 16px;
      --wds-accordion-details-gap: 16px;
    }

    [data-padding='12px'] ~ [wds-component='accordion-details'] {
      --wds-accordion-details-padding-top: 4px;
      --wds-accordion-details-padding-bottom: 12px;
      --wds-accordion-details-gap: 12px;
    }

    [data-padding='8px'] ~ [wds-component='accordion-details'] {
      --wds-accordion-details-padding-top: 8px;
      --wds-accordion-details-padding-bottom: 8px;
      --wds-accordion-details-gap: 8px;
    }
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

  [wds-component='list-item-content'] {
    min-width: 20px;
    max-width: 20px;
    font-size: 20px;
    height: 20px;

    [wds-component='icon-button'] {
      width: 100%;
      height: 100%;
    }
  }

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
