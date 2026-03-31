import {
  Box,
  ContentBadge,
  FlexBox,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
  WithInteraction,
} from '@wanteddev/wds';
import * as Icons from '@wanteddev/wds-icon';
import { useCallback } from 'react';
import { camelCase } from 'change-case';

import { breakWordStyle } from '@/styles/text';

import { getKeywords } from '../helpers';

import {
  iconDetailWrapperStyle,
  iconGridStyle,
  iconItemStyle,
  iconPopoverWrapperStyle,
} from './style';

import type { MouseEvent } from 'react';

type IconItem = {
  name: string;
  description: string;
};

type Props = {
  icons: Array<IconItem>;
};

const Collections = ({ icons }: Props) => {
  const createSvg = useCallback((target: HTMLElement) => {
    const svgElement = target
      .closest('[data-role="icon-detail-popover"]')
      ?.querySelector('[data-role="icon-component-for-download"]');

    if (!svgElement) return;

    const cloned = svgElement.cloneNode(true) as SVGSVGElement;
    cloned.removeAttribute('style');
    cloned.removeAttribute('class');

    if (!cloned.getAttribute('xmlns')) {
      cloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    const svgString = new XMLSerializer().serializeToString(cloned);

    return svgString.replaceAll('currentColor', '#171719');
  }, []);

  const handleDownloadSvg = useCallback(
    (name: string) => (e: MouseEvent) => {
      const svgString = createSvg(e.target as HTMLElement);

      if (!svgString) return;

      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${camelCase(name.replace('Icon', ''))}.svg`;
      a.click();

      URL.revokeObjectURL(url);
    },
    [createSvg],
  );

  if (icons.length === 0) return null;

  return (
    <>
      <Box sx={iconGridStyle}>
        {icons.map((icon) => {
          const IconComponent = Icons[icon.name as keyof typeof Icons];

          return (
            <Popover key={icon.name}>
              <PopoverTrigger>
                <WithInteraction variant="light">
                  <FlexBox
                    flexDirection="column"
                    alignItems="center"
                    gap="12px"
                    as="button"
                    type="button"
                    aria-label={`Show detail ${icon.name}`}
                    sx={iconItemStyle}
                  >
                    <IconComponent aria-hidden />
                  </FlexBox>
                </WithInteraction>
              </PopoverTrigger>

              <PopoverContent
                variant="custom"
                sx={{
                  padding: '20px 24px 24px',
                }}
                data-role="icon-detail-popover"
                wrapperProps={{ sx: iconPopoverWrapperStyle }}
              >
                <FlexBox flexDirection="column" gap="16px" flex="1">
                  <FlexBox gap="12px" justifyContent="space-between">
                    <Typography
                      variant="headline2"
                      weight="bold"
                      color="semantic.label.normal"
                      sx={breakWordStyle}
                    >
                      {camelCase(icon.name.replace('Icon', ''))}
                    </Typography>

                    <IconButton
                      aria-label={`Download ${icon.name} svg`}
                      size={20}
                      onClick={handleDownloadSvg(icon.name)}
                    >
                      <Icons.IconDownload aria-hidden />
                    </IconButton>
                  </FlexBox>

                  <FlexBox sx={iconDetailWrapperStyle}>
                    <IconComponent
                      data-role="icon-component-for-download"
                      aria-hidden
                    />
                  </FlexBox>

                  {getKeywords(icon.description).length > 0 && (
                    <FlexBox gap="12px" flexDirection="column">
                      <Typography
                        color="semantic.label.neutral"
                        variant="label1"
                        weight="medium"
                      >
                        Keyword
                      </Typography>

                      <FlexBox flexWrap="wrap" gap="6px">
                        {getKeywords(icon.description).map((keyword, i) => (
                          <ContentBadge
                            color="neutral"
                            size="xsmall"
                            variant="solid"
                            key={i}
                          >
                            {keyword}
                          </ContentBadge>
                        ))}
                      </FlexBox>
                    </FlexBox>
                  )}
                </FlexBox>
              </PopoverContent>
            </Popover>
          );
        })}
      </Box>
    </>
  );
};

export default Collections;
