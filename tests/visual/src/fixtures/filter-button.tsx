import { FilterButton } from '@wanteddev/wds';

export const SolidFilterButton = () => {
  return (
    <>
      <FilterButton variant="solid" size="xsmall">
        Filter
      </FilterButton>
      <FilterButton variant="solid" size="small">
        Filter
      </FilterButton>
      <FilterButton variant="solid" size="medium">
        Filter
      </FilterButton>
      <FilterButton variant="solid" size="large">
        Filter
      </FilterButton>
      <FilterButton variant="solid" size="medium" active>
        Filter
      </FilterButton>
      <FilterButton variant="solid" size="medium" expanded>
        Filter
      </FilterButton>
      <FilterButton variant="solid" size="medium" disabled>
        Filter
      </FilterButton>
    </>
  );
};

export const OutlinedFilterButton = () => {
  return (
    <>
      <FilterButton variant="outlined" size="xsmall">
        Filter
      </FilterButton>
      <FilterButton variant="outlined" size="small">
        Filter
      </FilterButton>
      <FilterButton variant="outlined" size="medium">
        Filter
      </FilterButton>
      <FilterButton variant="outlined" size="large">
        Filter
      </FilterButton>
      <FilterButton variant="outlined" size="medium" active>
        Filter
      </FilterButton>
      <FilterButton variant="outlined" size="medium" expanded>
        Filter
      </FilterButton>
      <FilterButton variant="outlined" size="medium" disabled>
        Filter
      </FilterButton>
    </>
  );
};

export const FilterButtonWithActiveLabel = () => {
  return (
    <>
      <FilterButton variant="solid" active activeLabel="3">
        Filter
      </FilterButton>
      <FilterButton variant="outlined" active activeLabel="5">
        Filter
      </FilterButton>
    </>
  );
};
