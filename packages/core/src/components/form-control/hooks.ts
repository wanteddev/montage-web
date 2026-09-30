import { mapResponsiveProps } from '../../utils/internal/responsive-props';

import { useFormControlContext, useFormFieldLayoutContext } from './contexts';

import type {
  InheritedSize,
  SlotDefaults,
  SlotDefaultsMap,
} from '../../hooks/internal/use-slot-defaults';
import type { FormControlProps } from './types';

type FormFieldSize = NonNullable<FormControlProps['size']>;

export const useFormControl = (componentName: string) => {
  const { id } = useFormControlContext(componentName);

  return {
    id,
    labelId: `${id}-form-control-label`,
    fieldId: `${id}-form-control-field`,
    messageId: `${id}-form-control-message`,
    negativeMessageId: `${id}-form-control-negative-message`,
    positiveMessageId: `${id}-form-control-positive-message`,
  };
};

/**
 * Per form field size, the size of each component placed in a content slot.
 * @example { ContentBadge: { large: 'small', medium: 'xsmall' } }
 */
export type FormFieldSlotSizeTable = {
  [K in keyof SlotDefaultsMap]?: Record<
    FormFieldSize,
    NonNullable<SlotDefaultsMap[K]['size']>
  >;
};

/**
 * Maps the enclosing form field's base / per-breakpoint sizes through `table`,
 * producing the slot defaults to pass to `SlotDefaultsProvider`.
 * `undefined` outside of a form field or when the slot has no table.
 */
export const useFormFieldSlotDefaults = (
  table: FormFieldSlotSizeTable | undefined,
): SlotDefaults | undefined => {
  const layout = useFormFieldLayoutContext();

  if (!layout || !table) return undefined;

  const toSlotSize = <S>(
    sizes: Record<FormFieldSize, S>,
  ): InheritedSize<S> => ({
    size: layout.size && sizes[layout.size],
    responsive:
      layout.responsive &&
      mapResponsiveProps(layout.responsive, 'size', (s) => sizes[s]),
  });

  // Each entry keeps the value type of its own table row; the keys come from
  // `FormFieldSlotSizeTable`, which only allows registered component names.
  return Object.fromEntries(
    Object.entries(table).map(([name, sizes]) => [name, toSlotSize(sizes)]),
  ) as SlotDefaults;
};
