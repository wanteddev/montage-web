import {
  Box,
  FlexBox,
  Typography,
  getColorByToken,
  typographyStyle,
  useTheme,
} from '@wanteddev/wds';

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

                    <DashDivider />
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

                    <DashDivider />
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

                    <DashDivider />
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

const DashDivider = () => {
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="1"
      viewBox="0 0 25 1"
      fill="none"
    >
      <path
        d="M0.5 0.5H24.5"
        stroke={getColorByToken(theme, 'semantic.label.alternative')}
        strokeLinecap="round"
        strokeDasharray="1 3"
      />
    </svg>
  );
};
