import {
  ContentBadge,
  ListCell,
  ListCellContent,
  Typography,
} from '@wanteddev/wds';
import { memo } from 'react';
import {
  IconArrowTurnDownRight,
  IconBookFill,
  IconDocumentTextFill,
} from '@wanteddev/wds-icon';

import { parseStringFromHit } from './helpers';
import { searchOptionStyle } from './style';

import type { InternalDocSearchHit } from '../../types';
import type { ComponentPropsWithoutRef } from 'react';

const renderIcon = (item: InternalDocSearchHit) => {
  switch (item.type) {
    case 'lvl0':
    case 'lvl1':
      return <IconBookFill />;
    case 'content':
    default:
      return <IconDocumentTextFill />;
  }
};

const renderBadge = (item: InternalDocSearchHit) => {
  switch (item.category) {
    case 'Design':
      return (
        <ContentBadge
          color="accent"
          accentColor="semantic.accent.background.purple"
        >
          Design
        </ContentBadge>
      );
    case 'Web':
      return (
        <ContentBadge
          color="accent"
          accentColor="semantic.accent.background.violet"
        >
          Develop
        </ContentBadge>
      );
    default:
      return null;
  }
};

type Props = {
  item: InternalDocSearchHit;
} & ComponentPropsWithoutRef<typeof ListCell>;

const SearchOption = ({ item, ...props }: Props) => {
  const hasParent = Boolean(item.__docsearch_parent);

  if (item.type === 'lvl1' || item.type === 'lvl0') {
    return (
      <ListCell
        as="li"
        verticalPadding="16px"
        sx={searchOptionStyle}
        ellipsis
        leadingContent={
          <>
            {Boolean(item.__docsearch_parent) ? (
              <ListCellContent variant="icon">
                <IconArrowTurnDownRight />
              </ListCellContent>
            ) : (
              <ListCellContent variant="large-icon" height="56px">
                {renderIcon(item)}
              </ListCellContent>
            )}
          </>
        }
        textProps={{
          caption: parseStringFromHit(item, 'content') ? (
            <span
              dangerouslySetInnerHTML={{
                __html: parseStringFromHit(item, 'content'),
              }}
            />
          ) : null,
        }}
        {...props}
      >
        <Typography
          data-role="list-text"
          variant="body1"
          weight="medium"
          dangerouslySetInnerHTML={{
            __html: parseStringFromHit(item, 'hierarchy.lvl1'),
          }}
        />
      </ListCell>
    );
  }

  return (
    <ListCell
      as="li"
      verticalPadding="16px"
      sx={searchOptionStyle}
      ellipsis
      textProps={{
        caption: !hasParent ? (
          <span
            dangerouslySetInnerHTML={{
              __html:
                item.type === 'content'
                  ? parseStringFromHit(item, 'content')
                  : parseStringFromHit(item, 'hierarchy.lvl1'),
            }}
          />
        ) : null,
      }}
      leadingContent={
        <>
          {Boolean(item.__docsearch_parent) ? (
            <ListCellContent variant="icon" height="24px">
              <IconArrowTurnDownRight />
            </ListCellContent>
          ) : (
            <ListCellContent variant="large-icon" height="56px">
              {renderIcon(item)}
            </ListCellContent>
          )}
        </>
      }
      trailingContent={
        <>
          {(hasParent || item.type === 'content') && (
            <ListCellContent variant="badge">
              {renderBadge(item)}
            </ListCellContent>
          )}
        </>
      }
      {...props}
    >
      <Typography
        data-role="list-text"
        variant="body1"
        weight="medium"
        dangerouslySetInnerHTML={{
          __html:
            item.type === 'content'
              ? parseStringFromHit(item, 'hierarchy.lvl2') ??
                parseStringFromHit(item, 'hierarchy.lvl1')
              : parseStringFromHit(item, `hierarchy.${item.type}`),
        }}
      />
    </ListCell>
  );
};

export default memo(SearchOption);
