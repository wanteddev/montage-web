'use client';
import {
  Box,
  FlexBox,
  Tab,
  TabList,
  TabListItem,
  Thumbnail,
  Typography,
} from '@wanteddev/wds';
import { useParams } from 'next/navigation';
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';

import { GnbContext } from '@/features/menu/components/gnb/contexts';
import { GNB_HEIGHTS } from '@/features/menu/components/gnb/constants';
import useThrottle from '@/hooks/use-throttle';

import { useMDXContext } from '../../context';

import { tabStyle, titleSectionWrapperStyle } from './style';

const TAB_TITLE: { [key: string]: string } = {
  guide: 'Design Guide',
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
  changelog: 'Changelog',
};

const DocsDescription = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<{ slug: Array<string> }>();
  const tabRef = useRef<HTMLDivElement>(null);

  const { setIsSticky, isSticky } = useContext(GnbContext);

  const [value, setValue] = useState(`/docs/${params.slug.join('/')}`);

  const frontmatter = useMemo(() => {
    return allFrontmatter.find(
      (v) => v.slug.toString() === params.slug.toString(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug.toString(), allFrontmatter]);

  const isTriggered = useRef(false);

  useEffect(() => {
    setValue(`/docs/${params.slug.join('/')}`);

    if (isSticky && isTriggered.current) {
      isTriggered.current = false;

      tabRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug.toString()]);

  const onScroll = useThrottle(() => {
    const top =
      tabRef.current?.getBoundingClientRect().top ?? GNB_HEIGHTS[960] + 1;
    const gnbHeight = window.matchMedia('(min-width: 960px)').matches
      ? GNB_HEIGHTS[960]
      : GNB_HEIGHTS[0];

    setIsSticky?.(top <= gnbHeight);
  }, 250);

  useEffect(() => {
    onScroll();

    document.addEventListener('scroll', onScroll);
    document.addEventListener('resize', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
      document.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsSticky, onScroll, params.slug.toString()]);

  const handleValueChange = useCallback((v: string) => {
    setValue(v);
    isTriggered.current = true;
  }, []);

  const tabs = useMemo(() => {
    if (!/(web|ios|android|guide|changelog)$/.test(params.slug.toString())) {
      return [];
    }

    const pages = allFrontmatter.filter((v) =>
      v.slug
        .toString()
        .includes(
          params.slug
            .toString()
            .replace(/(web|ios|android|guide|changelog)$/, ''),
        ),
    );

    return pages
      .map((page) => {
        return {
          title: page.slug.at(page.slug.length - 1)!,
          value: `/docs/${page.slug.join('/')}`,
        };
      })
      .sort((a, b) => {
        const sortedObj: { [key: string]: number } = {
          guide: 1,
          web: 0,
          changelog: -1,
        };

        return (sortedObj[b.title] ?? 0) - (sortedObj[a.title] ?? 0);
      });
  }, [allFrontmatter, params.slug]);

  if (!frontmatter) {
    return null;
  }

  return (
    <>
      <Typography
        variant="display2"
        display="block"
        weight="bold"
        as="h6"
        sx={{ marginBottom: 32 }}
      >
        {frontmatter.title}
      </Typography>

      <FlexBox flexDirection="column" sx={titleSectionWrapperStyle} gap="16px">
        {Boolean(frontmatter.description) && (
          <Typography
            variant="body1"
            weight="regular"
            color="semantic.label.normal"
            sx={{ margin: 0, whiteSpace: 'pre-line' }}
            as="p"
          >
            {frontmatter.description?.split('\\n').map((v) => (
              <Fragment key={v}>
                {v}
                <br />
              </Fragment>
            ))}
          </Typography>
        )}

        {Boolean(frontmatter.image) && (
          <Thumbnail
            width="100%"
            src={frontmatter.image!}
            ratio="2:1"
            radius
            border
            alt={`${frontmatter.title} Thumbnail`}
          />
        )}
      </FlexBox>

      <Box
        role="presentation"
        ref={tabRef}
        sx={{ scrollMarginTop: 'var(--gnb-height)' }}
      />

      <Tab value={value} onValueChange={handleValueChange}>
        <TabList sx={tabStyle} size="large">
          {tabs.map((tab) => (
            <TabListItem
              as={Link}
              scroll={false}
              href={tab.value}
              key={tab.title}
              value={tab.value}
            >
              {TAB_TITLE[tab.title]}
            </TabListItem>
          ))}
        </TabList>
      </Tab>
    </>
  );
};

export default DocsDescription;
