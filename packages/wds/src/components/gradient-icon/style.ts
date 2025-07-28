import { css } from '@wanteddev/wds-engine';

export const gradientSvgStyle = css`
  position: fixed;
  width: 0 !important;
  height: 0px !important;
`;

export const gradientIconStyle = (id: string) => css`
  fill: url(#${id}) !important;

  * {
    fill: unset !important;
  }
`;
