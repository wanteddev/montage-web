import {
  ChipFilter,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuTrigger,
} from '@wanteddev/wds';
import { useState } from 'react';

import { useDocSearchFilterContext } from '../../contexts';

import { platformFilterStyle } from './style';
import { PLATFORM_FILTER_LIST } from './constants';

import type { DocSearchHit } from '../../types';

const PlatformFilter = () => {
  const { category, setCategory } = useDocSearchFilterContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      open={isOpen}
      onOpenChange={setIsOpen}
      value={category ?? ''}
      onValueChange={(v) => {
        setIsOpen(false);

        if (typeof v !== 'string' || !v) {
          setCategory(null);
          return;
        }

        setCategory(v as DocSearchHit['category']);
      }}
    >
      <MenuTrigger>
        <ChipFilter size="xsmall" variant="outlined" sx={{ boxShadow: 'none' }}>
          {category ?? 'Platform'}
        </ChipFilter>
      </MenuTrigger>
      <MenuContent
        sx={{ width: 'fit-content', borderRadius: 8 }}
        position="top-end"
        offset={4}
      >
        <MenuList sx={{ paddingBlock: 4 }}>
          {PLATFORM_FILTER_LIST.map((item) => (
            <MenuItem
              key={item.value}
              sx={platformFilterStyle}
              textProps={{
                variant: 'label1',
                weight: 'medium',
              }}
              verticalPadding="small"
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuContent>
    </Menu>
  );
};

export default PlatformFilter;
