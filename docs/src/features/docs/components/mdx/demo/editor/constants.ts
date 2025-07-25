import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { EditorView } from 'codemirror';

import type { Extension } from '@codemirror/state';
import type { Theme } from '@wanteddev/wds';

const tagStyleHighlighter = (theme: Theme) =>
  HighlightStyle.define([
    { tag: t.comment, color: theme.semantic.label.alternative },
    {
      tag: [
        t.function(t.variableName),
        t.function(t.propertyName),
        t.propertyName,
        t.url,
        t.processingInstruction,
        t.number,
      ],
      color: theme.semantic.accent.background.cyan,
    },
    {
      tag: [t.definition(t.variableName)],
      color: theme.semantic.label.neutral,
    },
    {
      tag: [t.attributeName],
      color: theme.semantic.status.negative,
    },
    {
      tag: [t.className, t.tagName, t.heading],
      color: theme.semantic.accent.background.lightBlue,
    },
    { tag: t.keyword, color: theme.semantic.status.negative },
    {
      tag: [t.string, t.regexp, t.special(t.propertyName)],
      color: theme.semantic.status.positive,
    },
  ]);

export const viewTheme = (theme: Theme): Extension => [
  EditorView.theme({
    '&': {
      fontSize: '95%',
      color: theme.semantic.label.normal,
      backgroundColor: 'transparent',
      width: 'fit-content',
      minWidth: '100%',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-scroller': {
      overflow: 'initial',
      width: 'max-content',
      minWidth: '100%',
    },
    '& .cm-lineNumbers': {
      fontSize: '80%',
      lineHeight: '185%',
    },
    '& .cm-cursor, & .cm-dropCursor': {
      borderLeftColor: theme.semantic.label.alternative,
    },
    '& .cm-content': {
      caretColor: `${theme.semantic.label.alternative} !important`,
    },
    '& .cm-activeLine, & .cm-activeLineGutter': {
      backgroundColor: `${theme.semantic.fill.normal} !important`,
    },
    '& .cm-selectionMatch, &.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: `${theme.semantic.fill.normal} !important`,
      },
    '& .cm-gutters': {
      backgroundColor: theme.semantic.background.elevated.normal,
      color: theme.semantic.label.alternative,
      borderRightColor: 'transparent',
    },
  }),
  syntaxHighlighting(tagStyleHighlighter(theme)),
];
