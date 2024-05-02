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
import { Box, IconButton, useToast } from '@wanteddev/wds';
import { IconCopy } from '@wanteddev/wds-icon';

import { codeBlockStyle, inlineCodeStyle } from './style';

import type { ComponentPropsWithoutRef } from 'react';

refractor.register(js);
refractor.register(jsx);
refractor.register(ts);
refractor.register(tsx);
refractor.register(bash);
refractor.register(css);
refractor.register(diff);

type Props = ComponentPropsWithoutRef<'code'>;

const CodeBlock = ({ children, ...props }: Props) => {
  const toast = useToast();

  if (!props.className) {
    return (
      <Box sx={inlineCodeStyle} {...props} as="code">
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
        variant="background"
        sx={(theme) => ({
          ['&::before']: {
            backgroundColor: theme.palette.inverse.label,
            border: `1px solid ${theme.palette.line.normal.neutral}`,
            zIndex: 0,
          },
          svg: {
            zIndex: 1,
          },
        })}
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
