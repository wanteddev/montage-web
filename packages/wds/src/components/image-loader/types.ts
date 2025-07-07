export type ImageLoaderProps = {
  src: string;
  width: number | string;
  alt: string;
  /**
   * @deprecated v3.0.0에서 제거될 예정입니다.
   */
  quality?: number | string;
  onError?: () => void;
  onLoad?: () => void;
  /**
   * @deprecated v3.0.0에서 제거될 예정입니다.
   */
  disableOptimize?: boolean;
};
