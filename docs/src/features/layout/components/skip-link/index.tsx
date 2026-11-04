'use client';
import { Box, FlexBox, TextButton, Typography } from '@montage-ui/core';
import { useId } from 'react';

import { SKIP_LINKS } from './constants';
import { skipLinkStyle, skipLinkWrapperStyle } from './style';

const SkipLink = () => {
  const id = useId();

  const handleClick =
    (targetId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(targetId);

      if (!target) return;

      e.preventDefault();
      target.focus();
    };

  return (
    <FlexBox flexDirection="column" gap="12px" sx={skipLinkWrapperStyle}>
      <Typography
        variant="body1"
        weight="bold"
        color="semantic.foreground.neutral.strong"
        id={id}
      >
        Skip to
      </Typography>

      <FlexBox as="ul" flexDirection="column" gap="8px" aria-labelledby={id}>
        {SKIP_LINKS.map(({ targetId, label }) => (
          <Box as="li" key={targetId} sx={skipLinkStyle(targetId)}>
            <TextButton
              color="assistive"
              onClick={handleClick(targetId)}
              as="a"
              href={`#${targetId}`}
            >
              {label}
            </TextButton>
          </Box>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default SkipLink;
