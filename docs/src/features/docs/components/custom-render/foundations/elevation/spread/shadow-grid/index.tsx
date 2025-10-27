import { Box, FlexBox, Typography, typographyStyle } from '@wanteddev/wds';

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
                        theme.semantic.elevation.shadow.spread[token.key],
                    }),
                  ]}
                />
                <span>{token.token}</span>
              </FlexBox>
            </TokenGridCell>
            <TokenGridCell sx={[tokenCellStyle, { verticalAlign: 'middle' }]}>
              <FlexBox
                as={Typography}
                variant="body1"
                weight="medium"
                color="semantic.label.strong"
                flexDirection="column"
                sx={
                  token.value.includes('\n')
                    ? { whiteSpace: 'pre' }
                    : { whiteSpace: 'break-spaces' }
                }
              >
                {token.value.split('\n').map((line, index) => (
                  <span key={index}>{line}</span>
                ))}
              </FlexBox>
            </TokenGridCell>
          </TokenGridRow>
        ))}
      </TokenGridBody>
    </TokenGrid>
  );
};

export default ShadowGrid;
