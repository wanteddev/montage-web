import {
  ContentBadge,
  ListCell,
  ListCellContent,
  Typography,
} from '@wanteddev/wds';
import { memo, useMemo } from 'react';
import {
  IconArrowTurnDownRight,
  IconBlank,
  IconChevronRightTightSmall,
  IconComponentFill,
} from '@wanteddev/wds-icon';

import { isPageLevel, parseStringFromHit } from '../../helpers';

import { searchOptionStyle } from './style';

import type { InternalDocSearchHit } from '../../types';
import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  item: InternalDocSearchHit;
} & ComponentPropsWithoutRef<typeof ListCell>;

const SearchOption = ({ item, ...props }: Props) => {
  const lvl1Icon = useMemo(() => {
    switch (item.hierarchy.lvl0) {
      case 'Components':
        return (
          <IconComponentFill
            sx={(theme) => ({
              fontSize: 16,
              color: theme.semantic.primary.normal,
            })}
          />
        );
      case 'Foundations':
      default:
        // TODO: Palette icon
        return (
          <IconBlank
            sx={(theme) => ({
              fontSize: 16,
              color: theme.semantic.primary.normal,
            })}
          />
        );
    }
  }, [item]);

  const badge = useMemo(() => {
    switch (item.category) {
      case 'Design':
        return (
          <ContentBadge color="neutral" size="xsmall">
            Design
          </ContentBadge>
        );
      case 'Web':
      case 'iOS':
      case 'Android':
        return (
          <ContentBadge color="neutral" size="xsmall">
            {item.category}
          </ContentBadge>
        );
      default:
        return null;
    }
  }, [item.category]);

  if (isPageLevel(item) || item.type === 'recent') {
    return (
      <ListCell
        as="li"
        verticalPadding="small"
        sx={searchOptionStyle}
        ellipsis
        alignItems="center"
        leadingContent={
          <ListCellContent variant="icon">{lvl1Icon}</ListCellContent>
        }
        trailingContent={
          <>
            <ListCellContent variant="badge">{badge}</ListCellContent>
            <ListCellContent variant="icon">
              <IconChevronRightTightSmall
                sx={(theme) => ({
                  fontSize: 16,
                  color: theme.semantic.label.assistive,
                })}
              />
            </ListCellContent>
          </>
        }
        textProps={{
          weight: 'regular',
        }}
        {...props}
      >
        {props.children ?? (
          <Typography
            data-role="list-text"
            variant="body1"
            weight="medium"
            dangerouslySetInnerHTML={{
              __html: [
                parseStringFromHit(item, 'hierarchy.lvl0'),
                parseStringFromHit(item, 'hierarchy.lvl1'),
              ]
                .filter(Boolean)
                .join('/'),
            }}
          />
        )}
      </ListCell>
    );
  }

  return (
    <ListCell
      as="li"
      verticalPadding="small"
      sx={searchOptionStyle}
      ellipsis
      data-depth="2"
      textProps={{
        captionProps: {
          color: 'semantic.label.alternative',
          variant: 'label2',
          weight: 'regular',
        },
        caption:
          item.type === 'content' ? (
            <span
              dangerouslySetInnerHTML={{
                __html: parseStringFromHit(item, 'content'),
              }}
            />
          ) : null,
      }}
      leadingContent={
        <ListCellContent variant="icon">
          <IconArrowTurnDownRight
            sx={(theme) => ({
              fontSize: 16,
              margin: '4px 0px',
              display: 'block',
              color: theme.semantic.label.assistive,
            })}
          />
        </ListCellContent>
      }
      {...props}
    >
      <Typography
        data-role="list-text"
        variant="label2"
        weight="bold"
        dangerouslySetInnerHTML={{
          __html: [
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
    </ListCell>
  );
};

export default memo(SearchOption);
