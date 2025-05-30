export const makeSectionVariantDemoCode = (
  components: Array<string>,
  icons: Array<string> = [],
  props: Record<string, any>,
) => {
  const isComponent = (value: any) => {
    return (
      typeof value === 'string' && value.startsWith('<') && value.endsWith('/>')
    );
  };

  return `import { ${components.join(', ')} } from '@wanteddev/wds';
  import { ${icons.join(', ')} } from '@wanteddev/wds-icon';

  const Demo = () => {
    return (
      <${components[0]} ${Object.entries(props)
        .map(
          ([key, value]) =>
            `${key}={${isComponent(value) ? value : JSON.stringify(value)}}`,
        )
        .join(' ')} />
    );
  };

  export default Demo;`;
};
