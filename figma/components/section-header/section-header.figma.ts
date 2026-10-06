// url=<FIGMA_SECTION_HEADER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/section-header/index.tsx
// component=SectionHeader

import figma from 'figma';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

const instance = figma.selectedInstance;
const coreNames = new Set(['SectionHeader']);
const iconNames = new Set<string>();

// Slot contents are `Section Header/Resource/*` wrappers without their own
// Code Connect; render the component they wrap instead.
const renderSlotResource = (layer: InstanceHandle) => {
  if (layer.type === 'ERROR') {
    return undefined;
  }

  if (layer.findInstance('Leading Button').type !== 'ERROR') {
    coreNames.add('SectionHeaderNavigation');
    coreNames.add('SectionHeaderNavigationButton');
    iconNames.add('IconChevronLeftSmall');
    iconNames.add('IconChevronRightSmall');
    return figma.tsx`<SectionHeaderNavigation>
  <SectionHeaderNavigationButton>
    <IconChevronLeftSmall />
  </SectionHeaderNavigationButton>
  <SectionHeaderNavigationButton>
    <IconChevronRightSmall />
  </SectionHeaderNavigationButton>
</SectionHeaderNavigation>`;
  }

  for (const name of ['Chip', 'Icon Button', 'Text Button', 'Button']) {
    const inner = layer.findInstance(name);
    if (inner.type !== 'ERROR' && inner.hasCodeConnect()) {
      return inner.executeTemplate().example;
    }
  }
  return undefined;
};

const headingContent =
  instance.getPropertyValue('Show Heading Content') === 'True'
    ? renderSlotResource(instance.findInstance('Leading Content'))
    : undefined;
const trailingContent =
  instance.getBoolean('Show Trailing Content') === true
    ? renderSlotResource(instance.findInstance('Trailing Content'))
    : undefined;
const platform = instance.getEnum('Platform', {
  Desktop: 'desktop',
  Mobile: 'mobile',
});
const size = instance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});

const imports = [
  `import { ${[...coreNames].sort().join(', ')} } from '@montage-ui/core';`,
];
if (iconNames.size > 0) {
  imports.push(
    `import { ${[...iconNames].sort().join(', ')} } from '@montage-ui/icon';`,
  );
}

export default {
  id: 'SectionHeader',
  imports,
  example: figma.tsx`<SectionHeader${platform ? ` platform="${platform}"` : ''}${
    size ? ` size="${size}"` : ''
  }${headingContent ? figma.tsx` headingContent={${headingContent}}` : ''}${
    trailingContent ? figma.tsx` trailingContent={${trailingContent}}` : ''
  }>
  ${instance.getString('Heading')}
</SectionHeader>`,
  metadata: { nestable: true },
};
