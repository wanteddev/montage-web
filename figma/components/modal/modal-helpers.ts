import figma from 'figma';

import { joinTemplates } from '../../helpers/list-cell';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;
type ModalVariant = 'popup' | 'bottom' | 'full';

export const SOURCE =
  'https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx';

/** Renders a nested instance with its own Code Connect template, if any. */
export const renderInstance = (instance: InstanceHandle | undefined) =>
  instance && instance.type !== 'ERROR' && instance.hasCodeConnect()
    ? instance.executeTemplate().example
    : undefined;

/** Joins the rendered parts that exist, one per line. */
export const joinParts = (parts: Array<unknown>) => {
  const list = parts.filter(Boolean);
  return list.length > 0 ? joinTemplates(list) : undefined;
};

// `ModalContent` vertical padding defaults per container variant (core docs).
const DEFAULT_VERTICAL_PADDING: Record<ModalVariant, string> = {
  popup: 'none',
  bottom: 'top-only',
  full: 'top-only',
};

/**
 * Renders a `Modal/Resource/Content` instance as `ModalContent`, omitting the
 * paddings that equal the defaults of the given container variant. The slot
 * holds `Modal/Resource/Contents/*` resources, which render `ModalContentItem`.
 */
export const renderModalContent = (
  content: InstanceHandle,
  variant: ModalVariant,
) => {
  if (content.type === 'ERROR') {
    return { code: undefined, usedNames: [] as Array<string> };
  }

  const vertical = content.getEnum('Vertical Padding', {
    None: 'none',
    'Top Only': 'top-only',
    'Bottom Only': 'bottom-only',
    Both: 'both',
  });
  const horizontal = content.getEnum('Horizontal Padding', {
    Both: 'both',
    None: 'none',
  });
  const props =
    (vertical && vertical !== DEFAULT_VERTICAL_PADDING[variant]
      ? ` verticalPadding="${vertical}"`
      : '') + (horizontal === 'none' ? ' horizontalPadding="none"' : '');

  const slot = content.getSlot('Contents');
  const items = slot
    ? slot.connectedInstances
        .filter((item) => item.type !== 'ERROR')
        .map((item) => item.executeTemplate().example)
    : [];
  const usedNames = ['ModalContent'];
  if (items.length === 0) {
    usedNames.push('ModalContentItem');
  }

  return {
    code: figma.tsx`<ModalContent${props}>
${
  items.length > 0
    ? joinTemplates(items)
    : '<ModalContentItem>{/* 콘텐츠 */}</ModalContentItem>'
}
</ModalContent>`,
    usedNames,
  };
};

/** Wraps container parts in the documented `Modal` composition. */
export const renderModal = (
  variant: ModalVariant,
  containerProps: string,
  parts: Array<unknown>,
) => figma.tsx`<Modal>
  <ModalTrigger>
    <Button>Open</Button>
  </ModalTrigger>
  <ModalContainer variant="${variant}"${containerProps}>
${joinParts(parts) ?? ''}
  </ModalContainer>
</Modal>`;

export const modalImport = (names: Array<string>) =>
  `import { ${[...new Set(['Button', 'Modal', 'ModalContainer', 'ModalTrigger', ...names])].sort().join(', ')} } from '@montage-ui/core';`;
