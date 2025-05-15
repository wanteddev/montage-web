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
      <MenuContent sx={{ width: 'fit-content' }} position="top-end">
        <MenuList>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Design">Design</MenuItem>
          <MenuItem value="Web">Web</MenuItem>
          <MenuItem value="iOS">iOS</MenuItem>
          <MenuItem value="Android">Android</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );
};

export default PlatformFilter;
