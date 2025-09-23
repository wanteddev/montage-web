import {
  Box,
  FlexBox,
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipGroup,
  TooltipTrigger,
} from '@wanteddev/wds';
import { forwardRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  SearchQuery,
  findNext,
  findPrevious,
  getSearchQuery,
  replaceAll,
  replaceNext,
  setSearchQuery,
} from '@codemirror/search';
import {
  IconChevronDown,
  IconChevronRight,
  IconClose,
  IconTextFormat,
} from '@wanteddev/wds-icon';

import {
  searchInputStyle,
  searchInputToggleStyle,
  searchPanelStyle,
} from './style';
import IconRegex from './icon-regex';
import IconWholeWord from './icon-whole-word';
import IconReplace from './icon-replace';
import IconReplaceAll from './icon-replace-all';

import type { EditorView } from '@codemirror/view';
import type { KeyboardEvent, RefObject } from 'react';

type Props = {
  view: RefObject<EditorView | null>;
  handleClose: () => void;
  defaultValues: SearchQuery | null;
};

const SearchCode = forwardRef<HTMLDivElement, Props>(
  ({ view, handleClose, defaultValues }, ref) => {
    const { control, register, watch, setValue, setFocus } = useForm({
      defaultValues: {
        search: defaultValues?.search ?? '',
        replace: defaultValues?.replace ?? '',
        caseSensitive: defaultValues?.caseSensitive ?? false,
        regexp: defaultValues?.regexp ?? false,
        wholeWord: defaultValues?.wholeWord ?? false,
      },
    });

    const search = watch('search');

    const [lastQuery, setLastQuery] = useState<SearchQuery | null>(null);
    const [isReplaceOpen, setIsReplaceOpen] = useState(false);

    const onSubmit = async (data: any) => {
      const newQuery = new SearchQuery({
        search: data.search,
        caseSensitive: data.caseSensitive,
        regexp: data.regexp,
        wholeWord: data.wholeWord,
        replace: data.replace,
      });

      if (!lastQuery || !lastQuery.eq(newQuery)) {
        setLastQuery(newQuery);
        view.current?.dispatch({ effects: setSearchQuery.of(newQuery) });
      }
    };

    watch((data) => {
      onSubmit(data);
    });

    useEffect(() => {
      if (!view.current) return;

      if (getSearchQuery(view.current.state).search !== search) {
        setValue('search', getSearchQuery(view.current.state).search);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues && JSON.stringify(defaultValues)]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!view.current) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        return handleClose();
      } else if (e.metaKey && e.key === 'f') {
        e.preventDefault();
        return;
      }

      if (e.key !== 'Enter') {
        return;
      }

      if (e.currentTarget.getAttribute('data-main-field') === 'true') {
        e.preventDefault();
        (e.shiftKey ? findPrevious : findNext)(view.current);
      } else {
        e.preventDefault();
        (e.metaKey ? replaceAll : replaceNext)(view.current);
      }
    };

    return (
      <FlexBox sx={searchPanelStyle} alignItems="center" ref={ref} gap="6px">
        <TooltipGroup>
          <Tooltip>
            <TooltipTrigger>
              <IconButton
                size={18}
                onClick={() => setIsReplaceOpen(!isReplaceOpen)}
              >
                {isReplaceOpen ? <IconChevronDown /> : <IconChevronRight />}
              </IconButton>
            </TooltipTrigger>

            <TooltipContent size="small">Toggle replace</TooltipContent>
          </Tooltip>

          <FlexBox flexDirection="column" gap="4px">
            <FlexBox alignItems="center" gap="10px">
              <Box
                {...register('search')}
                sx={searchInputStyle}
                as="input"
                autoComplete="off"
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Find"
                aria-label="Find field"
                data-main-field="true"
              />

              <Tooltip>
                <Controller
                  control={control}
                  name="caseSensitive"
                  render={({ field }) => (
                    <TooltipTrigger>
                      <IconButton
                        size={18}
                        sx={searchInputToggleStyle}
                        aria-label="Match case"
                        aria-pressed={field.value}
                        onClick={() => {
                          field.onChange(!field.value);
                          setFocus('search');
                        }}
                      >
                        <IconTextFormat />
                      </IconButton>
                    </TooltipTrigger>
                  )}
                />
                <TooltipContent size="small">Match case</TooltipContent>
              </Tooltip>

              <Tooltip>
                <Controller
                  control={control}
                  name="wholeWord"
                  render={({ field }) => (
                    <TooltipTrigger>
                      <IconButton
                        size={18}
                        sx={searchInputToggleStyle}
                        aria-label="Match whole word"
                        aria-pressed={field.value}
                        onClick={() => {
                          field.onChange(!field.value);
                          setFocus('search');
                        }}
                      >
                        <IconWholeWord />
                      </IconButton>
                    </TooltipTrigger>
                  )}
                />
                <TooltipContent size="small">Match whole word</TooltipContent>
              </Tooltip>

              <Tooltip>
                <Controller
                  control={control}
                  name="regexp"
                  render={({ field }) => (
                    <TooltipTrigger>
                      <IconButton
                        size={18}
                        sx={searchInputToggleStyle}
                        aria-label="Use regex"
                        aria-pressed={field.value}
                        onClick={() => {
                          field.onChange(!field.value);
                          setFocus('search');
                        }}
                      >
                        <IconRegex />
                      </IconButton>
                    </TooltipTrigger>
                  )}
                />
                <TooltipContent size="small">Use regex</TooltipContent>
              </Tooltip>
            </FlexBox>
            <FlexBox alignItems="center" gap="10px">
              <Box
                {...register('replace')}
                sx={searchInputStyle}
                as="input"
                autoComplete="off"
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Replace"
                aria-label="Replace field"
              />

              <Tooltip>
                <TooltipTrigger>
                  <IconButton
                    size={18}
                    sx={[searchInputToggleStyle, { fontSize: 16 }]}
                    aria-label="Replace"
                    onClick={() => view.current && replaceNext(view.current)}
                  >
                    <IconReplace />
                  </IconButton>
                </TooltipTrigger>

                <TooltipContent size="small" shortcut="⌘+⏎">
                  Replace
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <IconButton
                    size={18}
                    sx={[searchInputToggleStyle, { fontSize: 16 }]}
                    aria-label="Replace all"
                    onClick={() => view.current && replaceAll(view.current)}
                  >
                    <IconReplaceAll />
                  </IconButton>
                </TooltipTrigger>

                <TooltipContent size="small" shortcut="⌘+⏎">
                  Replace all
                </TooltipContent>
              </Tooltip>
            </FlexBox>
          </FlexBox>

          <Tooltip>
            <TooltipTrigger>
              <IconButton
                size={18}
                onClick={handleClose}
                aria-label="Close"
                sx={[
                  searchInputToggleStyle,
                  {
                    marginLeft: '10px',
                    marginTop: '4px',
                    alignSelf: 'flex-start',
                  },
                ]}
              >
                <IconClose />
              </IconButton>
            </TooltipTrigger>

            <TooltipContent size="small" shortcut="Esc">
              Close
            </TooltipContent>
          </Tooltip>
        </TooltipGroup>
      </FlexBox>
    );
  },
);

export default SearchCode;
