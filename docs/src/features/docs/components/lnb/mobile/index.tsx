import {
  FlexBox,
  Modal,
  ModalContainer,
  ModalContent,
  ModalNavigation,
  useTransitionStatus,
} from '@wanteddev/wds';
import { memo, useEffect, useRef, useState } from 'react';

import { useLnbContext } from '../contexts';
import { isFrontmatter } from '../helpers';
import LnbGroup from '../group';

import { containerStyle, wrapperStyle } from './style';

import type { LNBFrontmatterGroup } from '../types';

type Props = {
  frontmatters: LNBFrontmatterGroup;
};

const LnbMobile = ({ frontmatters }: Props) => {
  const lnbMobile = useLnbContext();
  const [open, setOpen] = useState(lnbMobile.open);

  const containerRef = useRef<HTMLDivElement>(null);

  const { status, hasExited } = useTransitionStatus({
    duration: 300,
    open: open && lnbMobile.open,
  });

  useEffect(() => {
    setOpen(lnbMobile.open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lnbMobile.open]);

  useEffect(() => {
    if (hasExited) {
      lnbMobile.setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasExited]);

  useEffect(() => {
    if (open) {
      const activeElement = containerRef.current?.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      const viewport = containerRef.current?.querySelector<HTMLElement>(
        '[data-radix-scroll-area-viewport]',
      );

      if (activeElement && viewport) {
        const offsetTop = activeElement.offsetTop - activeElement.clientHeight;

        viewport.scrollTo({
          top: offsetTop - 72,
        });
      }
    }
  }, [open]);

  return (
    <Modal open={open && !hasExited} onOpenChange={setOpen}>
      <ModalContainer
        variant="bottom"
        sx={containerStyle}
        data-status={status}
        ref={containerRef}
        wrapperProps={{ sx: wrapperStyle }}
      >
        <ModalNavigation variant="floating" />
        <ModalContent sx={{ padding: '72px 8px 0px' }}>
          <FlexBox flexDirection="column" gap="20px">
            <FlexBox as="nav" flexDirection="column" justifyContent="center">
              {frontmatters.map((frontmatter, i) => {
                return (
                  <LnbGroup
                    key={
                      isFrontmatter(frontmatter)
                        ? frontmatter.slug.toString() + i
                        : frontmatter.key + i
                    }
                    frontmatter={frontmatter}
                  />
                );
              })}
            </FlexBox>
          </FlexBox>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default memo(LnbMobile);
