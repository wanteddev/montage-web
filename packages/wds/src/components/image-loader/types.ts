export type ImageLoaderProps = {
  src: string;
  width: number | string;
  alt: string;
  /**
   * @deprecated will be removed in v3.0.0. use `<Box as="img" />` instead
   */
  quality?: number | string;
  onError?: () => void;
  onLoad?: () => void;
  /**
   * @deprecated will be removed in v3.0.0. use `<Box as="img" />` instead
   */
  disableOptimize?: boolean;
};
