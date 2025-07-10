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
  IconMenu,
  IconMoon,
  IconSearch,
  IconSun,
} from '@wanteddev/wds-icon';
import Link from 'next/link';
import { useState } from 'react';

import Logo from '@/assets/logo';
import { useLnbContext } from '@/features/docs/components/lnb/contexts';
import IconFlexAlignLeft from '@/assets/icon-flex-align-left';

import {
  gnbActionsStyle,
  gnbHideActionStyle,
  gnbMenuStyle,
  gnbWrapperStyle,
  menuItemStyle,
} from './style';
import { useSearch } from './hooks';
import { DocSearchModal } from './search-modal';

import type { CSSProperties } from 'react';

const Gnb = () => {
  const { setTheme, themeOriginValue } = useThemeControl();

  const lnbContext = useLnbContext();

  const [menuOpen, setMenuOpen] = useState(false);

  const { isOpen, handleOpen, handleOpenChange } = useSearch();

  // const { ref, translateY, handleFocusCapture, handleBlurCapture } =
  //   useFloatingGnb();

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
        // ref={ref}
        // onFocusCapture={handleFocusCapture}
        // onBlurCapture={handleBlurCapture}
        suppressHydrationWarning
        alignContent="center"
        as="header"
        sx={[gnbWrapperStyle]}
        style={
          {
            // '--gnb-translate-y': `${translateY}px`,
          } as CSSProperties
        }
      >
        <FlexBox
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          gap="32px"
        >
          <FlexBox alignItems="center" gap="24px">
            <Box
              as={Link}
              href="/"
              sx={(theme) => ({ color: theme.semantic.label.normal })}
            >
              <Logo />
            </Box>

            <WithInteraction>
              <FlexBox
                aria-label="Toggle left navigation bar"
                as="button"
                onClick={() => lnbContext.setHide(!lnbContext.hide)}
                sx={[gnbActionsStyle, gnbHideActionStyle]}
              >
                {lnbContext.hide ? (
                  <IconFlexAlignLeft sx={{ transform: 'rotate(180deg)' }} />
                ) : (
                  <IconFlexAlignLeft />
                )}
              </FlexBox>
            </WithInteraction>
          </FlexBox>

          <FlexBox gap="4px" alignItems="center">
            <WithInteraction>
              <FlexBox
                aria-label="Search"
                as="button"
                role="search"
                onClick={handleOpen}
                sx={[gnbActionsStyle, { fontSize: 20, padding: 9 }]}
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

              <MenuContent
                sx={{ width: 200, borderRadius: 8 }}
                position="top-end"
                offset={4}
              >
                <MenuList sx={{ paddingBlock: 4 }}>
                  <MenuItem
                    verticalPadding="small"
                    sx={menuItemStyle}
                    leadingContent={
                      <ListCellContent variant="icon">
                        <IconSun data-role="menu-item-icon" />
                      </ListCellContent>
                    }
                    textProps={{
                      variant: 'label1',
                      weight: 'medium',
                    }}
                    value="light"
                  >
                    Light
                  </MenuItem>
                  <MenuItem
                    verticalPadding="small"
                    sx={menuItemStyle}
                    leadingContent={
                      <ListCellContent variant="icon">
                        <IconMoon data-role="menu-item-icon" />
                      </ListCellContent>
                    }
                    textProps={{
                      variant: 'label1',
                      weight: 'medium',
                    }}
                    value="dark"
                  >
                    Dark
                  </MenuItem>
                  <MenuItem
                    verticalPadding="small"
                    sx={menuItemStyle}
                    leadingContent={
                      <ListCellContent variant="icon">
                        <IconDesktop data-role="menu-item-icon" />
                      </ListCellContent>
                    }
                    textProps={{
                      variant: 'label1',
                      weight: 'medium',
                    }}
                    value="system"
                  >
                    Match browser
                  </MenuItem>
                </MenuList>
              </MenuContent>
            </Menu>

            <WithInteraction>
              <FlexBox
                aria-label="menu"
                as="button"
                onClick={() => lnbContext.setOpen(!lnbContext.open)}
                sx={[gnbActionsStyle, gnbMenuStyle]}
              >
                <IconMenu />
              </FlexBox>
            </WithInteraction>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default Gnb;
