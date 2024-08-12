'use client';
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

import FlexBox from '../flex-box';
import ScrollArea from '../scroll-area';
import useResizeObserver from '../../hooks/use-resize-observer';

import {
  scrollWrapperStyle,
  stickyButtonStyle,
  tabListItemStyle,
  tabListStyle,
} from './style';
import { TabProvider, useTabContext } from './contexts';
import {
  TAB_LIST_ITEM_NAME,
  TAB_LIST_NAME,
  TAB_NAME,
  TAB_PANEL_NAME,
} from './constants';

import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type {
  ElementRef,
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
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [panels, setPanels] = useState<Array<string>>([]);

  const containerViewportRef = useRef<HTMLDivElement>(null);

  const id = useId();

  return (
    <TabProvider
      id={id}
      value={value}
      onValueChange={setValue}
      panels={panels}
      onPanelsChange={setPanels}
      disableScrollMoveOnChange={disableScrollMoveOnChange}
      containerViewportRef={containerViewportRef}
    >
      {children}
    </TabProvider>
  );
};

Tab.displayName = TAB_NAME;

const TabList = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TabListProps, 'div'>
>(
  (
    {
      size = 'large',
      padding = false,
      rightIcon,
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
    const [isSticky, setIsSticky] = useState(false);

    const context = useTabContext(TAB_LIST_NAME);
    const viewportRef = useRef<HTMLDivElement>(null);
    const composedViewportRef = useComposedRefs(
      viewportRef,
      context.containerViewportRef,
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(ref, containerRef);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);

    const handleOnScroll: UIEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        const target = e.target as Element;

        setScrollLeft(target.scrollLeft);
        setScrollWidth(target.scrollWidth);
      },
      [setScrollLeft, setScrollWidth],
    );

    useEffect(() => {
      if (
        scrollWidth - scrollLeft <=
        (viewportRef.current?.clientWidth || 0) + 1
      ) {
        setIsSticky(false);
      } else if (scrollWidth !== viewportRef.current?.clientWidth) {
        setIsSticky(true);
      }
    }, [scrollLeft, scrollWidth]);

    const handleResize = useCallback(() => {
      const target = viewportRef.current;
      if (!target) {
        return;
      }

      const width = target.scrollWidth;
      const left = target.scrollLeft;

      setScrollLeft(left);
      setScrollWidth(width);
    }, [setScrollLeft]);

    useResizeObserver(viewportRef.current, handleResize);

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
              padding,
              size,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            props.sx,
          ]}
        >
          <ScrollArea
            sx={scrollWrapperStyle({ padding, xs, sm, md, lg, xl, isSticky })}
            onScrollCapture={handleOnScroll}
            scrollbars="horizontal"
            viewportRef={composedViewportRef}
          >
            <FlexBox>{children}</FlexBox>
          </ScrollArea>

          {Boolean(rightIcon) && (
            <FlexBox sx={stickyButtonStyle} as="span" alignItems="center">
              {rightIcon}
            </FlexBox>
          )}
        </FlexBox>
      </RovingFocusGroup.Root>
    );
  },
);

TabList.displayName = TAB_LIST_NAME;

const TabListItem = forwardRef(
  <T extends ElementType = 'div'>(
    {
      children,
      value,
      disabled,
      as,
      ...props
    }: PolymorphicProps<TabListItemProps, T>,
    forwardedRef: ForwardedRef<ElementRef<T>>,
  ) => {
    const ref = useRef<ElementRef<T>>(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);

    const context = useTabContext(TAB_LIST_ITEM_NAME);
    const isDisabled = disabled;

    const isActive = context.value === value;
    const isArrowKeyPressedRef = useRef(false);

    const controls = context.panels.find((v) => v === value);

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
      const parent = context.containerViewportRef.current;
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
        <Box
          as={(as || 'div') as T}
          role="tab"
          ref={composedRefs}
          {...props}
          wds-component="tab-list-item"
          aria-selected={isActive}
          aria-labelledby={`${context.id}-${value}`}
          aria-controls={
            controls !== undefined
              ? `${context.id}-${controls}-panel`
              : undefined
          }
          sx={[tabListItemStyle, props.sx]}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if (event.key === 'Enter') event.preventDefault();
          })}
          onClick={composeEventHandlers(props.onClick, () => {
            context.onValueChange(value);
          })}
          onFocus={composeEventHandlers(props.onFocus, (e) => {
            if (isArrowKeyPressedRef.current) {
              (e.currentTarget as HTMLElement).click();
            }
          })}
        >
          <span id={`${context.id}-${value}`}>{children}</span>
        </Box>
      </RovingFocusGroup.Item>
    );
  },
) as PolymorphicComponent<TabListItemProps, 'div'>;

TabListItem.displayName = TAB_LIST_ITEM_NAME;

const TabPanel = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TabPanelProps, 'div'>
>(({ value, mountMode = 'force-mount', ...props }, ref) => {
  const context = useTabContext(TAB_PANEL_NAME);
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
    <div
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
