/** 공유 링크로 직렬화되는 플레이그라운드 상태. */
export type PlaygroundShareState = {
  /** 에디터에 입력된 코드. */
  code: string;
  /** 미리보기 배경을 투명(체커보드)으로 표시할지 여부. */
  isTransparent: boolean;
};
