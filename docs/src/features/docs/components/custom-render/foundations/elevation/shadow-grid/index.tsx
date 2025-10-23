import {
  Box,
  FlexBox,
  Typography,
  getColorByToken,
  typographyStyle,
  useTheme,
} from '@wanteddev/wds';
import { useMemo } from 'react';

import {
  TokenGrid,
  TokenGridBody,
  TokenGridCell,
  TokenGridHead,
  TokenGridHeader,
  TokenGridRow,
} from '@/features/docs/components/custom-render/token-grid';

import { TOKEN_VALUES } from './constants';
import { shadowTokenStyle, tokenBodyStyle, tokenCellStyle } from './style';

const ShadowGrid = () => {
  return (
    <TokenGrid>
      <colgroup>
        <col width="auto" />
        <col width="auto" />
      </colgroup>
      <TokenGridHeader>
        <TokenGridRow>
          <TokenGridHead sx={typographyStyle('body1', 'bold')}>
            Token
          </TokenGridHead>
          <TokenGridHead sx={typographyStyle('body1', 'bold')}>
            Value
          </TokenGridHead>
        </TokenGridRow>
      </TokenGridHeader>
      <TokenGridBody sx={tokenBodyStyle}>
        {TOKEN_VALUES.map((token) => (
          <TokenGridRow key={token.token}>
            <TokenGridCell sx={tokenCellStyle}>
              <FlexBox gap="12px" alignItems="center">
                <Box
                  as="span"
                  sx={[
                    shadowTokenStyle,
                    (theme) => ({
                      boxShadow:
                        theme.semantic.elevation.shadow.normal[token.key],
                    }),
                  ]}
                />
                <span>{token.token}</span>
              </FlexBox>
            </TokenGridCell>
            <TokenGridCell sx={[tokenCellStyle, { verticalAlign: 'middle' }]}>
              <FlexBox flexDirection="column" gap="16px">
                <FlexBox gap="8px">
                  <FlexBox
                    gap="8px"
                    sx={{ width: '86px', height: 'fit-content' }}
                    alignItems="center"
                  >
                    <Typography
                      variant="body1"
                      weight="medium"
                      color="semantic.label.alternative"
                    >
                      Default
                    </Typography>

                    <DashDivider type="default" />
                  </FlexBox>

                  <FlexBox
                    as={Typography}
                    variant="body1"
                    weight="medium"
                    color="semantic.label.strong"
                    flexDirection="column"
                  >
                    {token.values.default.split('\n').map((line, index) => (
                      <span key={index}>{line}</span>
                    ))}
                  </FlexBox>
                </FlexBox>

                <FlexBox gap="8px">
                  <FlexBox
                    gap="8px"
                    sx={{ width: '86px', height: 'fit-content' }}
                    alignItems="center"
                  >
                    <Typography
                      variant="body1"
                      weight="medium"
                      color="semantic.label.alternative"
                    >
                      iOS
                    </Typography>

                    <DashDivider type="ios" />
                  </FlexBox>

                  <FlexBox
                    as={Typography}
                    variant="body1"
                    weight="medium"
                    color="semantic.label.strong"
                    flexDirection="column"
                  >
                    {token.values.ios.split('\n').map((line, index) => (
                      <span key={index}>{line}</span>
                    ))}
                  </FlexBox>
                </FlexBox>

                <FlexBox gap="8px">
                  <FlexBox
                    gap="8px"
                    sx={{ width: '86px', height: 'fit-content' }}
                    alignItems="center"
                  >
                    <Typography
                      variant="body1"
                      weight="medium"
                      color="semantic.label.alternative"
                    >
                      Android
                    </Typography>

                    <DashDivider type="android" />
                  </FlexBox>

                  <FlexBox
                    as={Typography}
                    variant="body1"
                    weight="medium"
                    color="semantic.label.strong"
                    flexDirection="column"
                  >
                    {token.values.android.split('\n').map((line, index) => (
                      <span key={index}>{line}</span>
                    ))}
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </TokenGridCell>
          </TokenGridRow>
        ))}
      </TokenGridBody>
    </TokenGrid>
  );
};

export default ShadowGrid;

type DashDividerProps = {
  type: 'default' | 'ios' | 'android';
};

const DashDivider = ({ type = 'default' }: DashDividerProps) => {
  const theme = useTheme();

  const { d, width } = useMemo(() => {
    switch (type) {
      case 'ios':
        return { d: 'M0.5 0.5H51.5', width: 25 };
      case 'android':
        return { d: 'M0.5 0.5H19.5', width: 20 };
      case 'default':
      default:
        return { d: 'M0.5 0.5H24.5', width: 52 };
    }
  }, [type]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height="1"
      viewBox={`0 0 ${width} 1`}
      fill="none"
    >
      <path
        d={d}
        stroke={getColorByToken(theme, 'semantic.label.alternative')}
        strokeLinecap="round"
        strokeDasharray="1 3"
      />
    </svg>
  );
};
