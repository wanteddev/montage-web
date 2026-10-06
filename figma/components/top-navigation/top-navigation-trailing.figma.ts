// url=<FIGMA_TOP_NAVIGATION_TRAILING>

import figma from 'figma';

const button1 = figma.selectedInstance.getBoolean('┗ Button', {
  true: figma.properties.children(['Button 1']),
  false: undefined,
});
const button2 = figma.selectedInstance.getBoolean('┗ Button 2', {
  true: figma.properties.children(['Button 2']),
  false: undefined,
});
const button3 = figma.selectedInstance.getBoolean('┗ Button 3', {
  true: figma.properties.children(['Button 3']),
  false: undefined,
});
const __props: Record<string, unknown> = {};
if (button1 && button1.type !== 'ERROR') {
  __props['button1'] = button1;
}
if (button2 && button2.type !== 'ERROR') {
  __props['button2'] = button2;
}
if (button3 && button3.type !== 'ERROR') {
  __props['button3'] = button3;
}

export default {
  id: 'TopNavigationTrailing',
  example: figma.code`<>
      ${figma.helpers.react.renderChildren(button1)}
      ${figma.helpers.react.renderChildren(button2)}
      ${figma.helpers.react.renderChildren(button3)}
    </>`,
  metadata: { nestable: true, __props },
};
