// url=<FIGMA_FORM_CONTROL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/form-control/index.tsx
// component=FormControl

import figma from 'figma';

type ResultSection = ReturnType<
  ReturnType<typeof figma.selectedInstance.findInstance>['executeTemplate']
>['example'][number];

const instance = figma.selectedInstance;

const hasLabel = instance.getBoolean('Label') === true;
const label = hasLabel ? instance.getString('┗ Text') : undefined;
const required = hasLabel && instance.getBoolean('┗ Required') === true;
const size = instance.getEnum('Size', {
  Large: 'large',
  Medium: 'medium',
});
const labelPlacement = instance.getEnum('Label Placement', {
  Top: 'top',
  Leading: 'leading',
});
// The footer resource already switches with Status (Helper Text / Success /
// Invalid), which renders FormControlMessage / Positive / NegativeMessage.
const footer =
  instance.getBoolean('Footer') === true
    ? figma.properties.children(['Footer'])
    : undefined;

// FormControl has no `status` prop in code: the status belongs to the input,
// as in the docs (`<TextField status="negative" />`). Apply the Figma Status
// to the first input tag when that component supports the value.
const status = instance.getEnum('Status', {
  Normal: undefined,
  Positive: 'positive',
  Negative: 'negative',
});
const STATUS_SUPPORT: Record<string, Array<string>> = {
  TextField: ['negative', 'positive'],
  TextArea: ['negative'],
  Select: ['negative'],
  SelectMultiple: ['negative'],
};
const withStatus = (sections: Array<ResultSection>) => {
  if (!status) {
    return sections;
  }
  let applied = false;
  return sections.map((section) => {
    if (applied || section.type !== 'CODE') {
      return section;
    }
    const match = /<([A-Z]\w*)/.exec(section.code);
    if (!match) {
      return section;
    }
    applied = true;
    const component = match[1];
    if (!STATUS_SUPPORT[component]?.includes(status)) {
      return section;
    }
    const tagStart = match.index;
    const tagEnd = section.code.indexOf('>', tagStart);
    const tag = section.code
      .slice(tagStart, tagEnd === -1 ? undefined : tagEnd)
      .replace(/\s+status="[^"]*"/, '');
    const updatedTag = tag.replace(
      `<${component}`,
      `<${component} status="${status}"`,
    );
    return {
      ...section,
      code:
        section.code.slice(0, tagStart) +
        updatedTag +
        (tagEnd === -1 ? '' : section.code.slice(tagEnd)),
    };
  });
};

const slot = figma.properties.slot('Input');
const input = slot
  ? withStatus(
      slot.connectedInstances.flatMap(
        (connected) => connected.executeTemplate().example,
      ),
    )
  : [];

const labelElement = hasLabel
  ? `
  <FormControlLabel${required ? ' required' : ''}>${label}</FormControlLabel>`
  : '';

export default {
  id: 'FormControl',
  imports: [
    `import { FormControl, FormControlField${
      hasLabel ? ', FormControlLabel' : ''
    } } from '@montage-ui/core';`,
  ],
  example: figma.tsx`<FormControl${size ? ` size="${size}"` : ''}${
    labelPlacement ? ` labelPlacement="${labelPlacement}"` : ''
  }>${labelElement}
  <FormControlField>${figma.helpers.react.renderChildren(input)}</FormControlField>
  ${figma.helpers.react.renderChildren(footer)}
</FormControl>`,
  metadata: { nestable: true },
};
