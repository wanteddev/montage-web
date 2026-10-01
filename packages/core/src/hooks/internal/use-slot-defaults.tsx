import { createContext, useContext } from 'react';

import { resolveInheritedResponsive } from '../../utils/internal/responsive-props';

import type { SearchFieldProps } from '../../components/search-field/types';
import type { ResponsiveProps } from '@montage-ui/engine';
import type { ReactNode } from 'react';
import type { AvatarProps } from '../../components/avatar';
import type { ButtonProps } from '../../components/button';
import type { ContentBadgeProps } from '../../components/content-badge';
import type {
  IconButtonProps,
  IconButtonVariant,
} from '../../components/icon-button/types';
import type { SegmentedControlProps } from '../../components/segmented-control/types';
import type { TextButtonProps } from '../../components/text-button/types';

export type InheritedSize<S> = {
  /** Base size applied when the component does not declare its own `size`. */
  size?: S;
  /** Per-breakpoint sizes merged with the component's own responsive sizes. */
  responsive?: ResponsiveProps<{ size?: S }>;
};

/** Each value applies only when the icon button does not declare its own. */
export type IconButtonSlotDefaults = InheritedSize<IconButtonProps['size']> &
  Pick<IconButtonProps, 'color' | 'interactionEffect' | 'interactionOverflow'>;

/**
 * Registry of the components whose defaults a parent slot can provide.
 * Register a component here, then read its defaults with `useInheritedSize`.
 * IconButton defaults are keyed by variant, since a slot sizes each variant
 * differently (e.g. normal by the field size, solid fixed).
 */
export type SlotDefaultsMap = {
  Avatar: InheritedSize<AvatarProps['size']>;
  Button: InheritedSize<ButtonProps['size']>;
  ContentBadge: InheritedSize<ContentBadgeProps['size']>;
  IconButton: Partial<Record<IconButtonVariant, IconButtonSlotDefaults>>;
  SegmentedControl: InheritedSize<SegmentedControlProps['size']>;
  TextButton: InheritedSize<TextButtonProps['size']>;
  SearchField: InheritedSize<SearchFieldProps['size']>;
};

export type SlotDefaults = {
  [K in keyof SlotDefaultsMap]?: SlotDefaultsMap[K];
};

/** Components whose slot defaults are a single `InheritedSize`. */
export type SizedSlotName = Exclude<keyof SlotDefaultsMap, 'IconButton'>;

/**
 * Merges slot defaults per component (and per variant for IconButton);
 * `value` takes precedence over `base`.
 */
export const mergeSlotDefaults = (
  base: SlotDefaults | undefined,
  value: SlotDefaults | undefined,
): SlotDefaults | undefined => {
  if (!base || !value) return value ?? base;

  const iconButton = { ...base.IconButton };

  for (const [variant, entry] of Object.entries(value.IconButton ?? {})) {
    const key = variant as keyof typeof iconButton;
    iconButton[key] = { ...iconButton[key], ...entry };
  }

  return { ...base, ...value, IconButton: iconButton };
};

// React `createContext` (not Radix) so that the context works without a
// provider (`{}`) and nested providers can merge with their parent.
const SlotDefaultsContext = createContext<SlotDefaults>({});

/**
 * Provides default props to the components rendered in a slot
 * (e.g. `TextFieldContent variant="badge"` → ContentBadge `size`).
 *
 * Place it as close to the slot's children as possible: the defaults reach
 * every descendant, including ones rendered through a portal.
 * Values are merged with the parent provider per component (see `mergeSlotDefaults`).
 */
export const SlotDefaultsProvider = ({
  value,
  children,
}: {
  value: SlotDefaults | undefined;
  children: ReactNode;
}) => {
  const parent = useContext(SlotDefaultsContext);

  if (!value) return <>{children}</>;

  return (
    <SlotDefaultsContext.Provider value={mergeSlotDefaults(parent, value)!}>
      {children}
    </SlotDefaultsContext.Provider>
  );
};

/** Reads the slot defaults of the enclosing slot (`{}` outside of any slot). */
export const useSlotDefaults = () => useContext(SlotDefaultsContext);

/**
 * Resolves a component's `size` against the defaults of its slot.
 * `size` declared on the component wins at every breakpoint; otherwise the
 * slot's base / per-breakpoint sizes are applied.
 */
export const useInheritedSize = <
  K extends SizedSlotName,
  T extends { size?: SlotDefaultsMap[K]['size'] },
>(
  name: K,
  size: T['size'],
  responsive: ResponsiveProps<T>,
) => {
  const inherited = useSlotDefaults()[name];

  const resolved = resolveInheritedResponsive<T, 'size'>(
    { base: size, responsive },
    inherited && {
      base: inherited.size as T['size'],
      responsive: inherited.responsive as ResponsiveProps<Pick<T, 'size'>>,
    },
    'size',
  );

  return { size: resolved.base, responsive: resolved.responsive };
};
