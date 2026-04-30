import {
  Box,
  Button,
  FlexBox,
  IconButton,
  Typography,
  containerStyle,
} from '@wanteddev/wds';
import { forwardRef } from 'react';
import { LogoWanted } from '@wanteddev/wds-brand';
import { IconListCategory, IconMenu, IconSearch } from '@wanteddev/wds-icon';

import {
  asideWrapperStyle,
  dashboardButtonWrapperStyle,
  mainBarNavLogoStyle,
  mainBarNavStyle,
  mainBarStyle,
  mainNavLinkItemStyle,
  mainNavLinkStyle,
  mainNavStyle,
  menuButtonWrapperStyle,
  navBarBackgroundStyle,
  navBarPaddingStyle,
  navBarStyle,
  signUpContainerStyle,
  signUpDesktopStyle,
  signUpMobileStyle,
} from './style';
import { useIsNavSticky } from './hooks';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';

/**
 * @description A presentational top navigation bar that renders UI only and provides no interactive behavior
 */
const NavBar = forwardRef<HTMLDivElement, DefaultComponentProps<{}, 'div'>>(
  (props, ref) => {
    const isSticky = useIsNavSticky();

    return (
      <>
        <Box
          ref={ref}
          data-is-sticky={isSticky}
          {...props}
          sx={[navBarStyle, props.sx]}
        >
          <Box sx={navBarBackgroundStyle} />

          <Box sx={[containerStyle(true), mainBarStyle]} role="presentation">
            <FlexBox as="nav" sx={mainBarNavStyle} alignItems="center">
              <Box sx={mainBarNavLogoStyle}>
                <LogoWanted />
              </Box>

              <FlexBox as="ul" sx={mainNavStyle} alignItems="stretch">
                <Box as="li" sx={mainNavLinkStyle}>
                  <Typography
                    variant="body2"
                    weight="bold"
                    color="semantic.label.normal"
                    sx={mainNavLinkItemStyle}
                  >
                    <span>
                      <IconListCategory data-role="category-icon" />
                      채용
                    </span>
                  </Typography>
                </Box>
                <Box as="li" sx={mainNavLinkStyle}>
                  <Typography
                    variant="body2"
                    weight="bold"
                    color="semantic.label.normal"
                    sx={mainNavLinkItemStyle}
                  >
                    <span>이력서</span>
                  </Typography>
                </Box>
                <Box as="li" sx={mainNavLinkStyle}>
                  <Typography
                    variant="body2"
                    weight="bold"
                    color="semantic.label.normal"
                    sx={mainNavLinkItemStyle}
                  >
                    <span>교육•이벤트</span>
                  </Typography>
                </Box>
                <Box as="li" sx={mainNavLinkStyle}>
                  <Typography
                    variant="body2"
                    weight="bold"
                    color="semantic.label.normal"
                    sx={mainNavLinkItemStyle}
                  >
                    <span>콘텐츠</span>
                  </Typography>
                </Box>
                <Box as="li" sx={mainNavLinkStyle}>
                  <Typography
                    variant="body2"
                    weight="bold"
                    color="semantic.label.normal"
                    sx={mainNavLinkItemStyle}
                  >
                    <span>소셜</span>
                  </Typography>
                </Box>
                <Box as="li" sx={mainNavLinkStyle}>
                  <Typography
                    variant="body2"
                    weight="bold"
                    color="semantic.label.normal"
                    sx={mainNavLinkItemStyle}
                  >
                    <span>프리랜서</span>
                  </Typography>
                </Box>
                <Box as="li" sx={mainNavLinkStyle}>
                  <Typography
                    variant="body2"
                    weight="bold"
                    color="semantic.label.normal"
                    sx={mainNavLinkItemStyle}
                  >
                    <span>더보기</span>
                  </Typography>
                </Box>
              </FlexBox>

              <Box as="aside" sx={asideWrapperStyle}>
                <FlexBox
                  as="ul"
                  alignItems="center"
                  sx={{ '& > li': { flexShrink: 0 } }}
                >
                  <li>
                    <IconButton
                      type="button"
                      size={24}
                      sx={{ margin: '0px 8px' }}
                      aria-label={'검색'}
                    >
                      <IconSearch />
                    </IconButton>
                  </li>
                  <Box as="li" sx={signUpContainerStyle}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      type="button"
                      sx={signUpMobileStyle}
                    >
                      회원가입
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      type="button"
                      sx={signUpDesktopStyle}
                    >
                      회원가입/로그인
                    </Button>
                  </Box>
                  <Box as="li" sx={dashboardButtonWrapperStyle}>
                    <Button
                      type="button"
                      variant="outlined"
                      size="small"
                      color="assistive"
                    >
                      기업 서비스
                    </Button>
                  </Box>
                  <Box as="li" sx={menuButtonWrapperStyle}>
                    <IconButton size={24} type="button" aria-label="더보기">
                      <IconMenu />
                    </IconButton>
                  </Box>
                </FlexBox>
              </Box>
            </FlexBox>
          </Box>
        </Box>

        <Box role="presentation" sx={navBarPaddingStyle} />
      </>
    );
  },
);

NavBar.displayName = 'NavBar';

export { NavBar };
