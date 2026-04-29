'use client';
import { Box, FlexBox } from '@wanteddev/wds';

import { viewModeButtonStyle, viewModeGroupStyle } from './style';

import type { ViewMode } from './constants';

const OPTIONS: ReadonlyArray<{ key: ViewMode; label: string }> = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
];

type Props = {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
};

const ViewModeToggle = ({ value, onValueChange }: Props) => {
  return (
    <FlexBox gap="2px" sx={viewModeGroupStyle}>
      {OPTIONS.map((option) => {
        const active = value === option.key;
        return (
          <Box
            as="button"
            key={option.key}
            type="button"
            aria-pressed={active}
            onClick={() => onValueChange(option.key)}
            sx={viewModeButtonStyle(active)}
          >
            {option.label}
          </Box>
        );
      })}
    </FlexBox>
  );
};

export default ViewModeToggle;
