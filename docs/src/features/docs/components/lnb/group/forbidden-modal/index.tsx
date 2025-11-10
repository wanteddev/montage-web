import {
  ActionArea,
  ActionAreaButton,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalDescription,
  ModalDimmer,
  ModalHeading,
} from '@wanteddev/wds';

import {
  modalContainerStyle,
  modalContentStyle,
  modalDimmerStyle,
} from './style';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ForbiddenModal = ({ open, onOpenChange }: Props) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContainer
        size="medium"
        sx={modalContainerStyle}
        dimmer={<ModalDimmer sx={modalDimmerStyle} />}
      >
        <ModalContent>
          <ModalContentItem sx={modalContentStyle} gap="8px">
            <ModalHeading align="center">
              시작 문서를 준비중입니다.
            </ModalHeading>
            <ModalDescription
              align="center"
              variant="body2-reading"
              color="semantic.label.neutral"
            >
              개발자들을 위한 시작 문서를 준비중이에요.
              <br />
              보다 빠른 시일 내에 준비하여 찾아뵐게요.
            </ModalDescription>
          </ModalContentItem>
        </ModalContent>
        <ActionArea>
          <ActionAreaButton
            buttonColor="assistive"
            sx={{ borderRadius: '999px' }}
            onClick={() => onOpenChange(false)}
          >
            확인
          </ActionAreaButton>
        </ActionArea>
      </ModalContainer>
    </Modal>
  );
};

export default ForbiddenModal;
