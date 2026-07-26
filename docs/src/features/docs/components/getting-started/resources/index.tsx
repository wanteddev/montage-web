import { FlexBox, Typography, WithInteraction } from '@montage-ui/core';
import { IconArrowUpRight } from '@montage-ui/icon';
import Link from 'next/link';
import { useState } from 'react';

import { resourceItemStyle } from './style';
import GithubModal from './github-modal';

const Resources = () => {
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  return (
    <>
      <FlexBox gap="12px" flexDirection="column" sm={{ flexDirection: 'row' }}>
        <WithInteraction>
          <FlexBox
            as={Link}
            href="https://www.figma.com/community/file/1355516515676178246"
            target="_blank"
            rel="noopener noreferrer"
            justifyContent="space-between"
            alignItems="center"
            flex="1 0 0"
            sx={resourceItemStyle}
          >
            <Typography
              variant="body2"
              weight="bold"
              as="p"
              color="semantic.foreground.neutral.primary"
            >
              Wanted Figma UI Kit
            </Typography>

            <IconArrowUpRight
              data-role="interaction-arrow"
              aria-hidden
              sx={(theme) => ({
                color: theme.semantic.foreground.neutral.primary,
                fontSize: '20px',
              })}
            />
          </FlexBox>
        </WithInteraction>

        <WithInteraction>
          <FlexBox
            as="button"
            onClick={() => setIsGithubModalOpen(true)}
            justifyContent="space-between"
            alignItems="center"
            flex="1 0 0"
            sx={resourceItemStyle}
          >
            <Typography
              variant="body2"
              weight="bold"
              as="p"
              color="semantic.foreground.neutral.primary"
            >
              GitHub Repository
            </Typography>
          </FlexBox>
        </WithInteraction>
      </FlexBox>

      <GithubModal
        open={isGithubModalOpen}
        onOpenChange={setIsGithubModalOpen}
      />
    </>
  );
};

export default Resources;
