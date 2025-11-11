'use client';
import { FlexBox, Typography, addOpacity, useTheme } from '@wanteddev/wds';
import { capitalCase } from 'change-case';

import { Heading2 } from '@/features/docs/components/mdx/section/layout';

import { Palette, PaletteItem } from '../palette';

import { paletteTitleStyle } from './style';
import { isBasicColor } from './helpers';

const FoundationsColorsAtomic = () => {
  const theme = useTheme();

  const renderPalette = (group: keyof typeof theme.atomic) => {
    return (
      <>
        <Heading2 content={capitalCase(group)} sx={paletteTitleStyle} />

        <Palette>
          {Object.keys(theme.atomic[group])
            .sort((a, b) => Number(b) - Number(a))
            .map((color) => (
              <FlexBox flexDirection="column" gap="8px" key={color}>
                <PaletteItem
                  group={group}
                  token={color}
                  tokenPrefix="color-atomic"
                  color={
                    theme.atomic[group][
                      color as keyof (typeof theme.atomic)[typeof group]
                    ]
                  }
                />

                <Typography
                  variant="caption2"
                  weight="bold"
                  color={
                    isBasicColor(color)
                      ? 'semantic.label.normal'
                      : 'semantic.label.alternative'
                  }
                  as="p"
                  align="center"
                >
                  {color}
                </Typography>
              </FlexBox>
            ))}
        </Palette>
      </>
    );
  };

  return (
    <>
      {renderPalette('common')}

      {renderPalette('neutral')}

      {renderPalette('coolNeutral')}

      {renderPalette('blue')}

      {renderPalette('red')}

      {renderPalette('green')}

      {renderPalette('orange')}

      {renderPalette('redOrange')}

      {renderPalette('lime')}

      {renderPalette('cyan')}

      {renderPalette('lightBlue')}

      {renderPalette('violet')}

      {renderPalette('purple')}

      {renderPalette('pink')}

      <Heading2 content={capitalCase('opacity')} sx={paletteTitleStyle} />

      <Palette>
        {Object.keys(theme.opacity)
          .sort((a, b) => Number(a) - Number(b))
          .map((color) => (
            <FlexBox flexDirection="column" gap="8px" key={color}>
              <PaletteItem
                group="color-opacity"
                token={color}
                tokenPrefix="atomic"
                color={addOpacity(
                  theme.semantic.label.normal,
                  theme.opacity[color as unknown as keyof typeof theme.opacity],
                )}
              />

              <Typography
                variant="caption2"
                weight="bold"
                color="semantic.label.normal"
                as="p"
                align="center"
              >
                {color}
              </Typography>
            </FlexBox>
          ))}
      </Palette>
    </>
  );
};

export default FoundationsColorsAtomic;
