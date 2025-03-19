import {
  FlexBox,
  Tab,
  TabList,
  TabListItem,
  Thumbnail,
  Typography,
} from '@wanteddev/wds';
import { useParams } from 'next/navigation';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import { GnbContext } from '@/features/menu/components/gnb/contexts';
import { GNB_HEIGHTS } from '@/features/menu/components/gnb/constants';
import useThrottle from '@/hooks/use-throttle';

import { useMDXContext } from '../../../context';

import { tabStyle, titleSectionWrapperStyle } from './style';

const TAB_TITLE: { [key: string]: string } = {
  guide: 'Design Guide',
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
  changelog: 'Changelog',
};

type Props = {
  content?: string;
  alt?: string;
  href?: string;
};

const Description = ({ alt, href, content }: Props) => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<{ slug: Array<string> }>();
  const router = useRouter();
  const tabRef = useRef<HTMLDivElement>(null);

  const { setIsSticky } = useContext(GnbContext);

  const [value, setValue] = useState(`/docs/${params.slug.join('/')}`);

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
  }, [setIsSticky, onScroll]);

  const handleValueChange = useCallback(
    (v: string) => {
      router.push(v);
      setValue(v);
    },
    [router],
  );

  const tabs = useMemo(() => {
    if (!/(web|ios|android|guide|changelog)$/.test(params.slug.toString())) {
      return [];
    }

    const pages = allFrontmatter.filter((frontmatter) =>
      frontmatter.slug
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

  return (
    <>
      <FlexBox flexDirection="column" sx={titleSectionWrapperStyle} gap="16px">
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

        {href && (
          <Thumbnail
            width="100%"
            src={href}
            ratio="2:1"
            radius
            border
            sx={{ background: 'red' }}
            alt={alt ?? 'Thumbnail'}
          />
        )}
      </FlexBox>
      <Tab value={value} onValueChange={handleValueChange}>
        <TabList sx={tabStyle} ref={tabRef}>
          {tabs.map((tab) => (
            <TabListItem key={tab.title} value={tab.value}>
              {TAB_TITLE[tab.title]}
            </TabListItem>
          ))}
        </TabList>
      </Tab>
    </>
  );
};

export default Description;
