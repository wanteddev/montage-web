export type Prop = {
  name: string;
  type: string;
  isOptional: boolean;
  description?: string;
  defaultValue?: string;
};

export type ComponentInfo = {
  name: string;
  props: Array<Prop>;
  filePath: string;
};
