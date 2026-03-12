export const hapticFeedback = () => {
  if (Boolean(window.navigator.vibrate)) {
    window.navigator.vibrate(40);
  }
};
