'use client';
import { refractor } from 'refractor';
import {
  Box,
  ChipAction,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  FlexBox,
  IconButton,
  useToast,
} from '@wanteddev/wds';
import {
  IconCircleExclamationFill,
  IconCopy,
  IconImage,
  IconRefresh,
} from '@wanteddev/wds-icon';
import copy from 'copy-to-clipboard';
import { toHtml } from 'hast-util-to-html';
import tsx from 'refractor/lang/tsx';
import CodeEditor from 'react-simple-code-editor';
import { useEffect, useRef } from 'react';
import { Typography } from '@wanteddev/wds';
import { TooltipGroup } from '@wanteddev/wds';

import { codeBlockStyle } from '../../code-block/style';

import {
  collapseWrapperStyle,
  editorStyle,
  editorWrapperStyle,
  errorStyle,
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
  setHatched: Dispatch<SetStateAction<boolean>>;
  errorMessage?: string;
}>;

const Editor = ({
  collapsed,
  setCollapsed,
  value,
  setValue,
  reset,
  setHatched,
  errorMessage,
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
        variant: 'positive',
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
        justifyContent="space-between"
        gap="16px"
        sx={toolbarStyle}
      >
        <FlexBox sx={errorStyle} gap="4px" alignItems="center">
          {errorMessage && (
            <>
              <IconCircleExclamationFill />
              <Typography color="semantic.status.negative" variant="caption1">
                {errorMessage}
              </Typography>
            </>
          )}
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="flex-end" gap="16px">
          <ChipAction
            size="small"
            variant="outlined"
            color="assistive"
            onClick={() => setCollapsed((prev) => !prev)}
            sx={{ borderRadius: '9999px' }}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </ChipAction>

        <TooltipGroup>
          <Tooltip>
            <TooltipTrigger>
              <IconButton size={18} onClick={handleCopy}>
                <IconCopy />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent shortcut="⌘C" arrow={false} position="bottom-center">Copy</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <IconButton size={18} onClick={reset}>
                <IconRefresh />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent shortcut="⌘R" arrow={false} position="bottom-center">Reset</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <IconButton size={18} onClick={() => setHatched((prev) => !prev)}>
                <IconImage />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent arrow={false} position="bottom-center">Change Background</TooltipContent>
          </Tooltip>
        </TooltipGroup>
      </FlexBox>

      <Typography
        variant="label2"
        weight="regular"
        color="semantic.label.neutral"
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
        <kbd>Enter</kbd> 키로 통해 코드 수정하기
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
