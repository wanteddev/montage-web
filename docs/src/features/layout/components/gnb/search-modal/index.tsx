import { useEffect } from 'react';
import {
  ActionArea,
  ActionAreaButton,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  SearchField,
  TopNavigation,
} from '@wanteddev/wds';

import { useDocSearch } from './hooks';
import { searchModalHeaderStyle } from './styles';
import SearchResults from './results';
import { DocSearchFilterContext } from './contexts';

import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  HTMLAttributes,
} from 'react';

export type DocSearchModalProps = {
  apiKey: string;
  appId: string;
} & ComponentPropsWithoutRef<typeof Modal>;

export const DocSearchModal = ({
  appId,
  apiKey,
  onOpenChange,
  open,
  ...props
}: DocSearchModalProps): JSX.Element => {
  const {
    isEmpty,
    isQueryEmpty,
    autocomplete,
    state,
    recentSearchRemove,
    containerRef,
    inputRef,
    category,
    handleCategoryChange: setCategory,
  } = useDocSearch({
    appId,
    apiKey,
    onOpenChange,
  });

  useEffect(() => {
    const scrollWrapper = containerRef.current?.firstElementChild;

    if (scrollWrapper) {
      scrollWrapper.scrollTop = 0;
    }
  }, [containerRef, state.query]);

  const { getInputProps, getItemProps, getListProps } = autocomplete;

  return (
    <Modal {...props} open={open} onOpenChange={onOpenChange}>
      <ModalContainer
        variant="full"
        md={{
          variant: 'popup',
          size: 'xlarge',
          resize: 'fixed',
        }}
        ref={containerRef}
        aria-haspopup="listbox"
        style={
          {
            '--wds-modal-content-margin': '16px',
            '--wds-action-area-margin-y': '16px',
          } as CSSProperties
        }
      >
        <DocSearchFilterContext.Provider value={{ category, setCategory }}>
          <TopNavigation
            variant="floating"
            sx={searchModalHeaderStyle}
            toolbar={
              <SearchField
                type="search"
                width="100%"
                size="small"
                {...(getInputProps({
                  inputElement: inputRef.current!,
                }) as unknown as Omit<
                  HTMLAttributes<HTMLInputElement>,
                  'onReset'
                >)}
                autoFocus
                ref={inputRef}
              />
            }
          />

          <ModalContent sx={{ paddingTop: 0, height: '100%' }}>
            <ModalContentItem flex="1">
              <SearchResults
                state={state}
                isEmpty={isEmpty}
                isQueryEmpty={isQueryEmpty}
                getItemProps={getItemProps}
                getListProps={getListProps}
                recentSearchRemove={recentSearchRemove}
              />
            </ModalContentItem>
          </ModalContent>

          <ActionArea variant="compact" extra>
            <ActionAreaButton
              variant="sub"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </ActionAreaButton>
          </ActionArea>
        </DocSearchFilterContext.Provider>
      </ModalContainer>
    </Modal>
  );
};
