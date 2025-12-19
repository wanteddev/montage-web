import { ToggleIcon } from '@wanteddev/wds';
import { IconBlank } from '@wanteddev/wds-icon';

export const DefaultToggleIcon = () => {
  return (
    <>
      <ToggleIcon>
        <IconBlank />
      </ToggleIcon>
      <ToggleIcon active>
        <IconBlank />
      </ToggleIcon>
      <ToggleIcon disabled>
        <IconBlank />
      </ToggleIcon>
      <ToggleIcon active disabled>
        <IconBlank />
      </ToggleIcon>
    </>
  );
};

export const ToggleIconWithSize = () => {
  return (
    <>
      <ToggleIcon size="16px">
        <IconBlank />
      </ToggleIcon>
      <ToggleIcon size="24px">
        <IconBlank />
      </ToggleIcon>
      <ToggleIcon size="32px">
        <IconBlank />
      </ToggleIcon>
    </>
  );
};
