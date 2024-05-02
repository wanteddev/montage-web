import { css } from '@wanteddev/wds-engine';

import { getWeightMap, variantMap } from '../components/typography/style';

export const typographyStyle = (
  variant: keyof typeof variantMap,
  weight?: keyof ReturnType<typeof getWeightMap>,
) => css`
  ${variantMap[variant]};
  ${weight && getWeightMap(variant)[weight]};
`;

export const ellipsisTypographyStyle = (line = 1) =>
  line === 1
    ? css`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      `
    : css`
        overflow: hidden;
        position: relative;
        /* stylelint-disable */
        display: -webkit-box;
        -webkit-line-clamp: ${line};
        -webkit-box-orient: vertical;
        /* stylelint-enable */
      `;

export const listStyle = css`
  list-style-type: disc;
  padding-left: 1.5em;

  ul {
    list-style-type: circle;
    padding-left: 1.5em;
  }

  li::marker {
    font-size: 0.8em;
  }
`;
