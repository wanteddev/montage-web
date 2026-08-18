import {
  Box,
  Button,
  FlexBox,
  IconButton,
  NoSsr,
  Tooltip,
  TooltipContent,
  TooltipGroup,
  TooltipTrigger,
  Typography,
  useThemeControl,
} from '@montage-ui/core';
import {
  IconCopy,
  IconImage,
  IconLink,
  IconMoon,
  IconSun,
} from '@montage-ui/icon';
import Link from 'next/link';
import { useCallback } from 'react';

import Logo from '@/assets/logo';

import { actionsStyle, homeLinkStyle, titleStyle, toolbarStyle } from './style';

import type { Dispatch, SetStateAction } from 'react';

type Props = {
  isTransparent: boolean;
  onIsTransparentChange: Dispatch<SetStateAction<boolean>>;
  onShare: () => void;
  onCopy: () => void;
};

const Toolbar = ({
  isTransparent,
  onIsTransparentChange,
  onShare,
  onCopy,
}: Props) => {
  const { theme: currentTheme, setTheme } = useThemeControl();

  const handleThemeChange = useCallback(() => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }, [currentTheme, setTheme]);

  return (
    <FlexBox
      as="header"
      alignItems="center"
      justifyContent="space-between"
      gap="16px"
      data-role="playground-toolbar"
      sx={toolbarStyle}
    >
      <FlexBox alignItems="center" gap="12px">
        <Box as={Link} href="/" aria-label="Go to home" sx={homeLinkStyle}>
          <Logo />
        </Box>

        <Typography
          variant="body2"
          weight="bold"
          color="semantic.foreground.neutral.tertiary"
          sx={titleStyle}
        >
          Playground
        </Typography>
      </FlexBox>

      <FlexBox alignItems="center" gap="8px" sx={actionsStyle}>
        <TooltipGroup>
          <Tooltip>
            <TooltipTrigger>
              <IconButton
                size={32}
                aria-pressed={isTransparent}
                aria-label={
                  isTransparent ? '배경 투명 해제' : '배경 투명하게 보기'
                }
                onClick={() => onIsTransparentChange((prev) => !prev)}
              >
                <IconImage />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent size="small">배경 전환</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <IconButton
                size={32}
                aria-label="테마 전환"
                onClick={handleThemeChange}
              >
                <NoSsr fallback={<IconSun />}>
                  {currentTheme === 'light' ? <IconSun /> : <IconMoon />}
                </NoSsr>
              </IconButton>
            </TooltipTrigger>
            <TooltipContent size="small">테마 전환</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <IconButton size={32} aria-label="코드 복사" onClick={onCopy}>
                <IconCopy />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent size="small">코드 복사</TooltipContent>
          </Tooltip>
        </TooltipGroup>

        <Button size="small" leadingContent={<IconLink />} onClick={onShare}>
          공유하기
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default Toolbar;
