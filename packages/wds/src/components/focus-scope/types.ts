export type FocusScopeProps = {
  /**
   * container 내에서만 포커스 가능하도록 loop 여부
   */
  loop?: boolean;
  /**
   * 첫 포커스를 `trappedContent`에 따라 자동으로 이동 여부
   */
  trapped?: boolean;
  /**
   * container 외 내부 콘텐츠 영역에 포커스 여부
   */
  trappedContent?: boolean;
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
};
