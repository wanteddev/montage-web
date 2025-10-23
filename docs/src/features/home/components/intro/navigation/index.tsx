import { Box, FlexBox, Typography, WithInteraction } from '@wanteddev/wds';
import {
  IconChevronDownSmall,
  IconComponentFill,
  IconDiamondFill,
} from '@wanteddev/wds-icon';
import Link from 'next/link';

import {
  navigationBarLinkStyle,
  navigationBarStyle,
  scrollDownIconStyle,
  scrollDownTextStyle,
  scrollDownWrapperStyle,
  versionInfoStyle,
} from './style';

type Props = {
  onScrollDown: () => void;
};

const IntroNavigation = ({ onScrollDown }: Props) => {
  return (
    <>
      <FlexBox
        sx={navigationBarStyle}
        justifyContent="space-between"
        alignItems="center"
        gap="12px"
      >
        <Box as="span" sx={versionInfoStyle}>
          Wanted Design System: Montage V2.0.0
        </Box>

        <FlexBox gap="8px" alignItems="center">
          <WithInteraction>
            <FlexBox
              as={Link}
              role="link"
              href="/docs/foundations/overview"
              sx={navigationBarLinkStyle}
              gap="4px"
              alignItems="center"
            >
              <IconDiamondFill />
              <Typography
                variant="label1"
                weight="bold"
                color="semantic.static.white"
              >
                Foundations
              </Typography>
            </FlexBox>
          </WithInteraction>

          <WithInteraction>
            <FlexBox
              as={Link}
              role="link"
              href="/docs/foundations/overview"
              sx={navigationBarLinkStyle}
              gap="4px"
              alignItems="center"
            >
              <IconComponentFill />
              <Typography
                variant="label1"
                weight="bold"
                color="semantic.static.white"
              >
                Components
              </Typography>
            </FlexBox>
          </WithInteraction>
        </FlexBox>
      </FlexBox>

      <FlexBox
        sx={scrollDownWrapperStyle}
        flexDirection="column"
        gap="6px"
        alignItems="center"
        as="button"
        aria-label="scroll down"
        onClick={onScrollDown}
      >
        <IconChevronDownSmall sx={scrollDownIconStyle} />
        <Box as="span" sx={scrollDownTextStyle}>
          Scroll down
        </Box>
      </FlexBox>
    </>
  );
};

export default IntroNavigation;
