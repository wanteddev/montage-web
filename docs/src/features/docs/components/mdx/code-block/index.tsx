import { refractor } from 'refractor/core';
import copy from 'copy-to-clipboard';
import js from 'refractor/javascript';
import jsx from 'refractor/jsx';
import ts from 'refractor/typescript';
import tsx from 'refractor/tsx';
import bash from 'refractor/bash';
import css from 'refractor/css';
import diff from 'refractor/diff';
import kotlin from 'refractor/kotlin';
import swift from 'refractor/swift';
import { toHtml } from 'hast-util-to-html';
import { Box, IconButton, useToast } from '@wanteddev/wds';
import { IconCopy } from '@wanteddev/wds-icon';

import { codeBlockStyle, copyButtonStyle, inlineCodeStyle } from './style';

import type { ComponentPropsWithoutRef } from 'react';

refractor.register(js);
refractor.register(jsx);
refractor.register(ts);
refractor.register(tsx);
refractor.register(bash);
refractor.register(css);
refractor.register(diff);
refractor.register(kotlin);
refractor.register(swift);

type Props = ComponentPropsWithoutRef<'code'>;

const CodeBlock = ({ children, ...props }: Props) => {
  const toast = useToast();

  if (!props.className) {
    return (
      <Box as="code" {...props} sx={inlineCodeStyle}>
        {children}
      </Box>
    );
  }

  const result = refractor.highlight(
    children as string,
    props.className.replace('language-', '') || '',
  );

  return (
    <>
      <Box
        {...props}
        sx={codeBlockStyle}
        dangerouslySetInnerHTML={{
          __html: toHtml(result as Parameters<typeof toHtml>[0]),
        }}
        as="code"
      />
      <IconButton
        variant="outlined"
        size={32}
        sx={copyButtonStyle}
        onClick={() => {
          const success = copy(children as string);

          if (success) {
            toast({
              variant: 'positive',
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
