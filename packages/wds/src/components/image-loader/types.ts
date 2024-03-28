export type ImageLoaderProps = {
  src: string;
  width: number | string;
  alt: string;
  quality?: number | string;
  onError?: () => void;
  onLoad?: () => void;
};
