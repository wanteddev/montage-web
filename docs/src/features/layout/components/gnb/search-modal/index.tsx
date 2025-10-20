import { useEffect } from 'react';
import {
  ActionArea,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalNavigation,
  SearchField,
  TextButton,
  Typography,
} from '@wanteddev/wds';
import { FlexBox } from '@wanteddev/wds';

import AlgoliaLogo from '@/assets/algolia-logo';

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
}: DocSearchModalProps) => {
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
      scrollWrapper.scrollTo({ top: 0 });
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
            '--wds-modal-popup-border-radius': '8px',
          } as CSSProperties
        }
      >
        <DocSearchFilterContext.Provider value={{ category, setCategory }}>
          <ModalNavigation variant="search" sx={searchModalHeaderStyle}>
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
              aria-labelledby={undefined}
              autoFocus
              ref={inputRef}
            />
          </ModalNavigation>

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

          <ActionArea
            variant="compact"
            extra
            sx={{
              '--wds-action-area-margin-x': '24px',
            }}
            compactContent={
              <TextButton
                color="assistive"
                size="small"
                onClick={() => onOpenChange?.(false)}
              >
                Cancel
              </TextButton>
            }
          >
            <FlexBox alignItems="center" gap="6px">
              <Typography
                variant="caption1"
                weight="medium"
                color="semantic.label.alternative"
              >
                Search by
              </Typography>
              <FlexBox
                as="a"
                alignItems="center"
                href="https://www.algolia.com/developers?utm_source=montage.wanted.co.kr&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch"
                target="_blank"
                rel="noreferrer"
              >
                <AlgoliaLogo />
              </FlexBox>
            </FlexBox>
          </ActionArea>
        </DocSearchFilterContext.Provider>
      </ModalContainer>
    </Modal>
  );
};
