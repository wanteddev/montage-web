import type { SectionSelectedVariants, SectionVariants } from './types';

export const getVariantValueWithDisabled = (
  variants: SectionVariants,
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

export const isComponent = (value: any) => {
  if (typeof value !== 'string') return false;

  const tagPattern =
    /^<[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?\s*\/>$|^<[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?>.*<\/[a-zA-Z][a-zA-Z0-9]*>$/;

  return tagPattern.test(value);
};

export const makeSectionVariantDemoCode = (
  components: Array<string>,
  icons: Array<string> = [],
  props: Record<string, any>,
) => {
  return `import { ${components.join(', ')} } from '@wanteddev/wds';
  import { ${icons.join(', ')} } from '@wanteddev/wds-icon';

  const Demo = () => {
    return (
      <${components[0]} ${Object.entries(props)
        .map(
          ([key, value]) =>
            `${key}={${
              isComponent(value)
                ? `<>${value}</>`
                : typeof value === 'function'
                  ? value.toString()
                  : JSON.stringify(value)
            }}`,
        )
        .join(' ')} />
    );
  };

  export default Demo;`;
};
