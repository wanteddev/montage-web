import { css, respondTo, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const paletteWrapperStyle = (theme: Theme) => css`
  & > * {
    flex: 1 1 0;
  }

  ${respondTo('860px')} {
    & > * {
      min-width: 20%;
    }
  }

  ${respondTo(theme.breakpoint.sm)} {
    & > * {
      min-width: 33%;
    }
  }
`;

export const paletteColorStyle = (theme: Theme) => css`
  width: 100%;
  height: 32px;
  border: none;
  position: relative;
  background-color: transparent;

  &:hover,
  &[aria-expanded='true'] {
    &::after {
      height: calc(100% + 8px);
    }
  }

  &::after {
    content: '';
    position: absolute;
    transition: height 0.3s ease;
    left: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border-style: solid;
    border-color: ${theme.semantic.line.normal.alternative};
    border-left-width: var(--border-left);
    border-right-width: var(--border-right);
    border-top-width: 1px;
    border-bottom-width: 1px;
    background-color: ${theme.semantic.background.normal.normal};
    background-image: var(--background-color),
      linear-gradient(
        45deg,
        ${theme.semantic.background.normal.alternative} 25%,
        transparent 25%
      ),
      linear-gradient(
        135deg,
        ${theme.semantic.background.normal.alternative} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        transparent 75%,
        ${theme.semantic.background.normal.alternative} 75%
      ),
      linear-gradient(
        135deg,
        transparent 75%,
        ${theme.semantic.background.normal.alternative} 75%
      );
    background-position:
      0 0,
      calc(var(--background-position-x) * -1)
        calc(var(--background-position-y) * -1),
      calc(10px - var(--background-position-x))
        calc(var(--background-position-y) * -1),
      calc(10px - var(--background-position-x))
        calc(10px - var(--background-position-y)),
      calc(var(--background-position-x) * -1)
        calc(10px - var(--background-position-y));
    background-size:
      100% 100%,
      20px 20px,
      20px 20px,
      20px 20px,
      20px 20px;
  }
`;

export const paletteInfoTableStyle = (theme: Theme) => css`
  border: none;
  padding: 0;

  th,
  td {
    border: none;
    padding: 0 0 8px 0;
    color: ${theme.semantic.label.neutral};
    text-align: left;
    vertical-align: top;
    ${typographyStyle('label1', 'medium')}
  }

  td {
    padding-left: 16px;
  }

  tr:last-of-type {
    td,
    th {
      padding-bottom: 0px;
    }
  }
`;

export const tokenItemStyle = (theme: Theme) => css`
  width: 16px;
  margin-top: 3px;
  height: 16px;
  border-radius: 16px;
  box-shadow: inset 0 0 0 1px ${theme.semantic.label.assistive};
  flex-shrink: 0;
`;
