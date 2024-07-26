import { useComposedRefs } from '@radix-ui/react-compose-refs';
import React, { forwardRef, useId, useMemo, useState } from 'react';

import { FlexBox, RadioGroup, Typography } from '..';

import { LIST_ITEM_NAME, LIST_ITEM_TEXT_NAME, LIST_NAME } from './constants';
import { ListItemProvider } from './contexts';
import { useListItem } from './hooks';
import { listItemStyle, listItemTextStyle, listStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
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

const ListItem = forwardRef<HTMLLIElement>(
  (
    { as, leftContent, children, ...props }: PolymorphicProps<ListItemProps>,
    forwardedRef,
  ) => {
    const contentId = useId();

    const [item, setItem] = useState<HTMLLIElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setItem(node));

    const isFormControl = item ? item.closest('form') : false;

    const leftContentComponent = useMemo(() => {
      if (!leftContent) {
        return null;
      }
      return React.cloneElement(leftContent, {
        ...(!isFormControl &&
          (item?.role === 'radio' || item?.role === 'checkbox') && {
            id: contentId,
          }),
        ref: composedRefs,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    return (
      <ListItemProvider contentId={contentId}>
        <FlexBox
          as={as || 'li'}
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
    const { contentId } = useListItem(LIST_ITEM_TEXT_NAME);

    const [text, setText] = useState<HTMLSpanElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setText(node));

    const hasContentHtmlFor =
      !text?.closest('form') && text?.tagName.toLowerCase() === 'label';

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
        ref={composedRefs}
        {...(hasContentHtmlFor && {
          htmlFor: contentId,
        })}
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
