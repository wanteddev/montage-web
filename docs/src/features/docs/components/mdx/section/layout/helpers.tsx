import { Typography } from '@wanteddev/wds';

import ListGroup from './list-group';

import type { ReactNode } from 'react';
import type { DescriptionContentItem, DescriptionListItem } from './types';

export const parseContent = (text: string): Array<DescriptionContentItem> => {
  const lines = text.split('\n');
  const result: Array<DescriptionContentItem> = [];
  const listStack: Array<{ item: DescriptionListItem; level: number }> = [];

  lines.forEach((line) => {
    const trimmedLine = line.trimStart();
    const indentLevel = line.length - trimmedLine.length;

    if (trimmedLine.startsWith('-')) {
      const listContent = trimmedLine.replace(/^-/, '').trimStart();
      const newListItem: DescriptionListItem = {
        type: 'list',
        content: listContent,
        children: [],
      };

      const currentLevel = Math.floor(indentLevel / 2);

      while (
        listStack.length > 0 &&
        listStack[listStack.length - 1]!.level >= currentLevel
      ) {
        listStack.pop();
      }

      if (listStack.length === 0) {
        result.push(newListItem);
      } else {
        const parent = listStack[listStack.length - 1];
        if (parent) {
          parent.item.children.push(newListItem);
        }
      }

      listStack.push({ item: newListItem, level: currentLevel });
    } else if (trimmedLine) {
      result.push({
        type: 'text',
        content: line,
      });
      listStack.length = 0;
    }
  });

  return result;
};

export const hasList = (text: string): boolean => {
  return text.includes('\n- ') || text.startsWith('- ');
};

export const renderParsedContent = (content: string) => {
  const parsedContent = parseContent(content);
  const elements: Array<ReactNode> = [];
  let currentListItems: Array<DescriptionListItem> = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      elements.push(
        <ListGroup key={`list-${elements.length}`} items={currentListItems} />,
      );
      currentListItems = [];
    }
  };

  const hasMoreTextItem =
    parsedContent.filter((v) => v.type === 'text').length >= 2;

  parsedContent.forEach((item, idx) => {
    if (item.type === 'text') {
      const isStrong =
        item.content.startsWith('<strong>') &&
        item.content.endsWith('</strong>');

      const isNextItemList = parsedContent[idx + 1]?.type === 'list';
      const isPrevItemList = parsedContent[idx - 1]?.type === 'list';

      const shouldHasMarginTop = isPrevItemList;

      let marginBottom = '0';

      if (isNextItemList) {
        marginBottom = hasMoreTextItem ? '6px !important' : '24px !important';
      }

      flushList();
      elements.push(
        <Typography
          variant="body2-reading"
          weight={isStrong ? 'bold' : 'medium'}
          as="p"
          color="semantic.label.neutral"
          key={`text-${elements.length}`}
          sx={{
            marginBottom,
            marginTop: shouldHasMarginTop ? '24px !important' : '0',
          }}
        >
          {isStrong ? item.content.slice(8, -9) : item.content}
          <br />
        </Typography>,
      );
    } else {
      currentListItems.push(item);
    }
  });

  flushList();
  return elements;
};
