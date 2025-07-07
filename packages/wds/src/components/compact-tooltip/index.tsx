import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import Typography from '../typography';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

import {
  compactTooltipContentStyle,
  compactTooltipWrapperStyle,
} from './style';

import type { ElementType, ForwardedRef } from 'react';
import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { CompactTooltipContentProps } from './types';

const CompactTooltip = Tooltip;

CompactTooltip.displayName = 'CompactTooltip';

const CompactTooltipTrigger = TooltipTrigger;

CompactTooltipTrigger.displayName = 'CompactTooltipTrigger';

const CompactTooltipContent = forwardRef(
  <T extends ElementType = 'div'>(
    {
      children,
      shortcut,
      container,
      disablePortal,
      position = 'top-center',
      variant = 'normal',
      offset = 4,
      referenceHidden = false,
      referenceHiddenOffsets,
      setContext,
      as,
      ...props
    }: PolymorphicProps<CompactTooltipContentProps, 'div'>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <TooltipContent
        position={position}
        offset={offset}
        container={container}
        disablePortal={disablePortal}
        referenceHidden={referenceHidden}
        referenceHiddenOffsets={referenceHiddenOffsets}
        ref={ref as ForwardedRef<HTMLDivElement>}
        setContext={setContext}
        __wdsCustomChildren={
          <Box
            {...props}
            as={as ?? FlexBox}
            sx={[compactTooltipWrapperStyle, props.sx]}
          >
            <Box sx={compactTooltipContentStyle({ variant })}>
              <Typography variant="label2" weight="medium">
                {children}
              </Typography>

              {Boolean(shortcut) && (
                <Typography
                  variant="label2"
                  weight="regular"
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
          </Box>
        }
      />
    );
  },
) as PolymorphicComponent<CompactTooltipContentProps, 'div'>;

CompactTooltipContent.displayName = 'CompactTooltipContent';

export { CompactTooltip, CompactTooltipTrigger, CompactTooltipContent };
