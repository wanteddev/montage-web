export type SectionSelectedVariants = Record<
  string,
  { value: string; disabled?: boolean }
>;

export type SectionVariants = Array<{
  key: string;
  disabled?: boolean | ((props: Record<string, string>) => boolean);
  defaultValue?: string;
  options: Array<{
    label: string;
    value: Record<string, any>;
  }>;
}>;

export type SectionVariantsRender = (props: Record<string, string>) => string;
