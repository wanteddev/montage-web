export const generateId = (): string => {
  let d = new Date().getTime();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    r = (d + r) % 16 | 0;
    d = Math.floor(d / 16);

    return (c === 'x' ? r : (r && 0x3) | 0x8).toString(16);
  });
};
