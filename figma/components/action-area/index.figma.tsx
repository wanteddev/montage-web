import { figma } from '@figma/code-connect';

import { ActionArea, ActionAreaButton } from '@montage-ui/core';

figma.connect(ActionArea, '<FIGMA_ACTION_AREA>', {
  props: {
    main: figma.nestedProps('┗ Main Action', {
      label: figma.string('Label'),
      disabled: figma.boolean('Disable'),
      loading: figma.boolean('Loading'),
    }),
    actions: figma.nestedProps('Actions', {
      variant: figma.enum('Variant', {
        Strong: 'strong',
        Neutral: 'neutral',
        'Compact (Web Only)': 'compact',
        Cancel: 'cancel',
      }),
      caption: figma.boolean('Caption', {
        true: figma.string('┗ Text'),
        false: undefined,
      }),
      compactContent: figma.boolean('Show Compact Content', {
        true: figma.slot('Compact Content'),
        false: undefined,
      }),
      alternative: figma.boolean('Alternative Action', {
        true: <ActionAreaButton variant="alternative">텍스트</ActionAreaButton>,
        false: undefined,
      }),
      sub: figma.boolean('Sub Action', {
        true: <ActionAreaButton variant="sub">텍스트</ActionAreaButton>,
        false: undefined,
      }),
    }),
  },
  variant: {
    Extra: 'False',
  },
  example: ({ main, actions }) => (
    <ActionArea
      variant={actions.variant}
      caption={actions.caption}
      compactContent={actions.compactContent}
    >
      <ActionAreaButton
        variant="main"
        disabled={main.disabled}
        loading={main.loading}
      >
        {main.label}
      </ActionAreaButton>
      {actions.alternative}
      {actions.sub}
    </ActionArea>
  ),
});

figma.connect(ActionArea, '<FIGMA_ACTION_AREA>', {
  props: {
    divider: figma.boolean('Divider'),
    extraContent: figma.slot('Extra Content'),
    main: figma.nestedProps('┗ Main Action', {
      label: figma.string('Label'),
      disabled: figma.boolean('Disable'),
      loading: figma.boolean('Loading'),
    }),
    actions: figma.nestedProps('Actions', {
      variant: figma.enum('Variant', {
        Strong: 'strong',
        Neutral: 'neutral',
        'Compact (Web Only)': 'compact',
        Cancel: 'cancel',
      }),
      caption: figma.boolean('Caption', {
        true: figma.string('┗ Text'),
        false: undefined,
      }),
      compactContent: figma.boolean('Show Compact Content', {
        true: figma.slot('Compact Content'),
        false: undefined,
      }),
      alternative: figma.boolean('Alternative Action', {
        true: <ActionAreaButton variant="alternative">텍스트</ActionAreaButton>,
        false: undefined,
      }),
      sub: figma.boolean('Sub Action', {
        true: <ActionAreaButton variant="sub">텍스트</ActionAreaButton>,
        false: undefined,
      }),
    }),
  },
  variant: {
    Extra: 'True',
  },
  example: ({ main, actions, ...props }) => (
    <ActionArea
      extra
      variant={actions.variant}
      caption={actions.caption}
      compactContent={actions.compactContent}
      {...props}
    >
      <ActionAreaButton
        variant="main"
        disabled={main.disabled}
        loading={main.loading}
      >
        {main.label}
      </ActionAreaButton>
      {actions.alternative}
      {actions.sub}
    </ActionArea>
  ),
});
