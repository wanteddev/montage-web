import { Children, isValidElement } from 'react';

import type { ReactNode } from 'react';

type Options = {
  value: string;
  label: ReactNode;
};

const convertNodeToOption = (
  node: React.ReactElement<any>,
  givenValue?: string,
): Options => {
  const {
    key,
    props: { children, value, ...restProps },
  } = node;

  if (isValidElement(children)) {
    return convertNodeToOption(children, givenValue ?? value);
  }

  return {
    key,
    value: givenValue ?? value,
    label: children,
    ...restProps,
  };
};

export const convertChildrenToData = (nodes: React.ReactNode) => {
  return (
    Children.toArray(nodes)
      .map((node): Array<Partial<Options>> | Partial<Options> | null => {
        if (!isValidElement(node) || !node.type) {
          return null;
        }

        const {
          type: { isOptionGroup, isOption },
          props: { children },
        } = node as React.ReactElement<any> & {
          type: { isOptionGroup?: boolean; isOption?: boolean };
        };

        if (!isOptionGroup && isOption) {
          return convertNodeToOption(node);
        }

        return convertChildrenToData(children);
      })
      .flat(Infinity) as Array<Partial<Options>>
  ).filter((v) => Boolean(v) && v.value !== undefined) as Array<Options>;
};
