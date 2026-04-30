import { css } from '@wanteddev/wds-engine';

import { getGradientMaskImage, typographyStyle } from '../../utils';
import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';

import type { ResponsiveProps, Theme } from '@wanteddev/wds-engine';
import type { CategoryListProps } from './types';

export const categoryListStyle =
  ({
    isScrollableLeft,
    isScrollableRight,
    horizontalPadding,
    verticalPadding,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: CategoryListProps & {
    isScrollableLeft: boolean;
    isScrollableRight: boolean;
  }) =>
  (theme: Theme) => css`
    width: 100%;
    list-style: none;
    position: relative;
    padding: 0;
    margin: 0;
    gap: 20px;

    [data-radix-scroll-area-viewport] {
      position: relative;
    }
    [data-radix-scroll-area-content] {
      overflow: hidden;
    }

    ${categoryPaddingStyle({
      horizontalPadding,
      isScrollableLeft,
      isScrollableRight,
    })}
    ${categorySizeStyle({ size, verticalPadding })}


    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${categoryPaddingStyle({
          horizontalPadding: params?.horizontalPadding,
          isScrollableLeft,
          isScrollableRight,
        })}
        ${(params?.horizontalPadding !== undefined ||
          params?.size !== undefined) &&
        css`
          ${categorySizeStyle({
            size: getPreviousValue(
              { xs, sm, md, lg, xl },
              'size',
              params.size,
              breakpoint!,
            ),
            verticalPadding: getPreviousValue(
              { xs, sm, md, lg, xl },
              'verticalPadding',
              params.verticalPadding,
              breakpoint!,
            ),
          })}
        `}
        ${params?.sx}
      `,
    )}
  `;

const categoryPaddingStyle = ({
  horizontalPadding,
  isScrollableLeft,
  isScrollableRight,
}: CategoryListProps & {
  isScrollableLeft: boolean;
  isScrollableRight: boolean;
}) => {
  switch (horizontalPadding) {
    case true:
      return css`
        [data-role='category-list-icon-button'] {
          display: flex;
        }

        &:not(:has([data-role='category-list-icon-button']))
          [data-radix-scroll-area-content] {
          padding: 0px var(--wds-category-list-padding, 20px);
        }

        &:has([data-role='category-list-icon-button'])
          [data-radix-scroll-area-content] {
          padding: 0px 0px 0px var(--wds-category-list-padding, 20px);
        }

        ${isScrollableRight
          ? css`
              &:not(:has([data-role='category-list-icon-button']))
                [data-radix-scroll-area-wrapper] {
                mask-image: none;
              }

              &:has([data-role='category-list-icon-button'])
                [data-radix-scroll-area-wrapper] {
                mask-image: ${getGradientMaskImage('right', '48px', 'mask')};
              }
            `
          : css`
              &:not(:has([data-role='category-list-icon-button']))
                [data-radix-scroll-area-wrapper],
              &:has([data-role='category-list-icon-button'])
                [data-radix-scroll-area-wrapper] {
                mask-image: none;
              }
            `}

        --wds-category-icon-button-padding: 0px
          calc(var(--wds-category-list-padding, 20px) - 4px) 0px 0px;
      `;
    case false:
      return css`
        [data-role='category-list-icon-button'] {
          display: flex;
        }

        &:not(:has([data-role='category-list-icon-button']))
          [data-radix-scroll-area-content],
        &:has([data-role='category-list-icon-button'])
          [data-radix-scroll-area-content] {
          padding: 0px;
        }

        ${isScrollableLeft || isScrollableRight
          ? css`
              &:has([data-role='category-list-icon-button'])
                [data-radix-scroll-area-wrapper],
              &:not(:has([data-role='category-list-icon-button']))
                [data-radix-scroll-area-wrapper] {
                mask-composite: intersect;
                mask-image: ${[
                  isScrollableLeft &&
                    getGradientMaskImage('left', '48px', 'mask'),
                  isScrollableRight &&
                    getGradientMaskImage('right', '48px', 'mask'),
                ]
                  .filter(Boolean)
                  .join(', ')};
              }
            `
          : css`
              &:not(:has([data-role='category-list-icon-button']))
                [data-radix-scroll-area-wrapper],
              &:has([data-role='category-list-icon-button'])
                [data-radix-scroll-area-wrapper] {
                mask-image: none;
              }
            `}

        --wds-category-icon-button-padding: 0px;
      `;
  }
};

const categorySizeStyle = ({ size, verticalPadding }: CategoryListProps) => {
  switch (size) {
    case 'small':
      return css`
        [data-role='category-list-wrapper'] {
          gap: 4px;

          ${verticalPadding === true &&
          css`
            padding: 8px 0px;
          `}

          ${verticalPadding === false &&
          css`
            padding: 0px;
          `}
        }
      `;
    case 'medium':
      return css`
        [data-role='category-list-wrapper'] {
          gap: 6px;

          ${verticalPadding === true &&
          css`
            padding: 8px 0px;
          `}

          ${verticalPadding === false &&
          css`
            padding: 0px;
          `}
        }
      `;
    case 'large':
      return css`
        [data-role='category-list-wrapper'] {
          gap: 8px;

          ${verticalPadding === true &&
          css`
            padding: 10px 0px;
          `}

          ${verticalPadding === false &&
          css`
            padding: 0px;
          `}
        }
      `;
    case 'xlarge':
      return css`
        [data-role='category-list-wrapper'] {
          gap: 10px;

          ${verticalPadding === true &&
          css`
            padding: 10px 0px;
          `}

          ${verticalPadding === false &&
          css`
            padding: 0px;
          `}
        }
      `;
  }
};

export const scrollWrapperStyle = css`
  width: 100%;
  height: fit-content;
  background-color: transparent;

  [data-radix-scroll-area-viewport] {
    scroll-behavior: smooth;
  }

  [data-role='scroll-area-vertical-bar'] {
    display: none;
  }

  [data-role='scroll-area-horizontal-bar'] {
    display: none;
  }
