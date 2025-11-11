export const throttle = <T extends (...args: any) => any>(
  func: T,
  timeFrame: number,
) => {
  let lastTime = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
};

export const getHeadingLevel = (nodeName: string) => {
  return Number(nodeName.replace('H', ''));
};
