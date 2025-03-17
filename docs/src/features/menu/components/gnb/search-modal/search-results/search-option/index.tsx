import { ListCell, ListCellContent, Typography } from '@wanteddev/wds';
import { memo } from 'react';
import {
  IconAlignJustify,
  IconDocumentText,
  IconTextFormat,
} from '@wanteddev/wds-icon';

import { parseStringFromHit } from './helpers';
import { searchOptionStyle } from './style';

import type { InternalDocSearchHit } from '@docsearch/react/dist/esm/types';
import type { ComponentPropsWithoutRef } from 'react';

const renderIcon = (item: InternalDocSearchHit) => {
  switch (item.type) {
    case 'lvl1':
      return <IconDocumentText />;
    case 'content':
      return <IconAlignJustify />;
    default:
      return <IconTextFormat />;
  }
};

type Props = {
  item: InternalDocSearchHit;
} & ComponentPropsWithoutRef<'li'>;

const SearchOption = ({ item, ...props }: Props) => {
  if (item.type === 'lvl1') {
    <ListCell
      as="li"
      {...props}
      verticalPadding="16px"
      sx={searchOptionStyle}
      ellipsis
      leadingContent={
        <>
          {Boolean(item.__docsearch_parent) && (
            <ListCellContent variant="icon">
              <svg viewBox="0 0 24 54">
                <g
                  stroke="currentColor"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 6v21M20 27H8.3" />
                </g>
              </svg>
            </ListCellContent>
          )}
          <ListCellContent variant="icon">{renderIcon(item)}</ListCellContent>
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
    >
      <Typography
        data-role="list-text"
        variant="body1"
        weight="medium"
        dangerouslySetInnerHTML={{
          __html: parseStringFromHit(item, 'hierarchy.lvl1'),
        }}
      />
    </ListCell>;
  }

  return (
    <ListCell
      as="li"
      {...props}
      verticalPadding="16px"
      sx={searchOptionStyle}
      ellipsis
      textProps={{
        caption: parseStringFromHit(item, 'hierarchy.lvl1') ? (
          <span
            dangerouslySetInnerHTML={{
              __html: parseStringFromHit(item, 'hierarchy.lvl1'),
            }}
          />
        ) : null,
      }}
      leadingContent={
        <>
          {Boolean(item.__docsearch_parent) && (
            <ListCellContent variant="icon">
              <svg viewBox="0 0 24 54">
                <g
                  stroke="currentColor"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 6v21M20 27H8.3" />
                </g>
              </svg>
            </ListCellContent>
          )}
          <ListCellContent variant="icon">{renderIcon(item)}</ListCellContent>
        </>
      }
    >
      <Typography
        data-role="list-text"
        variant="body1"
        weight="medium"
        dangerouslySetInnerHTML={{
          __html: parseStringFromHit(item, `hierarchy.${item.type}`),
        }}
      />
    </ListCell>
  );
};

export default memo(SearchOption);
