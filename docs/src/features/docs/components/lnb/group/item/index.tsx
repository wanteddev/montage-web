import {
  CompactTooltip,
  CompactTooltipContent,
  CompactTooltipTrigger,
  ListCell,
} from '@wanteddev/wds';
import Link from 'next/link';
import { type PropsWithChildren, useCallback, useRef, useState } from 'react';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import { lnbItemStyle } from './style';

type Props = PropsWithChildren<{
  href: string;
  isActive: boolean;
  depth?: string;
}>;

const LnbGroupItem = ({ href, children, isActive, depth = '1' }: Props) => {
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
    <CompactTooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
      <CompactTooltipTrigger>
        <ListCell
          ref={ref}
          as={Link}
          href={href}
          sx={lnbItemStyle}
          onClick={handleRouteChange}
          active={isActive}
          fillWidth
          verticalPadding={depth === '0' ? 'large' : 'small'}
          data-depth={depth}
          aria-current={isActive ? 'page' : undefined}
          disableInteraction={depth === '0'}
          textProps={{
            variant: depth === '0' ? 'body2' : 'label1',
            weight: depth === '0' ? 'bold' : 'medium',
          }}
        >
          {children}
        </ListCell>
      </CompactTooltipTrigger>

      <CompactTooltipContent position="right-center" offset={16}>
        {children}
      </CompactTooltipContent>
    </CompactTooltip>
  );
};

export default LnbGroupItem;
