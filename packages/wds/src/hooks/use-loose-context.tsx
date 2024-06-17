import { createContext, useContext, useMemo } from 'react';

import type { ReactNode } from 'react';

const createLooseContext = <ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType,
) => {
  const Context = createContext<ContextValueType | undefined>(defaultContext);

  const Provider = (props: ContextValueType & { children: ReactNode }) => {
    const { children, ...context } = props;
    const value = useMemo(
      () => context,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(context),
    ) as ContextValueType;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useLooseContext = () => {
    const context = useContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;

    return undefined;
  };

  Provider.displayName = rootComponentName + 'Provider';

  return [Provider, useLooseContext] as const;
};

export default createLooseContext;
