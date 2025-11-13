import { List, ListCellContent, Typography } from '@wanteddev/wds';
import { usePathname } from 'next/navigation';
import { IconLock } from '@wanteddev/wds-icon';
import { useState } from 'react';

import {
  getFrontmatterGroupKey,
  getFrontmatterTitle,
} from '@/features/docs/helpers/mdx.client';
import { isFrontmatter } from '@/features/docs/helpers/pages';

import { wrapperStyle } from './style';
import LnbGroupItem from './item';
import { getIsActive, getIsActiveGroup } from './helpers';
import ForbiddenModal from './forbidden-modal';

import type { Frontmatter, GroupedPages } from '@/features/docs/types';

type Props = {
  frontmatters: GroupedPages[keyof GroupedPages];
};

const LnbGroup = ({ frontmatters }: Props) => {
  const pathname = usePathname();

  const [isForbiddenModalOpen, setIsForbiddenModalOpen] = useState(false);

  const getFrontmatterLink = (item: Frontmatter) => {
    return `/docs/${item.slug.join('/')}`;
  };

  return (
    <>
      <ForbiddenModal
        open={isForbiddenModalOpen}
        onOpenChange={setIsForbiddenModalOpen}
      />

      <List gap="0px" sx={wrapperStyle}>
        {frontmatters.map((frontmatter) => {
          if (isFrontmatter(frontmatter)) {
            return (
              <LnbGroupItem
                key={frontmatter.slug.join('/')}
                href={`/docs/${frontmatter.slug.join('/')}`}
                isActive={getIsActiveGroup(pathname, frontmatter)}
                sx={{
                  '& + ul': { marginTop: '32px' },
                }}
                depth="0"
              >
                {getFrontmatterTitle(frontmatter)}
              </LnbGroupItem>
            );
          }

          return Object.entries(frontmatter).map(([key, items], idx) => {
            return (
              <List key={key + idx} gap="0px">
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
                    if (child.isPrivate) {
                      return (
                        <LnbGroupItem
                          key={child.slug.toString() + childIdx}
                          depth="2"
                          trailingContent={
                            <ListCellContent variant="icon">
                              <IconLock
                                aria-hidden
                                sx={{ fontSize: '16px', margin: '4px 3px' }}
                              />
                            </ListCellContent>
                          }
                          onClick={() => setIsForbiddenModalOpen(true)}
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
            );
          });
        })}
      </List>
    </>
  );
};

export default LnbGroup;
