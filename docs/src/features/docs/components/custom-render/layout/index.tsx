import { FlexBox, Typography } from '@wanteddev/wds';
import { Fragment, type PropsWithChildren } from 'react';

import { breakWordStyle } from '@/styles/text';

import type { Frontmatter } from '@/features/docs/types';

type Props = PropsWithChildren<{
  frontmatter: Frontmatter;
}>;

const CustomRenderLayout = ({ children, frontmatter }: Props) => {
  return (
    <FlexBox flexDirection="column">
      <FlexBox
        flexDirection="column"
        gap="24px"
        sx={{
          marginBottom: '64px',
        }}
      >
        <Typography as="h1" variant="display3" weight="bold">
          {frontmatter.title}
        </Typography>

        {frontmatter.description && (
          <Typography
            variant="body2-reading"
            weight="regular"
            color="semantic.label.neutral"
            sx={[
              {
                maxWidth: '640px',
              },
              breakWordStyle,
            ]}
            as="p"
          >
            {frontmatter.description.split('\n').map((line) => (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            ))}
          </Typography>
        )}
      </FlexBox>
      {children}
    </FlexBox>
  );
};

export default CustomRenderLayout;
