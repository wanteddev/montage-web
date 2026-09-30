import {
  mapResponsiveProps,
  resolveInheritedResponsive,
} from '../../utils/internal/responsive-props';

import {
  useFormControlContext,
  useFormControlLayoutContext,
  useFormFieldLayoutContext,
} from './contexts';

import type {
  IconButtonSlotDefaults,
  SizedSlotName,
  SlotDefaults,
  SlotDefaultsMap,
} from '../../hooks/internal/use-slot-defaults';
import type { ResponsiveProps } from '@montage-ui/engine';
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
 * Resolves the size of a form field (TextField, TextArea, ...) against the
 * enclosing FormControl.
 *
 * - `size` set on the field wins at every breakpoint.
 * - Otherwise the FormControl size (or `'large'`) is used, and the FormControl
 *   per-breakpoint sizes are merged into the field's responsive props.
 */
export const useFormFieldSize = <T extends { size?: FormFieldSize }>(
  size: FormFieldSize | undefined,
  responsive: ResponsiveProps<T>,
) => {
  const layout = useFormControlLayoutContext();

  const resolved = resolveInheritedResponsive<T, 'size'>(
    { base: size as T['size'], responsive },
    layout && {
      base: layout.size as T['size'],
      responsive: layout.responsive as ResponsiveProps<Pick<T, 'size'>>,
    },
    'size',
  );

  return {
    size: (resolved.base ?? 'large') as FormFieldSize,
    ...resolved.responsive,
  };
};

/**
 * A slot default whose `size` is given per form field size; the other values
 * (e.g. `interactionOverflow`) are applied as-is.
 */
type FormFieldSizedEntry<E extends { size?: unknown }> = Omit<
  E,
  'size' | 'responsive'
> & {
  size: Record<FormFieldSize, NonNullable<E['size']>>;
};

/**
 * Per form field size, the defaults of each component placed in a content slot.
 * @example { ContentBadge: { size: { large: 'small', medium: 'xsmall' } } }
 * @example { IconButton: { normal: { size: { large: 'large', medium: 'medium' }, interactionOverflow: true } } }
 */
export type FormFieldSlotSizeTable = {
  [K in SizedSlotName]?: FormFieldSizedEntry<SlotDefaultsMap[K]>;
} & {
  IconButton?: {
    [V in keyof SlotDefaultsMap['IconButton']]?: FormFieldSizedEntry<IconButtonSlotDefaults>;
  };
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

  const toEntry = <S, E extends object>({
    size: sizes,
    ...rest
  }: E & { size: Record<FormFieldSize, S> }) => ({
    ...rest,
    size: layout.size && sizes[layout.size],
    responsive:
      layout.responsive &&
      mapResponsiveProps(layout.responsive, 'size', (s) => sizes[s]),
  });

  const { IconButton: iconButton, ...sized } = table;

  // Each entry keeps the value type of its own table row; the keys come from
  // `FormFieldSlotSizeTable`, which only allows registered component names.
  return {
    ...(Object.fromEntries(
      Object.entries(sized).map(([name, entry]) => [name, toEntry(entry)]),
    ) as SlotDefaults),
    ...(iconButton && {
      IconButton: Object.fromEntries(
        Object.entries(iconButton).map(([variant, entry]) => [
          variant,
          toEntry(entry),
        ]),
      ),
    }),
  };
};
