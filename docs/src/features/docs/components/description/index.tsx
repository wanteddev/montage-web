'use client';
import {
  Box,
  FlexBox,
  Tab,
  TabList,
  TabListItem,
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
import { GNB_HEIGHT } from '@/features/menu/components/gnb/constants';
import useThrottle from '@/hooks/use-throttle';

import { useMDXContext } from '../../context';
import useRouteScroll from '../../hooks/use-route-scroll';
import { SectionDivider } from '../mdx/section';

import { tabStyle, titleSectionWrapperStyle, wrapperStyle } from './style';

import type { SlugParams } from '../lnb/types';

const TAB_TITLE: { [key: string]: string } = {
  design: 'Design',
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
  changelog: 'Changelog',
};

const DocsDescription = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();
  const tabRef = useRef<HTMLDivElement>(null);

  const { setIsSticky, isSticky } = useContext(GnbContext);

  const isOverviewPage = useMemo(
    () => params.slug.toString() === ['overview', 'design'].toString(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.slug.toString()],
  );

  const [value, setValue] = useState(`/docs/${params.slug.join('/')}`);

  const frontmatter = useMemo(() => {
    return allFrontmatter.find(
      (v) => v.slug.toString() === params.slug.toString(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug.toString(), allFrontmatter]);

  useEffect(() => {
    setValue(`/docs/${params.slug.join('/')}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug.toString()]);

  const handleScroll = useThrottle(() => {
    const top = tabRef.current?.getBoundingClientRect().top ?? GNB_HEIGHT + 1;

    setIsSticky?.(top <= GNB_HEIGHT);
  }, 250);

  useEffect(() => {
    handleScroll();

    document.addEventListener('scroll', handleScroll);
    document.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('resize', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsSticky, handleScroll, params.slug.toString()]);

  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      if (isSticky) {
        tabRef.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    }, [isSticky]),
  );

  const handleValueChange = useCallback(
    (v: string) => {
      setValue(v);
      handleRouteChange();
    },
    [handleRouteChange],
  );

  const tabs = useMemo(() => {
    if (!/(web|ios|android|design|changelog)$/.test(params.slug.toString())) {
      return [];
    }

    const pages = allFrontmatter.filter((v) =>
      v.slug
        .toString()
        .includes(
          params.slug
            .toString()
            .replace(/(web|ios|android|design|changelog)$/, ''),
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
          design: 1,
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
      <FlexBox gap="40px" justifyContent="space-between" sx={wrapperStyle}>
        <FlexBox
          flexDirection="column"
          gap="32px"
          sx={titleSectionWrapperStyle}
        >
          <Typography
            variant="display2"
            display="block"
            weight="bold"
            as="h1"
            data-algolia-page-title
            sx={{
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
            }}
          >
            {frontmatter.title}
          </Typography>

          {Boolean(frontmatter.description) && (
            <Typography
              variant="body1"
              weight="regular"
              color="semantic.label.normal"
              sx={{
                margin: 0,
                maxWidth: '640px',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
              }}
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
        </FlexBox>
      </FlexBox>

      {isOverviewPage ? (
        <SectionDivider />
      ) : (
        <>
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
      )}
    </>
  );
};

export default DocsDescription;
