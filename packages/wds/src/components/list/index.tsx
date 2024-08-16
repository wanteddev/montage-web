import { forwardRef, useState } from 'react';
import {
  type PolymorphicComponent,
  type PolymorphicProps,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { FlexBox, Typography, WithInteraction } from '..';

import {
  LIST_CELL_NAME,
  LIST_ITEM_NAME,
  LIST_ITEM_TEXT_NAME,
  LIST_NAME,
} from './constants';
import { listItemInCellStyle, listItemTextStyle, listStyle } from './style';

import type { ElementRef, ElementType, ForwardedRef, MouseEvent } from 'react';
import type { TypographyWeight } from '../typography/types';
import type {
  ListCellProps,
  ListItemProps,
  ListItemTextProps,
  ListProps,
} from './types';

const List = forwardRef(
  ({ children, ...props }: ListProps, ref: ForwardedRef<HTMLUListElement>) => {
    return (
      <FlexBox
        as="ul"
        ref={ref}
        role="list"
        flexDirection="column"
        sx={[listStyle, props.sx]}
        {...props}
      >
        {children}
      </FlexBox>
    );
  },
);

List.displayName = LIST_NAME;

const ListItem = forwardRef(
  <E extends ElementType = 'li'>(
    { as, leftContent, children, ...props }: PolymorphicProps<ListItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const [item, setItem] = useState<E | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setItem(node as E));

    const controllable = (item as unknown as HTMLElement | null)?.querySelector(
      '[role="checkbox"], [role="radio"]',
    );

    return (
      <FlexBox
        as={as || 'li'}
        role="listitem"
        ref={composedRefs}
        flexDirection="row"
        gap="10px"
        justifyContent="flex-start"
        alignItems="center"
        {...props}
        onClick={composeEventHandlers(props.onClick, (e: MouseEvent<E>) => {
          if (
            (e.target as HTMLElement).ariaHidden?.toString() === 'true' ||
            (e.target as HTMLElement).hidden.toString() === 'true'
          ) {
            return;
          }

          if (controllable) {
            (controllable as HTMLElement).click();
            (controllable as HTMLElement).focus();
          }
        })}
        sx={[
          {
            width: '100%',
            cursor: Boolean(props.onClick || controllable)
              ? 'pointer'
              : 'initial',
          },
          props.sx,
        ]}
      >
        {Boolean(leftContent) && leftContent}
        {children}
      </FlexBox>
    );
  },
) as PolymorphicComponent<ListItemProps, 'li'>;

ListItem.displayName = LIST_ITEM_NAME;

const ListCell = forwardRef(
  <E extends ElementType = 'li'>(
    { size, paddingInset, ...props }: PolymorphicProps<ListCellProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <WithInteraction>
        <ListItem
          ref={ref}
          {...props}
          sx={[listItemInCellStyle({ size, paddingInset }), props.sx]}
        />
      </WithInteraction>
    );
  },
) as PolymorphicComponent<ListCellProps>;

ListCell.displayName = LIST_CELL_NAME;

const ListItemText = forwardRef<HTMLSpanElement>(
  (
    {
      caption,
      bold = false,
      active = false,
      disabled = false,
      sx,
      children,
      ...props
    }: PolymorphicProps<ListItemTextProps>,
    forwardedRef,
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
        ref={forwardedRef}
        variant="body1_normal"
        color={getColor('palette.label.normal')}
        weight={weight}
        {...props}
        sx={[listItemTextStyle, sx]}
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

export { List, ListCell, ListItem, ListItemText };
