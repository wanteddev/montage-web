import { RadioGroup, RadioGroupItem } from '@wanteddev/wds';

export const HorizontalRadioGroup = () => {
  return (
    <>
      <RadioGroup defaultValue="option1">
        <RadioGroupItem value="option1" size="medium">
          Option 1
        </RadioGroupItem>
        <RadioGroupItem value="option2" size="medium">
          Option 2
        </RadioGroupItem>
        <RadioGroupItem value="option3" size="medium">
          Option 3
        </RadioGroupItem>
      </RadioGroup>
      <RadioGroup defaultValue="option2" disabled>
        <RadioGroupItem value="option1" size="medium">
          Option 1
        </RadioGroupItem>
        <RadioGroupItem value="option2" size="medium">
          Option 2
        </RadioGroupItem>
        <RadioGroupItem value="option3" size="medium">
          Option 3
        </RadioGroupItem>
      </RadioGroup>
    </>
  );
};

export const VerticalRadioGroup = () => {
  return (
    <>
      <RadioGroup defaultValue="option1" orientation="vertical">
        <RadioGroupItem value="option1" size="medium">
          Option 1
        </RadioGroupItem>
        <RadioGroupItem value="option2" size="medium">
          Option 2
        </RadioGroupItem>
        <RadioGroupItem value="option3" size="medium">
          Option 3
        </RadioGroupItem>
      </RadioGroup>
      <RadioGroup defaultValue="option2" orientation="vertical" disabled>
        <RadioGroupItem value="option1" size="medium">
          Option 1
        </RadioGroupItem>
        <RadioGroupItem value="option2" size="medium">
          Option 2
        </RadioGroupItem>
        <RadioGroupItem value="option3" size="medium">
          Option 3
        </RadioGroupItem>
      </RadioGroup>
    </>
  );
};

export const SmallRadioGroup = () => {
  return (
    <>
      <RadioGroup defaultValue="option1">
        <RadioGroupItem value="option1" size="small">
          Option 1
        </RadioGroupItem>
        <RadioGroupItem value="option2" size="small">
          Option 2
        </RadioGroupItem>
        <RadioGroupItem value="option3" size="small">
          Option 3
        </RadioGroupItem>
      </RadioGroup>
    </>
  );
};
