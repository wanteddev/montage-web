import { useEffect } from 'react';
import {
  ChipAction,
  FlexBox,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  TextButton,
  TextFieldContent,
  TopNavigation,
} from '@wanteddev/wds';
import { TextField } from '@wanteddev/wds';

import { useDocSearch } from './hooks';
import { searchModalHeaderStyle, searchModalToolbarStyle } from './styles';
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
    searchType,
    setSearchType,
    containerRef,
    inputRef,
  } = useDocSearch({
    appId,
    apiKey,
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
        sm={{
          variant: 'popup',
          size: 'large',
          resize: 'fixed',
        }}
        ref={containerRef}
        aria-haspopup="listbox"
      >
        <TopNavigation
          sx={searchModalHeaderStyle}
          toolbar={
            <FlexBox
              sx={searchModalToolbarStyle}
              flexDirection="column"
              gap="16px"
              flex="1"
            >
              <TextField
                type="search"
                width="100%"
                {...(getInputProps({
                  inputElement: inputRef.current!,
                }) as unknown as Omit<
                  HTMLAttributes<HTMLInputElement>,
                  'onReset'
                >)}
                autoFocus
                onClick={() => {}}
                trailingContent={
                  <TextFieldContent variant="text">
                    <TextButton
                      onClick={() => onOpenChange?.(false)}
                      size="small"
                      variant="assistive"
                      sx={{ marginTop: '-4px' }}
                    >
                      취소
                    </TextButton>
                  </TextFieldContent>
                }
                ref={inputRef}
              />

              <FlexBox gap="12px">
                <ChipAction
                  variant={searchType === 'design' ? 'solid' : 'outlined'}
                  active={searchType === 'design'}
                  onClick={() => setSearchType('design')}
                >
                  Design
                </ChipAction>
                <ChipAction
                  variant={searchType === 'code' ? 'solid' : 'outlined'}
                  active={searchType === 'code'}
                  onClick={() => setSearchType('code')}
                >
                  Code
                </ChipAction>
              </FlexBox>
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
            />
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};
