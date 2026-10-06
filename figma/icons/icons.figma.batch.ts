import figma from 'figma';

// Each batch entry maps one Figma icon node to one or more icon components,
// selected by the instance's `Name` variant (e.g. `plus` / `plusThick`).
const { variants } = figma.batch as {
  variants: Array<{ name: string; component: string }>;
};

const name = figma.selectedInstance.getPropertyValue('Name');
const { component } =
  variants.find((variant) => variant.name === name) ?? variants[0];

export default {
  id: component,
  imports: [`import { ${component} } from "@montage-ui/icon";`],
  example: figma.code`<${component} />`,
};
