import { addOpacity, css, respondMore, respondTo } from '@wanteddev/wds';

import { GNB_HEIGHT_DEFAULT, GNB_HEIGHT_MOBILE } from '../../constants';

import type { Theme } from '@wanteddev/wds';

export const navBarPaddingStyle = (theme: Theme) => css`
  height: ${GNB_HEIGHT_DEFAULT};

  ${respondTo(theme.breakpoint.md)} {
    height: ${GNB_HEIGHT_MOBILE};
  }
`;

export const navBarStyle = (theme: Theme) => css`
  width: 100%;
  position: fixed;
  top: 0;
  border-bottom: 1px solid ${theme.semantic.line.normal.neutral};
  z-index: 800;

  ${respondTo(theme.breakpoint.md)} {
    &[data-is-sticky='false'] {
      border-bottom: none;
    }
  }
`;

export const navBarBackgroundStyle = (theme: Theme) => css`
  position: absolute;
  z-index: -1;
  background: ${addOpacity(
    theme.semantic.background.elevated.normal,
    theme.opacity[88],
  )};
  backdrop-filter: saturate(150%) blur(32px);
  -webkit-backdrop-filter: saturate(150%) blur(32px);
  height: 100%;
  width: 100%;
`;

export const mainBarStyle = (theme: Theme) => css`
  margin: 0 auto;
  height: ${GNB_HEIGHT_DEFAULT};

  ${respondTo(theme.breakpoint.md)} {
    height: ${GNB_HEIGHT_MOBILE};
  }
`;

export const mainBarNavStyle = css`
  height: 100%;
`;

export const mainBarNavLogoStyle = css`
  max-width: calc(112px + 58px);
  min-width: calc(112px + 40px);
  width: 12.1428571429%;

  svg {
    display: flex;
  }
`;

export const mainNavStyle = css`
  height: 100%;

  ${respondTo('1100px')} {
    display: none;
  }
`;

export const mainNavLinkStyle = css`
  margin-right: 40px;
  flex-shrink: 0;

  &:last-child {
    margin-right: 0;
  }
`;

export const mainNavLinkItemStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;

  & > span {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      font-size: 20px;
    }
  }
`;

export const asideWrapperStyle = (theme: Theme) => css`
  margin-left: auto;

  ${respondTo(theme.breakpoint.md)} {
    margin-right: -8px;
  }
`;

export const signUpContainerStyle = (theme: Theme) => css`
  margin-left: 12px;
  margin-right: 8px;

  ${respondTo(theme.breakpoint.md)} {
    order: -1;
    margin-left: 0;
    margin-right: 12px;
  }
`;

export const signUpMobileStyle = (theme: Theme) => css`
  ${respondMore(theme.breakpoint.md)} {
    display: none;
  }
`;

export const signUpDesktopStyle = (theme: Theme) => css`
  ${respondTo(theme.breakpoint.md)} {
    display: none;
  }
`;

export const dashboardButtonWrapperStyle = (theme: Theme) => css`
  ${respondTo(theme.breakpoint.md)} {
    display: none;
  }
`;

export const menuButtonWrapperStyle = (theme: Theme) => css`
  margin: 0px 8px;
  display: none;

  ${respondTo(theme.breakpoint.md)} {
    display: flex;
  }
`;
