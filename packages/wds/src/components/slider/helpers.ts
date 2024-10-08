export const clamp = (value: number, [min, max]: [number, number]) =>
  Math.min(max, Math.max(min, value));

export const convertValueToPercentage = (
  value: number,
  min: number,
  max: number,
) => {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, [0, 100]);
};

export const linearScale = (
  input: readonly [number, number],
  output: readonly [number, number],
) => {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
};

export const getClosestThumbIndex = (
  values: Array<number>,
  nextValue: number,
) => {
  if (values.length === 1) return 0;
  const distances = values.map((value) => Math.abs(value - nextValue));
  const closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
};
