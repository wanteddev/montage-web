import { ContentBadge, Divider, FlexBox, Typography } from '@wanteddev/wds';
import { Fragment } from 'react';

import { sectionLayoutStyle } from '../style';
import { Heading2 } from '../layout';
import { inlineCodeStyle } from '../../code-block/style';

import { customizeStyle } from './style';

type Props = {
  data: Array<{
    key: string;
    options: Array<string>;
  }>;
};

const SectionCustomize = ({ data }: Props) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <Heading2 content="Customize" />

      {data.map((v, i) => (
        <Fragment key={v.key}>
          <FlexBox sx={customizeStyle}>
            <Typography
              variant="label1"
              weight="bold"
              color="semantic.label.strong"
              sx={{ minWidth: 120 }}
            >
              {v.key}
            </Typography>

            <FlexBox gap="6px" flexWrap="wrap">
              {v.options.map((option) => (
                <code key={option}>
                  <ContentBadge
                    color="accent"
                    accentColor="semantic.accent.foreground.blue"
                    sx={inlineCodeStyle}
                  >
                    {option}
                  </ContentBadge>
                </code>
              ))}
            </FlexBox>
          </FlexBox>

          {(data.length < 2 || i !== data.length - 1) && (
            <Divider color="semantic.line.normal.alternative" />
          )}
        </Fragment>
      ))}
    </FlexBox>
  );
};

export default SectionCustomize;
