import { refractor } from 'refractor';
import copy from 'copy-to-clipboard';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import ts from 'refractor/lang/typescript';
import tsx from 'refractor/lang/tsx';
import bash from 'refractor/lang/bash';
import css from 'refractor/lang/css';
import diff from 'refractor/lang/diff';
import { toHtml } from 'hast-util-to-html';
import { IconButton, useToast } from '@wanteddev/wds';
import { IconCopy } from '@wanteddev/wds-icon';

import { codeBlockStyle, inlineCodeStyle } from './style';

import type { ComponentProps } from 'react';

refractor.register(js);
refractor.register(jsx);
refractor.register(ts);
refractor.register(tsx);
refractor.register(bash);
refractor.register(css);
refractor.register(diff);

type Props = ComponentProps<'pre'>;

const CodeBlock = ({ children, ...props }: Props) => {
  const toast = useToast();

  if (!props.className) {
    return (
      <code css={inlineCodeStyle} {...props}>
        {children}
      </code>
    );
  }

  const result = refractor.highlight(
    children as string,
    props.className.replace('language-', '') || '',
  );

  return (
    <>
      <code
        {...props}
        css={codeBlockStyle}
        dangerouslySetInnerHTML={{
          __html: toHtml(result as Parameters<typeof toHtml>[0]),
        }}
      />

      <IconButton
        variant="background"
        onClick={() => {
          const success = copy(children as string);

          if (success) {
            toast({
              variant: 'success',
              content: '클립보드에 복사 했습니다.',
            });
          }
        }}
      >
        <IconCopy />
      </IconButton>
    </>
  );
};

export default CodeBlock;
