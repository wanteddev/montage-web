import { Button } from '@montage-ui/core';
import { IconBlank } from '@montage-ui/icon';

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

export const SolidNegativeButton = () => {
  return (
    <>
      <Button variant="solid" color="negative" size="large">
        Button
      </Button>
      <Button variant="solid" color="negative" size="medium">
        Button
      </Button>
      <Button variant="solid" color="negative" size="small">
        Button
      </Button>
      <Button variant="solid" color="negative" size="xsmall">
        Button
      </Button>
      <Button variant="solid" color="negative" size="large" iconOnly>
        <IconBlank />
      </Button>
      <Button variant="solid" color="negative" size="medium" iconOnly>
        <IconBlank />
      </Button>
      <Button variant="solid" color="negative" size="small" iconOnly>
        <IconBlank />
      </Button>
      <Button variant="solid" color="negative" size="xsmall" iconOnly>
        <IconBlank />
      </Button>
    </>
  );
};

export const XsmallButton = () => {
  return (
    <>
      <Button variant="solid" size="xsmall">
        Button
      </Button>
      <Button variant="solid" color="assistive" size="xsmall">
        Button
      </Button>
      <Button variant="outlined" size="xsmall">
        Button
      </Button>
      <Button variant="outlined" color="assistive" size="xsmall">
        Button
      </Button>
      <Button variant="solid" size="xsmall" iconOnly>
        <IconBlank />
      </Button>
      <Button variant="solid" color="assistive" size="xsmall" iconOnly>
        <IconBlank />
      </Button>
      <Button variant="outlined" size="xsmall" iconOnly>
        <IconBlank />
      </Button>
      <Button variant="outlined" color="assistive" size="xsmall" iconOnly>
        <IconBlank />
      </Button>
    </>
  );
};
