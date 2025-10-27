import {
  TokenGrid,
  TokenGridBody,
  TokenGridCell,
  TokenGridHead,
  TokenGridHeader,
  TokenGridRow,
} from '@/features/docs/components/custom-render/token-grid';

const BreakpointGrid = () => {
  return (
    <TokenGrid>
      <colgroup>
        <col width="25%" />
        <col width="25%" />
        <col width="25%" />
        <col width="auto" />
      </colgroup>
      <TokenGridHeader>
        <TokenGridRow>
          <TokenGridHead>명칭</TokenGridHead>
          <TokenGridHead>대응 환경</TokenGridHead>
          <TokenGridHead>너비</TokenGridHead>
          <TokenGridHead>최대 너비</TokenGridHead>
        </TokenGridRow>
      </TokenGridHeader>
      <TokenGridBody>
        <TokenGridRow>
          <TokenGridCell>xs</TokenGridCell>
          <TokenGridCell>모바일</TokenGridCell>
          <TokenGridCell>0-768px</TokenGridCell>
          <TokenGridCell>-</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>sm</TokenGridCell>
          <TokenGridCell>태블릿 세로</TokenGridCell>
          <TokenGridCell>768-992px</TokenGridCell>
          <TokenGridCell>-</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>md</TokenGridCell>
          <TokenGridCell>태블릿 가로</TokenGridCell>
          <TokenGridCell>992-1200px</TokenGridCell>
          <TokenGridCell>-</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>lg</TokenGridCell>
          <TokenGridCell>데스크탑</TokenGridCell>
          <TokenGridCell>1200-1600px</TokenGridCell>
          <TokenGridCell>1100px(Padding 포함)</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>xl</TokenGridCell>
          <TokenGridCell>데스크탑 대형</TokenGridCell>
          <TokenGridCell>1600px~</TokenGridCell>
          <TokenGridCell>1440px(Padding 포함)</TokenGridCell>
        </TokenGridRow>
      </TokenGridBody>
    </TokenGrid>
  );
};

export default BreakpointGrid;
