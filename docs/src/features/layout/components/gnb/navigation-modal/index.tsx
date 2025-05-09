import {
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalNavigation,
  css,
  keyframes,
  useTransitionStatus,
} from '@wanteddev/wds';
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';

type Props = ComponentPropsWithoutRef<typeof Modal>;

const keyframe = keyframes`
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(0%);
	}
`;

const containerStyle = css`
  --wds-top-navigation-padding-x: 20px;
  animation: ${keyframe} 0.3s cubic-bezier(0.2, 0, 0, 1);
  border-radius: 12px 0px 0px 12px;
  max-height: calc(100% - env(safe-area-inset-top, 0px));

  &[data-state='close'] {
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  }
`;

const wrapperStyle = css`
  padding: 0px 0px 0px 20px;
  align-items: initial;
  justify-content: flex-end;
`;

const NavigationModal = (props: Props) => {
  const [open, setOpen] = useState(props.open);

  const { status, hasExited } = useTransitionStatus({
    duration: 300,
    open: open && props.open,
  });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <Modal {...props} open={open && !hasExited} onOpenChange={setOpen}>
      <ModalContainer
        variant="bottom"
        sx={containerStyle}
        data-status={status}
        wrapperProps={{ sx: wrapperStyle }}
      >
        <ModalNavigation>메뉴</ModalNavigation>
        <ModalContent>
          <ModalContentItem>아이템</ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default NavigationModal;
