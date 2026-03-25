'use client';

import {
  Divider,
  FlexBox,
  SegmentedControl,
  SegmentedControlItem,
  TextField,
} from '@wanteddev/wds';
import { useMemo, useState } from 'react';

import { Heading2 } from '@/features/docs/components/mdx/section/layout';

import icons from '../../../../../../generated/icons.json';

import Collections from './collections';
import { isColorIcon, isNavigationIcon, isSolidIcon } from './helpers';

const FoundationsIcons = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('solid');

  const filteredIcons = useMemo(() => {
    const categoryFiltered = icons.filter((name) => {
      if (name === 'IconSymbol') return false;
      if (filter === 'solid') return isSolidIcon(name);
      if (filter === 'color') return isColorIcon(name);
      if (filter === 'navigation') return isNavigationIcon(name);
      return true;
    });

    if (!search.trim()) return categoryFiltered;

    const keyword = search.toLowerCase().trim().split(' ').join('');
    return categoryFiltered.filter((name) =>
      name.toLowerCase().includes(keyword),
    );
  }, [search, filter]);

  return (
    <>
      <Divider
        color="semantic.line.normal.neutral"
        sx={{ '&&': { marginBlock: '40px 32px' } }}
      />

      <Heading2 content="Explore icons" />

      <p>아이콘을 검색하고, 클릭하여 세부 정보를 확인하고 사용합니다.</p>

      <FlexBox flexDirection="column" gap="32px" sx={{ marginTop: '24px' }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          sm={{ flexDirection: 'row' }}
          gap="16px"
        >
          <SegmentedControl
            value={filter}
            onValueChange={setFilter}
            sm={{ sx: { width: '330px' } }}
            sx={{ width: '100%' }}
          >
            <SegmentedControlItem value="solid">Solid</SegmentedControlItem>
            <SegmentedControlItem value="color">Color</SegmentedControlItem>
            <SegmentedControlItem value="navigation">
              Navigation
            </SegmentedControlItem>
          </SegmentedControl>

          <TextField
            type="text"
            placeholder="Search icons..."
            name="search"
            value={search}
            sx={{
              width: '100%',
              ['[data-role="text-field-wrapper"]']: { padding: '8px 12px' },
            }}
            sm={{ sx: { width: 'initial', flex: '1' } }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FlexBox>

        <Collections icons={filteredIcons} />
      </FlexBox>
    </>
  );
};

export default FoundationsIcons;
