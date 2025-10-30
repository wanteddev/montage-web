import { Box, FlexBox, Typography, WithInteraction } from '@wanteddev/wds';

import {
  captionStyle,
  contentStyle,
  linkStyle,
  textStyle,
  wrapperStyle,
} from './style';

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import type { InternalDocSearchHit } from '../../../types';

type Props = PropsWithChildren<{
  trailingContent?: ReactNode;
  leadingContent?: ReactNode;
  caption?: ReactNode;
  item: InternalDocSearchHit;
}> &
  HTMLAttributes<HTMLLIElement>;

const SearchOptionHit = ({
  item,
  children,
  trailingContent,
  leadingContent,
  caption,
  ...props
}: Props) => {
  return (
    <FlexBox as="li" {...props} justifyContent="center" sx={wrapperStyle}>
      <WithInteraction width="calc(100% + 24px)">
        <FlexBox as="a" href={item.url} gap="4px" sx={linkStyle}>
          {leadingContent && <Box sx={contentStyle}>{leadingContent}</Box>}
          <FlexBox
            as="span"
            flexDirection="column"
            gap="4px"
            flex="1 1 0%"
            sx={{ overflow: 'hidden', height: 'fit-content' }}
          >
            <Typography
              sx={textStyle}
              variant="label1"
              weight="medium"
              color="semantic.label.alternative"
            >
              {children}
            </Typography>

            {caption && (
              <Typography
                sx={captionStyle}
                variant="label2"
                weight="regular"
                color="semantic.label.alternative"
                noWrap
              >
                {caption}
              </Typography>
            )}
          </FlexBox>
          {trailingContent && <Box sx={contentStyle}>{trailingContent}</Box>}
        </FlexBox>
      </WithInteraction>
    </FlexBox>
  );
};

export default SearchOptionHit;
