import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import Typography from '../typography';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

import {
  compactTooltipContentStyle,
  compactTooltipWrapperStyle,
} from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { CompactTooltipContentProps } from './types';

const CompactTooltip = Tooltip;

CompactTooltip.displayName = 'CompactTooltip';

const CompactTooltipTrigger = TooltipTrigger;

CompactTooltipTrigger.displayName = 'CompactTooltipTrigger';

const CompactTooltipContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<CompactTooltipContentProps, 'div'>
>(
  (
    {
      children,
      shortcut,
      container,
      disablePortal,
      position = 'top-center',
      offset,
      ...props
    },
    ref,
  ) => {
    return (
      <TooltipContent
        position={position}
        offset={offset}
        container={container}
        disablePortal={disablePortal}
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
  },
);

CompactTooltipContent.displayName = 'CompactTooltipContent';

export { CompactTooltip, CompactTooltipTrigger, CompactTooltipContent };
