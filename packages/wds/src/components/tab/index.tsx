import {
  forwardRef,
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Box } from '@wanteddev/wds-engine';
import { usePrevious } from '@radix-ui/react-use-previous';

import { FlexBox } from '../flex-box';
import { ScrollArea } from '../scroll-area';
import useResizeObserver from '../../hooks/internal/use-resize-observer';
import { calculateAnimationStyle } from '../../utils/internal/animation';

import {
  motionDividerStyle,
  scrollWrapperStyle,
  stickyButtonStyle,
  tabListItemInteractionStyle,
  tabListItemStyle,
  tabListStyle,
  tabListWrapperStyle,
} from './style';
import {
  TabListProvider,
  TabProvider,
  useTabContext,
  useTabListContext,
} from './contexts';
import {
  TAB_LIST_ITEM_NAME,
  TAB_LIST_NAME,
  TAB_NAME,
  TAB_PANEL_NAME,
} from './constants';

import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type {
  CSSProperties,
  ComponentRef,
  ElementType,
  ForwardedRef,
  UIEventHandler,
} from 'react';
import type {
  TabListItemProps,
  TabListProps,
  TabPanelProps,
  TabProps,
} from './types';

const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const Tab = ({
  defaultValue,
  value: valueProp,
  onValueChange,
  children,
  disableScrollMoveOnChange = false,
}: TabProps) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? '',
    onChange: onValueChange,
  });

  const [panels, setPanels] = useState<Array<string>>([]);

  const [viewportNode, setViewportNode] = useState<HTMLDivElement | null>(null);

  const id = useId();

  return (
    <TabProvider
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
    </TabProvider>
  );
};

Tab.displayName = TAB_NAME;

const TabList = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TabListProps, 'div'>
>(
  (
    {
      size = 'large',
      horizontalPadding = false,
      iconButton,
      resize = 'hug',
      dir,
      xs,
      sm,
      md,
      lg,
      xl,
      children,
      ...props
    },
    ref,
  ) => {
    const context = useTabContext(TAB_LIST_NAME);
    const containerRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(ref, containerRef);

    const prevValue = usePrevious(context.value);
    const motionDividerRef = useRef<HTMLDivElement | null>(null);

    const isValueChanged = prevValue !== context.value;

    const [motionStyleProperties, setMotionStyleProperties] =
      useState<CSSProperties>({});

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

      const motionElement = motionDividerRef.current;

      const currentElement = target.querySelector<HTMLDivElement>(
        `[wds-component="tab-list-item"][data-value="${prevValue}"]`,
      );
      const nextElement = target.querySelector<HTMLDivElement>(
        `[wds-component="tab-list-item"][data-value="${context.value}"]`,
      );

      const nextTextElement = nextElement?.querySelector<HTMLSpanElement>(
        '[data-role="tab-list-item-text"]',
      );

      if (!motionElement || !nextElement || !nextTextElement) {
        setMotionStyleProperties((prev) => ({ ...prev, display: 'none' }));
        return;
      }

      setMotionStyleProperties({
        ...calculateAnimationStyle(nextTextElement, context.viewportNode),
        display: 'block',
        height: '2px',
        bottom: '0px',
        top: 'initial',
        ...(isValueChanged
          ? {
              transition: 'inset 300ms ease, width 300ms ease',
            }
          : {}),
      });

      nextElement.removeAttribute('data-ssr-motion');

      requestAnimationFrame(() => {
        currentElement?.removeAttribute('data-ssr-motion');
      });
    }, [context.value, context.viewportNode, isValueChanged, prevValue]);

    useResizeObserver(context.viewportNode, handleResize);

    return (
      <RovingFocusGroup.Root asChild orientation="horizontal" loop dir="ltr">
        <FlexBox
          wds-component="tab-list"
          role="tablist"
          ref={composedRef}
          dir={dir || 'ltr'}
          alignItems="center"
          {...props}
          sx={[
            tabListStyle({
              resize,
              horizontalPadding,
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
              data-role="tab-list-wrapper"
              sx={tabListWrapperStyle}
            >
              <Box
                data-role="tab-motion"
                style={motionStyleProperties}
                ref={motionDividerRef}
                sx={motionDividerStyle}
              />
              <TabListProvider handleResize={handleResize}>
                {children}
              </TabListProvider>
            </FlexBox>
          </ScrollArea>

          {Boolean(iconButton) && (
            <FlexBox
              sx={stickyButtonStyle}
              data-role="tab-list-icon-button"
              as="span"
              alignItems="center"
            >
              {iconButton}
            </FlexBox>
          )}
        </FlexBox>
      </RovingFocusGroup.Root>
    );
  },
);

TabList.displayName = TAB_LIST_NAME;

const TabListItem = forwardRef<any, TabListItemProps>(
  <T extends ElementType = 'div'>(
    {
      children,
      value,
      disabled,
      as,
      ...props
    }: PolymorphicPropsInternal<TabListItemProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const ref = useRef<ComponentRef<T> | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref as ForwardedRef<T>);

    const context = useTabContext(TAB_LIST_ITEM_NAME);
    const { handleResize } = useTabListContext(TAB_LIST_ITEM_NAME);
    const isDisabled = disabled;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const isActive = context.value?.toString() === value?.toString();

    const isArrowKeyPressedRef = useRef(false);

    const controls = context.panels.find(
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      (v) => v?.toString() === value?.toString(),
    );

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
        if (context.value?.toString() === value.toString()) {
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
        <Box
          as={(as || 'div') as T}
          role="tab"
          ref={composedRefs}
          {...props}
          wds-component="tab-list-item"
          disabled={disabled}
          aria-selected={isActive}
          aria-labelledby={`${context.id}-${value}`}
          aria-disabled={disabled}
          data-value={value}
          data-ssr-motion={isActive}
          aria-controls={
            controls !== undefined
              ? `${context.id}-${controls}-panel`
              : undefined
          }
          sx={[tabListItemStyle({ disabled }), props.sx]}
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
          <p data-role="tab-list-item-text-wrapper">
            <span data-role="tab-list-item-text" id={`${context.id}-${value}`}>
              {children}
            </span>

            <span data-role="tab-list-item-divider" />
          </p>

          <FlexBox
            data-role="tab-list-item-interaction-area"
            sx={tabListItemInteractionStyle}
          />
        </Box>
      </RovingFocusGroup.Item>
    );
  },
) as PolymorphicComponentInternal<TabListItemProps, 'div'>;

TabListItem.displayName = TAB_LIST_ITEM_NAME;

const TabPanel = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TabPanelProps, 'div'>
>(({ value, mountMode = 'force-mount', ...props }, ref) => {
  const context = useTabContext(TAB_PANEL_NAME);
  const [firstRendered, setFirstRendered] = useState(false);

  const deferredValue = useDeferredValue(value);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const isActive = context.value?.toString() === value?.toString();

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
      wds-component="tab-panel"
      id={`${context.id}-${value}-panel`}
      aria-labelledby={`${context.id}-${value}`}
      role="tabpanel"
      hidden={!isActive}
    />
  );
});

TabPanel.displayName = TAB_PANEL_NAME;

export { Tab, TabList, TabListItem, TabPanel };

export type { TabProps, TabListProps, TabListItemProps, TabPanelProps };
