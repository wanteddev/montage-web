import { forwardRef, useId, useState } from 'react';
import {
  Box,
  type PolymorphicComponentInternal,
  type PolymorphicPropsInternal,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { IconChevronRightTightSmall } from '@wanteddev/wds-icon';
import { Slot } from '@radix-ui/react-slot';

import { Divider } from '../divider';
import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { WithInteraction } from '../with-interaction';
import { useMenuItemContext } from '../menu/contexts';
import { IconButtonProvider } from '../icon-button/contexts';
import { TextButtonProvider } from '../text-button/contexts';
import { CheckboxProvider } from '../checkbox/contexts';
import { RadioProvider } from '../radio/contexts';
import { isElementDisabled } from '../../utils/internal/element';

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

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
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
    { children, ...props }: DefaultComponentPropsInternal<ListProps, 'ul'>,
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
  <T extends ElementType = 'li'>(
    {
      as,
      verticalPadding = 'medium',
      fillWidth = false,
      divider,
      ellipsis = false,
      interactionPadding = fillWidth ? undefined : '12px',
      alignItems = 'flex-start',

      selected = false,
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
    }: PolymorphicPropsInternal<ListCellProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const [item, setItem] = useState<T | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setItem(node as T));

    const itemElement = item as unknown as HTMLElement | null;

    const controllable = itemElement?.querySelector(
      '[role="checkbox"], [role="radio"], button:not([role="switch"]), [role="button"], a',
    );
    const clickable = !disabled && !disableInteraction;

    const textId = useId();
    const captionId = useId();

    return (
      <ListCellProvider
        selected={selected}
        disabled={disabled}
        ellipsis={ellipsis}
        alignItems={alignItems}
        textId={textId}
        captionId={captionId}
      >
        <WithInteraction
          disabled={disabled || disableInteraction}
          variant="light"
        >
          <FlexBox
            as={(as || 'li') as T}
            role="listitem"
            ref={composedRefs}
            flexDirection="row"
            alignItems={alignItems}
            gap="8px"
            aria-disabled={disabled}
            disabled={disabled}
            tabIndex={clickable ? 0 : undefined}
            aria-labelledby={textId}
            aria-describedby={captionId}
            aria-current={selected}
            data-disable-interaction={
              disabled || disableInteraction || verticalPadding === 'none'
            }
            wds-component="list-cell"
            {...props}
            onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
              if (
                e.key === 'Enter' &&
                !e.metaKey &&
                (e.target as HTMLElement) === itemElement
              ) {
                e.preventDefault();
                e.currentTarget.click();
              }
            })}
            onClick={composeEventHandlers(props.onClick, (e) => {
              const target = e.target as HTMLElement;
              if (
                isElementDisabled(target) ||
                target.ariaHidden?.toString() === 'true' ||
                target.hidden.toString() === 'true'
              ) {
                return;
              }

              if (
                controllable &&
                // prevent double call of event when clicking directly on controllable
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
                selected,
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
) as PolymorphicComponentInternal<ListCellProps, 'li'>;

ListCell.displayName = LIST_CELL_NAME;

const ListCellContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellContentProps, 'div'>
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

    case 'checkbox':
      return (
        <CheckboxProvider tight>
          <FlexBox
            wds-component="list-cell-content"
            alignItems={alignItems}
            ref={ref}
            {...props}
            sx={[listCellContentStyle({ variant }), sx]}
          >
            {children}
          </FlexBox>
        </CheckboxProvider>
      );
    case 'radio':
      return (
        <RadioProvider tight>
          <FlexBox
            wds-component="list-cell-content"
            alignItems={alignItems}
            ref={ref}
            {...props}
            sx={[listCellContentStyle({ variant }), sx]}
          >
            {children}
          </FlexBox>
        </RadioProvider>
      );
    case 'icon':
    case 'avatar':
    case 'badge':
    case 'switch':
    case 'thumbnail':
    case 'value':
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
  <T extends ElementType = 'p'>(
    {
      variant = 'body1',
      weight: givenWeight,
      color,
      children,
      caption,
      captionProps,
      as,
      ...props
    }: PolymorphicPropsInternal<ListTextProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { selected, disabled, ellipsis, textId, captionId } =
      useListCellContext(LIST_TEXT_NAME);
    const { selected: menuItemSelected } = useMenuItemContext() || {};

    if (!children) {
      return null;
    }

    const weight: TypographyWeight =
      givenWeight ?? (selected || menuItemSelected ? 'medium' : 'regular');

    const getTextColor = (): ThemeColorsToken => {
      if (disabled) {
        return 'semantic.label.alternative';
      }
      if (selected) {
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
          <Box as="span" data-role="list-text-content" id={textId}>
            {children}
          </Box>
        </Box>

        {Boolean(caption) && (
          <Typography
            variant="label1"
            color="semantic.label.alternative"
            data-role="list-text-caption"
            id={captionId}
            {...captionProps}
            sx={[listTextEllipsisStyle(ellipsis), captionProps?.sx]}
          >
            {caption}
          </Typography>
        )}
      </Typography>
    );
  },
) as PolymorphicComponentInternal<ListTextProps, 'p'>;

ListText.displayName = LIST_TEXT_NAME;

export { List, ListCell, ListCellContent };

export type { ListProps, ListCellProps, ListCellContentProps };
