import { ProgressIndicator } from '@montage-ui/core';

export const ProgressIndicatorDefault = () => {
  return (
    <>
      <ProgressIndicator percent={0} />
      <ProgressIndicator percent={25} />
      <ProgressIndicator percent={50} />
      <ProgressIndicator percent={75} />
      <ProgressIndicator percent={100} />
    </>
  );
};
