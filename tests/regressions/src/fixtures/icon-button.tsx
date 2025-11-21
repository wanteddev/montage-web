import { IconButton } from '@wanteddev/wds';
import { IconBlank } from '@wanteddev/wds-icon';

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
      <IconButton variant="background">
        <IconBlank />
      </IconButton>
      <IconButton variant="background" size={28}>
        <IconBlank />
      </IconButton>
    </>
  );
};

export const NormalIconButton = () => {
  return (
    <>
      <IconButton variant="normal">
        <IconBlank />
      </IconButton>
      <IconButton variant="normal" size={28}>
        <IconBlank />
      </IconButton>
    </>
  );
};
