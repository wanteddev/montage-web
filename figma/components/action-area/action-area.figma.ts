// url=<FIGMA_ACTION_AREA>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/action-area/index.tsx
// component=ActionArea

import figma from 'figma';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

// Reads the label of an optional button layer inside the `Actions` resource.
const buttonLabel = (actions: InstanceHandle, layerName: string) => {
  if (actions.type === 'ERROR') {
    return '';
  }
  const button = actions.findInstance(layerName);
  return button.type === 'ERROR' ? '' : button.getString('Label');
};

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Extra') === 'False') {
  const main = (function () {
    // `┗ Main Action` sits inside the nested `Actions` instance.
    const nestedLayer34Actions = figma.selectedInstance.findInstance('Actions');
    const nestedLayer34 =
      nestedLayer34Actions.type === 'ERROR'
        ? nestedLayer34Actions
        : nestedLayer34Actions.findInstance('┗ Main Action');
    return {
      label:
        nestedLayer34.type !== 'ERROR'
          ? nestedLayer34.getString('Label')
          : undefined,
      disabled:
        nestedLayer34.type !== 'ERROR'
          ? nestedLayer34.getBoolean('Disable')
          : undefined,
      loading:
        nestedLayer34.type !== 'ERROR'
          ? nestedLayer34.getBoolean('Loading')
          : undefined,
    };
  })();
  const actions = (function () {
    const nestedLayer35 = figma.selectedInstance.findInstance('Actions');
    return {
      variant:
        nestedLayer35.type !== 'ERROR'
          ? nestedLayer35.getEnum('Variant', {
              Strong: undefined, // core default
              Neutral: 'neutral',
              'Compact (Web Only)': 'compact',
              Cancel: 'cancel',
            })
          : undefined,
      caption:
        nestedLayer35.type !== 'ERROR'
          ? nestedLayer35.getBoolean('Caption', {
              true: nestedLayer35.getString('┗ Text'),
              false: undefined,
            })
          : undefined,
      compactContent:
        nestedLayer35.type !== 'ERROR'
          ? nestedLayer35.getBoolean('Show Compact Content', {
              true: nestedLayer35.__properties__.slot('Compact Content'),
              false: undefined,
            })
          : undefined,
      alternative:
        nestedLayer35.type !== 'ERROR'
          ? nestedLayer35.getBoolean('Alternative Action', {
              true: figma.helpers.react.jsxElement(
                `<ActionAreaButton variant="alternative">${buttonLabel(nestedLayer35, '┗ Alternative Action')}</ActionAreaButton>`,
              ),
              false: undefined,
            })
          : undefined,
      sub:
        nestedLayer35.type !== 'ERROR'
          ? nestedLayer35.getBoolean('Sub Action', {
              true: figma.helpers.react.jsxElement(
                `<ActionAreaButton variant="sub">${buttonLabel(nestedLayer35, '┗ Sub Action')}</ActionAreaButton>`,
              ),
              false: undefined,
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (main && main.type !== 'ERROR') {
    __props['main'] = main;
  }
  if (actions && actions.type !== 'ERROR') {
    __props['actions'] = actions;
  }

  template = {
    id: 'ActionArea',
    imports: [
      "import { ActionArea, ActionAreaButton } from '@montage-ui/core';",
    ],
    example: figma.code`<ActionArea${figma.helpers.react.renderProp(
      'variant',
      actions.variant,
    )}${figma.helpers.react.renderProp(
      'caption',
      actions.caption,
    )}${figma.helpers.react.renderProp(
      'compactContent',
      actions.compactContent,
    )}>
      <ActionAreaButton${figma.helpers.react.renderProp(
        'disabled',
        main.disabled,
      )}${figma.helpers.react.renderProp('loading', main.loading)}>
        ${figma.helpers.react.renderChildren(main.label)}
      </ActionAreaButton>${
        // Only write lines for the buttons that are on (no empty lines).
        actions.alternative
          ? figma.code`
      ${figma.helpers.react.renderChildren(actions.alternative)}`
          : ''
      }${
        actions.sub
          ? figma.code`
      ${figma.helpers.react.renderChildren(actions.sub)}`
          : ''
      }
    </ActionArea>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Extra') === 'True') {
  const divider = figma.selectedInstance.getBoolean('Divider');
  // An empty Extra Content slot only holds a placeholder frame, which Figma
  // would emit as a generated `ExtraContent` function: pass connected content only.
  const extraSlot = figma.properties.slot('Extra Content');
  const extraContent =
    extraSlot && extraSlot.connectedInstances.length > 0
      ? extraSlot
      : undefined;
  const main = (function () {
    // `┗ Main Action` sits inside the nested `Actions` instance.
    const nestedLayer36Actions = figma.selectedInstance.findInstance('Actions');
    const nestedLayer36 =
      nestedLayer36Actions.type === 'ERROR'
        ? nestedLayer36Actions
        : nestedLayer36Actions.findInstance('┗ Main Action');
    return {
      label:
        nestedLayer36.type !== 'ERROR'
          ? nestedLayer36.getString('Label')
          : undefined,
      disabled:
        nestedLayer36.type !== 'ERROR'
          ? nestedLayer36.getBoolean('Disable')
          : undefined,
      loading:
        nestedLayer36.type !== 'ERROR'
          ? nestedLayer36.getBoolean('Loading')
          : undefined,
    };
  })();
  const actions = (function () {
    const nestedLayer37 = figma.selectedInstance.findInstance('Actions');
    return {
      variant:
        nestedLayer37.type !== 'ERROR'
          ? nestedLayer37.getEnum('Variant', {
              Strong: undefined, // core default
              Neutral: 'neutral',
              'Compact (Web Only)': 'compact',
              Cancel: 'cancel',
            })
          : undefined,
      caption:
        nestedLayer37.type !== 'ERROR'
          ? nestedLayer37.getBoolean('Caption', {
              true: nestedLayer37.getString('┗ Text'),
              false: undefined,
            })
          : undefined,
      compactContent:
        nestedLayer37.type !== 'ERROR'
          ? nestedLayer37.getBoolean('Show Compact Content', {
              true: nestedLayer37.__properties__.slot('Compact Content'),
              false: undefined,
            })
          : undefined,
      alternative:
        nestedLayer37.type !== 'ERROR'
          ? nestedLayer37.getBoolean('Alternative Action', {
              true: figma.helpers.react.jsxElement(
                `<ActionAreaButton variant="alternative">${buttonLabel(nestedLayer37, '┗ Alternative Action')}</ActionAreaButton>`,
              ),
              false: undefined,
            })
          : undefined,
      sub:
        nestedLayer37.type !== 'ERROR'
          ? nestedLayer37.getBoolean('Sub Action', {
              true: figma.helpers.react.jsxElement(
                `<ActionAreaButton variant="sub">${buttonLabel(nestedLayer37, '┗ Sub Action')}</ActionAreaButton>`,
              ),
              false: undefined,
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (divider && divider.type !== 'ERROR') {
    __props['divider'] = divider;
  }
  if (extraContent && extraContent.type !== 'ERROR') {
    __props['extraContent'] = extraContent;
  }
  if (main && main.type !== 'ERROR') {
    __props['main'] = main;
  }
  if (actions && actions.type !== 'ERROR') {
    __props['actions'] = actions;
  }

  template = {
    id: 'ActionArea',
    imports: [
      "import { ActionArea, ActionAreaButton } from '@montage-ui/core';",
    ],
    example: figma.code`<ActionArea extra${figma.helpers.react.renderProp(
      'variant',
      actions.variant,
    )}${figma.helpers.react.renderProp(
      'caption',
      actions.caption,
    )}${figma.helpers.react.renderProp(
      'compactContent',
      actions.compactContent,
    )}${
      // `divider` defaults to true in core, so only the off state is written.
      divider === false ? ' divider={false}' : ''
    }${figma.helpers.react.renderProp('extraContent', extraContent)}>
      <ActionAreaButton${figma.helpers.react.renderProp(
        'disabled',
        main.disabled,
      )}${figma.helpers.react.renderProp('loading', main.loading)}>
        ${figma.helpers.react.renderChildren(main.label)}
      </ActionAreaButton>${
        // Only write lines for the buttons that are on (no empty lines).
        actions.alternative
          ? figma.code`
      ${figma.helpers.react.renderChildren(actions.alternative)}`
          : ''
      }${
        actions.sub
          ? figma.code`
      ${figma.helpers.react.renderChildren(actions.sub)}`
          : ''
      }
    </ActionArea>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'ActionArea',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
