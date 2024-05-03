import { forwardRef } from 'react';
import { Box, type MergeElementProps } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import Typography from '../typography';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

import {
  compactTooltipContentStyle,
  compactTooltipWrapperStyle,
} from './style';

import type { CompactTooltipContentProps } from './types';

const CompactTooltip = Tooltip;

CompactTooltip.displayName = 'CompactTooltip';

const CompactTooltipTrigger = TooltipTrigger;

CompactTooltipTrigger.displayName = 'CompactTooltipTrigger';

const CompactTooltipContent = forwardRef<
  HTMLDivElement,
  MergeElementProps<'div', CompactTooltipContentProps>
>(({ children, shortcut, position = 'top-center', ...props }, ref) => {
  return (
    <TooltipContent
      position={position}
      ref={ref}
      __wdsCustomChildren={
        <FlexBox {...props} sx={[compactTooltipWrapperStyle, props.sx]}>
          <Box sx={compactTooltipContentStyle}>
            <Typography
              variant="label2"
              weight="regular"
              color="palette.inverse.label"
            >
              {children}
            </Typography>

            {Boolean(shortcut) && (
              <Typography
                variant="label2"
                weight="regular"
                color="palette.inverse.label"
                sx={(theme) => ({
                  opacity: theme.opacity[61],
                  marginLeft: '4px',
                  display: 'inline-block',
                })}
              >
                {shortcut}
              </Typography>
            )}
          </Box>
        </FlexBox>
      }
    />
  );
});

CompactTooltipContent.displayName = 'CompactTooltipContent';

export { CompactTooltip, CompactTooltipTrigger, CompactTooltipContent };
