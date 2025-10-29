import { css, respondTo, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const paletteWrapperStyle = css`
  display: grid;
  grid-gap: 24px 0px;
  grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));

  ${respondTo('860px')} {
    grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
  }
`;

export const paletteColorStyle = (theme: Theme) => css`
  width: 100%;
  height: 32px;
  border: none;
  position: relative;
  transform-origin: bottom;
  background-color: transparent;
  transition: transform 0.3s ease;

  &:hover,
  &[aria-expanded='true'] {
    transform: scaleY(1.25);
  }

  &::after {
    content: '';
    position: absolute;
    transform: translate3d(0, 0, 0);
    inset: 0;
    pointer-events: none;
    z-index: -1;
    width: 100%;
    height: 100%;
    will-change: transform;
    background-color: ${theme.semantic.background.normal.normal};
    border-radius: inherit;
    background-image: linear-gradient(
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
      calc(var(--background-position-x) * -1)
        calc(var(--background-position-y) * -1),
      calc(10px - var(--background-position-x))
        calc(var(--background-position-y) * -1),
      calc(10px - var(--background-position-x))
        calc(10px - var(--background-position-y)),
      calc(var(--background-position-x) * -1)
        calc(10px - var(--background-position-y));
    background-size: 20px 20px;
  }
`;

export const paletteColorBackgroundStyle = (theme: Theme) => css`
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  border-style: solid;
  border-color: ${theme.semantic.line.normal.alternative};
  border-left-width: var(--border-left);
  border-right-width: var(--border-right);
  border-top-width: 1px;
  border-bottom-width: 1px;
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
