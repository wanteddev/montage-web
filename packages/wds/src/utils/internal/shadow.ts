export const boxShadowToDropShadow = (boxShadow: string) => {
  // box-shadow: <offset-x> <offset-y> <blur-radius> <spread-radius> <color>
  // drop-shadow: <offset-x> <offset-y> <blur-radius> <color>

  const shadows = boxShadow.split(', ');

  return shadows
    .map((shadow) => {
      const parts = shadow.trim().split(/\s+/);

      if (parts.length >= 5) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [offsetX, offsetY, blurRadius, _spreadRadius, ...colorParts] =
          parts;
        return `drop-shadow(${offsetX} ${offsetY} ${blurRadius} ${colorParts.join(' ')})`;
      }

      return shadow;
    })
    .join(' ');
};
