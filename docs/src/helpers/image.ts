export const getImageUrl = (src: string) => {
  if (process.env.NODE_ENV === 'development') {
    return src;
  }

  return `${process.env.NEXT_PUBLIC_ASSET_PREFIX ?? ''}${src.startsWith('/') ? src : `/${src}`}`;
};
