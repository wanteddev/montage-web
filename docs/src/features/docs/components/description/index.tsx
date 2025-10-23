'use client';
import {
  Box,
  Divider,
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
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { GNB_HEIGHT } from '@/features/layout/constants/constants';
import useThrottle from '@/hooks/use-throttle';
import { breakWordStyle } from '@/styles/text';

import { useMDXContext } from '../../context';
import useRouteScroll from '../../hooks/use-route-scroll';
import {
  getFrontmatterDescription,
  getFrontmatterImage,
  getFrontmatterTitle,
} from '../../helpers/mdx.client';

import {
  tabScrollStyle,
  tabStyle,
  thumbnailStyle,
  titleSectionWrapperStyle,
} from './style';

import type { SlugParams } from '../lnb/types';

const TAB_TITLE: { [key: string]: string } = {
  design: 'Design',
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
};

const DocsDescription = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();
  const tabRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState(false);

  const hasPlatformPage = useMemo(
    () =>
      /(web|ios|android|design)$/.test(
        params.slug?.at(params.slug.length - 1) ?? '',
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.slug?.toString()],
  );

  const isFoundationsPage = useMemo(
    () => params.slug?.at(0) === 'foundations' && params.slug.length > 1,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.slug?.toString()],
  );

  const [value, setValue] = useState(`/docs/${params.slug?.join('/')}`);

  const frontmatter = useMemo(() => {
    return allFrontmatter.find(
      (v) => v.slug.toString() === params.slug?.toString(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug?.toString(), allFrontmatter]);

  useEffect(() => {
    setValue(`/docs/${params.slug?.join('/')}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug?.toString()]);

  const handleScroll = useThrottle(() => {
    const top = tabRef.current?.getBoundingClientRect().top ?? GNB_HEIGHT + 1;

    setIsSticky(top <= GNB_HEIGHT);
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
  }, [setIsSticky, handleScroll, params.slug?.toString()]);

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
    if (!/(web|ios|android|design)$/.test(params.slug?.toString() ?? '')) {
      return [];
    }

    const pages = allFrontmatter.filter((v) =>
      v.slug
        .toString()
        .includes(
          params.slug?.toString().replace(/(web|ios|android|design)$/, '') ??
            '',
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
        };

        return (sortedObj[b.title] ?? 0) - (sortedObj[a.title] ?? 0);
      });
  }, [allFrontmatter, params.slug]);

  const description = useMemo(() => {
    if (!frontmatter) {
      return null;
    }

    return getFrontmatterDescription(frontmatter, allFrontmatter);
  }, [frontmatter, allFrontmatter]);

  const image = useMemo(() => {
    if (!frontmatter) {
      return null;
    }

    return getFrontmatterImage(frontmatter, allFrontmatter);
  }, [frontmatter, allFrontmatter]);

  if (!frontmatter) {
    return null;
  }

  return (
    <>
      <FlexBox flexDirection="column" gap="24px" sx={titleSectionWrapperStyle}>
        <Typography
          variant="display3"
          weight="bold"
          as="h1"
          data-algolia-page-title
          sx={breakWordStyle}
        >
          {getFrontmatterTitle(frontmatter)}
        </Typography>

        {Boolean(description) && (
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
            {description?.split('\\n').map((v) => (
              <Fragment key={v}>
                {v}
                <br />
              </Fragment>
            ))}
          </Typography>
        )}
      </FlexBox>
      {image && (
        <Box sx={thumbnailStyle}>
          <Box
            as={Image}
            src={image}
            width={760}
            height={326}
            alt={frontmatter.title}
            fetchPriority="high"
            priority
          />
        </Box>
      )}
      {hasPlatformPage ? (
        <>
          <Box role="presentation" ref={tabRef} sx={tabScrollStyle} />

          <Tab value={value} onValueChange={handleValueChange}>
            <TabList sx={tabStyle} size="large">
              {tabs.map((tab) => (
                <TabListItem
                  as={Link}
                  scroll={false}
                  prefetch
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
      ) : (
        !isFoundationsPage && (
          <Divider
            sx={{ margin: '55px 0px 88px' }}
            color="semantic.line.normal.alternative"
          />
        )
      )}
    </>
  );
};

export default DocsDescription;
