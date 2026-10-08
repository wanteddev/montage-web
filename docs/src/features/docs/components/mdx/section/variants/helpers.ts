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

  const getSelectedValues = () =>
    Object.entries(newVariant).reduce<Record<string, string>>(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.value,
      }),
      {},
    );

  const isDisabled = (
    disabled: SectionVariantsType[number]['disabled'],
    values: Record<string, string>,
  ) => (typeof disabled === 'function' ? disabled(values) : Boolean(disabled));

  const disabledVariants = variants.filter((variant) =>
    isDisabled(variant.disabled, getSelectedValues()),
  );

  disabledVariants.forEach((variant) => {
    newVariant[variant.key] = {
      value: newVariant[variant.key]?.value ?? getDefaultOption(variant.key),
      disabled: true,
    };
  });

  // Option-level disabled: if the selected option becomes disabled,
  // fall back to the first enabled option of the same variant.
  variants.forEach((variant) => {
    const values = getSelectedValues();
    const disabledOptions = variant.options
      .filter((option) => isDisabled(option.disabled, values))
      .map((option) => option.label);

    if (disabledOptions.length === 0) {
      return;
    }

    const current = newVariant[variant.key];
    const value =
      current && !disabledOptions.includes(current.value)
        ? current.value
        : (variant.options.find(
            (option) => !disabledOptions.includes(option.label),
          )?.label ??
          current?.value ??
          '');

    newVariant[variant.key] = { ...current, value, disabledOptions };
  });

  return newVariant;
};

// Disabled variants keep their selection in the controls (restored when re-enabled),
// but are passed to `render` as an empty value so the demo does not reflect them.
export const getVariantRenderValues = (
  selectedVariant: SectionSelectedVariants,
) =>
  Object.entries(selectedVariant).reduce<Record<string, string>>(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value.disabled ? '' : value.value,
    }),
    {},
  );

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

  return `import { ${components.join(', ')} } from '@montage-ui/core';
  import { ${icons.join(', ')} } from '@montage-ui/icon';
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
