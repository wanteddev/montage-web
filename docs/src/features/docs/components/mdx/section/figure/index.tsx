import { FlexBox, Typography } from '@wanteddev/wds';
import { Thumbnail } from '@wanteddev/wds';
import { useId } from 'react';
import { IconCircleCheckFill, IconCircleCloseFill } from '@wanteddev/wds-icon';

import { SectionDescription } from '../layout';
import { SectionStatesItem } from '../states';

import {
  sectionFigureStyle,
  sectionFigureThumbnailStyle,
  sectionFigureVariantStyle,
} from './style';

import type { ThumbnailProps } from '@wanteddev/wds';
import type { ReactNode } from 'react';

type Props = {
  title?: string;
  description?: ReactNode;
  src?: string;
  ratio?: ThumbnailProps['ratio'];
  portrait?: ThumbnailProps['portrait'];
  variant?: 'positive' | 'negative';
  options?: Array<string>;
};

const SectionFigure = ({
  ratio = '21:9',
  portrait,
  title,
  src,
  description,
  variant,
  options,
}: Props) => {
  const id = useId();

  return (
    <FlexBox flexDirection="column" sx={sectionFigureStyle} flex="1 1 0%">
      {src && (
        <Thumbnail
          aria-labelledby={id}
          src={src}
          alt="thumbnail"
          width="100%"
          sx={[sectionFigureThumbnailStyle, variant && { marginBottom: 12 }]}
          ratio={ratio}
          loading="lazy"
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

            {options?.length && <SectionStatesItem options={options} />}
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

          {options?.length && <SectionStatesItem options={options} />}
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default SectionFigure;
