import {
  TokenGrid,
  TokenGridBody,
  TokenGridCell,
  TokenGridHead,
  TokenGridHeader,
  TokenGridRow,
} from '@/features/docs/components/custom-render/token-grid';

const ArtboardSizeGrid = () => {
  return (
    <TokenGrid>
      <colgroup>
        <col width="25%" />
        <col width="25%" />
        <col width="25%" />
        <col width="25%" />
      </colgroup>
      <TokenGridHeader>
        <TokenGridRow>
          <TokenGridHead>환경</TokenGridHead>
          <TokenGridHead>너비</TokenGridHead>
          <TokenGridHead>높이</TokenGridHead>
          <TokenGridHead>최대 너비</TokenGridHead>
        </TokenGridRow>
      </TokenGridHeader>
      <TokenGridBody>
        <TokenGridRow>
          <TokenGridCell>Web desktop</TokenGridCell>
          <TokenGridCell>1440px</TokenGridCell>
          <TokenGridCell>960px</TokenGridCell>
          <TokenGridCell>1100px</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Web Mobile</TokenGridCell>
          <TokenGridCell>375px</TokenGridCell>
          <TokenGridCell>635px</TokenGridCell>
          <TokenGridCell>-</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>iOS</TokenGridCell>
          <TokenGridCell>375pt</TokenGridCell>
          <TokenGridCell>812pt</TokenGridCell>
          <TokenGridCell>-</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>Android</TokenGridCell>
          <TokenGridCell>360pp</TokenGridCell>
          <TokenGridCell>800dp</TokenGridCell>
          <TokenGridCell>-</TokenGridCell>
        </TokenGridRow>
      </TokenGridBody>
    </TokenGrid>
  );
};

export default ArtboardSizeGrid;
