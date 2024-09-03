import { Children, isValidElement } from 'react';

type Options = {
  value: string;
  label: string;
};

const convertNodeToOption = (
  node: React.ReactElement,
  givenValue?: string,
): Options => {
  const {
    key,
    props: { children, value, ...restProps },
  } = node;

  if (typeof children === 'string') {
    return {
      key,
      value: givenValue ?? value,
      label: children,
      ...restProps,
    };
  }

  return convertNodeToOption(children, givenValue ?? value);
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
        } = node as React.ReactElement & {
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
