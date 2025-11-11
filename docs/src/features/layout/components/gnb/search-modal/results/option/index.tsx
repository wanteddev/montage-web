import { Box, FlexBox, IconButton, Typography } from '@wanteddev/wds';
import { useMemo } from 'react';
import {
  IconArrowRight,
  IconClose,
  IconComponentFill,
  IconHistory,
  IconUtilityFill,
} from '@wanteddev/wds-icon';

import IconTextShape from '@/assets/icon-text-shape';

import { isPageLevel, parseStringFromHit } from '../../helpers';

import SearchOptionHit from './hit';

import type { ListCell } from '@wanteddev/wds';
import type { DocSearchHit, InternalDocSearchHit } from '../../types';
import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  item: InternalDocSearchHit;
  recentSearchRemove: (item: DocSearchHit) => void;
} & ComponentPropsWithoutRef<typeof ListCell>;

const SearchOption = ({ item, recentSearchRemove, ...props }: Props) => {
  const pageLevelIcon = useMemo(() => {
    if (/docs\/components/.test(item.url)) {
      return (
        <IconComponentFill
          aria-hidden
          sx={{
            fontSize: 16,
          }}
        />
      );
    }

    if (/docs\/utilities/.test(item.url)) {
      return (
        <IconUtilityFill
          aria-hidden
          sx={{
            fontSize: 16,
          }}
        />
      );
    }

    return null;
  }, [item]);

  if (item.type === 'recent') {
    return (
      <SearchOptionHit
        item={item}
        leadingContent={<IconHistory aria-hidden sx={{ fontSize: 16 }} />}
        trailingContent={
          <IconButton
            size={16}
            data-role="recent-search-remove"
            aria-label="Remove from recent search"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              recentSearchRemove(item);
            }}
            color="semantic.label.alternative"
            sx={{ zIndex: 1 }}
          >
            <IconClose />
          </IconButton>
        }
        {...props}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: parseStringFromHit(item, 'hierarchy.lvl1'),
          }}
        />
      </SearchOptionHit>
    );
  }

  const isSelected = props['aria-selected'];

  const trailingContent = isSelected && (
    <IconArrowRight
      sx={(theme) => ({
        fontSize: 16,
        color: theme.semantic.label.neutral,
      })}
    />
  );

  if (isPageLevel(item)) {
    return (
      <SearchOptionHit
        item={item}
        leadingContent={pageLevelIcon}
        trailingContent={trailingContent}
        {...props}
      >
        <FlexBox gap="8px" as="span" alignItems="center">
          <Box
            as="span"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              overflowWrap: 'anywhere',
              wordBreak: 'keep-all',
            }}
            dangerouslySetInnerHTML={{
              __html: [parseStringFromHit(item, 'hierarchy.lvl1')]
                .filter(Boolean)
                .join('/'),
            }}
          />
          <Typography
            variant="label1"
            weight="regular"
            color="semantic.label.alternative"
          >
            • {item.category ?? 'Design'}
          </Typography>
        </FlexBox>
      </SearchOptionHit>
    );
  }

  if (item.type === 'content') {
    return (
      <SearchOptionHit
        item={item}
        leadingContent={
          <IconTextShape
            sx={{
              fontSize: 16,
            }}
          />
        }
        trailingContent={trailingContent}
        caption={
          <span
            dangerouslySetInnerHTML={{
              __html: [
                parseStringFromHit(item, 'hierarchy.lvl1'),
                item.category,
                parseStringFromHit(item, 'hierarchy.lvl2'),
                parseStringFromHit(item, 'hierarchy.lvl3'),
                parseStringFromHit(item, 'hierarchy.lvl4'),
                parseStringFromHit(item, 'hierarchy.lvl5'),
                parseStringFromHit(item, 'hierarchy.lvl6'),
              ]
                .filter(Boolean)
                .join('/'),
            }}
          />
        }
        {...props}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: parseStringFromHit(item, 'content'),
          }}
        />
      </SearchOptionHit>
    );
  }

  return (
    <SearchOptionHit
      item={item}
      leadingContent={
        <IconTextShape
          sx={{
            fontSize: 16,
          }}
        />
      }
      trailingContent={trailingContent}
      caption={
        <span
          dangerouslySetInnerHTML={{
            __html: [
              parseStringFromHit(item, 'hierarchy.lvl1'),
              item.category,
              parseStringFromHit(item, 'hierarchy.lvl2'),
              parseStringFromHit(item, 'hierarchy.lvl3'),
              parseStringFromHit(item, 'hierarchy.lvl4'),
              parseStringFromHit(item, 'hierarchy.lvl5'),
              parseStringFromHit(item, 'hierarchy.lvl6'),
            ]
              .filter(Boolean)
              .join('/'),
          }}
        />
      }
      {...props}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: parseStringFromHit(item, `hierarchy.${item.type}`),
        }}
      />
    </SearchOptionHit>
  );
};

export default SearchOption;
