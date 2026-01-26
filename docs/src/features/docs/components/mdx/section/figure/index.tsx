import { FlexBox, Typography } from '@wanteddev/wds';
import { IconCircleCheckFill, IconCircleCloseFill } from '@wanteddev/wds-icon';

import { SectionDescription, SectionThumbnail } from '../layout';

import { sectionFigureStyle, sectionFigureVariantStyle } from './style';

import type { ReactNode } from 'react';

type Props = {
  title?: string;
  description?: ReactNode;
  src?: string;
  ratio?: string;
  variant?: 'positive' | 'negative';
};

const SectionFigure = ({
  ratio = '21 / 9',
  title,
  src,
  description,
  variant,
}: Props) => {
  return (
    <FlexBox flexDirection="column" sx={sectionFigureStyle} flex="1 1 0%">
      <SectionThumbnail src={src} ratio={ratio} />

      {variant ? (
        <FlexBox
          gap="6px"
          sx={sectionFigureVariantStyle(variant)}
          flexDirection="column"
        >
          <FlexBox gap="6px" alignItems="center">
            {variant === 'positive' ? (
              <>
                <IconCircleCheckFill aria-hidden sx={{ fontSize: 20 }} />
                <Typography
                  variant="headline2"
                  weight="bold"
                  color="semantic.label.normal"
                >
                  Do
                </Typography>
              </>
            ) : (
              <>
                <IconCircleCloseFill aria-hidden sx={{ fontSize: 20 }} />
                <Typography
                  variant="headline2"
                  weight="bold"
                  color="semantic.label.normal"
                >
                  Don’t
                </Typography>
              </>
            )}
          </FlexBox>

          <SectionDescription content={description} />
        </FlexBox>
      ) : (
        <FlexBox flexDirection="column" gap="4px">
          {title && (
            <Typography
              as="p"
              variant="headline2"
              weight="bold"
              color="semantic.label.normal"
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
