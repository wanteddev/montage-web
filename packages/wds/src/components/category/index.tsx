import {
  forwardRef,
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';
import {
  Box,
  type DefaultComponentPropsInternal,
  type PolymorphicComponentInternal,
  type PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';

import { FlexBox } from '../flex-box';
import { ScrollArea } from '../scroll-area';
import { Chip } from '../chip';
import useResizeObserver from '../../hooks/internal/use-resize-observer';

import {
  categoryListItemStyle,
  categoryListStyle,
  scrollWrapperStyle,
  stickyButtonStyle,
} from './style';
import {
  CategoryListProvider,
  CategoryProvider,
  useCategoryContext,
  useCategoryListContext,
} from './contexts';
import {
  CATEGORY_LIST_ITEM_NAME,
  CATEGORY_LIST_NAME,
  CATEGORY_NAME,
  CATEGORY_PANEL_NAME,
} from './constants';
import { getCategoryListItemSize } from './helpers';

import type {
  ComponentRef,
  ElementType,
  ForwardedRef,
  UIEventHandler,
} from 'react';
import type {
  CategoryListItemProps,
  CategoryListProps,
  CategoryPanelProps,
  CategoryProps,
} from './types';

const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const Category = ({
  defaultValue,
  value: valueProp,
  onValueChange,
  children,
  disableScrollMoveOnChange = false,
}: CategoryProps) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? '',
    onChange: onValueChange,
  });

  const [panels, setPanels] = useState<Array<string>>([]);

  const [viewportNode, setViewportNode] = useState<HTMLDivElement | null>(null);

  const id = useId();

  return (
    <CategoryProvider
      id={id}
      value={value}
      onValueChange={setValue}
      panels={panels}
      onPanelsChange={setPanels}
      disableScrollMoveOnChange={disableScrollMoveOnChange}
      viewportNode={viewportNode}
      onViewportNodeChange={setViewportNode}
    >
      {children}
    </CategoryProvider>
  );
};

Category.displayName = CATEGORY_NAME;

const CategoryList = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<CategoryListProps, 'div'>
>(
  (
    {
      size = 'medium',
      horizontalPadding = false,
      iconButton,
      dir,
      xs,
      sm,
      md,
      lg,
      xl,
      children,
      variant = 'normal',
      verticalPadding = false,
      ...props
    },
    ref,
  ) => {
    const context = useCategoryContext(CATEGORY_LIST_NAME);
    const containerRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(ref, containerRef);

    const [isScrollableLeft, setIsScrollableLeft] = useState(false);
    const [isScrollableRight, setIsScrollableRight] = useState(false);

    const handleOnScroll: UIEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        const target = e.target as Element;

        const { scrollLeft, scrollWidth, clientWidth } = target;

        setIsScrollableLeft(scrollLeft > 0);

        if (scrollWidth - scrollLeft <= clientWidth + 1) {
          setIsScrollableRight(false);
        } else if (scrollWidth !== clientWidth) {
          setIsScrollableRight(true);
        }
      },
      [setIsScrollableLeft, setIsScrollableRight],
    );

    const handleResize = useCallback(() => {
      const target = context.viewportNode?.parentElement?.parentElement;

      if (!target || !context.viewportNode) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = target;

      setIsScrollableLeft(scrollLeft > 0);

      if (scrollWidth - scrollLeft <= clientWidth + 1) {
        setIsScrollableRight(false);
      } else if (scrollWidth !== clientWidth) {
        setIsScrollableRight(true);
      }
    }, [context.viewportNode]);

    useResizeObserver(context.viewportNode, handleResize);

    return (
      <CategoryListProvider
        handleResize={handleResize}
        variant={variant}
        size={size}
        responsive={{ xs, sm, md, lg, xl }}
      >
        <RovingFocusGroup.Root asChild orientation="horizontal" loop dir="ltr">
          <FlexBox
            wds-component="category-list"
            role="tablist"
            ref={composedRef}
            dir={dir || 'ltr'}
            alignItems="center"
            {...props}
            sx={[
              categoryListStyle({
                horizontalPadding,
                verticalPadding,
                size,
                xs,
                sm,
                md,
                lg,
                xl,
                isScrollableLeft,
                isScrollableRight,
              }),
              props.sx,
            ]}
          >
            <ScrollArea
              data-radix-scroll-area-wrapper=""
              sx={scrollWrapperStyle}
              onScrollCapture={handleOnScroll}
              scrollbars="horizontal"
              size="small"
            >
              <FlexBox
                ref={context.onViewportNodeChange}
                data-role="category-list-wrapper"
                sx={{ position: 'relative' }}
              >
                {children}
              </FlexBox>
            </ScrollArea>

            {Boolean(iconButton) && (
              <FlexBox
                sx={stickyButtonStyle}
                data-role="category-list-icon-button"
                as="span"
                alignItems="center"
              >
                {iconButton}
              </FlexBox>
            )}
          </FlexBox>
        </RovingFocusGroup.Root>
      </CategoryListProvider>
    );
  },
);

