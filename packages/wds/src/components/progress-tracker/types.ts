export type ProgressTrackerProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export type ProgressTrackerItemProps = {
  value: string;
};
