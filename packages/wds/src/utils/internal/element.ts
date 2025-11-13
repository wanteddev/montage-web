export const isElementDisabled = (element: HTMLElement) => {
  return (
    (element.hasAttribute('disabled') &&
      element.getAttribute('disabled')?.toString() !== 'false') ||
    element.ariaDisabled?.toString() === 'true'
  );
};
