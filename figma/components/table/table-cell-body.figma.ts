// url=<FIGMA_TABLE_CELL_BODY>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/table/index.tsx
// component=TableCell

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (
  figma.selectedInstance.getPropertyValue('Content') === 'Text' &&
  figma.selectedInstance.getPropertyValue('Caption') === false
) {
  const text = figma.selectedInstance.getString('Text');
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }

  template = {
    id: 'TableCell',
    imports: ["import { TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>${figma.helpers.react.renderChildren(
      text,
    )}</TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Content') === 'Text' &&
  figma.selectedInstance.getPropertyValue('Caption') === true
) {
  const text = figma.selectedInstance.getString('Text');
  const caption = figma.selectedInstance.getString('┗ Text');
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (caption && caption.type !== 'ERROR') {
    __props['caption'] = caption;
  }

  template = {
    id: 'TableCell',
    imports: [
      "import { FlexBox, TableCell, Typography } from '@montage-ui/core';",
    ],
    example: figma.code`<TableCell>
      <FlexBox flexDirection="column" gap="2px">
        <Typography variant="label1" weight="regular" color="semantic.foreground.neutral.tertiary">
          ${figma.helpers.react.renderChildren(caption)}
        </Typography>
        ${figma.helpers.react.renderChildren(text)}
      </FlexBox>
    </TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Content') ===
    'Title & Description' &&
  figma.selectedInstance.getPropertyValue('Description') === false
) {
  const text = figma.selectedInstance.getString('Text');
  const icon = figma.selectedInstance.getBoolean('Icon', {
    true: figma.properties.children(['Icon']),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'TableCell',
    imports: [
      "import { FlexBox, TableCell, Typography } from '@montage-ui/core';",
    ],
    example: figma.code`<TableCell>
      <FlexBox alignItems="center" gap="4px">
        ${figma.helpers.react.renderChildren(icon)}
        <Typography variant="label1" weight="medium" color="semantic.foreground.neutral.secondary">
          ${figma.helpers.react.renderChildren(text)}
        </Typography>
      </FlexBox>
    </TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Content') ===
    'Title & Description' &&
  figma.selectedInstance.getPropertyValue('Description') === true
) {
  const text = figma.selectedInstance.getString('Text');
  const description = figma.selectedInstance.getString('┗ Text᠎');
  const icon = figma.selectedInstance.getBoolean('Icon', {
    true: figma.properties.children(['Icon']),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (description && description.type !== 'ERROR') {
    __props['description'] = description;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'TableCell',
    imports: [
      "import { FlexBox, TableCell, Typography } from '@montage-ui/core';",
    ],
    example: figma.code`<TableCell>
      <FlexBox flexDirection="column" gap="2px">
        <FlexBox alignItems="center" gap="4px">
          ${figma.helpers.react.renderChildren(icon)}
          <Typography variant="label1" weight="medium" color="semantic.foreground.neutral.secondary">
            ${figma.helpers.react.renderChildren(text)}
          </Typography>
        </FlexBox>
        <Typography variant="label1" weight="regular" color="semantic.foreground.neutral.tertiary">
          ${figma.helpers.react.renderChildren(description)}
        </Typography>
      </FlexBox>
    </TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Content') === 'Text Button'
) {
  const textButton = figma.properties.children(['Text Button']);
  const __props: Record<string, unknown> = {};
  if (textButton && textButton.type !== 'ERROR') {
    __props['textButton'] = textButton;
  }

  template = {
    id: 'TableCell',
    imports: ["import { TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>${figma.helpers.react.renderChildren(
      textButton,
    )}</TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Button') {
  const button = figma.properties.children(['Button']);
  const __props: Record<string, unknown> = {};
  if (button && button.type !== 'ERROR') {
    __props['button'] = button;
  }

  template = {
    id: 'TableCell',
    imports: ["import { TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>${figma.helpers.react.renderChildren(
      button,
    )}</TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Content') === 'Icon Buttons'
) {
  const iconButtons = figma.properties.children(['Icon Button']);
  const __props: Record<string, unknown> = {};
  if (iconButtons && iconButtons.type !== 'ERROR') {
    __props['iconButtons'] = iconButtons;
  }

  template = {
    id: 'TableCell',
    imports: ["import { FlexBox, TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>
      <FlexBox alignItems="center" gap="16px">
        ${figma.helpers.react.renderChildren(iconButtons)}
      </FlexBox>
    </TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Avatar') {
  const avatarGroup = figma.properties.children(['Avatar Group']);
  const __props: Record<string, unknown> = {};
  if (avatarGroup && avatarGroup.type !== 'ERROR') {
    __props['avatarGroup'] = avatarGroup;
  }

  template = {
    id: 'TableCell',
    imports: ["import { TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>${figma.helpers.react.renderChildren(
      avatarGroup,
    )}</TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Badges') {
  const badges = figma.properties.children(['Badge']);
  const __props: Record<string, unknown> = {};
  if (badges && badges.type !== 'ERROR') {
    __props['badges'] = badges;
  }

  template = {
    id: 'TableCell',
    imports: ["import { FlexBox, TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>
      <FlexBox alignItems="center" gap="2px">
        ${figma.helpers.react.renderChildren(badges)}
      </FlexBox>
    </TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Icons') {
  const icons = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (icons && icons.type !== 'ERROR') {
    __props['icons'] = icons;
  }

  template = {
    id: 'TableCell',
    imports: ["import { FlexBox, TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>
      <FlexBox alignItems="center" gap="8px">
        ${figma.helpers.react.renderChildren(icons)}
      </FlexBox>
    </TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Input') {
  const control = figma.selectedInstance
    .getInstanceSwap('Instance')
    ?.executeTemplate().example;
  const __props: Record<string, unknown> = {};
  if (control && control.type !== 'ERROR') {
    __props['control'] = control;
  }

  template = {
    id: 'TableCell',
    imports: ["import { TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>${figma.helpers.react.renderChildren(
      control,
    )}</TableCell>`,
    metadata: { nestable: true, props: { kind: 'body' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Custom') {
  template = {
    id: 'TableCell',
    imports: ["import { TableCell } from '@montage-ui/core';"],
    example: figma.code`<TableCell>Custom</TableCell>`,
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'TableCell',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true, props: { kind: 'body' } },
  };
}

export default template;
