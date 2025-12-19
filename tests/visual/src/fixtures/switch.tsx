import { Switch } from '@wanteddev/wds';

export const MediumSwitch = () => {
  return (
    <>
      <Switch size="medium" />
      <Switch size="medium" checked />
      <Switch size="medium" disabled />
      <Switch size="medium" checked disabled />
    </>
  );
};

export const SmallSwitch = () => {
  return (
    <>
      <Switch size="small" />
      <Switch size="small" checked />
      <Switch size="small" disabled />
      <Switch size="small" checked disabled />
    </>
  );
};
