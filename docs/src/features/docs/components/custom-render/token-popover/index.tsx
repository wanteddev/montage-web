import {
  FlexBox,
  PopoverContent,
  Typography,
  useThemeControl,
} from '@wanteddev/wds';
import { IconMoon, IconSun } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';

import { palettePopoverWrapperStyle, popoverIconStyle } from './style';

import type { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  title: string;
  trailingContent?: ReactNode;
  offset?: number;
}>;

const TokenPopover = ({
  title,
  children,
  trailingContent,
  offset = 4,
}: Props) => {
  const { theme } = useThemeControl();

  return (
    <PopoverContent
      offset={offset}
      variant="custom"
      sx={{ padding: '20px 24px' }}
      wrapperProps={{ sx: palettePopoverWrapperStyle }}
      position="bottom-center"
    >
      <FlexBox gap="20px" flexDirection="column">
        <FlexBox gap="8px" justifyContent="space-between">
          <FlexBox gap="12px" alignItems="center">
            {theme === 'light' ? (
              <IconSun sx={popoverIconStyle} />
            ) : (
              <IconMoon sx={popoverIconStyle} />
            )}
            <Typography
              variant="headline2"
              weight="bold"
              color="semantic.label.normal"
              sx={breakWordStyle}
            >
              {title}
            </Typography>
          </FlexBox>

          {trailingContent}
        </FlexBox>

        {children}
      </FlexBox>
    </PopoverContent>
  );
};

export default TokenPopover;
