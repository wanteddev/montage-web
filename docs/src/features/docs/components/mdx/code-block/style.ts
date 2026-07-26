import { addOpacity, css, typographyStyle } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const inlineCodeStyle = (theme: Theme) => css`
  padding: 3px 6px;
  border-radius: 6px;
  white-space: break-spaces;
  leading-trim: both;
  ${typographyStyle('label2', 'medium')}
  display: inline;
  color: ${theme.semantic.foreground.brand.primary};
  position: relative;
  background-color: ${addOpacity(
    theme.semantic.foreground.brand.primary,
    theme.opacity[8],
  )};
`;

export const codeBlockStyle = (theme: Theme) => css`
  width: 100%;
  color: ${theme.semantic.foreground.neutral.primary};
  white-space: pre;
  font-size: 95%;

  .token.punctuation,
  .token.plain-text {
    color: ${theme.semantic.foreground.neutral.primary};
  }

  .token.class-name,
  .token.class,
  .token.function,
  .token.maybe-class-name,
  .token.parameter,
  .token.property,
  .token.pseudo-class,
  .token.selector,
  .token.tag {
    color: ${theme.semantic.surface.accent.lightBlueOpaque};
  }

  .token.color,
  .token.imports .token.unit {
    color: ${theme.semantic.surface.accent.cyanOpaque};
  }

  .token.function-variable {
    color: ${theme.semantic.foreground.neutral.strong};
  }

  .token.number,
  .token.string {
    color: ${theme.semantic.foreground.positive.primary};
  }

  .token.attr-name,
  .token.important,
  .token.interpolation-punctuation,
  .token.keyword,
  .token.module,
  .token.operator,
  .token.rule,
  .token.variable {
    color: ${theme.semantic.foreground.negative.primary};
  }

  .token.comment {
    color: ${theme.semantic.foreground.neutral.tertiary};
  }

  .token.atapply .token:not(.rule):not(.important) {
    color: inherit;
  }

  .language-shell .token:not(.comment) {
    color: inherit;
  }

  .token.deleted:not(.prefix),
  .token.inserted:not(.prefix) {
    display: block;
    padding-inline: var(--space-4);
    margin-inline: -20px;
  }

  .token.deleted:not(.prefix) {
    color: ${theme.semantic.foreground.negative.primary};
  }

  .token.inserted:not(.prefix),
  .token.attr-value {
    color: ${theme.semantic.foreground.positive.primary};
  }

  .token.deleted.prefix,
  .token.inserted.prefix {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
`;

export const copyButtonStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.neutral.primary};
  opacity: 0;
  transition: opacity ease 0.12s;
  position: absolute;
  right: 12px;
  top: 10px;

  &:focus,
  &:focus-visible {
    opacity: 1;
  }
`;
