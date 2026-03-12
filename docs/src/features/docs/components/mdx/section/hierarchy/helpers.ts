export const makeSectionHierarchyCode = (
  components: Array<string>,
  render: string,
) => {
  return `import { ${components.join(', ')} } from '@montage-ui/core';

  const Demo = () => {
    return (
      <>
      ${render}
      </>
    );
  };

  export default Demo;`;
};
