import createLooseContext from '../../hooks/internal/use-loose-context';

type CheckboxContextValue = {
  tight: boolean;
};

/**
 * Used to easily override the default tight value of the checkbox.
 */
export const [CheckboxProvider, useCheckboxContext] =
  createLooseContext<CheckboxContextValue>('AnyComponent');
