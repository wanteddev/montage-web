import { useEffect } from 'react';
import {
  ActionArea,
  Modal,
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalNavigation,
  SearchField,
  Typography,
} from '@wanteddev/wds';
import { FlexBox } from '@wanteddev/wds';
import { IconArrowTurnDownLeft, IconChevronLeft } from '@wanteddev/wds-icon';

import AlgoliaLogo from '@/assets/algolia-logo';

import { useDocSearch } from './hooks';
import {
  actionAreaStyle,
  compactContentStyle,
  kbdStyle,
  modalCloseButtonStyle,
  modalContainerStyle,
  modalNavigationStyle,
  modalWrapperStyle,
} from './styles';
import SearchResults from './results';

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

  const { getInputProps, getItemProps } = autocomplete;

  return (
    <Modal {...props} open={open} onOpenChange={onOpenChange}>
      <ModalContainer
        variant="full"
        resize="hug"
        sm={{
          variant: 'popup',
          size: 'xlarge',
        }}
        wrapperProps={{
          sx: modalWrapperStyle,
        }}
        sx={modalContainerStyle}
        ref={containerRef}
        aria-haspopup="listbox"
        style={
          {
            '--wds-modal-content-margin': '16px',
            '--wds-action-area-margin-y': '16px',
          } as CSSProperties
        }
      >
        <ModalNavigation
          variant="search"
          sx={modalNavigationStyle}
          trailingContent={null}
          leadingContent={
            <ModalClose aria-label="Back" sx={modalCloseButtonStyle}>
              <IconChevronLeft />
            </ModalClose>
          }
        >
          <SearchField
            type="search"
            width="100%"
            size="small"
            {...(getInputProps({
              inputElement: inputRef.current!,
            }) as unknown as Omit<HTMLAttributes<HTMLInputElement>, 'onReset'>)}
            aria-labelledby={undefined}
            autoFocus
            ref={inputRef}
          />
        </ModalNavigation>

        <ModalContent
          sx={{ paddingTop: 0, paddingBottom: '16px', height: '100%' }}
        >
          <ModalContentItem flex="1" sx={{ padding: '0px 20px' }}>
            <SearchResults
              state={state}
              isEmpty={isEmpty}
              isQueryEmpty={isQueryEmpty}
              getItemProps={getItemProps}
              recentSearchRemove={recentSearchRemove}
            />
          </ModalContentItem>
        </ModalContent>

        <ActionArea
          variant="compact"
          sx={actionAreaStyle}
          background={false}
          compactContent={
            <FlexBox gap="20px" sx={compactContentStyle}>
              <FlexBox alignItems="center" gap="8px">
                <FlexBox
                  alignItems="center"
                  justifyContent="center"
                  as="kbd"
                  sx={[kbdStyle, { width: 22, height: 22 }]}
                >
                  <IconArrowTurnDownLeft />
                </FlexBox>

                <Typography
                  variant="caption1"
                  weight="medium"
                  color="semantic.label.alternative"
                >
                  Go to Page
                </Typography>
              </FlexBox>

              <FlexBox alignItems="center" gap="8px">
                <FlexBox
                  alignItems="center"
                  justifyContent="center"
                  as="kbd"
                  sx={kbdStyle}
                >
                  <Typography
                    variant="caption2"
                    weight="medium"
                    color="semantic.label.alternative"
                  >
                    ESC
                  </Typography>
                </FlexBox>

                <Typography
                  variant="caption1"
                  weight="medium"
                  color="semantic.label.alternative"
                >
                  Close
                </Typography>
              </FlexBox>
            </FlexBox>
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
      </ModalContainer>
    </Modal>
  );
};
