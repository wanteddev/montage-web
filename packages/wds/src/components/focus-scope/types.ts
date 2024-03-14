export type FocusScopeProps = {
  loop?: boolean;
  trapped?: boolean;
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
};