`;

export const categoryListItemStyle =
  ({
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: Pick<CategoryListProps, 'size'> &
    ResponsiveProps<Pick<CategoryListProps, 'size'>>) =>
  (theme: Theme) => css`
    scroll-margin-inline: 25px;
    position: relative;
    ${categoryListItemSizeStyle({ size })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${categoryListItemSizeStyle(params)}
      `,
    )}
  `;

const categoryListItemSizeStyle = ({
  size,
}: Pick<CategoryListProps, 'size'> = {}) => {
  switch (size) {
    case 'small':
      return css`
        border-radius: 6px;
        padding: 4px 7px;
        gap: 2px;

        svg {
          font-size: 12px;
        }
        & > span {
          ${typographyStyle('caption1', 'medium')}
          padding: 0 1px;
        }
      `;
    case 'medium':
      return css`
        border-radius: 8px;
        padding: 6px 8px;
        gap: 2px;

        svg {
          font-size: 14px;
        }
        & > span {
          ${typographyStyle('label1', 'medium')}
          padding: 0 2px;
        }
      `;
    case 'large':
      return css`
        border-radius: 8px;
        padding: 7px 11px;
        gap: 3px;

        svg {
          font-size: 14px;
        }

        & > span {
          ${typographyStyle('body2', 'medium')}
          padding: 0 2px;
        }
      `;
    case 'xlarge':
      return css`
        border-radius: 10px;
        padding: 9px 12px;
        gap: 3px;

        svg {
          font-size: 16px;
        }
        & > span {
          ${typographyStyle('body2', 'medium')}
          padding: 0 2px;
        }
      `;
  }
};

export const stickyButtonStyle = css`
  position: sticky;
  right: 0px;
  height: 100%;
  flex-shrink: 0;
  padding: var(--wds-category-icon-button-padding, 0px);
`;
