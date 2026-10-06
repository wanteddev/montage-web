import figma from 'figma';

// Each batch entry maps one Figma icon node to one or more icon components,
// selected by the instance's `Name` variant (e.g. `plus` / `plusThick`).
const { variants } = figma.batch as {
  variants: Array<{ name: string; component: string }>;
};

// Some Figma variant names carry stray whitespace (e.g. `leftSide `).
const name = String(figma.selectedInstance.getPropertyValue('Name')).trim();
const { component } =
  variants.find((variant) => variant.name.trim() === name) ?? variants[0];
const importStatement = `import { ${component} } from "@montage-ui/icon";`;

export default {
  id: component,
  imports: [importStatement],
  example: figma.code`<${component} />`,
  // Exposed so wrappers can re-declare the import (Code Connect only forwards
  // imports one nesting level up).
  metadata: {
    nestable: true,
    props: { component, imports: [importStatement] },
  },
};
