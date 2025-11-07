import { Box, Divider, FlexBox, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { IconArrowUpRight } from '@wanteddev/wds-icon';
import { useCallback, useRef, useState } from 'react';

import {
  hiddenTextStyle,
  itemDividerStyle,
  itemWebpStyle,
  itemWrapperStyle,
} from './style';

import type { HTMLAttributes } from 'react';

type Props = {
  title: string;
  href: string;
  image: string;
  webp: string;
  updatedAt: string;
} & HTMLAttributes<HTMLAnchorElement>;

const ResourcesItem = ({
  title,
  href,
  image,
  webp,
  updatedAt,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  return (
    <FlexBox
      {...props}
      gap="16px"
      flex="1 0 0"
      alignItems="center"
      md={{
        gap: '26px',
        flexDirection: 'column',
        alignItems: 'initial',
      }}
      sx={itemWrapperStyle}
      as={Link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FlexBox ref={ref} sx={{ position: 'relative' }}>
        <Box
          sx={itemWebpStyle(image, webp)}
          data-state={isMouseOver ? 'hover' : 'idle'}
        />
        {/* <Thumbnail
          src={image}
          alt={title.replace(/<[^>]+>/g, '')}
          data-role="resource-image"
          sx={itemImageStyle}
        />

        {isMouseOver && (
          <Thumbnail
            aria-hidden
            src={webp}
            alt={title.replace(/<[^>]+>/g, '')}
            data-role="resource-webp"
            sx={itemImageStyle}
            loading="lazy"
          />
        )} */}
      </FlexBox>

      <Divider color="semantic.line.normal.neutral" sx={itemDividerStyle} />

      <FlexBox
        gap="6px"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
        md={{
          flexDirection: 'column',
          alignItems: 'initial',
        }}
      >
        <FlexBox gap="12px">
          <Typography
            variant="headline2"
            weight="bold"
            color="semantic.label.normal"
            as="p"
            md={{
              variant: 'headline1',
            }}
            sx={hiddenTextStyle}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <IconArrowUpRight aria-hidden data-role="interaction-arrow" />
        </FlexBox>

        <Typography
          variant="body2"
          weight="medium"
          color="semantic.label.alternative"
          as="p"
          sx={hiddenTextStyle}
          dangerouslySetInnerHTML={{ __html: updatedAt }}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ResourcesItem;
