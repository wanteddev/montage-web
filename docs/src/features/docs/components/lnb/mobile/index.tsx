import {
  Divider,
  FlexBox,
  Modal,
  ModalContainer,
  ModalContent,
  ModalNavigation,
  useTransitionStatus,
} from '@wanteddev/wds';
import { Fragment, memo, useEffect, useState } from 'react';

import { useLnbMobileContext } from '../contexts';
import { isFrontmatter } from '../helpers';
import LnbGroup from '../group';

import { containerStyle, wrapperStyle } from './style';

import type { LNBFrontmatterGroup } from '../types';

type Props = {
  frontmatters: LNBFrontmatterGroup;
};

const LnbMobile = ({ frontmatters }: Props) => {
  const lnbMobile = useLnbMobileContext();
  const [open, setOpen] = useState(lnbMobile.open);

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

  return (
    <Modal open={open && !hasExited} onOpenChange={setOpen}>
      <ModalContainer
        variant="bottom"
        sx={containerStyle}
        data-status={status}
        wrapperProps={{ sx: wrapperStyle }}
      >
        <ModalNavigation />
        <ModalContent sx={{ padding: '0px 8px' }}>
          <FlexBox flexDirection="column" gap="20px">
            <FlexBox as="nav" flexDirection="column" justifyContent="center">
              {frontmatters.map((frontmatter, i) => {
                return (
                  <Fragment
                    key={
                      isFrontmatter(frontmatter)
                        ? frontmatter.slug.toString() + i
                        : frontmatter.key + i
                    }
                  >
                    <LnbGroup frontmatter={frontmatter} />

                    {i < frontmatters.length - 1 && (
                      <Divider
                        color="semantic.line.solid.alternative"
                        size="calc(100% + 16px)"
                        sx={{ marginLeft: '-8px' }}
                      />
                    )}
                  </Fragment>
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
