import { Children, isValidElement } from 'react';

export const findComponentInChildren = <T extends object>(
  nodes: React.ReactNode,
  key: string,
) => {
  return (
    Children.toArray(nodes)
      .map((node): Array<Partial<T>> | Partial<T> | null => {
        if (!isValidElement(node) || !node.type) {
          return null;
        }

        const {
          type,
          props: { children },
        } = node as React.ReactElement<any> & {
          type: { [k in string]: boolean };
        };

        if (type[key]) {
          return node.props as T;
        }

        return findComponentInChildren(children, key);
      })
      .flat(Infinity) as Array<Partial<T>>
  ).filter((v) => Boolean(v)) as Array<T>;
};
