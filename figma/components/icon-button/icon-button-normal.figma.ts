// url=<FIGMA_ICON_BUTTON_NORMAL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/icon-button/index.tsx
// component=IconButton

import figma from 'figma';

import { pushBadgeProps } from '../../helpers/push-badge';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Badge') === false) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Xlarge: 'xlarge',
    Large: 'large',
    Medium: 'medium',
    Small: 'small',
  });
  const interactionOverflow = figma.selectedInstance.getBoolean(
    'Interaction Overflow',
  );
  const interactionEffect = figma.selectedInstance.getEnum(
    'Interaction Effect',
    {
      Highlight: undefined,
      Dim: 'dim',
      None: 'none',
    },
  );
  const children = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (interactionOverflow && interactionOverflow.type !== 'ERROR') {
    __props['interactionOverflow'] = interactionOverflow;
  }
  if (interactionEffect && interactionEffect.type !== 'ERROR') {
    __props['interactionEffect'] = interactionEffect;
  }
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'IconButton',
    imports: ["import { IconButton } from '@montage-ui/core';"],
    example: figma.code`<IconButton variant="normal"${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp(
      'interactionOverflow',
      interactionOverflow,
    )}${figma.helpers.react.renderProp('interactionEffect', interactionEffect)}>
      ${figma.helpers.react.renderChildren(children)}
    </IconButton>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Badge') === true) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Xlarge: 'xlarge',
    Large: 'large',
    Medium: 'medium',
    Small: 'small',
  });
  const interactionOverflow = figma.selectedInstance.getBoolean(
    'Interaction Overflow',
  );
  const interactionEffect = figma.selectedInstance.getEnum(
    'Interaction Effect',
    {
      Highlight: undefined,
      Dim: 'dim',
      None: 'none',
    },
  );
  const children = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (interactionOverflow && interactionOverflow.type !== 'ERROR') {
    __props['interactionOverflow'] = interactionOverflow;
  }
  if (interactionEffect && interactionEffect.type !== 'ERROR') {
    __props['interactionEffect'] = interactionEffect;
  }
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'IconButton',
    imports: ["import { IconButton, PushBadge } from '@montage-ui/core';"],
    example: figma.code`<PushBadge${pushBadgeProps(
      figma.selectedInstance.findInstance('Push Badge'),
    )}>
  <IconButton variant="normal"${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'interactionOverflow',
    interactionOverflow,
  )}${figma.helpers.react.renderProp('interactionEffect', interactionEffect)}>
    ${figma.helpers.react.renderChildren(children)}
  </IconButton>
</PushBadge>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'IconButton',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
