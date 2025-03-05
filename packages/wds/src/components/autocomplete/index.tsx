import {
  forwardRef,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createCollection } from '@radix-ui/react-collection';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Slot } from '@radix-ui/react-slot';
import { useSize } from '@radix-ui/react-use-size';
import { composeEventHandlers } from '@radix-ui/primitive';
import { flushSync } from 'react-dom';
import { IconCheck } from '@wanteddev/wds-icon';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

import { Popper, PopperAnchor, PopperContent } from '../popper';
import { List, ListCell, ListCellContent } from '../list';
import ScrollArea from '../scroll-area';
import FlexBox from '../flex-box';

import {
  AUTOCOMPLETE_LIST_NAME,
  AUTOCOMPLETE_NAME,
  AUTOCOMPLETE_OPTION_NAME,
  AUTOCOMPLETE_ROOT_NAME,
  AUTOCOMPLETE_SCOPE,
  AUTOCOMPLETE_TRIGGER_NAME,
} from './constants';
import { AutocompleteProvider, useAutocompleteContext } from './contexts';
import {
  autocompleteListStyle,
  autocompleteOptionStyle,
  autocompleteScrollAreaStyle,
} from './style';
import { focusSelectedOption, setAttributeSelection } from './helpers';

import type { SlotProps } from '@radix-ui/react-slot';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import type {
  AutocompleteCollectionItem,
  AutocompleteListProps,
  AutocompleteOptionProps,
  AutocompleteProps,
} from './types';

const [Collection, useCollection] = createCollection<
  HTMLButtonElement,
  { value: string; disabled?: boolean }
>(AUTOCOMPLETE_NAME);

const Autocomplete = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<AutocompleteProps, 'div'>
>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      open: openProp,
      defaultOpen,
      onOpenChange,
      asSelect = false,
      inputValue: inputValueProp,
      defaultInputValue,
      onInputValueChange,
      onSearch,
      ...props
    },
    forwardedRef,
  ) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);
    const composedRefs = useComposedRefs<HTMLDivElement>(forwardedRef, setNode);

    const { width } = useSize(node) || {};

    const [value = '', setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const [inputValue = '', setInputValue] = useControllableState({
      prop: inputValueProp,
      defaultProp: defaultInputValue ?? value,
      onChange: onInputValueChange,
    });

    const [selectedOption, setSelectedOption] =
      useState<AutocompleteCollectionItem | null>(null);

    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: (state) => {
        onOpenChange?.(state);

        if (!state) {
          setSelectedOption(null);
        }
      },
    });

    const handleOpenChange = useCallback(
      (state: boolean, force?: boolean) => {
        if (force && state === open) {
          setOpen(state);
          onOpenChange?.(state);
          if (!state) {
            setSelectedOption(null);
          }
        } else {
          setOpen(state);
        }
      },
      [open, setOpen, onOpenChange, setSelectedOption],
    );

    const [input, setInput] = useState<
      HTMLInputElement | HTMLTextAreaElement | null
    >(null);

    const contentId = useId();

    return (
      <AutocompleteProvider
        contentId={contentId}
        open={open}
        onOpenChange={handleOpenChange}
        value={value}
        onValueChange={setValue}
        input={input}
        onInputChange={setInput}
        width={width}
        asSelect={asSelect}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        selectedOption={selectedOption}
        onSelectedOptionChange={setSelectedOption}
        onSearch={useCallbackRef(onSearch)}
      >
        <Popper>
          <Collection.Provider scope={AUTOCOMPLETE_SCOPE}>
            <PopperAnchor>
              <AutocompleteRoot ref={composedRefs} {...props} />
            </PopperAnchor>
          </Collection.Provider>
        </Popper>
      </AutocompleteProvider>
    );
  },
);

Autocomplete.displayName = AUTOCOMPLETE_NAME;

const AutocompleteRoot = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<{}, 'div'>
>((props, ref) => {
  const { input } = useAutocompleteContext(AUTOCOMPLETE_ROOT_NAME);

  return (
    <FlexBox
      ref={ref}
      {...props}
      sx={[{ width: 'fit-content' }, props.sx]}
      onClick={composeEventHandlers(
        props.onClick,
        useCallback(
          (event: MouseEvent) => {
            if (!event.currentTarget.contains(event.target as HTMLElement)) {
              return;
            }

            if (!input?.disabled) {
              input?.focus();
            }
          },
          [input],
        ),
      )}
    />
  );
});

AutocompleteRoot.displayName = AUTOCOMPLETE_ROOT_NAME;

