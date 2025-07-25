import { useCallback, useEffect, useState } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { Box, ScrollArea, Typography, useTheme } from '@wanteddev/wds';

import { viewTheme } from './constants';
import { collapsedStyle, editorStyle, focusGuardStyle } from './style';

import type { ViewUpdate } from '@codemirror/view';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  collapsed: boolean;
  onCollapseChange: Dispatch<SetStateAction<boolean>>;
  hasError: boolean;
};

const Editor = ({
  value,
  onValueChange,
  collapsed,
  onCollapseChange,
  hasError,
}: Props) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const theme = useTheme();

  const [view, setView] = useState<EditorView>();

  useEffect(
    () => {
      if (!node) {
        view?.destroy();
        return;
      }

      setView(
        new EditorView({
          state: EditorState.create({
            doc: value,
            extensions: [
              basicSetup,
              javascript({ jsx: true, typescript: true }),
              keymap.of([indentWithTab]),
              viewTheme(theme),
              EditorView.updateListener.of((vu: ViewUpdate) => {
                if (vu.docChanged) {
                  onValueChange(vu.state.doc.toString());
                }
              }),
            ],
          }),
          parent: node,
        }),
      );

      node.querySelector<HTMLElement>('[contenteditable="true"]')!.tabIndex =
        -1;

      return () => {
        view?.destroy();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [node],
  );

  const handleFocusEditor = useCallback(() => {
    node?.querySelector<HTMLElement>('[contenteditable="true"]')?.focus();
  }, [node]);

  return (
    <>
      <Typography
        variant="label2"
        weight="regular"
        color="semantic.label.neutral"
        as="div"
        tabIndex={0}
        aria-live="polite"
        sx={focusGuardStyle}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleFocusEditor();
          }
        }}
      >
        <kbd>Enter</kbd> 키로 코드 수정 진입하기
      </Typography>

      <ScrollArea
        viewportProps={{ tabIndex: -1 }}
        sx={editorStyle({ collapsed, hasError })}
      >
        <Box ref={setNode} />
      </ScrollArea>

      {collapsed && (
        <Box
          sx={collapsedStyle}
          role="button"
          tabIndex={-1}
          aria-label="Expand editor"
          onClick={() => {
            onCollapseChange(false);
            handleFocusEditor();
          }}
        />
      )}
    </>
  );
};

export default Editor;
