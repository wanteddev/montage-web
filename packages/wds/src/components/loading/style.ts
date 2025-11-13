import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { LoadingProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const loadingStyle =
  ({ size, xl, lg, md, sm, xs }: LoadingProps) =>
  (theme: Theme) => css`
    width: ${size};
    height: ${size};
    margin: 0 auto;

    ${createResponsiveStyle(
      { xl, lg, md, sm, xs },
      theme,
    )(
      (params) => css`
        ${params?.size !== undefined &&
        css`
          width: ${params.size};
          height: ${params.size};
        `}
        ${params?.sx}
      `,
    )}
  `;

export const loadingCircularAnimatedSvgStyle = (theme: Theme) => css`
  @keyframes array {
    0%,
    25%,
    50%,
    75%,
    100% {
      stroke-dasharray: 0 78.5398163397;
    }

    12.5%,
    37.5%,
    62.5%,
    87.5% {
      stroke-dasharray: 58.9048622548 19.6349540849;
    }
  }

  @keyframes offset {
    0%,
    12.5% {
      stroke-dashoffset: 0;
    }

    25%,
    37.5% {
      stroke-dashoffset: -58.9048622548;
    }

    50%,
    62.5% {
      stroke-dashoffset: -117.8097245096;
    }

    75%,
    87.5% {
      stroke-dashoffset: -176.7145867644;
    }

    100% {
      stroke-dashoffset: -235.6195;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  circle {
    fill: none;
    stroke: ${theme.semantic.line.solid.normal};
    stroke-width: 3;
    stroke-linecap: round;
    transform-origin: center center;
    animation:
      array 5.3333s ease infinite,
      offset 5.3333s ease infinite,
      rotate 2.2s linear infinite;
  }
`;

export const loadingWantedAnimatedSvgStyle = (theme: Theme) => css`
  --time: 0.9;
  --color-alias-accent-pink: ${theme.atomic.pink[60]};
  --color-alias-accent-redOrange: ${theme.atomic.redOrange[50]};

  @media (prefers-color-scheme: dark) {
    --color-alias-accent-pink: ${theme.atomic.pink[70]};
    --color-alias-accent-redOrange: ${theme.atomic.redOrange[60]};
  }

  width: 100%;
  height: 100%;
  fill: ${theme.semantic.primary.normal};
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
      fill: ${theme.semantic.primary.normal};
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
