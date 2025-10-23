import { List, Typography } from '@wanteddev/wds';
import { useParams } from 'next/navigation';

import { getFrontmatterLink, getIsActive, isFrontmatter } from '../helpers';

import { wrapperStyle } from './style';
import LnbGroupItem from './item';

import type { LNBFrontmatterType, SlugParams } from '../types';

type Props = {
  frontmatter: LNBFrontmatterType;
};

const LnbGroup = ({ frontmatter }: Props) => {
  const params = useParams<SlugParams>();

  return (
    <List gap="32px" sx={wrapperStyle}>
      <LnbGroupItem
        href={`/docs/${frontmatter.key.replace(/ /g, '-').toLowerCase()}`}
        isActive={
          params.slug?.join('/') ===
          frontmatter.key.replace(/ /g, '-').toLowerCase()
        }
        depth="0"
      >
        Overview
      </LnbGroupItem>

      {frontmatter.children.map((item, idx) => {
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
              variant="caption2"
              weight="bold"
              color="semantic.label.assistive"
              sx={{
                marginBottom: '10px',
              }}
            >
              {item.key}
            </Typography>

            {item.children.map((child, childIdx) => {
              if (isFrontmatter(child)) {
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
