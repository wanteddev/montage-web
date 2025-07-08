import { FlexBox, Typography } from '@wanteddev/wds';
import { Thumbnail } from '@wanteddev/wds';
import { useId } from 'react';
import { IconCircleCheckFill, IconCircleCloseFill } from '@wanteddev/wds-icon';

import { SectionDescription } from '../layout';

import {
  sectionFigureStyle,
  sectionFigureThumbnailStyle,
  sectionFigureVariantStyle,
} from './style';

import type { ComponentProps } from 'react';

type Props = {
  title?: string;
  description?: string;
  src?: string;
  ratio?: ComponentProps<typeof Thumbnail>['ratio'];
  portrait?: ComponentProps<typeof Thumbnail>['portrait'];
  variant?: 'positive' | 'negative';
};

const SectionFigure = ({
  ratio = '21:9',
  portrait,
  title,
  src,
  description,
  variant,
}: Props) => {
  const id = useId();

  return (
    <FlexBox flexDirection="column" sx={sectionFigureStyle} flex="1 1 0%">
      {src && (
        <Thumbnail
          aria-labelledby={id}
          src={src}
          alt="thumbnail"
          disableOptimize
          width="100%"
          sx={[sectionFigureThumbnailStyle, variant && { marginBottom: 12 }]}
          ratio={ratio}
          radius
          portrait={portrait}
        />
      )}
      {variant ? (
        <FlexBox gap="16px" sx={sectionFigureVariantStyle(variant)}>
          {variant === 'positive' ? (
            <IconCircleCheckFill sx={{ fontSize: 40 }} />
          ) : (
            <IconCircleCloseFill sx={{ fontSize: 40 }} />
          )}
          <FlexBox
            flexDirection="column"
            gap="2px"
            sx={{
              ['&& p']: {
                marginBottom: '0 !important',
                paddingInline: '0px !important',
              },
            }}
          >
            <Typography
              color={
                variant === 'positive'
                  ? 'semantic.status.positive'
                  : 'semantic.status.negative'
              }
              variant="headline2"
              weight="bold"
            >
              {variant === 'positive' ? 'Do' : "Don't"}
            </Typography>

            <SectionDescription content={description} />
          </FlexBox>
        </FlexBox>
      ) : (
        <FlexBox flexDirection="column" gap="4px">
          {title && (
            <Typography
              as="p"
              variant="headline2"
              weight="bold"
              color="semantic.label.normal"
              id={id}
              sx={{
                paddingInline: '12px !important',
              }}
            >
              {title}
            </Typography>
          )}

          <SectionDescription content={description} />
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default SectionFigure;
