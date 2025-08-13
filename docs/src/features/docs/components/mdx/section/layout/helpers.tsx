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

  parsedContent.forEach((item) => {
    if (item.type === 'text') {
      flushList();
      elements.push(
        <Typography
          variant="body2-reading"
          weight="regular"
          as="p"
          color="semantic.label.neutral"
          key={`text-${elements.length}`}
          sx={{ marginBottom: '0 !important' }}
        >
          {item.content}
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
