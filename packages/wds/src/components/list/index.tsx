import React, { forwardRef, useId, useState } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { FlexBox, RadioGroup, Typography } from '..';
import { RADIO_ITEM_NAME } from '../radio-group/constants';

import { LIST_ITEM_NAME, LIST_ITEM_TEXT_NAME, LIST_NAME } from './constants';
import { listItemStyle, listItemTextStyle, listStyle } from './style';
import { ListItemProvider } from './contexts';
import { useListItem } from './hooks';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { TypographyWeight } from '../typography/types';
import type { ListItemProps, ListItemTextProps, ListProps } from './types';

const List = forwardRef<HTMLUListElement>(
  (
    { as, children, radioGroupProps, ...props }: PolymorphicProps<ListProps>,
    forwardedRef,
  ) => {
    const [list, setList] = useState<HTMLUListElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setList(node));

    const shouldWrapRadioGroup = Boolean(
      radioGroupProps || (list ? list.querySelector('[role="radio"]') : true),
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
      return <RadioGroup {...radioGroupProps}>{ListFlexBox}</RadioGroup>;
    }
    return ListFlexBox;
  },
) as PolymorphicComponent<ListProps, 'ul'>;

List.displayName = LIST_NAME;

const ListItem = forwardRef(
  <E extends ElementType = 'li'>(
    { as, leftContent, children, ...props }: PolymorphicProps<ListItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const contentId = useId();
    // @ts-expect-error
    const leftContentDisplayName = leftContent?.type.displayName;

    const leftContentComponent =
      leftContent &&
      (leftContentDisplayName === RADIO_ITEM_NAME ||
        leftContentDisplayName?.includes('Checkbox'))
        ? React.cloneElement(leftContent, { id: contentId })
        : leftContent;

    return (
      <ListItemProvider contentId={contentId}>
        <FlexBox
          ref={ref}
          as={(as || 'li') as E}
          justifyContent="flex-start"
          alignItems="center"
          sx={listItemStyle}
          {...props}
        >
          {Boolean(leftContentComponent) && leftContentComponent}
          {children}
        </FlexBox>
      </ListItemProvider>
    );
  },
) as PolymorphicComponent<ListItemProps, 'li'>;

ListItem.displayName = LIST_ITEM_NAME;

const ListItemText = forwardRef(
  <E extends ElementType = 'span'>(
    {
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
    const { contentId } = useListItem(LIST_ITEM_TEXT_NAME);

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
        ref={ref}
        {...(props.as === 'label' && { htmlFor: contentId })}
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

export { List, ListItem, ListItemText };
