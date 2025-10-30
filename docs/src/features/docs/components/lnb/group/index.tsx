import { List, ListCellContent, Typography } from '@wanteddev/wds';
import { useParams } from 'next/navigation';
import { IconLock } from '@wanteddev/wds-icon';

import { gettingStartedFrontmatter } from '@/features/docs/constants';

import { getFrontmatterLink, getIsActive, isFrontmatter } from '../helpers';

import { wrapperStyle } from './style';
import LnbGroupItem from './item';

import type { LNBFrontmatterType, SlugParams } from '../types';

type Props = {
  frontmatter: LNBFrontmatterType;
};

const LnbGroup = ({ frontmatter }: Props) => {
  const params = useParams<SlugParams>();

  const groupKey = frontmatter.key.replace(/ /g, '-').toLowerCase();

  return (
    <List gap="32px" sx={wrapperStyle}>
      {groupKey === gettingStartedFrontmatter.slug.join('/') ? (
        <LnbGroupItem
          href={`/docs/${groupKey}`}
          isActive={
            params.slug?.join('/') ===
            frontmatter.key.replace(/ /g, '-').toLowerCase()
          }
          depth="0"
        >
          {gettingStartedFrontmatter.title}
        </LnbGroupItem>
      ) : (
        <LnbGroupItem
          href={`/docs/${groupKey}`}
          isActive={
            params.slug?.join('/') ===
            frontmatter.key.replace(/ /g, '-').toLowerCase()
          }
          depth="0"
        >
          Overview
        </LnbGroupItem>
      )}

      {frontmatter.children
        .sort((a, b) => {
          if (isFrontmatter(a) && isFrontmatter(b)) {
            return a.title.localeCompare(b.title);
          }

          return (a as LNBFrontmatterType).key.localeCompare(
            (b as LNBFrontmatterType).key,
          );
        })
        .map((item, idx) => {
          if (isFrontmatter(item)) {
            return (
              <LnbGroupItem
                href={getFrontmatterLink(item)}
                key={item.title + idx}
                isActive={getIsActive(params, item)}
                depth="1"
              >
                {item.title}
              </LnbGroupItem>
            );
          }

          return (
            <List key={item.key + idx} gap="0px">
              <Typography
                variant="caption1"
                weight="bold"
                color="semantic.label.assistive"
                sx={{
                  marginBottom: '10px',
                }}
              >
                {item.key}
              </Typography>

              {item.children
                .sort((a, b) => {
                  if (isFrontmatter(a) && isFrontmatter(b)) {
                    return a.title.localeCompare(b.title);
                  }

                  return (a as LNBFrontmatterType).key.localeCompare(
                    (b as LNBFrontmatterType).key,
                  );
                })
                .map((child, childIdx) => {
                  if (isFrontmatter(child)) {
                    if (child.isPrivate) {
                      return (
                        <LnbGroupItem
                          key={child.slug.toString() + childIdx}
                          depth="2"
                          disabled
                          trailingContent={
                            <ListCellContent variant="icon">
                              <IconLock
                                sx={{ fontSize: '16px', margin: '4px 3px' }}
                              />
                            </ListCellContent>
                          }
                        >
                          {child.title}
                        </LnbGroupItem>
                      );
                    }

                    return (
                      <LnbGroupItem
                        href={getFrontmatterLink(child)}
                        key={child.slug.toString() + childIdx}
                        isActive={getIsActive(params, child)}
                        depth="2"
                      >
                        {child.title}
                      </LnbGroupItem>
                    );
                  }
                })}
            </List>
          );
        })}
    </List>
  );
};

export default LnbGroup;
