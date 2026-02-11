import type { SectionSelectedVariants } from './types';

export const getVariantValueWithDisabled = (
  variants: SectionVariantsType,
  newVariant: SectionSelectedVariants,
) => {
  const getDefaultOption = (key: string) => {
    return (
      variants.find((variant) => variant.key === key)?.options[0]?.label ?? ''
    );
  };

  const disabledVariants = variants.filter((variant) => {
    if (typeof variant.disabled === 'function') {
      return variant.disabled(
        Object.entries(newVariant).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value.value,
          }),
          {},
        ),
      );
    }

    return variant.disabled;
  });

  disabledVariants.forEach((variant) => {
    newVariant[variant.key] = {
      value: newVariant[variant.key]?.value ?? getDefaultOption(variant.key),
      disabled: true,
    };
  });

  return newVariant;
};

export const isComponent = (value: any): value is string => {
  if (typeof value !== 'string') return false;

  const tagPattern =
    /^<([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?\s*\/>$|^<([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?>.*<\/\2>$|^<>\s*.*\s*<\/>$/s;

  return tagPattern.test(value.trim().trimEnd());
};

export const makeSectionVariantDemoCode = (
  components: Array<string>,
  icons: Array<string> = [],
  internals: Array<string> = [],
  props: Record<string, any>,
  render?: string,
  states?: string,
) => {
  const Component =
    render ??
    `
    <${components[0]} ${Object.entries(props)
      .map(
        ([key, value]) =>
          `${key}={${
            isComponent(value)
              ? value
              : typeof value === 'function'
                ? value.toString()
                : JSON.stringify(value)
          }}`,
      )
      .join(' ')} />
  `;

  return `import { ${components.join(', ')} } from '@wanteddev/wds';
  import { ${icons.join(', ')} } from '@wanteddev/wds-icon';
  import { ${internals.join(', ')} } from 'internal';
  import * as React from 'react';

  const Demo = () => {
    ${states ?? ''}
    return (
      <>
        ${Component}
      </>
    );
  };

  export default Demo;`;
};
