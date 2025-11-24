import { Button } from '@wanteddev/wds';
import { IconBlank } from '@wanteddev/wds-icon';

export const SolidButton = () => {
  return (
    <>
      <Button variant="solid">Button</Button>
      <Button variant="solid" iconOnly>
        <IconBlank />
      </Button>
      <Button variant="solid" color="assistive">
        Button
      </Button>
      <Button variant="solid" color="assistive" iconOnly>
        <IconBlank />
      </Button>
    </>
  );
};

export const OutlinedButton = () => {
  return (
    <>
      <Button variant="outlined">Button</Button>
      <Button variant="outlined" iconOnly>
        <IconBlank />
      </Button>
      <Button variant="outlined" color="assistive">
        Button
      </Button>
      <Button variant="outlined" color="assistive" iconOnly>
        <IconBlank />
      </Button>
    </>
  );
};
