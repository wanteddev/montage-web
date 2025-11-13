import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import {
  EditorView,
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
} from '@codemirror/view';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import {
  closeSearchPanel,
  getSearchQuery,
  highlightSelectionMatches,
  openSearchPanel,
  search,
  searchKeymap,
  setSearchQuery,
} from '@codemirror/search';
import {
  Box,
  ScrollArea,
  Typography,
  useCallbackRef,
  useTheme,
} from '@wanteddev/wds';
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';

import { viewTheme } from './constants';
import { collapsedStyle, editorStyle, focusGuardStyle } from './style';
import SearchCode from './search-code';
import { getDefaultSearchQuery } from './helpers';

import type { SearchQuery } from '@codemirror/search';
import type { ViewUpdate } from '@codemirror/view';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  collapsed: boolean;
  onCollapseChange: Dispatch<SetStateAction<boolean>>;
  isResetting: boolean;
  handleResetComplete: () => void;
};

const Editor = ({
  value,
  onValueChange,
  collapsed,
  onCollapseChange,
  isResetting,
  handleResetComplete,
}: Props) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const focusGuardRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const view = useRef<EditorView | null>(null);

  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [defaultSearchQuery, setDefaultSearchQuery] =
    useState<SearchQuery | null>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const getIsSearchPanelOpen = useCallbackRef(() => isSearchPanelOpen);

  const handleOpenSearchPanel = () => {
    if (!view.current) return false;

    !getIsSearchPanelOpen() && openSearchPanel(view.current);

    const query = getDefaultSearchQuery(
      view.current.state,
      (view.current.state as any)?.query?.spec,
    );

    setIsSearchPanelOpen(true);

    if (query.valid && !query.eq(getSearchQuery(view.current.state))) {
      view.current.dispatch({ effects: setSearchQuery.of(query) });
      setDefaultSearchQuery(query);
    }

    setTimeout(() => {
      const searchInput =
        searchPanelRef.current?.querySelector<HTMLInputElement>(
          '[data-main-field="true"]',
        );

      searchInput?.focus();
      searchInput?.select();
    }, 0);

    return true;
  };

  const handleCloseSearchPanel = () => {
    if (!view.current || !getIsSearchPanelOpen()) return false;

    closeSearchPanel(view.current);
    setIsSearchPanelOpen(false);

    view.current.focus();

    return true;
  };

  const handleCreateState = () =>
    EditorState.create({
      doc: value,
      extensions: [
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          indentWithTab,
          {
            key: 'Escape',
            run: () => {
              if (getIsSearchPanelOpen() && handleCloseSearchPanel()) {
                return true;
              }

              focusGuardRef.current?.focus();
              return true;
            },
            scope: 'editor',
          },
          {
            key: 'Mod-f',
            run: () => {
              if (getIsSearchPanelOpen()) {
                return handleOpenSearchPanel();
              }

              return false;
            },
          },
          ...searchKeymap,
        ]),
        EditorState.allowMultipleSelections.of(true),
        lineNumbers(),
        highlightActiveLineGutter(),
        foldGutter(),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        dropCursor(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        search({
          top: true,
          createPanel: () => ({
            dom: document.createElement('div'),
            mount: handleOpenSearchPanel,
            destroy: handleCloseSearchPanel,
          }),
        }),
        javascript({ jsx: true, typescript: true }),
        viewTheme(theme),
        EditorView.updateListener.of((vu: ViewUpdate) => {
          if (vu.docChanged) {
            onValueChange(vu.state.doc.toString());
          }
          if (vu.focusChanged) {
            vu.view.hasFocus && onCollapseChange(false);
          }
        }),
      ],
    });

  useEffect(
    () => {
      view.current?.destroy();

      if (!node) {
        return;
      }

      startTransition(() => {
        const newView = new EditorView({
          state: handleCreateState(),
          parent: node,
        });

        view.current = newView;

        node.querySelector<HTMLElement>('[contenteditable="true"]')!.tabIndex =
          -1;
      });

      return () => {
        view.current?.destroy();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [node],
  );

  useEffect(() => {
    if (!isResetting) return;

    view.current?.setState(handleCreateState());
    handleCloseSearchPanel();
    handleResetComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetting]);

  const handleFocusEditor = useCallback(() => {
    node?.querySelector<HTMLElement>('[contenteditable="true"]')?.focus();
    onCollapseChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ref={focusGuardRef}
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
        sx={{ maxHeight: 'inherit' }}
        viewportProps={{ tabIndex: -1 }}
      >
        {isSearchPanelOpen && (
          <SearchCode
            ref={searchPanelRef}
            view={view}
            handleClose={handleCloseSearchPanel}
            defaultValues={defaultSearchQuery}
          />
        )}

        <Box ref={setNode} sx={editorStyle} />
      </ScrollArea>

      {collapsed && (
        <Box
          sx={collapsedStyle}
          role="button"
          tabIndex={-1}
          aria-label="Edit code"
          onClick={() => {
            handleFocusEditor();
          }}
        />
      )}
    </>
  );
};

export default Editor;
