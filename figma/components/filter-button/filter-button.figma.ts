// url=<FIGMA_FILTER_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/filter-button/index.tsx
// component=FilterButton

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Expanded') === 'False') {
  const children = figma.selectedInstance.getString('Label');
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const active = figma.selectedInstance.getBoolean('Active');
  const size = figma.selectedInstance.getEnum('Size', {
    XSmall: 'xsmall',
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  });
  const variant = figma.selectedInstance.getEnum('Variant', {
    Solid: 'solid',
    Outlined: 'outlined',
  });
  const activeLabel = figma.selectedInstance.getBoolean('Active', {
    true: figma.selectedInstance.getBoolean('Active Label', {
      true: figma.selectedInstance.getString('┗ Text'),
      false: undefined,
    }),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (active && active.type !== 'ERROR') {
    __props['active'] = active;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (variant && variant.type !== 'ERROR') {
    __props['variant'] = variant;
  }
  if (activeLabel && activeLabel.type !== 'ERROR') {
    __props['activeLabel'] = activeLabel;
  }

  template = {
    id: 'FilterButton',
    imports: ["import { FilterButton } from '@montage-ui/core';"],
    example: figma.code`<FilterButton${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'active',
      active,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp(
      'variant',
      variant,
    )}${figma.helpers.react.renderProp(
      'activeLabel',
      activeLabel,
    )}>${figma.helpers.react.renderChildren(children)}</FilterButton>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Expanded') === 'True') {
  const children = figma.selectedInstance.getString('Label');
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const active = figma.selectedInstance.getBoolean('Active');
  const size = figma.selectedInstance.getEnum('Size', {
    XSmall: 'xsmall',
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  });
  const variant = figma.selectedInstance.getEnum('Variant', {
    Solid: 'solid',
    Outlined: 'outlined',
  });
  const activeLabel = figma.selectedInstance.getBoolean('Active', {
    true: figma.selectedInstance.getBoolean('Active Label', {
      true: figma.selectedInstance.getString('┗ Text'),
      false: undefined,
    }),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (active && active.type !== 'ERROR') {
    __props['active'] = active;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (variant && variant.type !== 'ERROR') {
    __props['variant'] = variant;
  }
  if (activeLabel && activeLabel.type !== 'ERROR') {
    __props['activeLabel'] = activeLabel;
  }

  template = {
    id: 'FilterButton',
    imports: ["import { FilterButton } from '@montage-ui/core';"],
    example: figma.code`<FilterButton expanded${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'active',
      active,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp(
      'variant',
      variant,
    )}${figma.helpers.react.renderProp('activeLabel', activeLabel)}>
      ${figma.helpers.react.renderChildren(children)}
    </FilterButton>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'FilterButton',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
