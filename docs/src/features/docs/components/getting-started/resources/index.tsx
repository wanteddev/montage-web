import { FlexBox, Typography } from '@wanteddev/wds';
import { IconArrowUpRight } from '@wanteddev/wds-icon';
import Link from 'next/link';
import { useState } from 'react';

import { resourceItemStyle } from './style';
import GithubModal from './github-modal';

const Resources = () => {
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  return (
    <>
      <FlexBox gap="12px" flexDirection="column" sm={{ flexDirection: 'row' }}>
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
            color="semantic.label.normal"
          >
            Wanted Figma UI Kit
          </Typography>

          <IconArrowUpRight
            aria-hidden
            sx={(theme) => ({
              color: theme.semantic.label.normal,
              fontSize: '20px',
            })}
          />
        </FlexBox>

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
            color="semantic.label.normal"
          >
            Github Repository
          </Typography>

          <IconArrowUpRight
            aria-hidden
            sx={(theme) => ({
              color: theme.semantic.label.normal,
              fontSize: '20px',
            })}
          />
        </FlexBox>
      </FlexBox>

      <GithubModal
        open={isGithubModalOpen}
        onOpenChange={setIsGithubModalOpen}
      />
    </>
  );
};

export default Resources;
