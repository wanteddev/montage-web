import { addOpacity, css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const inlineCodeStyle = (theme: Theme) => css`
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 90%;
  white-space: break-spaces;
  color: ${theme.palette.primary.normal};
  background-color: ${addOpacity(
    theme.palette.primary.normal,
    theme.opacity[16],
  )};
`;

export const codeBlockStyle = (theme: Theme) => css`
  width: 100%;
  color: ${theme.palette.label.normal};
  white-space: pre;

  .token.punctuation,
  .token.plain-text {
    color: ${theme.palette.label.normal};
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
    color: ${theme.palette.accent.lightBlue};
  }

  .token.attr-value,
  .token.color,
  .token.imports .token.unit {
    color: ${theme.palette.accent.cyan};
  }

  .token.number,
  .token.string {
    color: ${theme.palette.status.positive};
  }

  .token.attr-name,
  .token.important,
  .token.interpolation-punctuation,
  .token.keyword,
  .token.module,
  .token.operator,
  .token.rule,
  .token.variable {
    color: ${theme.palette.status.negative};
  }

  .token.comment {
    color: ${theme.palette.label.alternative};
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
    color: ${theme.palette.status.negative};
  }

  .token.inserted:not(.prefix) {
    color: ${theme.palette.status.positive};
  }

  .token.deleted.prefix,
  .token.inserted.prefix {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
`;
