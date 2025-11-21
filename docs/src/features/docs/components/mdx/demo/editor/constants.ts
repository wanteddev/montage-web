import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { EditorView } from '@codemirror/view';
import { addOpacity } from '@wanteddev/wds';

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
      color: theme.semantic.label.normal,
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
    '&:not(.cm-focused) .cm-activeLine, &:not(.cm-focused) .cm-activeLineGutter':
      {
        backgroundColor: `transparent !important`,
      },

    '&.cm-focused .cm-selectionMatch, .cm-matchingBracket, .cm-selectionBackground, .cm-nonmatchingBracket, & .cm-line::selection, & .cm-content::selection':
      {
        backgroundColor: `${theme.semantic.fill.strong} !important`,
      },

    '&:not(.cm-focused) .cm-selectionMatch, &:not(.cm-focused) .cm-matchingBracket, &:not(.cm-focused) .cm-selectionBackground, &:not(.cm-focused) .cm-nonmatchingBracket, &:not(.cm-focused) .cm-line::selection, &:not(.cm-focused) .cm-content::selection':
      {
        backgroundColor: `transparent !important`,
      },
    '& .cm-gutters': {
      backgroundColor: theme.semantic.background.elevated.alternative,
      color: theme.semantic.label.alternative,
      borderRightColor: theme.semantic.line.solid.alternative,
    },
    '& .cm-lineNumbers .cm-gutterElement': {
      padding: '0 3px 0 12px',
    },

    // autocomplete
    '& .cm-tooltip-autocomplete ul li': {
      color: theme.semantic.label.neutral,
    },
    '& .cm-tooltip-autocomplete ul li[aria-selected]': {
      background: theme.semantic.primary.normal,
      color: theme.semantic.static.white,
    },
    '& .cm-tooltip-autocomplete': {
      backgroundColor: theme.semantic.background.elevated.alternative,
      borderColor: theme.semantic.line.normal.alternative,
    },
    '& .cm-panels': {
      border: 'none !important',
    },
    '& .cm-searchMatch': {
      backgroundColor: addOpacity(
        theme.semantic.accent.background.redOrange,
        theme.opacity[16],
      ),
    },
    '& .cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: addOpacity(
        theme.semantic.accent.background.redOrange,
        theme.opacity[28],
      ),
    },
  }),
  syntaxHighlighting(tagStyleHighlighter(theme)),
];
