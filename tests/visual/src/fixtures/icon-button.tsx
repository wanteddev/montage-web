import { IconButton } from '@montage-ui/core';
import { IconBlank } from '@montage-ui/icon';

export const SolidIconButton = () => {
  return (
    <>
      <IconButton variant="solid">
        <IconBlank />
      </IconButton>
      <IconButton variant="solid" size={28}>
        <IconBlank />
      </IconButton>
    </>
  );
};

export const OutlinedIconButton = () => {
  return (
    <>
      <IconButton variant="outlined">
        <IconBlank />
      </IconButton>
      <IconButton variant="outlined" size={28}>
        <IconBlank />
      </IconButton>
    </>
  );
};

export const BackgroundIconButton = () => {
  return (
    <>
      <IconButton variant="background" size={24}>
        <IconBlank />
      </IconButton>
      <IconButton variant="background" size={20}>
        <IconBlank />
      </IconButton>
      <IconButton variant="background" size={18}>
        <IconBlank />
      </IconButton>
      <IconButton variant="background" size={16}>
        <IconBlank />
      </IconButton>
      <IconButton variant="background" size={24} alternative>
        <IconBlank />
      </IconButton>
      <IconButton variant="background" size={24} disabled>
        <IconBlank />
      </IconButton>
    </>
  );
};

export const NormalIconButton = () => {
  return (
    <>
      <IconButton variant="normal" size="xlarge">
        <IconBlank />
      </IconButton>
      <IconButton variant="normal" size="large">
        <IconBlank />
      </IconButton>
      <IconButton variant="normal" size="medium">
        <IconBlank />
      </IconButton>
      <IconButton variant="normal" size="small">
        <IconBlank />
      </IconButton>
      <IconButton variant="normal" size={28}>
        <IconBlank />
      </IconButton>
      <IconButton variant="normal" size="xlarge" disabled>
        <IconBlank />
      </IconButton>
    </>
  );
};
