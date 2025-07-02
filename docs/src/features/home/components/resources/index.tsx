'use client';
import {
  Box,
  FlexBox,
  List,
  ListCell,
  ListCellContent,
  TextButton,
} from '@wanteddev/wds';
import React, { Fragment } from 'react';
import { IconExternalLink } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';

import { homeTitleStyle } from '../../helpers';

import { resourceItemButtonStyle, resourceItemStyle } from './style';
import { RESOURCE_ITEMS } from './constants';

const Resources = () => {
  return (
    <FlexBox flexDirection="column" as="section" sx={{ width: '100%' }}>
      <Box as="h2" sx={[homeTitleStyle, breakWordStyle]}>
        Downloads
      </Box>

      <List gap="0px">
        {RESOURCE_ITEMS.map((item) => (
          <Fragment key={item.title}>
            <ListCell
              alignItems="center"
              disableInteraction
              tabIndex={-1}
              onClick={(e) => e.preventDefault()}
              data-interaction="false"
              verticalPadding="medium"
              sm={{
                verticalPadding: 'large',
              }}
              trailingContent={
                <ListCellContent variant="button">
                  <TextButton
                    variant="assistive"
                    size="small"
                    as="a"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    trailingContent={<IconExternalLink />}
                    sx={resourceItemButtonStyle}
                  >
                    {item.button}
                  </TextButton>
                </ListCellContent>
              }
              textProps={{
                caption: item.caption,
              }}
              sx={resourceItemStyle}
            >
              {item.title}
            </ListCell>

            <ListCell
              as="a"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              role="link"
              alignItems="center"
              data-interaction="true"
              verticalPadding="medium"
              sm={{
                verticalPadding: 'large',
              }}
              trailingContent={
                <ListCellContent variant="icon">
                  <IconExternalLink aria-label={item.button} />
                </ListCellContent>
              }
              textProps={{
                caption: item.caption,
              }}
              sx={resourceItemStyle}
            >
              {item.title}
            </ListCell>
          </Fragment>
        ))}
      </List>
    </FlexBox>
  );
};

export default Resources;
