'use client';

import {
  Divider,
  FlexBox,
  SearchField,
  SegmentedControl,
  SegmentedControlItem,
} from '@wanteddev/wds';
import { useMemo, useState } from 'react';

import { Heading2 } from '@/features/docs/components/mdx/section/layout';

import icons from '../../../../../../generated/icons.json';

import Collections from './collections';
import {
  getKeywords,
  isColorIcon,
  isNavigationIcon,
  isSolidIcon,
} from './helpers';

const FoundationsIcons = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('solid');

  const filteredIcons = useMemo(() => {
    const categoryFiltered = icons.filter((icon) => {
      if (icon.name === 'IconSymbol') return false;
      if (filter === 'solid') return isSolidIcon(icon.name);
      if (filter === 'color') return isColorIcon(icon.name);
      if (filter === 'navigation') return isNavigationIcon(icon.name);
      return true;
    });

    if (!search.trim()) return categoryFiltered;

    const keyword = search.toLowerCase().trim().split(' ').join('');
    return categoryFiltered.filter((icon) => {
      if (icon.name.toLowerCase().includes(keyword)) return true;

      const keywords = getKeywords(icon.description);
      return keywords.some((kw) => kw.toLowerCase().includes(keyword));
    });
  }, [search, filter]);

  return (
    <>
      <Divider
        color="semantic.line.normal.neutral"
        sx={{ '&&': { marginBlock: '40px 32px' } }}
      />

      <Heading2 content="Search icons" />

      <p>
        원티드 아이콘은 기본적으로 단순하고 현대적인 형태를 지향하고 있습니다.
        검색 시 연상되는 유사한 키워드를 함께 검색합니다.
      </p>

      <FlexBox flexDirection="column" gap="40px" sx={{ marginTop: '40px' }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          sm={{ flexDirection: 'row', gap: '12px' }}
          gap="16px"
        >
          <SearchField
            type="text"
            placeholder="아이콘을 검색해주세요"
            name="search"
            value={search}
            width="100%"
            sx={{
              padding: '8px',
            }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <SegmentedControl
            value={filter}
            size="medium"
            onValueChange={setFilter}
            sm={{ sx: { width: '280px' } }}
            sx={{ width: '100%', flexShrink: 0 }}
          >
            <SegmentedControlItem value="solid">Solid</SegmentedControlItem>
            <SegmentedControlItem value="color">Color</SegmentedControlItem>
            <SegmentedControlItem value="navigation">Nav</SegmentedControlItem>
          </SegmentedControl>
        </FlexBox>

        <Collections icons={filteredIcons} />
      </FlexBox>
    </>
  );
};

export default FoundationsIcons;
