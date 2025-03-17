'use client';
import {
  Box,
  FlexBox,
  IconButton,
  NoSsr,
  useThemeControl,
} from '@wanteddev/wds';
import { IconMoon, IconSearch, IconSun } from '@wanteddev/wds-icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@wanteddev/wds';

import Logo from '@/assets/logo';
import { layoutStyle } from '@/styles';

import { gnbActionsStyle, gnbItemWrapperStyle, gnbWrapperStyle } from './style';
import { GNB_MENUS } from './constants';
import { useSearch } from './hooks';
import { DocSearchModal } from './search-modal';

const GNB = () => {
  const { theme: themeMode, setTheme } = useThemeControl();
  const pathname = usePathname();

  const { isOpen, handleOpen, handleOpenChange } = useSearch();

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
        justifyContent="center"
        as="header"
        sx={gnbWrapperStyle}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
          gap="32px"
          sx={layoutStyle}
        >
          <FlexBox
            alignItems="center"
            justifyContent="space-between"
            sx={gnbItemWrapperStyle}
            flex="1"
            gap="40px"
          >
            <FlexBox>
              <Box
                as={Link}
                href="/"
                sx={(theme) => ({ color: theme.semantic.label.normal })}
              >
                <Logo />
              </Box>
            </FlexBox>

            <FlexBox gap="40px" alignItems="center">
              {GNB_MENUS.map(({ label, href, active }, i) => (
                <Link
                  href={href}
                  key={i}
                  aria-current={pathname.includes(active) ? 'page' : undefined}
                >
                  <Typography
                    variant="label1"
                    weight="medium"
                    color="semantic.label.normal"
                  >
                    {label}
                  </Typography>
                </Link>
              ))}
            </FlexBox>
          </FlexBox>

          <FlexBox gap="8px">
            <FlexBox sx={gnbActionsStyle}>
              <IconButton
                size={24}
                type="button"
                onClick={handleOpen}
                aria-label="search"
              >
                <IconSearch />
              </IconButton>
            </FlexBox>

            <FlexBox sx={gnbActionsStyle}>
              <IconButton
                size={24}
                type="button"
                aria-label="Theme toggle"
                onClick={() =>
                  setTheme(themeMode === 'dark' ? 'light' : 'dark')
                }
              >
                <NoSsr fallback={<IconSun />}>
                  {themeMode === 'dark' ? <IconMoon /> : <IconSun />}
                </NoSsr>
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default GNB;
