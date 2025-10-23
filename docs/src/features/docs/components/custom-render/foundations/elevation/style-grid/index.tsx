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
          <TokenGridCell>Shadow Normal XSmall</TokenGridCell>
          <TokenGridCell>
            평면에 가깝지만 미세한 구분이 필요한 경우
          </TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>2</TokenGridCell>
          <TokenGridCell>Shadow Normal Small</TokenGridCell>
          <TokenGridCell>페이지 위에 떠 있는 경우</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>3</TokenGridCell>
          <TokenGridCell>Shadow Normal Medium</TokenGridCell>
          <TokenGridCell>상호작용 상태에서 강조가 필요한 경우</TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>4</TokenGridCell>
          <TokenGridCell>Shadow Normal Large</TokenGridCell>
          <TokenGridCell>
            일시적으로 주요한 정보를 표시하는 더 높은 레이어의 경우
          </TokenGridCell>
        </TokenGridRow>

        <TokenGridRow>
          <TokenGridCell>5</TokenGridCell>
          <TokenGridCell>Shadow Normal XLarge</TokenGridCell>
          <TokenGridCell>
            사용자의 시선을 완전히 집중시켜야 하는 주요한 오버레이인 경우
          </TokenGridCell>
        </TokenGridRow>
      </TokenGridBody>
    </TokenGrid>
  );
};

export default StyleGrid;
