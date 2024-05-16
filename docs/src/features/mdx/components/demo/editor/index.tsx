'use client';
import { refractor } from 'refractor';
import {
  Box,
  ChipAction,
  CompactTooltip,
  CompactTooltipContent,
  CompactTooltipTrigger,
  FlexBox,
  IconButton,
  useToast,
} from '@wanteddev/wds';
import { IconCopy, IconRefresh } from '@wanteddev/wds-icon';
import copy from 'copy-to-clipboard';
import { toHtml } from 'hast-util-to-html';
import tsx from 'refractor/lang/tsx';
import CodeEditor from 'react-simple-code-editor';
import { useEffect, useRef } from 'react';
import { Typography } from '@wanteddev/wds';

import { codeBlockStyle } from '../../code-block/style';

import {
  collapseWrapperStyle,
  editorStyle,
  editorWrapperStyle,
  focusGuardStyle,
  toolbarStyle,
} from './style';

import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

refractor.register(tsx);
type Props = PropsWithChildren<{
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
}>;

const Editor = ({
  collapsed,
  setCollapsed,
  value,
  setValue,
  reset,
  children,
}: Props) => {
  const focusGuardRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const toast = useToast();

  const handleCopy = () => {
    const selection = window.getSelection()?.toString();

    if (selection) {
      copy(selection);
      return;
    }

    const success = copy(value);

    if (success) {
      toast({
        variant: 'success',
        content: '코드를 클립보드에 복사 했습니다.',
      });
    }
  };

  const getTextAreaElement = () =>
    editorRef.current!.querySelector('textarea')!;

  useEffect(() => {
    getTextAreaElement().tabIndex = -1;
  }, []);

  return (
    <FlexBox ref={editorRef} sx={editorWrapperStyle} flexDirection="column">
      <FlexBox
        alignItems="center"
        justifyContent="flex-end"
        gap="16px"
        sx={toolbarStyle}
      >
        <ChipAction
          size="small"
          variant="outlined"
          color="assistive"
          onClick={() => setCollapsed((prev) => !prev)}
          sx={{ borderRadius: '9999px' }}
        >
          {collapsed ? 'Expand code' : 'Collapse code'}
        </ChipAction>

        <CompactTooltip>
          <CompactTooltipTrigger>
            <IconButton size={18} onClick={handleCopy}>
              <IconCopy />
            </IconButton>
          </CompactTooltipTrigger>
          <CompactTooltipContent shortcut="⌘C">Copy</CompactTooltipContent>
        </CompactTooltip>

        <CompactTooltip>
          <CompactTooltipTrigger>
            <IconButton size={18} onClick={reset}>
              <IconRefresh />
            </IconButton>
          </CompactTooltipTrigger>
          <CompactTooltipContent shortcut="⌘R">Reset</CompactTooltipContent>
        </CompactTooltip>
      </FlexBox>

      {children}

      <Typography
        variant="label2"
        weight="regular"
        color="palette.label.neutral"
        as="div"
        tabIndex={0}
        sx={focusGuardStyle}
        ref={focusGuardRef}
        aria-live="polite"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            getTextAreaElement().focus();
          }
        }}
      >
        Press <kbd>Enter</kbd> to start editing
      </Typography>
      <Box
        as={CodeEditor}
        ignoreTabKey={false}
        insertSpaces
        tabSize={2}
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            focusGuardRef.current?.focus();
            return;
          }

          if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
            if (e.key === 'c') {
              e.preventDefault();
              handleCopy();
            } else if (e.key === 'r') {
              e.preventDefault();
              reset();
            }
          }
        }}
        onFocus={() => {
          if (collapsed) {
            setCollapsed(false);
          }
        }}
        value={value}
        onValueChange={setValue}
        sx={[codeBlockStyle, editorStyle]}
        padding={16}
        highlight={(v) =>
          toHtml(refractor.highlight(v, 'tsx') as Parameters<typeof toHtml>[0])
        }
      />

      <FlexBox sx={collapseWrapperStyle(collapsed)} />
    </FlexBox>
  );
};

export default Editor;
