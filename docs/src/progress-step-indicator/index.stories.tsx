import { Button, FlexBox, ProgressStepIndicator } from '@wanteddev/wds';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressStepIndicator> = {
  component: ProgressStepIndicator,
  title: 'Components/Progress Step Indicator',
  args: {
    size: 'medium',
    divider: true,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStepIndicator>;

export const Basic: Story = {
  args: {
    steps: [1, 2, 3, 4, 5],
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [step, setStep] = useState(1);

    const handleChangeStep = (variant: 'prev' | 'next') => () => {
      if (step === 5 && variant === 'next') {
        return;
      } else if (step === 1 && variant === 'prev') {
        return;
      }

      setStep((prev) => prev + (variant === 'prev' ? -1 : 1));
    };

    return (
      <FlexBox flexDirection="column" gap="8px">
        <FlexBox gap="8px">
          <Button type="button" onClick={handleChangeStep('prev')}>
            Prev
          </Button>
          <Button type="button" onClick={handleChangeStep('next')}>
            Next
          </Button>
        </FlexBox>

        <ProgressStepIndicator {...args} activeStep={step} />
      </FlexBox>
    );
  },
};
