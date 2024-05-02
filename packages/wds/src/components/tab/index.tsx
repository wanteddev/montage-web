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
import {
  Box,
  type MergeElementProps,
  type MergeWithCustomElementProps,
} from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import ScrollArea from '../scroll-area';

import {
  scrollWrapperStyle,
  stickyButtonStyle,
  tabListItemStyle,
  tabListStyle,
} from './style';
import { TabProvider, useTabContext } from './contexts';
import { TAB_LIST_ITEM_NAME, TAB_NAME, TAB_PANEL_NAME } from './constants';

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
}: TabProps) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [panels, setPanels] = useState<Array<string>>([]);

  const id = useId();

  return (
    <TabProvider
      id={id}
      value={value}
      onValueChange={setValue}
      panels={panels}
      onPanelsChange={setPanels}
    >
      {children}
    </TabProvider>
  );
};

Tab.displayName = TAB_NAME;

const TabList = forwardRef<
  HTMLDivElement,
  MergeElementProps<'div', TabListProps>
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

    const viewportRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
      const handleResize = () => {
        if (!viewportRef.current || !containerRef.current) {
          return;
        }

        const width = viewportRef.current.scrollWidth;
        const left = viewportRef.current.scrollLeft;

        setScrollLeft(left);
        setScrollWidth(width);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <RovingFocusGroup.Root asChild orientation="horizontal" loop dir="ltr">
        <FlexBox
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
            viewportRef={viewportRef}
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

TabList.displayName = 'TabList';

const TabListItemFc = forwardRef(
  <E extends ElementType = 'div'>(
    {
      children,
      value,
      disabled,
      as,
      ...props
    }: MergeWithCustomElementProps<E, TabListItemProps>,
    forwardedRef: ForwardedRef<ElementRef<E>>,
  ) => {
    const ref = useRef<ElementRef<E>>(null);
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

    useEffect(() => {
      if (context.value === value) {
        (ref.current as HTMLElement | null)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, [context.value, value]);

    return (
      <RovingFocusGroup.Item asChild focusable={!isDisabled} active={isActive}>
        <Box
          as={(as || 'div') as ElementType}
          role="tab"
          ref={composedRefs}
          {...props}
          aria-selected={isActive}
          aria-labelledby={`${context.id}-${value}`}
          aria-controls={
            controls !== undefined
              ? `${context.id}-${controls}-panel`
              : undefined
          }
          sx={tabListItemStyle}
          onKeyDown={composeEventHandlers(
            props.onKeyDown,
            (event: React.KeyboardEvent) => {
              if (event.key === 'Enter') event.preventDefault();
            },
          )}
          onClick={composeEventHandlers(props.onClick, () => {
            context.onValueChange(value);
          })}
          onFocus={composeEventHandlers(
            props.onFocus,
            (e: React.FocusEvent) => {
              if (isArrowKeyPressedRef.current) {
                (e.currentTarget as HTMLElement).click();
              }
            },
          )}
        >
          <span id={`${context.id}-${value}`}>{children}</span>
        </Box>
      </RovingFocusGroup.Item>
    );
  },
);

TabListItemFc.displayName = TAB_LIST_ITEM_NAME;

const TabListItem = TabListItemFc as <E extends ElementType = 'div'>(
  props: MergeWithCustomElementProps<E, TabListItemProps>,
) => JSX.Element;

const TabPanel = forwardRef<
  HTMLDivElement,
  MergeElementProps<'div', TabPanelProps>
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
      id={`${context.id}-${value}-panel`}
      aria-labelledby={`${context.id}-${value}`}
      role="tabpanel"
      hidden={!isActive}
    />
  );
});

TabPanel.displayName = TAB_PANEL_NAME;

export { Tab, TabList, TabListItem, TabPanel };
