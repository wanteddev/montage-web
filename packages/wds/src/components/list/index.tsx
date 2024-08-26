import { forwardRef, useState } from 'react';
import {
  type PolymorphicComponent,
  type PolymorphicProps,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { IconChevronRightTightSmall } from '@wanteddev/wds-icon';
import { Slot } from '@radix-ui/react-slot';

import { Divider, FlexBox, Label, Typography, WithInteraction } from '..';

import {
  LIST_CELL_NAME,
  LIST_CHEVRON_BUTTON_NAME,
  LIST_ITEM_CONTENT_NAME,
  LIST_ITEM_NAME,
  LIST_NAME,
  LIST_TEXT_NAME,
} from './constants';
import {
  listCellDividerStyle,
  listChevronButtonStyle,
  listItemContentStyle,
  listItemInCellStyle,
  listItemStyle,
  listStyle,
  listTextCaptionStyle,
  listTextStyle,
} from './style';
import { ListItemProvider, useListItemContext } from './contexts';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef, MouseEvent } from 'react';
import type { TypographyWeight } from '../typography/types';
import type {
  ListCellProps,
  ListChevronButtonProps,
  ListItemContentDefaultProps,
  ListItemContentSlotProps,
  ListItemProps,
  ListProps,
  ListTextProps,
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
    {
      as,
      leftContent,
      rightContent,
      active = false,
      disabled = false,
      children,
      ...props
    }: PolymorphicProps<ListItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const [item, setItem] = useState<E | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setItem(node as E));

    const itemElement = item as unknown as HTMLElement | null;

    const hasCheckbox = Boolean(
      itemElement?.querySelector('[role="checkbox"]'),
    );
    const hasLabelTarget = Boolean(
      itemElement?.querySelector(
        '[role="checkbox"], [role="radio"], button[role="switch"]',
      ),
    );
    const controllable = itemElement?.querySelector(
      '[role="checkbox"], [role="radio"], button:not([role="switch"])',
    );
    const clickable = Boolean(props.onClick || controllable) && !disabled;

    return (
      <ListItemProvider
        active={active}
        disabled={disabled}
        hasCheckbox={hasCheckbox}
        hasLabelTarget={hasLabelTarget}
      >
        <FlexBox
          as={as || 'li'}
          role="listitem"
          ref={composedRefs}
          flexDirection="row"
          gap="10px"
          justifyContent={
            Boolean(rightContent) ? 'space-between' : 'flex-start'
          }
          alignItems="center"
          {...props}
          onClick={
            clickable
              ? composeEventHandlers(props.onClick, (e: MouseEvent<E>) => {
                  if (
                    (e.target as HTMLElement).ariaHidden?.toString() ===
                      'true' ||
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    (e.target as HTMLElement).hidden?.toString() === 'true'
                  ) {
                    return;
                  }

                  if (
                    controllable &&
                    // controllable 직접 클릭 시 이벤트 중복 호출을 방어함.
                    !controllable.contains(e.target as HTMLElement)
                  ) {
                    (controllable as HTMLElement).click();
                    (controllable as HTMLElement).focus();
                  }
                })
              : undefined
          }
          sx={[listItemStyle({ active, disabled, clickable }), props.sx]}
          aria-disabled={disabled}
        >
          {Boolean(leftContent) && leftContent}
          {children}
          {Boolean(rightContent) && rightContent}
        </FlexBox>
      </ListItemProvider>
    );
  },
) as PolymorphicComponent<ListItemProps, 'li'>;

ListItem.displayName = LIST_ITEM_NAME;

const ListItemContent = forwardRef<
  HTMLElement,
  DefaultComponentProps<ListItemContentDefaultProps, 'div'>
>(({ variant = 'custom', children, ...props }, ref) => {
  const { disabled } = useListItemContext(LIST_ITEM_CONTENT_NAME);

  const listItemContentSlotProps: ListItemContentSlotProps = {
    ...props,
    disabled,
  };

  switch (variant) {
    case 'icon':
      return (
        <FlexBox
          wds-component="list-item-content"
          ref={ref as ForwardedRef<HTMLDivElement>}
          {...props}
          sx={[listItemContentStyle, { fontSize: '24px' }, props.sx]}
        >
          {children}
        </FlexBox>
      );
    case 'icon-button':
      return (
        <FlexBox
          wds-component="list-item-content"
          ref={ref as ForwardedRef<HTMLDivElement>}
          {...props}
          sx={[listItemContentStyle, { fontSize: '24px' }, props.sx]}
        >
          <Slot {...listItemContentSlotProps}>{children}</Slot>
        </FlexBox>
      );

    case 'radio':
    case 'checkbox':
    case 'button':
    case 'chevron':
    case 'switch':
      return <Slot {...listItemContentSlotProps}>{children}</Slot>;

    case 'custom':
    default:
      return (
        <FlexBox
          wds-component="list-item-content"
          ref={ref as ForwardedRef<HTMLDivElement>}
          {...props}
          sx={[listItemContentStyle, props.sx]}
        >
          {children}
        </FlexBox>
      );
  }
});

ListItemContent.displayName = LIST_ITEM_CONTENT_NAME;

const ListChevronButton = forwardRef<HTMLButtonElement, ListChevronButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <FlexBox
        as="button"
        type="button"
        alignItems="center"
        gap="8px"
        ref={ref}
        {...props}
        sx={[listChevronButtonStyle, props.sx]}
      >
        <Typography variant="body1_normal" color="palette.label.alternative">
          {children}
        </Typography>
        <IconChevronRightTightSmall
          sx={(theme) => ({
            color: theme.palette.label.assistive,
          })}
        />
      </FlexBox>
    );
  },
) as PolymorphicComponent<ListChevronButtonProps, 'button'>;

ListChevronButton.displayName = LIST_CHEVRON_BUTTON_NAME;

const ListCell = forwardRef(
  <E extends ElementType = 'li'>(
    {
      padding,
      paddingInset,
      divider,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<ListCellProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <WithInteraction
        disabled={props.disabled}
        width={paddingInset ? '100%' : 'calc(100% + 24px)'}
      >
        <ListItem
          ref={ref}
          role="button"
          {...props}
          sx={[
            listItemInCellStyle({ padding, paddingInset, xs, sm, md, lg, xl }),
            props.sx,
          ]}
        >
          {children}
          {divider && <Divider sx={listCellDividerStyle} />}
        </ListItem>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<ListCellProps, 'li'>;

ListCell.displayName = LIST_CELL_NAME;

const ListText = forwardRef(
  <E extends ElementType = 'span'>(
    {
      caption,
      bold = false,
      sx,
      children,
      ...props
    }: PolymorphicProps<ListTextProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { active, disabled, hasCheckbox, hasLabelTarget } =
      useListItemContext(LIST_TEXT_NAME);

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
        {...props}
        as={props.as ? props.as : hasLabelTarget ? Label : 'span'}
        ref={ref}
        variant="body1_normal"
        color={getColor('palette.label.normal')}
        weight={weight}
        sx={[listTextStyle({ hasCheckbox }), sx]}
      >
        {children}
        {Boolean(caption) && (
          <Typography
            variant="label1_normal"
            color={getColor('palette.label.alternative')}
            weight={weight}
            sx={listTextCaptionStyle}
          >
            {caption}
          </Typography>
        )}
      </Typography>
    );
  },
) as PolymorphicComponent<ListTextProps, 'span'>;

ListText.displayName = LIST_TEXT_NAME;

export {
  List,
  ListCell,
  ListItem,
  ListItemContent,
  ListText,
  ListChevronButton,
};
