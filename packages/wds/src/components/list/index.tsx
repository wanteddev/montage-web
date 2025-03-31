import { forwardRef, useState } from 'react';
import {
  Box,
  type PolymorphicComponent,
  type PolymorphicProps,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { IconChevronRightTightSmall } from '@wanteddev/wds-icon';
import { Slot } from '@radix-ui/react-slot';

import { Divider, FlexBox, Typography, WithInteraction } from '..';
import { useMenuItemContext } from '../menu/contexts';
import { IconButtonProvider } from '../icon-button/contexts';
import { TextButtonProvider } from '../text-button/contexts';

import {
  LIST_CELL_CONTENT_NAME,
  LIST_CELL_NAME,
  LIST_NAME,
  LIST_TEXT_NAME,
} from './constants';
import {
  listCellContentStyle,
  listCellDividerStyle,
  listCellStyle,
  listStyle,
  listTextContentWrapperStyle,
  listTextEllipsisStyle,
  listTextStyle,
} from './style';
import { ListCellProvider, useListCellContext } from './contexts';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { TypographyWeight } from '../typography/types';
import type {
  ListCellContentProps,
  ListCellProps,
  ListProps,
  ListTextProps,
} from './types';

const List = forwardRef(
  (
    { children, ...props }: DefaultComponentProps<ListProps, 'ul'>,
    ref: ForwardedRef<HTMLUListElement>,
  ) => {
    return (
      <FlexBox
        as="ul"
        ref={ref}
        role="list"
        flexDirection="column"
        {...props}
        sx={[listStyle, props.sx]}
      >
        {children}
      </FlexBox>
    );
  },
);

List.displayName = LIST_NAME;

const ListCell = forwardRef(
  <E extends ElementType = 'li'>(
    {
      as,
      verticalPadding = 'medium',
      fillWidth = false,
      divider,
      ellipsis = false,
      interactionPadding = fillWidth ? undefined : '12px',
      alignItems = 'flex-start',

      active = false,
      disabled = false,
      disableInteraction = false,

      textProps,
      leadingContent,
      trailingContent,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      ...props
    }: PolymorphicProps<ListCellProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const [item, setItem] = useState<E | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setItem(node as E));

    const itemElement = item as unknown as HTMLElement | null;

    const controllable = itemElement?.querySelector(
      '[role="checkbox"], [role="radio"], button:not([role="switch"]), [role="button"], a',
    );
    const clickable = Boolean(props.onClick || controllable) && !disabled;

    return (
      <ListCellProvider
        active={active}
        disabled={disabled}
        ellipsis={ellipsis}
        alignItems={alignItems}
      >
        <WithInteraction disabled={disabled || disableInteraction}>
          <FlexBox
            as={(as || 'li') as E}
            role="listitem"
            ref={composedRefs}
            flexDirection="row"
            alignItems={alignItems}
            gap="8px"
            aria-disabled={disabled}
            disabled={disabled}
            tabIndex={clickable ? 0 : undefined}
            {...props}
            onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
              if (
                (e.key === 'Enter' || e.key === ' ') &&
                (e.target as HTMLElement) === itemElement
              ) {
                e.preventDefault();
                e.currentTarget.click();
              }
            })}
            onClick={composeEventHandlers(props.onClick, (e) => {
              if (
                (e.target as HTMLElement)
                  .getAttribute('disabled')
                  ?.toString() === 'true' ||
                (e.target as HTMLElement).ariaDisabled?.toString() === 'true' ||
                (e.target as HTMLElement).ariaHidden?.toString() === 'true' ||
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

                if (controllable.role === 'radio') {
                  (controllable as HTMLElement).focus({
                    preventScroll: false,
                    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focusvisible
                    // @ts-expect-error
                    focusVisible: false,
                  });
                }
              }
            })}
            sx={[
              listCellStyle({
                verticalPadding,
                fillWidth,
                interactionPadding,
                active,
                disabled,
                disableInteraction,
                xl,
                xs,
                sm,
                md,
                lg,
              }),
              sx,
            ]}
          >
            {Boolean(leadingContent) && leadingContent}
            <ListText {...textProps}>{children}</ListText>
            {divider && (
              <Divider
                data-role="list-cell-divider"
                sx={listCellDividerStyle}
              />
            )}
            {Boolean(trailingContent) && (
              <Slot data-role="list-item-trailing-content">
                {trailingContent}
              </Slot>
            )}
          </FlexBox>
        </WithInteraction>
      </ListCellProvider>
    );
  },
) as PolymorphicComponent<ListCellProps, 'li'>;