const AutocompleteInput = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, forwardedRef) => {
    const {
      open,
      contentId,
      onOpenChange,
      value,
      onValueChange,
      onInputChange,
      onInputValueChange,
      onSelectedOptionChange,
      selectedOption,
      inputValue,
      asSelect,
      input,
      onSearch,
    } = useAutocompleteContext(AUTOCOMPLETE_TRIGGER_NAME);

    const composedRefs = useComposedRefs(forwardedRef, onInputChange);

    const getItems = useCollection(AUTOCOMPLETE_SCOPE);

    const isFocused = useRef(false);

    return (
      <Collection.Slot scope={AUTOCOMPLETE_SCOPE}>
        <Slot
          ref={composedRefs}
          aria-controls={contentId}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-expanded={open}
          role="combobox"
          {...{ type: 'search', autoComplete: 'off', value: inputValue }}
          {...props}
          onFocus={composeEventHandlers(props.onFocus, () => {
            isFocused.current = true;
          })}
          onKeyDown={composeEventHandlers(
            props.onKeyDown,
            (e: KeyboardEvent) => {
              const items = getItems().filter(({ disabled }) => !disabled);
              let option: AutocompleteCollectionItem | undefined;

              const rAF = (fn: () => void) =>
                open ? fn() : requestAnimationFrame(fn);

              switch (e.key) {
                case 'Home':
                  if (!open) return;

                  e.preventDefault();
                  option = items.at(0);
                  focusSelectedOption(option, items, true);
                  onSelectedOptionChange(option ?? null);
                  return;
                case 'End':
                  if (!open) return;

                  e.preventDefault();
                  option = items.at(items.length - 1);
                  focusSelectedOption(option, items, true);
                  onSelectedOptionChange(option ?? null);
                  return;
                case 'PageUp':
                  e.preventDefault();

                  if (selectedOption) {
                    const diff = items.findIndex(
                      (v) => v.ref === selectedOption.ref,
                    );

                    if (diff !== -1) {
                      option = items.at(diff - 5 < 0 ? 0 : diff - 5);
                    } else {
                      option = items.at(0);
                    }
                  } else {
                    option = items.at(0);
                  }

                  if (!open) {
                    flushSync(() => onOpenChange(true));
                  }

                  rAF(() => {
                    focusSelectedOption(option, items, true);
                    onSelectedOptionChange(option ?? null);
                  });
                  return;
                case 'PageDown':
                  e.preventDefault();

                  if (selectedOption) {
                    const diff = items.findIndex(
                      (v) => v.ref === selectedOption.ref,
                    );

                    if (diff !== -1) {
                      option = items.at(
                        diff + 5 > items.length - 1
                          ? items.length - 1
                          : diff + 5,
                      );
                    } else {
                      option = items.at(0);
                    }
                  } else {
                    option = items.at(
                      5 > items.length - 1 ? items.length - 1 : 5,
                    );
                  }

                  if (!open) {
                    flushSync(() => onOpenChange(true));
                  }

                  rAF(() => {
                    focusSelectedOption(option, items, true);
                    onSelectedOptionChange(option ?? null);
                  });
                  return;
                case 'ArrowUp':
                  e.preventDefault();

                  if (selectedOption) {
                    const index = items.findIndex(
                      (v) => v.ref === selectedOption.ref,
                    );

                    if (index !== -1) {
                      option = items.at(index - 1 < 0 ? 0 : index - 1);
                    } else {
                      option = items.at(0);
                    }
                  } else {
                    option = items.at(0);
                  }

                  if (!open) {
                    flushSync(() => onOpenChange(true));
                  }

                  rAF(() => {
                    focusSelectedOption(option, items, true);
                    onSelectedOptionChange(option ?? null);
                  });
                  return;
                case 'ArrowDown':
                  e.preventDefault();

                  if (selectedOption) {
                    const index = items.findIndex(
                      (v) => v.ref === selectedOption.ref,
                    );

                    if (index !== -1) {
                      option = items.at(
                        index + 1 > items.length - 1
                          ? items.length - 1
                          : index + 1,
                      );
                    } else {
                      option = items.at(0);
                    }
                  } else {
                    option = items.at(0);
                  }

                  if (!open) {
                    flushSync(() => onOpenChange(true));
                  }

                  rAF(() => {
                    focusSelectedOption(option, items, true);
                    onSelectedOptionChange(option ?? null);
                  });
                  return;
                case 'Enter':
                  if (open && selectedOption) {
                    e.preventDefault();

                    if (selectedOption.disabled) {
                      return;
                    }

                    onInputValueChange(selectedOption.value);
                    onValueChange(selectedOption.value);
                    onOpenChange(false);
                    onSearch?.(selectedOption.value);
                    return;
                  } else if (!asSelect) {
                    onSearch?.(value);
                  }
                case 'Escape':
                  e.preventDefault();
                  if (open && selectedOption) {
                    onOpenChange(false);
                  }
              }
            },
          )}
          onBlur={composeEventHandlers(props.onBlur, () => {
            isFocused.current = false;
            onOpenChange(false, true);

            requestAnimationFrame(() => {
              if (document.activeElement !== input && asSelect) {
                const items = getItems();
                const newValue =
                  items.find((v) => v.value === inputValue && !v.disabled)
                    ?.value ?? value;

                onValueChange(newValue);
                onInputValueChange(newValue);
              }
            });
          })}
          onClick={composeEventHandlers(props.onClick, () => {
            if (value === '' || (!open && !input?.disabled)) {
              onOpenChange(!open);
            }
          })}
          onChange={composeEventHandlers(
            props.onChange,
            (e: ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;

              if (!asSelect) {
                onValueChange(newValue);
              }

              onInputValueChange(newValue);

              if (newValue !== '' && isFocused.current) {
                onOpenChange(true);
              } else if (asSelect) {
                onValueChange(newValue);
              }
            },
          )}
        >
          {children}
        </Slot>
      </Collection.Slot>
    );
  },
);

