import { CheckMark } from '@wanteddev/wds';

export const MediumCheckMark = () => {
  return (
    <>
      <CheckMark size="medium" />
      <CheckMark size="medium" checked />
      <CheckMark size="medium" disabled />
      <CheckMark size="medium" checked disabled />
    </>
  );
};

export const SmallCheckMark = () => {
  return (
    <>
      <CheckMark size="small" />
      <CheckMark size="small" checked />
      <CheckMark size="small" disabled />
      <CheckMark size="small" checked disabled />
    </>
  );
};
