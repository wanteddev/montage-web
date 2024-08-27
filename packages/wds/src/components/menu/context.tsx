import { createContext, useContext, useState } from 'react';

import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import type { Merge } from '@wanteddev/wds-engine';

type MenuContextValues = {
  value: string | Array<string>;
};
type MenuContextDispatch = {
  setValue: Dispatch<SetStateAction<MenuContextValues['value']>>;
};

type MenuContextType = Merge<MenuContextValues, MenuContextDispatch>;

export const MenuContext = createContext<MenuContextType>({
  value: [],
  setValue: () => {},
});

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [value, setValue] = useState<MenuContextValues['value']>([]);

  return (
    <MenuContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
