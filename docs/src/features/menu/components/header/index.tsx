'use client';
import { useEffect, useState } from 'react';
import {
  FlexBox,
  IconButton,
  NoSsr,
  RegionConfig,
  Typography,
  useSize,
  useThemeControl,
} from '@wanteddev/wds';
import { IconMenu, IconSymbol } from '@wanteddev/wds-icon';
import Link from 'next/link';

import { useMobileMenuContext } from '../../context';

import { headerStyle, headerWrapperStyle, menuToggleStyle } from './style';

const Header = () => {
  const { theme, setTheme } = useThemeControl();
  const mobileMenu = useMobileMenuContext();

  const [node, setNode] = useState<HTMLElement | null>(null);
  const { height } = useSize(node) || { height: 0 };

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--header-height',
      height + 'px',
    );
  }, [height]);

  return (
    <>
      <RegionConfig viewportTop="var(--header-height)" />

      <FlexBox
        suppressHydrationWarning
        ref={setNode}
        justifyContent="center"
        as="header"
        css={headerWrapperStyle}
      >
        <FlexBox
          alignItems="center"
          justifyContent="space-between"
          css={headerStyle}
        >
          <FlexBox gap="8px" alignItems="center">
            <IconSymbol />
            <Typography
              variant="headline2"
              sm={{ variant: 'headline1' }}
              weight="bold"
              color="palette.label.strong"
            >
              WDS
            </Typography>
          </FlexBox>

          <FlexBox gap="24px">
            <IconButton
              size={18}
              sm={{ size: 20 }}
              as={Link}
              href="https://github.com/wanteddev/wds"
              target="_blank"
            >
              <IconGithub />
            </IconButton>

            <NoSsr>
              <IconButton
                size={18}
                sm={{ size: 20 }}
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <IconDark /> : <IconLight />}
              </IconButton>
            </NoSsr>

            <IconButton
              type="button"
              size={18}
              sm={{ size: 20 }}
              data-state={mobileMenu.open ? 'open' : 'closed'}
              onClick={() => mobileMenu.setOpen((open) => !open)}
              css={menuToggleStyle}
            >
              <IconMenu width="16" height="16" />
            </IconButton>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default Header;

const IconDark = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
    </svg>
  );
};

const IconLight = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
    </svg>
  );
};

const IconGithub = () => {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
