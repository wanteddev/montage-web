import { css, typographyStyle } from '@wanteddev/wds';

export const linkStyle = css`
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  ${typographyStyle('body2-reading', 'bold')}
`;
