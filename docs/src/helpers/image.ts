export const getImageUrl = (src: string) => {
  return `${process.env.NEXT_PUBLIC_ASSET_PREFIX ?? ''}${src.startsWith('/') ? src : `/${src}`}`;
};