AutocompleteInput.displayName = AUTOCOMPLETE_TRIGGER_NAME;

const AutocompleteList = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<AutocompleteListProps, 'div'>
>(({ children, disableTrappedContent = false, ...props }, ref) => {
  const {
    input,
    open,
    contentId,
    asSelect,
    value,
    width,
    onSelectedOptionChange,
  } = useAutocompleteContext(AUTOCOMPLETE_LIST_NAME);
  const getItems = useCollection(AUTOCOMPLETE_SCOPE);

  useLayoutEffect(() => {
    if (!open || !asSelect || disableTrappedContent) return;

    requestAnimationFrame(() => {
      const items = getItems();

      const option = items.find((v) => v.value === value);

      focusSelectedOption(option, items);
      onSelectedOptionChange(option ?? null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, disableTrappedContent]);

  return open && !input?.readOnly && !input?.disabled ? (
    <PopperContent
      role="presentation"
      ref={ref}
      offset={8}
      {...props}
      sx={[{ width }, autocompleteListStyle, props.sx]}
    >
      <ScrollArea
        scrollbars="vertical"
        size="small"
        viewportProps={{ sx: autocompleteScrollAreaStyle }}
      >
        <List
          role="listbox"
          id={contentId}
          gap="4px"
          onMouseDown={(e) => e.preventDefault()}
        >
          {children}
        </List>
      </ScrollArea>
    </PopperContent>
  ) : null;
});

AutocompleteList.displayName = AUTOCOMPLETE_LIST_NAME;

const AutocompleteOption = forwardRef<
  HTMLLIElement,
  DefaultComponentProps<AutocompleteOptionProps, 'li'>
>(({ disabled, value, children, ...props }, forwardedRef) => {
  const ref = useRef<HTMLLIElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  const {
    input,
    onValueChange,
    value: contextValue,
    onInputValueChange,
    asSelect,
    selectedOption,
    onSelectedOptionChange,
    onSearch,
    onOpenChange,
  } = useAutocompleteContext(AUTOCOMPLETE_OPTION_NAME);

  const getItems = useCollection(AUTOCOMPLETE_SCOPE);

  const active = contextValue === value && asSelect;

  return (
    <Collection.ItemSlot
      value={value}
      disabled={disabled}
      scope={AUTOCOMPLETE_SCOPE}
    >
      <ListCell
        ref={composedRefs}
        disabled={disabled}
        aria-disabled={disabled}
        active={active}
        role="option"
        {...props}
        sx={[autocompleteOptionStyle, props.sx]}
        onTouchStart={composeEventHandlers(props.onTouchStart, (e) => {
          if (disabled) return;

          const items = getItems();
          onSelectedOptionChange(
            items.find(
              (v) =>
                v.ref.current ===
                (e.currentTarget as unknown as HTMLButtonElement),
            ) ?? null,
          );
          setAttributeSelection(ref.current, items, true);
        })}
        onMouseMove={composeEventHandlers(props.onMouseEnter, (e) => {
          if (disabled) return;

          const items = getItems();

          const target = items.find(
            (v) =>
              v.ref.current ===
              (e.currentTarget as unknown as HTMLButtonElement),
          );

          if (target?.ref !== selectedOption?.ref) {
            onSelectedOptionChange(target ?? null);
            setAttributeSelection(ref.current, items, true);
          }
        })}
        rightContent={
          active ? (
            <ListCellContent variant="icon">
              <IconCheck data-role="autocomplete-option-active-icon-check" />
            </ListCellContent>
          ) : null
        }
        onClick={composeEventHandlers(props.onClick, (e) => {
          if (disabled) return e.preventDefault();

          onInputValueChange(value);
          onValueChange(value);
          onSearch?.(value);
          onOpenChange(false);

          requestAnimationFrame(() => {
            input?.focus();
          });
        })}
      >
        {children}
      </ListCell>
    </Collection.ItemSlot>
  );
});

AutocompleteOption.displayName = AUTOCOMPLETE_OPTION_NAME;

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteList,
  AutocompleteOption,
};
