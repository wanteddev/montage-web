import {
  Box,
  FlexBox,
  IconButton,
  Popover,
  PopoverTrigger,
} from '@wanteddev/wds';
import { IconCopy } from '@wanteddev/wds-icon';
import { capitalCase } from 'change-case';

import { breakWordStyle } from '@/styles/text';
import TokenPopover from '@/features/docs/components/custom-render/token-popover';

import {
  paletteColorStyle,
  paletteInfoTableStyle,
  paletteWrapperStyle,
  tokenItemStyle,
} from './style';
import { hexToRgbaSlash } from './helpers';
import { useCopyToClipboard, useElementPosition, useHexColor } from './hooks';

import type { CSSProperties, PropsWithChildren } from 'react';
import type { SxProp } from '@wanteddev/wds';

type PaletteProps = PropsWithChildren<{
  sx?: SxProp;
}>;

const Palette = ({ children, sx }: PaletteProps) => {
  return (
    <FlexBox
      flexWrap="wrap"
      rowGap="24px"
      data-role="palette-wrapper"
      sx={[paletteWrapperStyle, sx]}
    >
      {children}
    </FlexBox>
  );
};

type PaletteItemProps = {
  group: string;
  token: string;
  tokenPrefix: string;
  color: string;
  sx?: SxProp;
};

const PaletteItem = ({
  group,
  token,
  tokenPrefix,
  color,
  sx,
}: PaletteItemProps) => {
  const { hex } = useHexColor(color);
  const { ref, border, position } = useElementPosition();
  const { handleCopy } = useCopyToClipboard();

  const title = `${capitalCase(group)}/${capitalCase(token)}`;

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          as="button"
          type="button"
          ref={ref}
          sx={[paletteColorStyle, sx]}
          aria-label={`Show detail ${title}`}
          style={
            {
              '--background-position-x': position.x,
              '--background-position-y': position.y,
              '--background-color': `linear-gradient(${color}, ${color})`,
              '--border-left': border.left,
              '--border-right': border.right,
            } as CSSProperties
          }
        />
      </PopoverTrigger>

      <TokenPopover
        trailingContent={
          <IconButton
            aria-label="Copy"
            size={20}
            onClick={() => handleCopy(hex)}
            sx={{ paddingBlock: '2px' }}
          >
            <IconCopy />
          </IconButton>
        }
        title={title}
      >
        <Box as="table" sx={paletteInfoTableStyle}>
          <colgroup>
            <col width="48px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Hex</th>
              <td>{hex}</td>
            </tr>
            <tr>
              <th>RGBA</th>
              <td>{hexToRgbaSlash(hex)}</td>
            </tr>
            <tr>
              <th>Token</th>
              <td>
                <FlexBox gap="6px">
                  <Box
                    as="span"
                    sx={[
                      tokenItemStyle,
                      breakWordStyle,
                      {
                        backgroundColor: color,
                      },
                    ]}
                  />
                  {tokenPrefix}-{group}-{token}
                </FlexBox>
              </td>
            </tr>
          </tbody>
        </Box>
      </TokenPopover>
    </Popover>
  );
};

export { Palette, PaletteItem };
