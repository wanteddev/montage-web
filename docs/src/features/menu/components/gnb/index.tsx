'use client';
import {
  Box,
  FlexBox,
  ListCellContent,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuTrigger,
  NoSsr,
  WithInteraction,
  useThemeControl,
} from '@wanteddev/wds';
import {
  IconDesktop,
  IconMoon,
  IconSearch,
  IconSun,
} from '@wanteddev/wds-icon';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegments } from 'next/navigation';
import { Typography } from '@wanteddev/wds';
import { useContext, useState } from 'react';

import Logo from '@/assets/logo';
import { layoutStyle } from '@/styles';

import { gnbActionsStyle, gnbItemWrapperStyle, gnbWrapperStyle } from './style';
import { GNB_MENUS } from './constants';
import { useSearch } from './hooks';
import { DocSearchModal } from './search-modal';
import { GnbContext } from './contexts';

const Gnb = () => {
  const { setTheme, themeOriginValue } = useThemeControl();

  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const { isSticky } = useContext(GnbContext);

  const segments = useSelectedLayoutSegments();
  const isDocsPage = segments.includes('docs');

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
        data-is-docs-page={isDocsPage}
        data-is-sticky={isSticky}
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
                <Typography
                  as={Link}
                  variant="label1"
                  weight={pathname.includes(active) ? 'bold' : 'regular'}
                  color="semantic.label.normal"
                  href={href}
                  key={i}
                  data-role="gnb-link"
                  aria-current={pathname.includes(active) ? 'page' : undefined}
                >
                  {label}
                </Typography>
              ))}
            </FlexBox>
          </FlexBox>

          <FlexBox gap="8px">
            <WithInteraction>
              <FlexBox
                aria-label="search"
                as="button"
                onClick={handleOpen}
                sx={gnbActionsStyle}
              >
                <IconSearch />
              </FlexBox>
            </WithInteraction>

            <Menu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              value={themeOriginValue}
              onValueChange={(value) => {
                setTheme(value?.toString() ?? 'system');
                setMenuOpen(false);
              }}
            >
              <MenuTrigger>
                <WithInteraction>
                  <FlexBox
                    as="button"
                    aria-label="Theme toggle"
                    sx={gnbActionsStyle}
                  >
                    <NoSsr fallback={<IconSun />}>
                      {themeOriginValue === 'system' && <IconDesktop />}

                      {themeOriginValue === 'dark' && <IconMoon />}

                      {themeOriginValue === 'light' && <IconSun />}
                    </NoSsr>
                  </FlexBox>
                </WithInteraction>
              </MenuTrigger>

              <MenuContent sx={{ width: 200 }} position="top-end">
                <MenuList>
                  <MenuItem
                    leadingContent={
                      <ListCellContent variant="icon">
                        <IconSun />
                      </ListCellContent>
                    }
                    value="light"
                  >
                    Light
                  </MenuItem>
                  <MenuItem
                    leadingContent={
                      <ListCellContent variant="icon">
                        <IconMoon />
                      </ListCellContent>
                    }
                    value="dark"
                  >
                    Dark
                  </MenuItem>
                  <MenuItem
                    leadingContent={
                      <ListCellContent variant="icon">
                        <IconDesktop />
                      </ListCellContent>
                    }
                    value="system"
                  >
                    System
                  </MenuItem>
                </MenuList>
              </MenuContent>
            </Menu>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default Gnb;
