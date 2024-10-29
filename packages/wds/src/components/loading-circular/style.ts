import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

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
    stroke: ${theme.palette.line.solid.normal};
    stroke-width: 3;
    stroke-linecap: round;
    transform-origin: center center;
    animation:
      array 5.3333s ease infinite,
      offset 5.3333s ease infinite,
      rotate 2.2s linear infinite;
  }
`;
