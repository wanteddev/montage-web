type BreakpointIconKey = 'mobile' | 'tablet' | 'desktop';

type BreakpointOption = {
  width: number;
  label: string;
  iconKey: BreakpointIconKey;
};

export const BREAKPOINT_OPTIONS: ReadonlyArray<BreakpointOption> = [
  { width: 1280, label: 'Desktop (1280px)', iconKey: 'desktop' },
  { width: 768, label: 'Tablet (768px)', iconKey: 'tablet' },
  { width: 375, label: 'Mobile (375px)', iconKey: 'mobile' },
];

export const MIN_PREVIEW_WIDTH = 320;
export const DEFAULT_PREVIEW_WIDTH = 1280;
