import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { EditorView } from '@codemirror/view';
import { addOpacity } from '@montage-ui/core';

import type { Extension } from '@codemirror/state';
import type { Theme } from '@montage-ui/core';

const tagStyleHighlighter = (theme: Theme) =>
  HighlightStyle.define([
    { tag: t.comment, color: theme.semantic.foreground.neutral.tertiary },
    {
      tag: [
        t.function(t.variableName),
        t.function(t.propertyName),
        t.propertyName,
        t.url,
        t.processingInstruction,
        t.number,
      ],
      color: theme.semantic.surface.accent.cyanOpaque,
    },
    {
      tag: [t.definition(t.variableName)],
      color: theme.semantic.foreground.neutral.primary,
    },
    {
      tag: [t.attributeName],
      color: theme.semantic.foreground.negative.primary,
    },
    {
      tag: [t.className, t.tagName, t.heading],
      color: theme.semantic.surface.accent.lightBlueOpaque,
    },
    { tag: t.keyword, color: theme.semantic.foreground.negative.primary },
    {
      tag: [t.string, t.regexp, t.special(t.propertyName)],
      color: theme.semantic.foreground.positive.primary,
    },
  ]);

export const viewTheme = (theme: Theme): Extension => [
  EditorView.theme({
    '&': {
      fontSize: '95%',
      color: theme.semantic.foreground.neutral.primary,
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
      borderLeftColor: theme.semantic.foreground.neutral.tertiary,
    },
    '& .cm-content': {
      caretColor: `${theme.semantic.foreground.neutral.tertiary} !important`,
    },
    '& .cm-activeLine, & .cm-activeLineGutter': {
      backgroundColor: `${theme.semantic.surface.neutral.secondary} !important`,
    },
    '&:not(.cm-focused) .cm-activeLine, &:not(.cm-focused) .cm-activeLineGutter':
      {
        backgroundColor: `transparent !important`,
      },

    '&.cm-focused .cm-selectionMatch, .cm-matchingBracket, .cm-selectionBackground, .cm-nonmatchingBracket, & .cm-line::selection, & .cm-content::selection':
      {
        backgroundColor: `${theme.semantic.surface.neutral.strong} !important`,
      },

    '&:not(.cm-focused) .cm-selectionMatch, &:not(.cm-focused) .cm-matchingBracket, &:not(.cm-focused) .cm-selectionBackground, &:not(.cm-focused) .cm-nonmatchingBracket, &:not(.cm-focused) .cm-line::selection, &:not(.cm-focused) .cm-content::selection':
      {
        backgroundColor: `transparent !important`,
      },
    '& .cm-gutters': {
      backgroundColor: theme.semantic.surface.elevated.secondary,
      color: theme.semantic.foreground.neutral.tertiary,
      borderRightColor: theme.semantic.line.neutral.tertiaryOpaque,
    },
    '& .cm-lineNumbers .cm-gutterElement': {
      padding: '0 3px 0 12px',
    },

    // autocomplete
    '& .cm-tooltip-autocomplete ul li': {
      color: theme.semantic.foreground.neutral.secondary,
    },
    '& .cm-tooltip-autocomplete ul li[aria-selected]': {
      background: theme.semantic.surface.brand.primary,
      color: theme.semantic.static.white,
    },
    '& .cm-tooltip-autocomplete': {
      backgroundColor: theme.semantic.surface.elevated.secondary,
      borderColor: theme.semantic.line.neutral.tertiary,
    },
    '& .cm-panels': {
      border: 'none !important',
    },
    '& .cm-searchMatch': {
      backgroundColor: addOpacity(
        theme.semantic.foreground.cautionary.primary,
        theme.opacity[16],
      ),
    },
    '& .cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: addOpacity(
        theme.semantic.foreground.cautionary.primary,
        theme.opacity[28],
      ),
    },
  }),
  syntaxHighlighting(tagStyleHighlighter(theme)),
];
