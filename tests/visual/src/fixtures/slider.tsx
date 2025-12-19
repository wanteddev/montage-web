import { Slider } from '@wanteddev/wds';

export const SingleSlider = () => {
  return (
    <>
      <Slider defaultValue={[0]} />
      <Slider defaultValue={[25]} />
      <Slider defaultValue={[50]} />
      <Slider defaultValue={[75]} />
      <Slider defaultValue={[100]} />
      <Slider defaultValue={[50]} disabled />
    </>
  );
};

export const RangeSlider = () => {
  return (
    <>
      <Slider defaultValue={[0, 100]} />
      <Slider defaultValue={[25, 75]} />
      <Slider defaultValue={[10, 90]} />
      <Slider defaultValue={[30, 70]} disabled />
    </>
  );
};

export const SliderWithLabels = () => {
  return (
    <>
      <Slider defaultValue={[50]} label="50" />
      <Slider defaultValue={[25, 75]} label={(props) => `${props.value}`} />
    </>
  );
};
