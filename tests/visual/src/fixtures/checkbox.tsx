import { Checkbox } from '@wanteddev/wds';

export const MediumCheckbox = () => {
  return (
    <>
      <Checkbox size="medium" />
      <Checkbox size="medium" checked />
      <Checkbox size="medium" indeterminate />
      <Checkbox size="medium" disabled />
      <Checkbox size="medium" checked disabled />
    </>
  );
};

export const SmallCheckbox = () => {
  return (
    <>
      <Checkbox size="small" />
      <Checkbox size="small" checked />
      <Checkbox size="small" indeterminate />
      <Checkbox size="small" disabled />
      <Checkbox size="small" checked disabled />
    </>
  );
};
