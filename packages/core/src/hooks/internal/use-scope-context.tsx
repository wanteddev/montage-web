import { createContext, useContext, useMemo } from 'react';

import type { ReactNode } from 'react';

type ScopeObject<T extends ReadonlyArray<string>> = {
  [K in T[number] as `__scope${Capitalize<K>}`]: string;
};

export const createScope = <T extends ReadonlyArray<string>>(
  ...components: T
) => {
  const useScope = (scope: string): ScopeObject<T> => {
    return useMemo(() => {
      const result = {} as ScopeObject<T>;

      components.forEach((component) => {
        const scopeKey = `__scope${component}` as keyof ScopeObject<T>;
        (result as any)[scopeKey] = scope ? `${scope}/${component}` : component;
      });

      return result;
    }, [scope]);
  };

  return useScope;
};

export const createScopeContext = <ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType,
) => {
  const contextCache = new Map<
    string,
    React.Context<ContextValueType | undefined>
  >();

  const Provider = (
    props: ContextValueType & { scope: string; children: ReactNode },
  ) => {
    const { children, scope, ...context } = props;

    if (!contextCache.has(scope)) {
      const Context = createContext<ContextValueType | undefined>(
        defaultContext,
      );
      contextCache.set(scope, Context);
    }

    const Context = contextCache.get(scope)!;

    const value = useMemo(
      () => context,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(context),
    ) as ContextValueType;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useScopeContext = (consumerName: string, scope: string) => {
    if (!contextCache.has(scope)) {
      throw new Error(
        `${consumerName} must be rendered inside a ${rootComponentName}Provider with scope="${scope}"`,
      );
    }

    const Context = contextCache.get(scope)!;
    const context = useContext(Context);

    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;

    throw new Error(
      `${consumerName} must be rendered inside a ${rootComponentName}Provider with scope="${scope}"`,
    );
  };

  Provider.displayName = rootComponentName + 'Provider';

  return [Provider, useScopeContext] as const;
};

export type ScopedProps<T, Scope extends string> = T & {
  [key in `__scope${Scope}`]?: string;
};
