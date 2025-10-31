import { FlexBox, Typography } from '@wanteddev/wds';
import { IconArrowUpRight, IconLock } from '@wanteddev/wds-icon';
import Link from 'next/link';

import { RESOURCE_ITEMS } from './constants';
import { resourceItemStyle } from './style';

const Resources = () => {
  return (
    <FlexBox gap="12px" flexDirection="column" sm={{ flexDirection: 'row' }}>
      {RESOURCE_ITEMS.map((item) => {
        if (item.isPrivate) {
          return (
            <FlexBox
              role="link"
              aria-disabled
              key={item.title}
              justifyContent="space-between"
              alignItems="center"
              flex="1 0 0"
              sx={resourceItemStyle}
            >
              <Typography
                variant="body2-reading"
                weight="bold"
                as="p"
                color="semantic.label.normal"
              >
                {item.title}
              </Typography>

              <IconLock
                aria-hidden
                sx={(theme) => ({
                  color: theme.semantic.label.normal,
                  fontSize: '24px',
                })}
              />
            </FlexBox>
          );
        }

        return (
          <FlexBox
            as={Link}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            key={item.title}
            justifyContent="space-between"
            alignItems="center"
            flex="1 0 0"
            sx={resourceItemStyle}
          >
            <Typography
              variant="body2-reading"
              weight="bold"
              as="p"
              color="semantic.label.normal"
            >
              {item.title}
            </Typography>

            <IconArrowUpRight
              aria-hidden
              sx={(theme) => ({
                color: theme.semantic.label.normal,
                fontSize: '24px',
              })}
            />
          </FlexBox>
        );
      })}
    </FlexBox>
  );
};

export default Resources;
