import { ChipAction, FlexBox, Typography } from '@wanteddev/wds';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';

import { useMDXContext } from '../../../context';

const TAB_TITLE: { [key: string]: string } = {
  guide: 'Design Guide',
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
  changelog: 'Changelog',
};

type Props = {
  content?: string;
};

const Description = ({ content }: Props) => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams();

  const tabs = useMemo(() => {
    if (
      !/(web|ios|android|guide|changelog)$/.test(params.slug?.toString() ?? '')
    ) {
      return [];
    }

    const pages = allFrontmatter.filter((frontmatter) =>
      frontmatter.slug
        .toString()
        .includes(
          params.slug
            ?.toString()
            .replace(/(web|ios|android|guide|changelog)$/, '') ?? '-1',
        ),
    );

    return pages.map((page) => {
      return {
        title: page.slug.at(page.slug.length - 1)!,
        isActive: page.slug.toString() === params.slug?.toString(),
        href: `/docs/${page.slug.join('/')}`,
      };
    });
  }, [allFrontmatter, params.slug]);

  return (
    <FlexBox
      flexDirection="column"
      sx={{ marginBottom: '16px', position: 'relative' }}
      sm={{
        flexDirection: 'row',
      }}
      gap="16px"
    >
      {Boolean(content) && (
        <Typography
          variant="body1"
          weight="regular"
          color="semantic.label.normal"
          sx={{ margin: 0, whiteSpace: 'pre-line' }}
          as="p"
        >
          {content}
        </Typography>
      )}
      <FlexBox
        flexDirection="row"
        gap="8px"
        sx={{ marginLeft: 'auto', marginTop: -8 }}
      >
        {tabs.map((tab) => (
          <ChipAction
            key={tab.title}
            size="large"
            variant={tab.isActive ? 'solid' : 'outlined'}
            active={tab.isActive}
            as={Link}
            href={tab.href}
          >
            {TAB_TITLE[tab.title]}
          </ChipAction>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default Description;
