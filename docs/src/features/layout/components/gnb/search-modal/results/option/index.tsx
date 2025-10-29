import {
  FlexBox,
  IconButton,
  ListCell,
  ListCellContent,
  Typography,
} from '@wanteddev/wds';
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

import { searchOptionStyle } from './style';

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
          sx={(theme) => ({
            fontSize: 16,
            color: theme.semantic.label.alternative,
          })}
        />
      );
    }

    if (/docs\/utilities/.test(item.url)) {
      return (
        <IconUtilityFill
          sx={(theme) => ({
            fontSize: 16,
            color: theme.semantic.label.alternative,
          })}
        />
      );
    }

    return null;
  }, [item]);

  if (item.type === 'recent') {
    return (
      <ListCell
        as="li"
        verticalPadding="small"
        sx={searchOptionStyle}
        ellipsis
        data-type="recent"
        leadingContent={
          <ListCellContent variant="icon" sx={{ padding: '4px' }}>
            <IconHistory sx={{ fontSize: 16 }} />
          </ListCellContent>
        }
        trailingContent={
          <ListCellContent variant="icon-button" sx={{ padding: '4px' }}>
            <IconButton
              size={16}
              aria-label="Remove from recent search"
              onClick={(e) => {
                e.stopPropagation();
                recentSearchRemove(item);
              }}
            >
              <IconClose />
            </IconButton>
          </ListCellContent>
        }
        {...props}
      >
        <Typography
          data-role="list-text"
          variant="label1"
          weight="medium"
          color="semantic.label.alternative"
          sx={{ padding: '2px 0px' }}
        >
          {parseStringFromHit(item, 'hierarchy.lvl1')}
        </Typography>
      </ListCell>
    );
  }

  const isSelected = props['aria-selected'];

  const trailingContent = isSelected && (
    <ListCellContent variant="icon" sx={{ padding: '4px' }}>
      <IconArrowRight
        sx={(theme) => ({
          fontSize: 16,
          color: theme.semantic.label.neutral,
        })}
      />
    </ListCellContent>
  );

  if (isPageLevel(item)) {
    return (
      <ListCell
        as="li"
        verticalPadding="small"
        sx={searchOptionStyle}
        ellipsis
        data-type="page"
        leadingContent={
          pageLevelIcon ? (
            <ListCellContent variant="icon" sx={{ padding: '4px' }}>
              {pageLevelIcon}
            </ListCellContent>
          ) : null
        }
        trailingContent={trailingContent}
        {...props}
      >
        <FlexBox gap="8px" as="span">
          <Typography
            data-role="list-text"
            variant="label1"
            weight="medium"
            sx={{ padding: '2px 0px' }}
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
            sx={{ padding: '2px 0px' }}
          >
            • {item.category ?? 'Design'}
          </Typography>
        </FlexBox>
      </ListCell>
    );
  }

  if (item.type === 'content') {
    return (
      <ListCell
        as="li"
        verticalPadding="small"
        sx={searchOptionStyle}
        ellipsis
        data-type="text"
        trailingContent={trailingContent}
        textProps={{
          captionProps: {
            color: 'semantic.label.alternative',
            variant: 'label2',
            weight: 'regular',
          },
          caption: (
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
          ),
        }}
        leadingContent={
          <ListCellContent variant="icon" sx={{ padding: '4px' }}>
            <IconTextShape
              sx={{
                fontSize: 16,
              }}
            />
          </ListCellContent>
        }
        {...props}
      >
        <Typography
          data-role="list-text"
          variant="label1"
          weight="medium"
          color="semantic.label.alternative"
          sx={{ padding: '2px 0px' }}
          dangerouslySetInnerHTML={{
            __html: parseStringFromHit(item, 'content'),
          }}
        />
      </ListCell>
    );
  }

  return (
    <ListCell
      as="li"
      verticalPadding="small"
      sx={searchOptionStyle}
      ellipsis
      data-type="text"
      trailingContent={trailingContent}
      textProps={{
        captionProps: {
          color: 'semantic.label.alternative',
          variant: 'label2',
          weight: 'regular',
        },
        caption: (
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
        ),
      }}
      leadingContent={
        <ListCellContent variant="icon" sx={{ padding: '4px' }}>
          <IconTextShape
            sx={{
              fontSize: 16,
            }}
          />
        </ListCellContent>
      }
      {...props}
    >
      <Typography
        data-role="list-text"
        variant="label1"
        weight="medium"
        color="semantic.label.alternative"
        sx={{ padding: '2px 0px' }}
        dangerouslySetInnerHTML={{
          __html: parseStringFromHit(item, `hierarchy.${item.type}`),
        }}
      />
    </ListCell>
  );
};

export default SearchOption;
