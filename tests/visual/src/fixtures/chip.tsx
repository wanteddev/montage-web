import { Chip } from '@wanteddev/wds';

export const SolidChip = () => {
  return (
    <>
      <Chip variant="solid" size="xsmall">
        Chip
      </Chip>
      <Chip variant="solid" size="small">
        Chip
      </Chip>
      <Chip variant="solid" size="medium">
        Chip
      </Chip>
      <Chip variant="solid" size="large">
        Chip
      </Chip>
      <Chip variant="solid" size="medium" active>
        Chip
      </Chip>
      <Chip variant="solid" size="medium" disabled>
        Chip
      </Chip>
    </>
  );
};

export const OutlinedChip = () => {
  return (
    <>
      <Chip variant="outlined" size="xsmall">
        Chip
      </Chip>
      <Chip variant="outlined" size="small">
        Chip
      </Chip>
      <Chip variant="outlined" size="medium">
        Chip
      </Chip>
      <Chip variant="outlined" size="large">
        Chip
      </Chip>
      <Chip variant="outlined" size="medium" active>
        Chip
      </Chip>
      <Chip variant="outlined" size="medium" disabled>
        Chip
      </Chip>
    </>
  );
};
