export const loadImage = (src: string, abortSignal?: AbortSignal) => {
  return new Promise<void>((resolve, reject) => {
    const img = document.createElement('img');
    img.onerror = () => reject();
    img.onload = () => resolve();
    img.onabort = () => {
      reject(new DOMException('The operation was aborted.', 'AbortError'));
    };
    img.src = src;

    abortSignal?.addEventListener('abort', () => {
      reject(new DOMException('The operation was aborted.', 'AbortError'));
    });
  });
};
