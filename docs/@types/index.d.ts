declare module 'lottie-web/build/player/lottie_svg.min' {
  import type { LottiePlayer } from 'lottie-web';

  const lottie: LottiePlayer;
  export * from 'lottie-web';
  export default lottie;
}

declare type SectionVariantsProps = {
  components: Array<string>;
  internals?: Array<string>;
  icons?: Array<string>;
  variants: SectionVariantsType;
  render?: SectionVariantsRender;
  states?: string;
};

declare type SectionVariantsType = Array<{
  key: string;
  disabled?: boolean | ((props: Record<string, string>) => boolean);
  defaultValue?: string;
  options: Array<{
    label: string;
    value: Record<string, any>;
  }>;
}>;

declare type SectionVariantsRender = (props: Record<string, string>) => string;

declare type SectionHierarchyRenderProps = {
  render: string;
  components: Array<string>;
};

declare type SectionAccessibilityProps = {
  keys: Array<string>;
  description: string;
};

declare type SectionConfig = {
  variants?: SectionVariantsProps;
  hierarchy?: Array<SectionHierarchyRenderProps>;
  accessibility?:
    | Array<SectionAccessibilityProps>
    | Array<{ title: string; contents: Array<SectionAccessibilityProps> }>;
};
