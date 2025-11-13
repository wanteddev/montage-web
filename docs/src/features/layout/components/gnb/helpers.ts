/* eslint-disable @typescript-eslint/no-unnecessary-condition */
export const getBodyScrollTop = () => {
  if (!document.body) return 0;

  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;

  return scrollTop;
};
