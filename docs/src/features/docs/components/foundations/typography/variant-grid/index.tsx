import {
  TokenGrid,
  TokenGridBody,
  TokenGridCell,
  TokenGridHead,
  TokenGridHeader,
  TokenGridRow,
} from '@/features/docs/components/custom-render/token-grid';

const VariantGrid = () => {
  return (
    <TokenGrid sx={{ marginBottom: '62px' }}>
      <colgroup>
        <col width="25%" />
        <col width="25%" />
        <col width="25%" />
        <col width="25%" />
      </colgroup>
      <TokenGridHeader>
        <TokenGridRow>
          <TokenGridHead>명칭</TokenGridHead>
          <TokenGridHead>크기</TokenGridHead>
          <TokenGridHead>행간</TokenGridHead>
          <TokenGridHead>자간</TokenGridHead>
        </TokenGridRow>
      </TokenGridHeader>
      <TokenGridBody>
        <TokenGridRow>
          <TokenGridCell>Display 1</TokenGridCell>
          <TokenGridCell>56px</TokenGridCell>
          <TokenGridCell>72px (1.286)</TokenGridCell>
          <TokenGridCell>-0.0319em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Display 2</TokenGridCell>
          <TokenGridCell>40px</TokenGridCell>
          <TokenGridCell>52px (1.3)</TokenGridCell>
          <TokenGridCell>-0.0282em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Display 3</TokenGridCell>
          <TokenGridCell>36px</TokenGridCell>
          <TokenGridCell>48px (1.334)</TokenGridCell>
          <TokenGridCell>-0.027em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Title 1</TokenGridCell>
          <TokenGridCell>32px</TokenGridCell>
          <TokenGridCell>44px (1.375)</TokenGridCell>
          <TokenGridCell>-0.0253em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Title 2</TokenGridCell>
          <TokenGridCell>28px</TokenGridCell>
          <TokenGridCell>38px (1.358)</TokenGridCell>
          <TokenGridCell>-0.0236em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Title 3</TokenGridCell>
          <TokenGridCell>24px</TokenGridCell>
          <TokenGridCell>32px (1.334)</TokenGridCell>
          <TokenGridCell>-0.023em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Heading 1</TokenGridCell>
          <TokenGridCell>22px</TokenGridCell>
          <TokenGridCell>30px (1.364)</TokenGridCell>
          <TokenGridCell>-0.0194em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Heading 2</TokenGridCell>
          <TokenGridCell>20px</TokenGridCell>
          <TokenGridCell>28px (1.4)</TokenGridCell>
          <TokenGridCell>-0.012em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Headline 1</TokenGridCell>
          <TokenGridCell>18px</TokenGridCell>
          <TokenGridCell>26px (1.444)</TokenGridCell>
          <TokenGridCell>-0.002em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Headline 2</TokenGridCell>
          <TokenGridCell>17px</TokenGridCell>
          <TokenGridCell>26px (1.412)</TokenGridCell>
          <TokenGridCell>0em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Body 1/Normal</TokenGridCell>
          <TokenGridCell>16px</TokenGridCell>
          <TokenGridCell>24px (1.5)</TokenGridCell>
          <TokenGridCell>0.0057em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Body 1/Reading</TokenGridCell>
          <TokenGridCell>16px</TokenGridCell>
          <TokenGridCell>26px (1.625)</TokenGridCell>
          <TokenGridCell>0.0057em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Body 2/Normal</TokenGridCell>
          <TokenGridCell>15px</TokenGridCell>
          <TokenGridCell>22px (1.467)</TokenGridCell>
          <TokenGridCell>0.0096em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Body 2/Reading</TokenGridCell>
          <TokenGridCell>15px</TokenGridCell>
          <TokenGridCell>24px (1.6)</TokenGridCell>
          <TokenGridCell>0.0096em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Label 1/Normal</TokenGridCell>
          <TokenGridCell>14px</TokenGridCell>
          <TokenGridCell>20px (1.429)</TokenGridCell>
          <TokenGridCell>0.0145em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Label 1/Reading</TokenGridCell>
          <TokenGridCell>14px</TokenGridCell>
          <TokenGridCell>22px (1.571)</TokenGridCell>
          <TokenGridCell>0.0145em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Label 2</TokenGridCell>
          <TokenGridCell>13px</TokenGridCell>
          <TokenGridCell>18px (1.385)</TokenGridCell>
          <TokenGridCell>0.0194em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Caption 1</TokenGridCell>
          <TokenGridCell>12px</TokenGridCell>
          <TokenGridCell>16px (1.334)</TokenGridCell>
          <TokenGridCell>0.0252em</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Caption 2</TokenGridCell>
          <TokenGridCell>11px</TokenGridCell>
          <TokenGridCell>14px (1.273)</TokenGridCell>
          <TokenGridCell>0.0311em</TokenGridCell>
        </TokenGridRow>
      </TokenGridBody>
    </TokenGrid>
  );
};

export default VariantGrid;