CategoryList.displayName = CATEGORY_LIST_NAME;

const CategoryListItem = forwardRef<any, CategoryListItemProps>(
  <T extends ElementType = 'button'>(
    {
      children,
      value,
      disabled,
      as,
      variant: originVariant,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<CategoryListItemProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const ref = useRef<ComponentRef<T> | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref as ForwardedRef<T>);

    const context = useCategoryContext(CATEGORY_LIST_ITEM_NAME);
    const { handleResize, variant, ...categoryListContext } =
      useCategoryListContext(CATEGORY_LIST_ITEM_NAME);
    const isDisabled = disabled;

    const sizeProps = useMemo(
      () =>
        getCategoryListItemSize(categoryListContext, { xs, sm, md, lg, xl }),
      [xs, sm, md, lg, xl, categoryListContext],
    );

    const isActive = context.value === value;
    const isArrowKeyPressedRef = useRef(false);

    const controls = context.panels.find((v) => v === value);

    useResizeObserver(ref.current as HTMLElement, handleResize);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };

      const handleKeyUp = () => (isArrowKeyPressedRef.current = false);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, []);

    const scrollIntoView = () => {
      const parent = context.viewportNode?.parentElement?.parentElement;
      const child = ref.current as HTMLDivElement | null;

      if (!parent || !child) {
        return;
      }

      const parentViewportAreaWidth = parent.clientWidth;

      const 기준점 = parentViewportAreaWidth / 2;

      const childOffsetLeft = child.offsetLeft + child.clientWidth;

      if (childOffsetLeft < 기준점) {
        parent.scrollLeft = 0;
      } else {
        parent.scrollLeft = childOffsetLeft - 기준점;
      }
    };

    useEffect(() => {
      const scrollMove = () => {
        if (context.value === value) {
          scrollIntoView();
        }
      };

      if (!context.disableScrollMoveOnChange) {
        scrollMove();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.value, value, context.disableScrollMoveOnChange]);

    return (
      <RovingFocusGroup.Item asChild focusable={!isDisabled} active={isActive}>
        <Chip
          as={(as || 'button') as T}
          type="button"
          role="tab"
          ref={composedRefs}
          aria-pressed={undefined}
          wds-component="category-list-item"
          aria-selected={isActive}
          aria-disabled={disabled}
          data-value={value}
          aria-controls={
            controls !== undefined
              ? `${context.id}-${controls}-panel`
              : undefined
          }
          {...props}
          disabled={disabled}
          active={isActive}
          variant={
            originVariant ??
            (isActive && variant !== 'alternative' ? 'solid' : 'outlined')
          }
          sx={[categoryListItemStyle(sizeProps), props.sx]}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if (disabled) {
              return;
            }

            if (event.key === 'Enter') event.preventDefault();
          })}
          onClick={composeEventHandlers(props.onClick, () => {
            if (disabled) {
              return;
            }

            context.onValueChange(value);
          })}
          onFocus={composeEventHandlers(props.onFocus, (e) => {
            if (disabled) {
              return;
            }

            if (isArrowKeyPressedRef.current) {
              (e.currentTarget as HTMLElement).click();
            }
          })}
        >
          {children}
        </Chip>
      </RovingFocusGroup.Item>
    );
  },
) as PolymorphicComponentInternal<CategoryListItemProps, 'button'>;

CategoryListItem.displayName = CATEGORY_LIST_ITEM_NAME;

const CategoryPanel = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<CategoryPanelProps, 'div'>
>(({ value, mountMode = 'force-mount', ...props }, ref) => {
  const context = useCategoryContext(CATEGORY_PANEL_NAME);
  const [firstRendered, setFirstRendered] = useState(false);

  const deferredValue = useDeferredValue(value);
  const isActive = value === context.value;

  useEffect(() => {
    if (!firstRendered && isActive) {
      setFirstRendered(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    context.onPanelsChange((prev) => [
      ...prev.filter((v) => v !== deferredValue),
      value,
    ]);

    return () => {
      context.onPanelsChange((prev) => [...prev.filter((v) => v !== value)]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!isActive) {
    switch (mountMode) {
      case 'always':
        break;
      case 'only-active':
        return null;
      case 'force-mount':
        if (firstRendered) {
          break;
        }
        return null;
    }
  }

  return (
    <Box
      {...props}
      ref={ref}
      wds-component="category-panel"
      id={`${context.id}-${value}-panel`}
      aria-labelledby={`${context.id}-${value}`}
      role="tabpanel"
      hidden={!isActive}
    />
  );
});

CategoryPanel.displayName = CATEGORY_PANEL_NAME;

export { Category, CategoryList, CategoryListItem, CategoryPanel };

export type {
  CategoryProps,
  CategoryListProps,
  CategoryListItemProps,
  CategoryPanelProps,
};
