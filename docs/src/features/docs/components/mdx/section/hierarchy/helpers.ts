export const makeSectionHierarchyCode = (
  components: Array<string>,
  render: string,
) => {
  return `import { ${components.join(', ')} } from '@wanteddev/wds';

  const Demo = () => {
    return (
      <>
      ${render}
      </>
    );
  };

  export default Demo;`;
};
