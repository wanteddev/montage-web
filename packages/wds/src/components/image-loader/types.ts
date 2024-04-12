export type ImageLoaderProps = {
  src: string;
  width: number | string;
  alt: string;
  quality?: number | string;
  onError?: () => void;
  onLoad?: () => void;
  /**
   * `ImageLoader` 이미지 최적화를 비활성화 합니다.
   */
  disableOptimize?: boolean;
};
