'use client';
import { Box, FlexBox } from '@wanteddev/wds';
import { IconDesktop, IconMobile } from '@wanteddev/wds-icon';

import { BREAKPOINT_OPTIONS } from './constants';
import { toggleButtonStyle, toggleGroupStyle } from './style';

const TabletIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const ICONS = {
  mobile: <IconMobile aria-hidden />,
  tablet: <TabletIcon />,
  desktop: <IconDesktop aria-hidden />,
} as const;

type Props = {
  value: number;
  onValueChange: (value: number) => void;
};

const BreakpointToggle = ({ value, onValueChange }: Props) => {
  return (
    <FlexBox gap="2px" sx={toggleGroupStyle}>
      {BREAKPOINT_OPTIONS.map((option) => {
        const active = value === option.width;
        return (
          <Box
            as="button"
            key={option.width}
            type="button"
            aria-label={option.label}
            aria-pressed={active}
            onClick={() => onValueChange(option.width)}
            sx={toggleButtonStyle(active)}
          >
            {ICONS[option.iconKey]}
          </Box>
        );
      })}
    </FlexBox>
  );
};

export default BreakpointToggle;
