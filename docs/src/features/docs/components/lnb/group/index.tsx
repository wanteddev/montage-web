import { FlexBox, List, Typography } from '@wanteddev/wds';
import { usePathname } from 'next/navigation';

import {
  getFrontmatterGroupKey,
  getFrontmatterTitle,
} from '@/features/docs/helpers/mdx.client';
import { isFrontmatter } from '@/features/docs/helpers/pages';

import { wrapperStyle } from './style';
import LnbGroupItem from './item';
import { getIsActive, getIsActiveGroup } from './helpers';

import type { Frontmatter, GroupedPages } from '@/features/docs/types';

type Props = {
  frontmatters: GroupedPages[keyof GroupedPages];
};

const LnbGroup = ({ frontmatters }: Props) => {
  const pathname = usePathname();

  const getFrontmatterLink = (item: Frontmatter) => {
    return `/docs/${item.slug.join('/')}`;
  };

  return (
    <List gap="0px" sx={wrapperStyle} aria-label="List of pages">
      {frontmatters.map((frontmatter) => {
        if (isFrontmatter(frontmatter)) {
          return (
            <LnbGroupItem
              key={frontmatter.slug.join('/')}
              href={`/docs/${frontmatter.slug.join('/')}`}
              isActive={getIsActiveGroup(pathname, frontmatter)}
              wrapperSx={{
                '& + [data-is-group="true"]': { marginTop: '32px' },
              }}
              depth="1"
            >
              {getFrontmatterTitle(frontmatter)}
            </LnbGroupItem>
          );
        }

        return Object.entries(frontmatter).map(([key, items], idx) => {
          return (
            <FlexBox
              flexDirection="column"
              key={key + idx}
              as="li"
              data-is-group="true"
            >
              <List
                key={key + idx}
                gap="0px"
                aria-label={getFrontmatterGroupKey(key)}
              >
                <Typography
                  variant="caption2"
                  weight="bold"
                  color="semantic.label.assistive"
                  sx={{
                    marginBottom: '8px',
                  }}
                >
                  {getFrontmatterGroupKey(key)}
                </Typography>

                {items.map((child, childIdx) => {
                  if (isFrontmatter(child)) {
                    if (child.isExternal) {
                      return (
                        <LnbGroupItem
                          key={child.slug.toString() + childIdx}
                          depth="2"
                          href={child.url}
                          isExternal
                        >
                          {child.title}
                        </LnbGroupItem>
                      );
                    }

                    return (
                      <LnbGroupItem
                        href={getFrontmatterLink(child)}
                        key={child.slug.toString() + childIdx}
                        isActive={getIsActive(pathname, child)}
                        depth="2"
                      >
                        {child.title}
                      </LnbGroupItem>
                    );
                  }
                })}
              </List>
            </FlexBox>
          );
        });
      })}
    </List>
  );
};

export default LnbGroup;
