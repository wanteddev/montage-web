import { createContext, useContext } from 'react';

import { resolveInheritedResponsive } from '../../utils/internal/responsive-props';

import type { ResponsiveProps } from '@montage-ui/engine';
import type { ReactNode } from 'react';
import type { ButtonProps } from '../../components/button';
import type { ContentBadgeProps } from '../../components/content-badge';

export type InheritedSize<S> = {
  /** Base size applied when the component does not declare its own `size`. */
  size?: S;
  /** Per-breakpoint sizes merged with the component's own responsive sizes. */
  responsive?: ResponsiveProps<{ size?: S }>;
};

/**
 * Registry of the components whose defaults a parent slot can provide.
 * Register a component here, then read its defaults with `useInheritedSize`.
 */
export type SlotDefaultsMap = {
  Button: InheritedSize<ButtonProps['size']>;
  ContentBadge: InheritedSize<ContentBadgeProps['size']>;
};

export type SlotDefaults = {
  [K in keyof SlotDefaultsMap]?: SlotDefaultsMap[K];
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
 * Values are merged with the parent provider per component.
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
    <SlotDefaultsContext.Provider value={{ ...parent, ...value }}>
      {children}
    </SlotDefaultsContext.Provider>
  );
};

/**
 * Resolves a component's `size` against the defaults of its slot.
 * `size` declared on the component wins at every breakpoint; otherwise the
 * slot's base / per-breakpoint sizes are applied.
 */
export const useInheritedSize = <
  K extends keyof SlotDefaultsMap,
  T extends { size?: SlotDefaultsMap[K]['size'] },
>(
  name: K,
  size: T['size'],
  responsive: ResponsiveProps<T>,
) => {
  const inherited = useContext(SlotDefaultsContext)[name];

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
