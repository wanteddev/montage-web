import { css, respondMore, respondTo, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionVariantsDemoStyle = (theme: Theme) => css`
  aspect-ratio: 1/1;
  width: 100%;

  ${respondMore(theme.breakpoint.sm)} {
    width: calc(100% - 280px - 12px);
  }
`;

export const sectionVariantsStyle = (theme: Theme) => css`
  padding: 12px;
  border-radius: 24px;
  background-color: ${theme.semantic.fill.alternative};
  border: 1px solid ${theme.semantic.line.normal.alternative};
  position: relative;
`;

export const sectionVariantsControlStyle = (theme: Theme) => css`
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
  background-color: ${theme.semantic.background.elevated.normal};
  border-radius: 20px;
  display: flex;
  position: absolute !important;
  height: calc(100% - 24px);
  right: 12px;
  top: 12px;

  ${respondTo(theme.breakpoint.sm)} {
    display: none;
  }

  [data-radix-scroll-area-content] {
    padding: 32px;
    width: 280px;
  }
`;

export const sectionVariantsControlMobileTriggerStyle = (theme: Theme) => css`
  display: flex;
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 1;

  &[aria-expanded='true'] {
    & > [wds-component='with-interaction'] {
      opacity: 0.0375;
    }
  }

  ${respondMore(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const sectionVariantsControlMobileStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.elevated.normal};
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
  width: 280px;
  border-radius: 16px;
  max-height: 400px;
  padding: 0px;
  filter: none;
  padding: 0px 2px;

  [data-radix-scroll-area-content] {
    padding: 32px 30px;
    display: flex;
    flex-direction: column;
    gap: 28px;
    width: 100%;
  }
`;

export const sectionVariantsItemRadioStyle = (theme: Theme) => css`
  && {
    color: ${theme.semantic.label.alternative};
    ${typographyStyle('label1', 'bold')}
    &[data-selected='true'] {
      color: ${theme.semantic.label.normal};
    }

    &[data-disabled='true'] {
      color: ${theme.semantic.label.disable};
    }
  }
`;
