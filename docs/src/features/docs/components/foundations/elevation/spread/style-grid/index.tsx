import {
  TokenGrid,
  TokenGridBody,
  TokenGridCell,
  TokenGridHead,
  TokenGridHeader,
  TokenGridRow,
} from '@/features/docs/components/custom-render/token-grid';

const StyleGrid = () => {
  return (
    <TokenGrid>
      <colgroup>
        <col width="60px" />
        <col width="auto" />
        <col width="auto" />
      </colgroup>
      <TokenGridHeader>
        <TokenGridRow>
          <TokenGridHead>레벨</TokenGridHead>
          <TokenGridHead>명칭</TokenGridHead>
          <TokenGridHead>적용</TokenGridHead>
        </TokenGridRow>
      </TokenGridHeader>
      <TokenGridBody>
        <TokenGridRow>
          <TokenGridCell>1</TokenGridCell>
          <TokenGridCell>Shadow Spread Small</TokenGridCell>
          <TokenGridCell>
            배경과 콘텐츠의 경계 사방에 구분이 필요한 경우
          </TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>2</TokenGridCell>
          <TokenGridCell>Shadow Spread Medium</TokenGridCell>
          <TokenGridCell>
            경계 분리와 함께, 보다 강조가 필요한 경우
          </TokenGridCell>
        </TokenGridRow>
      </TokenGridBody>
    </TokenGrid>
  );
};

export default StyleGrid;
