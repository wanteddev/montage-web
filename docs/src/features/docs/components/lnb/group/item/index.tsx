import {
  ListCell,
  ListCellContent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@wanteddev/wds';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { IconArrowRightThick } from '@wanteddev/wds-icon';

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

  const routeProps = href
    ? { href, onClick: handleRouteChange, as: Link }
    : { onClick };

  return (
    <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
      <TooltipTrigger>
        <ListCell
          alignItems="center"
          ref={ref}
          {...routeProps}
          fillWidth
          verticalPadding="small"
          data-depth={depth}
          aria-current={isActive ? 'page' : undefined}
          textProps={{
            variant: 'body2',
            weight: isActive ? 'bold' : 'medium',
            color: isActive
              ? 'semantic.label.normal'
              : 'semantic.label.alternative',
            lg: {
              variant: 'label1',
            },
          }}
          disableInteraction={disabled}
          aria-disabled={disabled}
          sx={[lnbItemStyle, sx]}
          trailingContent={
            trailingContent ?? (
              <ListCellContent variant="icon" data-role="lnb-group-item-arrow">
                <IconArrowRightThick aria-hidden sx={{ fontSize: '16px' }} />
              </ListCellContent>
            )
          }
        >
          {children}
        </ListCell>
      </TooltipTrigger>
      <TooltipContent position="right-center" offset={6} size="small">
        {children}
      </TooltipContent>
    </Tooltip>
  );
};

export default LnbGroupItem;
