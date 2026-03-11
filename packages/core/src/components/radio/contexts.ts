import createLooseContext from '../../hooks/internal/use-loose-context';

type RadioContextValue = {
  tight: boolean;
};

/**
 * Used to easily override the default tight value of the radio.
 */
export const [RadioProvider, useRadioContext] =
  createLooseContext<RadioContextValue>('AnyComponent');
