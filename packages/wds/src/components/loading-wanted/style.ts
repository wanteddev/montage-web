import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils';

import type { LoadingWantedProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const loadingWantedStyle =
  ({ size, xl, lg, md, sm, xs }: LoadingWantedProps) =>
  (theme: Theme) => css`
    --wds-loading-wanted-padding: 16px;
    --wds-loading-wanted-size: ${size};

    width: calc(
      var(--wds-loading-wanted-size) + var(--wds-loading-wanted-padding) * 2
    );
    height: calc(
      var(--wds-loading-wanted-size) + var(--wds-loading-wanted-padding) * 2
    );
    padding: var(--wds-loading-wanted-padding);
    margin: 0 auto;

    ${createResponsiveStyle(
      { xl, lg, md, sm, xs },
      theme,
    )(
      (params) => css`
        --wds-loading-wanted-size: ${params?.size};
        ${params?.sx}
      `,
    )}
  `;

export const wantedAnimatedSvgStyle = (theme: Theme) => css`
  --time: 0.9;
  --color-alias-accent-pink: ${theme.palette.pink[60]};
  --color-alias-accent-redOrange: ${theme.palette.redOrange[50]};

  @media (prefers-color-scheme: dark) {
    --color-alias-accent-pink: ${theme.palette.pink[70]};
    --color-alias-accent-redOrange: ${theme.palette.redOrange[60]};
  }

  width: 100%;
  height: 100%;
  fill: ${theme.palette.primary.normal};
  animation: animation-circular-color calc(var(--time) * 4s)
    calc(var(--time) * 0.5s) linear infinite;

  &,
  * {
    transform-origin: center;
  }

  g {
    animation:
      animation-circular-start calc(var(--time) * 0.5s)
        cubic-bezier(0.5, 0, 0.5, 1),
      animation-circular-rotate calc(var(--time) * 2s) linear infinite;
  }

  g path {
    will-change: transform;
    animation: animation-circular-bounce calc(var(--time) * 3s)
      cubic-bezier(0.8, 0, 0.2, 1) infinite;
    transform: scale(0);
  }

  g path.circle {
    animation:
      animation-circular-bounce calc(var(--time) * 3s)
        cubic-bezier(0.5, 0, 0.5, 1),
      animation-circular-bounce calc(var(--time) * 3s) calc(var(--time) * 3s)
        cubic-bezier(0.8, 0, 0.2, 1) infinite;
  }

  g path.triangle {
    animation-delay: calc(var(--time) * 1s);
  }

  g path.square {
    animation-delay: calc(var(--time) * 2s);
  }

  @keyframes animation-circular-start {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes animation-circular-color {
    0%,
    100% {
      fill: ${theme.palette.primary.normal};
    }
    25%,
    75% {
      fill: var(--color-alias-accent-pink);
    }
    50% {
      fill: var(--color-alias-accent-redOrange);
    }
  }

  @keyframes animation-circular-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animation-circular-bounce {
    0%,
    66.6666666667%,
    100% {
      transform: scale(0);
    }
    33.3333333333% {
      transform: scale(1);
    }
  }
`;