ListCell.displayName = LIST_CELL_NAME;

const ListCellContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ListCellContentProps, 'div'>
>(({ variant = 'custom', children, chevron = true, sx, ...props }, ref) => {
  const { alignItems } = useListCellContext(LIST_CELL_CONTENT_NAME);

  switch (variant) {
    case 'large-icon':
      return (
        <FlexBox
          wds-component="list-cell-content"
          alignItems={alignItems}
          ref={ref}
          {...props}
          sx={[listCellContentStyle({ variant }), sx]}
        >
          <FlexBox>{children}</FlexBox>
        </FlexBox>
      );

    case 'button':
      return (
        <FlexBox
          wds-component="list-cell-content"
          alignItems={alignItems}
          ref={ref}
          {...props}
          sx={[listCellContentStyle({ variant }), sx]}
        >
          <TextButtonProvider assistive="semantic.label.alternative">
            {children}
          </TextButtonProvider>
        </FlexBox>
      );

    case 'icon-button':
      return (
        <FlexBox
          wds-component="list-cell-content"
          alignItems={alignItems}
          ref={ref}
          {...props}
          sx={[listCellContentStyle({ variant }), sx]}
        >
          <IconButtonProvider normal="semantic.label.alternative">
            {children}
          </IconButtonProvider>
        </FlexBox>
      );

    case 'chevron':
      return (
        <FlexBox
          role="button"
          alignItems={alignItems}
          wds-component="list-cell-content"
          gap="8px"
          ref={ref}
          tabIndex={props.onClick ? 0 : -1}
          {...props}
          sx={sx}
        >
          {Boolean(children) && (
            <FlexBox
              justifyContent="flex-end"
              alignItems={alignItems}
              sx={listCellContentStyle({
                variant,
              })}
            >
              {children}
            </FlexBox>
          )}
          {chevron && (
            <FlexBox alignItems="center" sx={{ height: '24px' }}>
              <IconChevronRightTightSmall
                sx={(theme) => ({
                  color: theme.semantic.label.assistive,
                })}
              />
            </FlexBox>
          )}
        </FlexBox>
      );

    case 'icon':
    case 'avatar':
    case 'badge':
    case 'checkbox':
    case 'radio':
    case 'switch':
    case 'custom':
    default:
      return (
        <FlexBox
          wds-component="list-cell-content"
          alignItems={alignItems}
          ref={ref}
          {...props}
          sx={[listCellContentStyle({ variant }), sx]}
        >
          {children}
        </FlexBox>
      );
  }
});

ListCellContent.displayName = LIST_CELL_CONTENT_NAME;

const ListText = forwardRef(
  <E extends ElementType = 'p'>(
    {
      variant = 'body1',
      weight: givenWeight,
      color,
      children,
      caption,
      captionProps,
      as,
      ...props
    }: PolymorphicProps<ListTextProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const { active, disabled, ellipsis } = useListCellContext(LIST_TEXT_NAME);
    const { active: menuItemActive } = useMenuItemContext() || {};

    if (!children) {
      return null;
    }

    const weight: TypographyWeight =
      givenWeight ?? (active || menuItemActive ? 'medium' : 'regular');

    const getTextColor = (): ThemeColorsToken => {
      if (disabled) {
        return 'semantic.label.alternative';
      }
      if (active) {
        return 'semantic.primary.normal';
      }

      return color ?? 'semantic.label.normal';
    };

    return (
      <Typography
        ref={ref}
        color={getTextColor()}
        variant={variant}
        weight={weight}
        data-role="list-text-wrapper"
        {...props}
        as={as || 'p'}
        sx={[listTextStyle, props.sx]}
      >
        <Box
          as="span"
          data-role="list-text-content-wrapper"
          sx={listTextContentWrapperStyle(ellipsis)}
        >
          <Box as="span" data-role="list-text-content">
            {children}
          </Box>
        </Box>

        {Boolean(caption) && (
          <Typography
            variant="label1"
            color="semantic.label.alternative"
            data-role="list-text-caption"
            {...captionProps}
            sx={[listTextEllipsisStyle(ellipsis), captionProps?.sx]}
          >
            {caption}
          </Typography>
        )}
      </Typography>
    );
  },
) as PolymorphicComponent<ListTextProps, 'p'>;

ListText.displayName = LIST_TEXT_NAME;

export { List, ListCell, ListCellContent };
