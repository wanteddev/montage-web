import { forwardRef } from 'react';

import { FlexBox, RadioGroupItem, Typography } from '..';

import {
  LIST_ITEM_NAME,
  LIST_ITEM_RADIO_NAME,
  LIST_ITEM_TEXT_NAME,
  LIST_NAME,
} from './constants';
import {
  listItemRadioStyle,
  listItemStyle,
  listItemTextStyle,
  listStyle,
} from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type Radio from '../radio';
import type { TypographyWeight } from '../typography/types';
import type {
  ListItemProps,
  ListItemRadioProps,
  ListItemTextProps,
  ListProps,
} from './types';

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
        gap="8px"
        sx={[listStyle, props.sx]}
        {...props}
      />
    );
  },
) as PolymorphicComponent<ListProps, 'ul'>;

List.displayName = LIST_NAME;

const ListItem = forwardRef(
  <E extends ElementType = 'li'>(
    { as, leftIcon, children, ...props }: PolymorphicProps<ListItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const variant = props.variant ?? 'normal';

    return (
      <FlexBox
        ref={ref}
        as={(as || 'li') as E}
        justifyContent={variant === 'normal' ? 'flex-start' : 'center'}
        alignItems="center"
        sx={listItemStyle}
        {...props}
      >
        {Boolean(leftIcon) && leftIcon}
        {children}
      </FlexBox>
    );
  },
) as PolymorphicComponent<ListItemProps, 'li'>;

ListItem.displayName = LIST_ITEM_NAME;

const ListItemText = forwardRef(
  <E extends ElementType = 'span'>(
    {
      as,
      caption,
      bold = false,
      active = false,
      disabled = false,
      sx,
      children,
      ...props
    }: PolymorphicProps<ListItemTextProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    if (!children) {
      return null;
    }

    const weight: TypographyWeight = bold ? 'medium' : 'regular';

    const getColor = (defaultColor: ThemeColorsToken): ThemeColorsToken => {
      if (disabled) {
        return 'palette.label.disable';
      }
      if (active) {
        return 'palette.primary.normal';
      }

      return defaultColor;
    };

    return (
      <Typography
        as={(as || 'span') as E}
        ref={ref}
        variant="body1_normal"
        color={getColor('palette.label.normal')}
        weight={weight}
        sx={[listItemTextStyle, sx]}
        {...props}
      >
        {children}
        {Boolean(caption) && (
          <Typography
            variant="label1_normal"
            color={getColor('palette.label.alternative')}
            weight={weight}
          >
            {caption}
          </Typography>
        )}
      </Typography>
    );
  },
) as PolymorphicComponent<ListItemTextProps, 'span'>;

ListItemText.displayName = LIST_ITEM_TEXT_NAME;

const ListItemRadio = forwardRef<ElementRef<typeof Radio>, ListItemRadioProps>(
  ({ id, children, label, ...props }, ref) => {
    return (
      <>
        <RadioGroupItem
          id={id}
          ref={ref}
          {...props}
          sx={[listItemRadioStyle, props.sx]}
        />
        <ListItemText
          as="label"
          htmlFor={id}
          {...label}
          active={props.checked !== undefined ? props.checked : label?.active}
          sx={[
            {
              cursor: 'pointer',
              flex: 1,
            },
            label?.sx,
          ]}
        >
          {children}
        </ListItemText>
      </>
    );
  },
);

ListItemRadio.displayName = LIST_ITEM_RADIO_NAME;

export { List, ListItem, ListItemRadio, ListItemText };
