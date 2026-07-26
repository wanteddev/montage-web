import { ContentBadge, FlexBox } from '@montage-ui/core';
import { IconGlobe } from '@montage-ui/icon';

import { sectionLayoutStyle } from '../style';
import { Heading2, SectionDescription, SectionThumbnail } from '../layout';

type SectionStatesProps = {
  description?: string;
  src?: string;
  ratio?: string;
  isWebOnly?: boolean;
};

const SectionStates = ({
  description,
  ratio = '21 / 9',
  src,
  isWebOnly,
}: SectionStatesProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <FlexBox flexDirection="column">
        <Heading2
          content="States"
          trailingContent={
            isWebOnly ? (
              <ContentBadge
                variant="solid"
                size="xsmall"
                color="accent"
                leadingContent={
                  <IconGlobe
                    sx={(theme) => ({
                      fontSize: '12px',
                      color: theme.semantic.foreground.accent.purple,
                    })}
                  />
                }
                accentColor="semantic.foreground.accent.purple"
                sx={{ flexShrink: 0, marginLeft: '2px' }}
              >
                Web only
              </ContentBadge>
            ) : null
          }
        />

        <SectionThumbnail src={src} ratio={ratio} />

        <SectionDescription content={description} />
      </FlexBox>
    </FlexBox>
  );
};

export default SectionStates;
