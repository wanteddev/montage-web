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
        verticalPadding="large"
        sx={searchOptionStyle}
        ellipsis
        data-depth={hasParent ? 1 : 0}
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

  const captionTextRender = () => {
    switch (item.type) {
      case 'content':
        return parseStringFromHit(item, 'content');
      case 'lvl2':
        return null;
      default:
        return parseStringFromHit(item, `hierarchy.${item.type}`);
    }
  };

  const textRender = () => {
    switch (item.type) {
      case 'content':
        return (
          parseStringFromHit(item, 'hierarchy.lvl2') ??
          parseStringFromHit(item, 'hierarchy.lvl1')
        );
      case 'lvl2':
      case 'lvl3':
        return parseStringFromHit(item, 'hierarchy.lvl2');
      case 'lvl4':
        return (
          parseStringFromHit(item, 'hierarchy.lvl3') ??
          parseStringFromHit(item, 'hierarchy.lvl2')
        );
      case 'lvl5':
        return (
          parseStringFromHit(item, 'hierarchy.lvl4') ??
          parseStringFromHit(item, 'hierarchy.lvl3')
        );
      case 'lvl6':
        return (
          parseStringFromHit(item, 'hierarchy.lvl5') ??
          parseStringFromHit(item, 'hierarchy.lvl4')
        );
      default:
        return parseStringFromHit(item, `hierarchy.${item.type}`);
    }
  };

  return (
    <ListCell
      as="li"
      verticalPadding="large"
      sx={searchOptionStyle}
      data-depth={hasParent ? 1 : 0}
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
        ) : captionTextRender() ? (
          <span
            dangerouslySetInnerHTML={{
              __html: captionTextRender(),
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
          __html: textRender(),
        }}
      />
    </ListCell>
  );
};

export default memo(SearchOption);
