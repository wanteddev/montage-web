export type FocusScopeProps = {
  /**
   * Whether the focus is only possible within the container.
   */
  loop?: boolean;
  /**
   * Whether the first focus automatically moves according to `trappedContent`.
   */
  trapped?: boolean;
  /**
   * Whether the focus is within the internal content area outside the container.
   */
  trappedContent?: boolean;
  disableFocusScope?: boolean;
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
};
