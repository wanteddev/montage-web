import { css, getColorByToken } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils';
import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';

import type { Theme } from '@wanteddev/wds-engine';
import type { SectionHeaderProps } from './types';

export const sectionHeaderStyle =
  ({ size, platform, color, xs, sm, md, lg, xl }: SectionHeaderProps) =>
  (theme: Theme) => css`
    width: 100%;

    [data-role='section-header-content'],
    [data-role='section-header-content-heading'] {
      font: inherit;
      color: inherit;
    }

    [data-role='section-header-trailing-content']
      [wds-component='icon-button'][data-variant='normal'],
    [data-role='section-header-heading-content']
      [wds-component='icon-button'][data-variant='normal'] {
      color: ${theme.semantic.label.assistive};
    }

    ${sectionHeaderSizeStyle({ size, color, platform }, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${(Boolean(params?.size) || Boolean(params?.platform)) &&
        sectionHeaderSizeStyle(
          {
            size: getPreviousValue(
              { xs, sm, md, lg, xl },
              'size',
              size,
              breakpoint!,
            ),
            color,
            platform: getPreviousValue(
              { xs, sm, md, lg, xl },
              'platform',
              platform,
              breakpoint!,
            ),
          },
          theme,
        )}
        ${params?.sx}
      `,
    )}
  `;

const sectionHeaderSizeStyle = (
  { size, color, platform }: SectionHeaderProps,
  theme: Theme,
) => {
  switch (size) {
    case 'xsmall':
      return css`
        color: ${getColorByToken(theme, color ?? 'semantic.label.alternative')};
        ${typographyStyle('label1', 'bold')};

        [data-role='section-header-heading-content'],
        [data-role='section-header-trailing-content'] {
          max-height: 20px;
        }
      `;
    case 'small':
      return css`
        color: ${getColorByToken(theme, color ?? 'semantic.label.strong')};
        ${typographyStyle(
          platform === 'desktop' ? 'headline1' : 'headline2',
          'bold',
        )};

        [data-role='section-header-heading-content'],
        [data-role='section-header-trailing-content'] {
          max-height: ${platform === 'desktop' ? '26px' : '24px'};
        }
      `;
    case 'medium':
      return css`
        color: ${getColorByToken(theme, color ?? 'semantic.label.strong')};
        ${typographyStyle(
          platform === 'desktop' ? 'heading1' : 'heading2',
          'bold',
        )};

        [data-role='section-header-heading-content'],
        [data-role='section-header-trailing-content'] {
          max-height: ${platform === 'desktop' ? '30px' : '28px'};
        }
      `;
    case 'large':
      return css`
        color: ${getColorByToken(theme, color ?? 'semantic.label.strong')};
        ${typographyStyle(
          platform === 'desktop' ? 'title2' : 'title3',
          'bold',
        )};

        [data-role='section-header-heading-content'],
        [data-role='section-header-trailing-content'] {
          max-height: ${platform === 'desktop' ? '38px' : '32px'};
        }
      `;
  }
};

export const sectionHeaderNavigationStyle = (theme: Theme) => css`
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  border-radius: 10px;
  height: 32px;
  border: 1px solid ${theme.semantic.line.normal.normal};
`;

export const sectionHeaderNavigationButtonStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.alternative};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 0px;
  padding: 0px;
  display: flex;
  width: 32px;
  height: 32px;
  outline-offset: -2px;
  background-color: transparent;
  border: none;

  &[aria-disabled='true'],
  &:disabled {
    color: ${theme.semantic.label.disable};
    cursor: initial;
  }
`;
