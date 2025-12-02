'use client';
import {
  Box,
  FlexBox,
  NoSsr,
  Typography,
  WithInteraction,
  useThemeControl,
} from '@wanteddev/wds';
import { IconMenu, IconMoon, IconSearch, IconSun } from '@wanteddev/wds-icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

import Logo from '@/assets/logo';
import { useLnbContext } from '@/features/docs/components/lnb/contexts';
import useRouteScroll from '@/features/docs/hooks/use-route-scroll';

import {
  gnbActionsStyle,
  gnbContainerStyle,
  gnbMenuStyle,
  gnbNavigationLinkStyle,
  gnbNavigationLinkWrapperStyle,
  gnbWrapperStyle,
} from './style';
import { useSearch } from './hooks';
import { DocSearchModal } from './search-modal';
import { GNB_NAVIGATION_LINKS } from './constants';

const Gnb = () => {
  const { setTheme, theme: currentTheme } = useThemeControl();
  const pathname = usePathname();
  const [, ...currentSlug] = pathname.split('/').filter(Boolean);

  const lnbContext = useLnbContext();

  const { isOpen, handleOpen, handleOpenChange } = useSearch();

  const { handleRouteChange } = useRouteScroll(
    useCallback(() => {
      window.scrollTo(0, 0);
    }, []),
  );

  const handleThemeChange = useCallback(() => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }, [currentTheme, setTheme]);

  return (
    <>
      {isOpen && (
        <DocSearchModal
          open={isOpen}
          onOpenChange={handleOpenChange}
          appId={process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION!}
          apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!}
        />
      )}

      <FlexBox
        suppressHydrationWarning
        alignContent="center"
        as="header"
        sx={gnbWrapperStyle}
      >
        <FlexBox
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          gap="32px"
          sx={gnbContainerStyle}
        >
          <Box
            as={Link}
            href="/"
            aria-label="Go to home"
            aria-current={pathname === '/' ? 'page' : undefined}
            sx={(theme) => ({ color: theme.semantic.label.normal })}
          >
            <Logo />
          </Box>

          <FlexBox alignItems="center" gap="72px">
            <FlexBox
              gap="20px"
              alignItems="center"
              sx={gnbNavigationLinkWrapperStyle}
              aria-label="Quick Navigation Links"
              as="nav"
              data-algolia-lvl0-scope
            >
              {GNB_NAVIGATION_LINKS.map((link) => (
                <Typography
                  as={Link}
                  href={link.href}
                  key={link.href}
                  variant="body2"
                  weight="bold"
                  onClick={handleRouteChange}
                  aria-current={
                    currentSlug.at(0) === link.slug ? 'page' : undefined
                  }
                  color="semantic.label.alternative"
                  data-role="gnb-navigation-link"
                  sx={gnbNavigationLinkStyle}
                >
                  {link.label}
                </Typography>
              ))}
            </FlexBox>

            <FlexBox gap="8px" alignItems="center">
              <FlexBox gap="20px" alignItems="center">
                <WithInteraction>
                  <FlexBox
                    aria-label="search"
                    as="button"
                    aria-pressed={isOpen}
                    onClick={handleOpen}
                    sx={gnbActionsStyle}
                  >
                    <IconSearch />
                  </FlexBox>
                </WithInteraction>

                <WithInteraction>
                  <FlexBox
                    aria-label="toggle theme"
                    as="button"
                    onClick={handleThemeChange}
                    sx={gnbActionsStyle}
                  >
                    <NoSsr fallback={<IconSun />}>
                      {currentTheme === 'light' ? <IconSun /> : <IconMoon />}
                    </NoSsr>
                  </FlexBox>
                </WithInteraction>

                <WithInteraction>
                  <FlexBox
                    aria-label="menu"
                    as="button"
                    aria-pressed={lnbContext.open}
                    onClick={() => lnbContext.setOpen(!lnbContext.open)}
                    sx={[gnbActionsStyle, gnbMenuStyle]}
                  >
                    <IconMenu />
                  </FlexBox>
                </WithInteraction>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default Gnb;
