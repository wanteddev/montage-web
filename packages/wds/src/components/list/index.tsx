import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { cloneElement, forwardRef, useMemo, useState } from 'react';
import {
  Box,
  type PolymorphicComponent,
  type PolymorphicProps,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';

import { FlexBox, RadioGroup, Typography, WithInteraction } from '..';

import {
  LIST_CELL_NAME,
  LIST_ITEM_NAME,
  LIST_ITEM_TEXT_NAME,
  LIST_NAME,
} from './constants';
import {
  listCellStyle,
  listItemBoxStyle,
  listItemTextStyle,
  listStyle,
} from './style';

import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { TypographyWeight } from '../typography/types';
import type {
  ListCellProps,
  ListItemProps,
  ListItemTextProps,
  ListProps,
} from './types';

const List = forwardRef(
  <E extends ElementType = 'ul'>(
    { as, children, radioGroup, ...props }: PolymorphicProps<ListProps, E>,
    forwardedRef: ForwardedRef<ElementRef<E>>,
  ) => {
    const [list, setList] = useState<E | null>(null);

    const composedRefs = useComposedRefs(forwardedRef, (node) =>
      setList(node as E),
    );

    const shouldWrapRadioGroup = Boolean(
      radioGroup ||
        (list
          ? (list as unknown as HTMLElement).querySelector('[role="radio"]')
          : true),
    );

    const ListFlexBox = (
      <FlexBox
        role="list"
        ref={composedRefs}
        as={as || 'ul'}
        flexDirection="column"
        sx={[listStyle, props.sx]}
        {...props}
      >
        {children}
      </FlexBox>
    );

    if (shouldWrapRadioGroup) {
      return <RadioGroup {...radioGroup}>{ListFlexBox}</RadioGroup>;
    }
    return ListFlexBox;
  },
) as PolymorphicComponent<ListProps, 'ul'>;

List.displayName = LIST_NAME;

const ListItem = forwardRef<HTMLLIElement>(
  (
    {
      as,
      leftContent,
      children,
      listItemBox: { sx: listItemBoxSx, ...listItemBox } = {},
      ...props
    }: PolymorphicProps<ListItemProps>,
    forwardedRef,
  ) => {
    const [item, setItem] = useState<HTMLLIElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setItem(node));

    const hasControlContent =
      item?.role === 'radio' || item?.role === 'checkbox';
    const itemBoxAs = listItemBox.as || (hasControlContent ? 'label' : 'div');

    const leftContentComponent = useMemo(() => {
      if (!leftContent) {
        return null;
      }
      return cloneElement(leftContent, {
        ref: composedRefs,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    return (
      <FlexBox as={as || 'li'} role="listitem" {...props}>
        <FlexBox
          flexDirection="row"
          gap="10px"
          justifyContent="flex-start"
          alignItems="center"
          {...listItemBox}
          as={itemBoxAs}
          sx={[
            {
              width: '100%',
              cursor: hasControlContent ? 'pointer' : 'initial',
              zIndex: 1,
            },
            listItemBoxSx,
          ]}
        >
          {Boolean(leftContentComponent) && leftContentComponent}
          {children}
        </FlexBox>
      </FlexBox>
    );
  },
) as PolymorphicComponent<ListItemProps, 'li'>;

ListItem.displayName = LIST_ITEM_NAME;

const ListCell = forwardRef<HTMLDivElement, ListCellProps>(
  (
    {
      size = 'normal',
      paddingInset,
      listItemBox,
      ...props
    }: PolymorphicProps<ListCellProps>,
    forwardedRef,
  ) => {
    return (
      <WithInteraction>
        <Box ref={forwardedRef} sx={listCellStyle} role="listitem">
          <ListItem
            as="div"
            role={undefined}
            {...props}
            listItemBox={{
              ...listItemBox,
              sx: [listItemBox?.sx, listItemBoxStyle({ paddingInset, size })],
            }}
          />
        </Box>
      </WithInteraction>
    );
  },
);

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
