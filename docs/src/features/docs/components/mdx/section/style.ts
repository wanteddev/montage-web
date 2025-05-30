import {
  addOpacity,
  css,
  respondMore,
  respondTo,
  typographyStyle,
} from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionLayoutStyle = css`
  && {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0px;
      padding-top: 0px;
      border: none;
    }
  }

  margin-bottom: 120px;

  ${respondTo('620px')} {
    margin-bottom: 108px;
  }

  [data-role='section-figure-group']:first-of-type {
    margin-top: 24px;
  }
`;

export const sectionFigureStyle = css`
  && {
    p {
      margin: 0;
      padding: 0;
    }
  }
`;

export const sectionFigureThumbnailStyle = (theme: Theme) => css`
  width: 100%;
  margin-bottom: 24px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${theme.semantic.line.normal.alternative};

  img {
    border-radius: initial;
  }
`;

export const sectionFigureVariantStyle =
  (variant: 'positive' | 'negative') => (theme: Theme) => css`
    padding: 20px;
    border-radius: 6px;
    background-color: ${addOpacity(
      variant === 'positive'
        ? theme.semantic.status.positive
        : theme.semantic.status.negative,
      theme.opacity[5],
    )};
    color: ${variant === 'positive'
      ? theme.semantic.status.positive
      : theme.semantic.status.negative};
  `;

export const customizeStyle = css`
  padding: 24px 20px;
  gap: 20px;
  align-items: center;
  flex-direction: row;

  ${respondTo('620px')} {
    padding: 24px 0px;
    flex-direction: column;
    align-items: initial;
  }
`;

export const sectionHierarchyItemStyle = (theme: Theme) => css`
  padding: 20px 0px;
  gap: 32px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${theme.semantic.line.normal.alternative};

  ${respondTo('620px')} {
    flex-direction: column;
    gap: 20px;
    align-items: initial;
  }

  &:last-of-type {
    border: none;
  }
`;

export const sectionVariantsStyle = (theme: Theme) => css`
  padding: 12px;
  border-radius: 6px;
  background-color: ${theme.semantic.fill.alternative};
  border: 1px solid ${theme.semantic.line.normal.alternative};
  position: relative;
`;

export const sectionVariantsControlStyle = (theme: Theme) => css`
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
  background-color: ${theme.semantic.background.elevated.normal};
  padding: 32px 32px 12px;
  width: 280px;
  border-radius: 4px;
  display: flex;

  ${respondTo(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const sectionVariantsControlMobileTriggerStyle = (theme: Theme) => css`
  display: flex;
  position: absolute;
  right: 24px;
  top: 24px;

  ${respondMore(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const sectionVariantsControlMobileStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.elevated.normal};
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
  width: 280px;
  border-radius: 4px;
  height: 400px;
  padding: 0px;
  filter: none;

  [data-radix-scroll-area-content] {
    padding: 32px 32px 12px;
    display: flex;
    flex-direction: column;
    gap: 32px;
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
  }
`;
