import { useEffect } from 'react';
import {
  FlexBox,
  IconButton,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  SearchField,
  TopNavigation,
} from '@wanteddev/wds';
import { IconClose } from '@wanteddev/wds-icon';

import { useDocSearch } from './hooks';
import {
  modalCloseButtonStyle,
  searchModalHeaderStyle,
  searchModalToolbarStyle,
} from './styles';
import SearchResults from './search-results';

import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';

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
        size="normal"
        ref={containerRef}
        aria-haspopup="listbox"
      >
        <TopNavigation
          variant="floating"
          sx={searchModalHeaderStyle}
          toolbar={
            <FlexBox sx={searchModalToolbarStyle} gap="20px" flex="1">
              <SearchField
                type="search"
                width="100%"
                size="medium"
                {...(getInputProps({
                  inputElement: inputRef.current!,
                }) as unknown as Omit<
                  HTMLAttributes<HTMLInputElement>,
                  'onReset'
                >)}
                autoFocus
                ref={inputRef}
              />

              <IconButton
                variant="solid"
                size={48}
                sx={modalCloseButtonStyle}
                onClick={() => onOpenChange?.(false)}
              >
                <IconClose />
              </IconButton>
            </FlexBox>
          }
        />

        <ModalContent sx={{ paddingTop: 0 }}>
          <ModalContentItem>
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
      </ModalContainer>
    </Modal>
  );
};
