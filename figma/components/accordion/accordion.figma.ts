// url=<FIGMA_ACCORDION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/accordion/index.tsx
// component=Accordion

import figma from 'figma';

import {
  ACCORDION_SUMMARY_SLOT_NAMES,
  renderElementProp,
  renderPreset,
} from '../../helpers/list-cell';
import { coreImport } from '../../helpers/menu-item';

const summaryContent = ACCORDION_SUMMARY_SLOT_NAMES.content;

// Leading: the `Leading Icon` toggle shows an icon wrapper inside `Leading Content`.
const leadingIcon =
  figma.selectedInstance.getBoolean('Leading Icon') === true
    ? figma.selectedInstance.findInstance('Icon', { path: ['Leading Content'] })
    : undefined;
const leadingContent =
  leadingIcon && leadingIcon.type !== 'ERROR'
    ? figma.tsx`<${summaryContent} variant="icon">${leadingIcon.executeTemplate().example}</${summaryContent}>`
    : undefined;

// Trailing: an instance swap per expand state. The default chevron resource has
// no Code Connect, which leaves `trailingContent` empty so the core chevron renders.
const trailingSwap = figma.selectedInstance.getInstanceSwap(
  figma.selectedInstance.getBoolean('Expand')
    ? 'Trailing Content\u180E'
    : 'Trailing Content',
);
const trailingContent = trailingSwap
  ? renderPreset(trailingSwap, summaryContent)
  : undefined;

const heading = figma.selectedInstance.getString('Heading');
const description = figma.selectedInstance.getBoolean('Description', {
  true: figma.selectedInstance.getString('┗ Text'),
  false: undefined,
});
const content = figma.selectedInstance.getBoolean('Show Content', {
  true: figma.properties.slot('Content'),
  false: undefined,
});
const divider = figma.selectedInstance.getBoolean('Divider');
const defaultExpanded = figma.selectedInstance.getBoolean('Expand');
const verticalPadding = figma.selectedInstance.getEnum('Vertical Padding', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});

const details = [
  description
    ? figma.tsx`
    <AccordionDescription>${description}</AccordionDescription>`
    : '',
  content
    ? figma.tsx`
    <AccordionContent>${figma.helpers.react.renderChildren(
      content,
    )}</AccordionContent>`
    : '',
];

export default {
  id: 'Accordion',
  imports: [
    coreImport([
      'Accordion',
      'AccordionSummary',
      ...(description || content ? ['AccordionDetails'] : []),
      ...(description ? ['AccordionDescription'] : []),
      ...(content ? ['AccordionContent'] : []),
      ...(leadingContent || trailingContent ? [summaryContent] : []),
    ]),
  ],
  // `divider` defaults to true in core, so only the off state is written out.
  example: figma.tsx`<Accordion${divider ? '' : ' divider={false}'}${
    defaultExpanded ? ' defaultExpanded' : ''
  }>
  <AccordionSummary${verticalPadding ? ` verticalPadding="${verticalPadding}"` : ''}${renderElementProp(
    'leadingContent',
    leadingContent,
  )}${renderElementProp('trailingContent', trailingContent)}>
    ${heading}
  </AccordionSummary>${
    description || content
      ? figma.tsx`
  <AccordionDetails>${details[0]}${details[1]}
  </AccordionDetails>`
      : ''
  }
</Accordion>`,
  metadata: { nestable: true },
};
