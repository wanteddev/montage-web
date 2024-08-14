import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { cloneElement, forwardRef, useMemo, useState } from 'react';
import {
  Box,
  type PolymorphicComponent,
  type PolymorphicProps,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';

import { FlexBox, Typography, WithInteraction } from '..';

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

import type { TypographyWeight } from '../typography/types';
import type {
  ListCellProps,
  ListItemProps,
  ListItemTextProps,
  ListProps,
} from './types';

const List = forwardRef<HTMLUListElement, Omit<ListProps, 'as'>>(
  ({ children, ...props }, ref) => {
    return (
      <FlexBox
        as="ul"
        ref={ref}
        role="list"
        sx={[listStyle, props.sx]}
        {...props}
      >
        {children}
      </FlexBox>
    );
  },
);

List.displayName = LIST_NAME;

const ListItem = forwardRef<HTMLLIElement>(
  (
    { as, leftContent, children, ...props }: PolymorphicProps<ListItemProps>,
    forwardedRef,
  ) => {
    const [item, setItem] = useState<HTMLLIElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setItem(node));

    const hasControlContent =
      item?.role === 'radio' || item?.role === 'checkbox';

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
      <FlexBox
        as={as || 'li'}
        role="listitem"
        flexDirection="row"
        gap="10px"
        justifyContent="flex-start"
        alignItems="center"
        {...props}
        sx={[
          {
            width: '100%',
            cursor: hasControlContent ? 'pointer' : 'initial',
            zIndex: 1,
          },
          props.sx,
        ]}
      >
        {Boolean(leftContentComponent) && leftContentComponent}
        {children}
      </FlexBox>
    );
  },
) as PolymorphicComponent<ListItemProps, 'li'>;

ListItem.displayName = LIST_ITEM_NAME;

const ListCell = forwardRef<HTMLDivElement, ListCellProps>(
  ({ size = 'normal', paddingInset, listItemBox, ...props }, forwardedRef) => {
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
