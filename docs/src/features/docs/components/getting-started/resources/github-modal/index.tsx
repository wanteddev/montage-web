import {
  ActionArea,
  ActionAreaButton,
  Box,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalDimmer,
  WithInteraction,
} from '@wanteddev/wds';
import Link from 'next/link';

import {
  contentButtonStyle,
  modalContainerStyle,
  modalDimmerStyle,
} from './style';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GithubModal = ({ open, onOpenChange }: Props) => {
  const handleClick = () => {
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContainer
        size="medium"
        sx={modalContainerStyle}
        dimmer={<ModalDimmer sx={modalDimmerStyle} />}
      >
        <ModalContent sx={{ paddingBottom: '0px' }}>
          <ModalContentItem gap="12px">
            <WithInteraction>
              <Box
                onClick={handleClick}
                as={Link}
                href="https://github.com/wanteddev/montage-android"
                target="_blank"
                rel="noopener noreferrer"
                sx={contentButtonStyle}
              >
                Android
              </Box>
            </WithInteraction>
            <WithInteraction>
              <Box
                onClick={handleClick}
                as={Link}
                href="https://github.com/wanteddev/montage-ios"
                target="_blank"
                rel="noopener noreferrer"
                sx={contentButtonStyle}
              >
                iOS
              </Box>
            </WithInteraction>
            <WithInteraction>
              <Box
                onClick={handleClick}
                as={Link}
                href="https://github.com/wanteddev/montage-web"
                target="_blank"
                rel="noopener noreferrer"
                sx={contentButtonStyle}
              >
                Web
              </Box>
            </WithInteraction>
          </ModalContentItem>
        </ModalContent>
        <ActionArea>
          <ActionAreaButton
            buttonColor="assistive"
            sx={{ borderRadius: '999px' }}
            onClick={() => onOpenChange(false)}
          >
            닫기
          </ActionAreaButton>
        </ActionArea>
      </ModalContainer>
    </Modal>
  );
};

export default GithubModal;
