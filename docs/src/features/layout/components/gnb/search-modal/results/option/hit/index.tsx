import { Box, FlexBox, Typography, WithInteraction } from '@wanteddev/wds';
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
} from 'react';
import Link from 'next/link';

import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import {
  captionStyle,
  contentStyle,
  linkStyle,
  textStyle,
  wrapperStyle,
} from './style';

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
  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  return (
    <FlexBox as="li" {...props} justifyContent="center" sx={wrapperStyle}>
      <WithInteraction width="calc(100% + 24px)">
        <FlexBox
          as={Link}
          href={item.url.replace(process.env.NEXT_PUBLIC_BASE_PATH ?? '', '')}
          gap="4px"
          sx={linkStyle}
          onClick={handleRouteChange}
        >
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
