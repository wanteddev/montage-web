import { forwardRef } from 'react';

import { FlexBox, Typography } from '..';

import { LIST_ITEM_NAME, LIST_NAME } from './constants';
import { listStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { TypographyWeight } from '../typography/types';
import type { ListItemProps, ListProps } from './types';

const List = forwardRef(
  <E extends ElementType = 'ul'>(
    { as, ...props }: PolymorphicProps<ListProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        as={(as || 'ul') as E}
        flexDirection="column"
        gap="24px"
        sx={[listStyle, props.sx]}
        {...props}
      />
    );
  },
) as PolymorphicComponent<ListProps, 'ul'>;

List.displayName = LIST_NAME;

const ListItem = forwardRef(
  <E extends ElementType = 'li'>(
    {
      as,
      variant = 'normal',
      caption,
      bold = false,
      active = false,
      disabled = false,
      children,
      ...props
    }: PolymorphicProps<ListItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const weight: TypographyWeight = bold ? 'medium' : 'regular';

    const getColor = (defaultColor: ThemeColorsToken): ThemeColorsToken => {
      if (disabled) {
        return 'palette.label.disable';
      }
      if (variant === 'action' || active) {
        return 'palette.primary.normal';
      }

      return defaultColor;
    };

    return (
      <FlexBox
        ref={ref}
        as={(as || 'li') as E}
        flexDirection="column"
        alignItems={variant === 'normal' ? 'flex-start' : 'center'}
        sx={[listStyle, props.sx]}
        {...props}
      >
        <FlexBox flexDirection="column" gap="4px">
          <Typography
            variant="body1_normal"
            color={getColor('palette.label.normal')}
            weight={weight}
          >
            {children}
          </Typography>
          {Boolean(caption) && (
            <Typography
              variant="label1_normal"
              color={getColor('palette.label.alternative')}
              weight={weight}
            >
              {caption}
            </Typography>
          )}
        </FlexBox>
      </FlexBox>
    );
  },
) as PolymorphicComponent<ListItemProps, 'li'>;

ListItem.displayName = LIST_ITEM_NAME;

export { List, ListItem };
