import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import FlexBox from '../flex-box';
import ScrollArea from '../scroll-area';
import Typography from '../typography';

import {
  scrollWrapperStyle,
  stickyGradientStyle,
  tabItemStyle,
  tabStyle,
} from './style';

import type { UIEventHandler } from 'react';
import type { MergeElementProps } from '@/types';
import type { TabItemProps, TabProps } from './types';

const Tab = forwardRef<HTMLUListElement, MergeElementProps<'ul', TabProps>>(
  (
    {
      children,
      rightIcon,
      padding = false,
      size = 'small',
      xs,
      sm,
      md,
      lg,
      ...props
    },
    ref,
  ) => {
    const [isSticky, setIsSticky] = useState(false);

    const viewportRef = useRef<HTMLDivElement>(null);

    const containerRef = useRef<HTMLUListElement>(null);
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
      <ScrollArea
        css={scrollWrapperStyle({ padding, xs, sm, md, lg })}
        onScrollCapture={handleOnScroll}
        scrollbars="horizontal"
        viewportRef={viewportRef}
      >
        <FlexBox
          as="ul"
          ref={composedRef}
          css={tabStyle({
            padding,
            size,
            xs,
            sm,
            md,
            lg,
          })}
          {...props}
        >
          <FlexBox alignItems="center">
            {children}

            <FlexBox
              css={stickyGradientStyle(isSticky, Boolean(rightIcon))}
              as="span"
              alignItems="center"
            >
              {Boolean(rightIcon) && rightIcon}
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </ScrollArea>
    );
  },
);

Tab.displayName = 'Tab';

const TabItem = forwardRef<
  HTMLLIElement,
  Omit<MergeElementProps<'li', TabItemProps>, 'color'>
>(({ children, active, ...props }, ref) => {
  return (
    <Typography
      ref={ref}
      as="li"
      variant="headline2"
      weight="bold"
      aria-current={active ? 'page' : 'false'}
      css={tabItemStyle}
      color={active ? 'palette.label.strong' : 'palette.label.assistive'}
      {...props}
    >
      <span tabIndex={0}>{children}</span>
    </Typography>
  );
});

export { Tab, TabItem };
