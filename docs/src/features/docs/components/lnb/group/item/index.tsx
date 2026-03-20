import {
  FlexBox,
  ListCell,
  ListCellContent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@wanteddev/wds';
import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  IconArrowRightThick,
  IconArrowUpRightThick,
} from '@wanteddev/wds-icon';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import { lnbItemStyle } from './style';

import type { PropsWithChildren, ReactNode } from 'react';
import type { SxProp } from '@wanteddev/wds';

type Props = PropsWithChildren<{
  href?: string;
  isActive?: boolean;
  depth?: string;
  sx?: SxProp;
  disabled?: boolean;
  trailingContent?: ReactNode;
  onClick?: () => void;
  wrapperSx?: SxProp;
  isExternal?: boolean;
}>;

const LnbGroupItem = ({
  href,
  children,
  isActive,
  depth = '1',
  sx,
  disabled,
  trailingContent,
  onClick,
  wrapperSx,
  isExternal,
}: Props) => {
  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  const ref = useRef<HTMLLIElement>(null);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipOpenChange = useCallback((open: boolean) => {
    const textContent = ref.current?.querySelector(
      '[data-role="list-text-content"]',
    );

    if (!textContent) return;

    if (
      Math.ceil(textContent.getBoundingClientRect().width) <
      textContent.scrollWidth
    ) {
      setTooltipOpen(open);
    } else {
      setTooltipOpen(false);
    }
  }, []);

  const routeProps = useMemo(() => {
    if (isExternal) {
      return {
        role: 'link',
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
        as: Link,
      };
    }

    return href
      ? {
          role: 'link',
          href,
          onClick: handleRouteChange,
          as: Link,
          prefetch: false,
        }
      : { role: 'button', onClick, as: 'div' };
  }, [href, isExternal, handleRouteChange, onClick]);

  const isRootDepth = depth === '0';

  const color = useMemo(() => {
    if (depth === '0') {
      return 'semantic.label.neutral';
    }

    return isActive ? 'semantic.label.normal' : 'semantic.label.alternative';
  }, [depth, isActive]);

  return (
    <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
      <TooltipTrigger>
        <FlexBox as="li" sx={wrapperSx}>
          <ListCell
            alignItems="center"
            ref={ref}
            {...routeProps}
            fillWidth
            verticalPadding="small"
            data-depth={depth}
            aria-current={isActive ? 'page' : undefined}
            textProps={{
              variant: isRootDepth ? 'heading2' : 'body2',
              weight: isActive || isRootDepth ? 'bold' : 'medium',
              color,
              lg: {
                variant: 'label1',
              },
            }}
            disableInteraction={disabled}
            aria-disabled={disabled}
            sx={[lnbItemStyle, sx]}
            trailingContent={
              trailingContent ?? isExternal ? (
                <ListCellContent
                  variant="icon"
                  data-role="lnb-group-item-arrow"
                >
                  <IconArrowUpRightThick
                    aria-hidden
                    sx={{ fontSize: '16px' }}
                  />
                </ListCellContent>
              ) : (
                <ListCellContent
                  variant="icon"
                  data-role="lnb-group-item-arrow"
                >
                  <IconArrowRightThick aria-hidden sx={{ fontSize: '16px' }} />
                </ListCellContent>
              )
            }
          >
            {children}
          </ListCell>
        </FlexBox>
      </TooltipTrigger>
      <TooltipContent position="right-center" offset={6} size="small">
        {children}
      </TooltipContent>
    </Tooltip>
  );
};

export default LnbGroupItem;
