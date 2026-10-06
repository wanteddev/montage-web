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

// Nested imports are only forwarded one level, so collect them explicitly.
const nestedImports = new Set<string>();

// Leading: the `Leading Icon` toggle shows an icon wrapper inside `Leading Content`.
// It is the first `Icon` layer in the tree, so fall back to a plain lookup when
// the `path` selector is not supported.
const findLeadingIcon = () => {
  const byPath = figma.selectedInstance.findInstance('Icon', {
    path: ['Leading Content'],
  });
  return byPath.type === 'ERROR'
    ? figma.selectedInstance.findInstance('Icon')
    : byPath;
};
const leadingIcon =
  figma.selectedInstance.getBoolean('Leading Icon') === true
    ? findLeadingIcon()
    : undefined;
const leadingRendered =
  leadingIcon && leadingIcon.type !== 'ERROR'
    ? leadingIcon.executeTemplate()
    : undefined;
(
  (leadingRendered?.metadata?.props?.imports as Array<string> | undefined) ?? []
).forEach((statement) => nestedImports.add(statement));
const leadingContent = leadingRendered
  ? figma.tsx`<${summaryContent} variant="icon">${leadingRendered.example}</${summaryContent}>`
  : undefined;

// Trailing: an instance swap per expand state. The default chevron resource has
// no Code Connect, which leaves `trailingContent` empty so the core chevron renders.
const trailingSwap = figma.selectedInstance.getInstanceSwap(
  figma.selectedInstance.getBoolean('Expand')
    ? 'Trailing Content\u180E'
    : 'Trailing Content',
);
const trailingContent = trailingSwap
  ? renderPreset(trailingSwap, summaryContent, '', nestedImports)
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
// `large` is the AccordionSummary default.
const verticalPadding = figma.selectedInstance.getEnum('Vertical Padding', {
  Small: 'small',
  Medium: 'medium',
  Large: undefined,
});
// Fill Width stretches the summary to the full width (docs: Padding › variant="full").
const fullWidth =
  figma.selectedInstance.getPropertyValue('Fill Width') === 'True';

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
      ...nestedImports,
    ]),
  ],
  // `divider` defaults to true in core, so only the off state is written out.
  example: figma.tsx`<Accordion${divider ? '' : ' divider={false}'}${
    defaultExpanded ? ' defaultExpanded' : ''
  }>
  <AccordionSummary${fullWidth ? ' variant="full"' : ''}${verticalPadding ? ` verticalPadding="${verticalPadding}"` : ''}${renderElementProp(
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
