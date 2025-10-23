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
  href: string;
  isActive?: boolean;
  depth?: string;
  sx?: SxProp;
  leadingContent?: ReactNode;
}>;

const LnbGroupItem = ({
  href,
  children,
  isActive,
  depth = '1',
  sx,
  leadingContent,
}: Props) => {
  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  const ref = useRef<HTMLAnchorElement>(null);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipOpenChange = useCallback((open: boolean) => {
    const textContent = ref.current?.querySelector(
      '[data-role="list-text-content"]',
    );

    if (!textContent) return;

    if (textContent.getBoundingClientRect().width < textContent.scrollWidth) {
      setTooltipOpen(open);
    } else {
      setTooltipOpen(false);
    }
  }, []);

  return (
    <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
      <TooltipTrigger>
        <ListCell
          alignItems="center"
          ref={ref}
          as={Link}
          href={href}
          onClick={handleRouteChange}
          fillWidth
          verticalPadding="small"
          data-depth={depth}
          aria-current={isActive ? 'page' : undefined}
          textProps={{
            variant: 'label1',
            weight: isActive ? 'bold' : 'regular',
            color: isActive
              ? 'semantic.label.normal'
              : 'semantic.label.alternative',
          }}
          sx={[lnbItemStyle, sx]}
          leadingContent={leadingContent}
          trailingContent={
            <ListCellContent variant="icon">
              <IconArrowRightThick
                sx={{
                  fontSize: '12px',
                }}
              />
            </ListCellContent>
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
