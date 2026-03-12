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
  /** Whether to disable the focus scope. */
  disableFocusScope?: boolean;
  /** Callback function when the focus scope is mounted. */
  onMountAutoFocus?: (event: Event) => void;
  /** Callback function when the focus scope is unmounted. */
  onUnmountAutoFocus?: (event: Event) => void;
};
