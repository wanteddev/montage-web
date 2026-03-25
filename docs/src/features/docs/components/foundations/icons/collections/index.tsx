import {
  ActionArea,
  ActionAreaButton,
  Box,
  FlexBox,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalNavigation,
  Typography,
  WithInteraction,
} from '@wanteddev/wds';
import * as Icons from '@wanteddev/wds-icon';
import { useCallback, useMemo, useRef, useState } from 'react';
import { camelCase, capitalCase } from 'change-case';

import {
  iconDetailWrapperStyle,
  iconGridStyle,
  iconItemStyle,
  iconItemWrapperStyle,
  iconNameStyle,
  summaryWrapperStyle,
} from './style';

type Props = {
  icons: Array<string>;
};

const Collections = ({ icons }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const iconDetailRef = useRef<HTMLDivElement>(null);

  const handleClickIcon = (icon: string) => {
    setSelectedIcon(icon);
  };

  const handleCloseModal = () => {
    setSelectedIcon(null);
  };

  const handleDownloadSvg = useCallback(() => {
    const svgElement = iconDetailRef.current?.querySelector('svg');
    if (!svgElement || !selectedIcon) return;

    const cloned = svgElement.cloneNode(true) as SVGSVGElement;
    cloned.removeAttribute('style');
    cloned.removeAttribute('class');

    if (!cloned.getAttribute('xmlns')) {
      cloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    const svgString = new XMLSerializer().serializeToString(cloned);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${camelCase(selectedIcon.replace('Icon', ''))}.svg`;
    a.click();

    URL.revokeObjectURL(url);
  }, [selectedIcon]);

  const SelectedIconComponent = useMemo(() => {
    if (!selectedIcon) return null;
    const IconComponent = Icons[selectedIcon as keyof typeof Icons];

    return <IconComponent aria-hidden />;
  }, [selectedIcon]);

  if (icons.length === 0) return null;

  return (
    <>
      <Box sx={iconGridStyle}>
        {icons.map((icon) => {
          const IconComponent = Icons[icon as keyof typeof Icons];

          return (
            <Box key={icon} sx={iconItemWrapperStyle}>
              <WithInteraction scale>
                <FlexBox
                  flexDirection="column"
                  alignItems="center"
                  gap="12px"
                  as="button"
                  type="button"
                  onClick={() => handleClickIcon(icon)}
                  aria-label={`Show detail ${icon}`}
                  sx={iconItemStyle}
                >
                  <IconComponent aria-hidden />

                  <Typography
                    variant="caption1"
                    weight="medium"
                    as="p"
                    sx={iconNameStyle}
                  >
                    {capitalCase(icon.replace('Icon', ''))}
                  </Typography>
                </FlexBox>
              </WithInteraction>
            </Box>
          );
        })}
      </Box>

      <Modal
        open={Boolean(selectedIcon)}
        onOpenChange={(open) => !open && handleCloseModal()}
        onVisibilityChange={(visibility) =>
          visibility === 'hidden' && handleCloseModal()
        }
      >
        <ModalContainer
          size="medium"
          variant="bottom"
          handle
          sm={{ variant: 'popup', size: 'xlarge' }}
        >
          <ModalNavigation variant="emphasized">
            {selectedIcon?.replace('Icon', '')}
          </ModalNavigation>

          <ModalContent sx={{ paddingBlock: '0px' }}>
            <ModalContentItem flexDirection="column" gap="32px">
              <FlexBox ref={iconDetailRef} sx={iconDetailWrapperStyle}>
                {SelectedIconComponent}
              </FlexBox>

              <Box sx={summaryWrapperStyle}>
                <Typography
                  variant="label1"
                  weight="bold"
                  color="semantic.label.strong"
                >
                  Name
                </Typography>

                <Typography
                  color="semantic.label.neutral"
                  variant="label1"
                  weight="medium"
                >
                  {camelCase(selectedIcon?.replace('Icon', '') ?? '')}
                </Typography>
              </Box>
            </ModalContentItem>
          </ModalContent>

          <ActionArea variant="strong">
            <ActionAreaButton
              variant="alternative"
              onClick={handleCloseModal}
              trailingContent={<Icons.IconCopy />}
            >
              SVG 복사
            </ActionAreaButton>
            <ActionAreaButton
              variant="main"
              onClick={handleDownloadSvg}
              trailingContent={<Icons.IconDownload />}
            >
              다운로드
            </ActionAreaButton>
          </ActionArea>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default Collections;
