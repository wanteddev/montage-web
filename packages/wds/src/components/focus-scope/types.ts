export type FocusScopeProps = {
  loop?: boolean;
  trapped?: boolean;
  /**
   * container 외 내부 콘텐츠 영역에 focus toggle
   */
  trappedContent?: boolean;
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
};
