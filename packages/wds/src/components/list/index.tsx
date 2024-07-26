import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { cloneElement, forwardRef, useMemo, useState } from 'react';

import { FlexBox, RadioGroup, Typography } from '..';

import { LIST_ITEM_NAME, LIST_ITEM_TEXT_NAME, LIST_NAME } from './constants';
import { listItemTextStyle, listStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { TypographyWeight } from '../typography/types';
import type { ListItemProps, ListItemTextProps, ListProps } from './types';

const List = forwardRef<HTMLUListElement>(
  (
    { as, children, radioGroup, ...props }: PolymorphicProps<ListProps>,
    forwardedRef,
  ) => {
    const [list, setList] = useState<HTMLUListElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setList(node));

    const shouldWrapRadioGroup = Boolean(
      radioGroup || (list ? list.querySelector('[role="radio"]') : true),
    );

    const ListFlexBox = (
      <FlexBox
        ref={composedRefs}
        as={as || 'ul'}
        flexDirection="column"
        gap="8px"
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

    const isFormControl = item ? item.closest('form') : false;
    const hasControlContent =
      item?.role === 'radio' || item?.role === 'checkbox';
    const itemBoxAs =
      listItemBox.as || (!isFormControl && hasControlContent ? 'label' : 'div');

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
      <FlexBox as={as || 'li'} {...props}>
        <FlexBox
          gap="10px"
          justifyContent="flex-start"
          alignItems="center"
          {...listItemBox}
          as={itemBoxAs}
          sx={[
            {
              width: '100%',
              cursor:
                hasControlContent && itemBoxAs === 'label'
                  ? 'pointer'
                  : 'initial',
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

export { List, ListItem, ListItemText };
