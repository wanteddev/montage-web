import { figma } from '@figma/code-connect';

import {
  Option,
  OptionGroup,
  Select,
  SelectContent,
  SelectMultiple,
  SelectRenderChip,
} from '@montage-ui/core';

figma.connect(Select, '<FIGMA_SELECT>', {
  props: {
    placeholder: figma.string('Placeholder'),
    leadingContent: figma.boolean('Leading Content', {
      true: figma.slot('\u2517 Leading Content').connectedInstances,
      false: undefined,
    }),
    status: figma.enum('Status', {
      Normal: undefined,
      Negative: 'negative',
    }),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
    }),
  },
  variant: {
    Render: 'Text',
  },
  example: (props) => (
    <Select {...props}>
      <OptionGroup>
        <Option value="1">옵션 1</Option>
        <Option value="2">옵션 2</Option>
      </OptionGroup>
    </Select>
  ),
});

figma.connect(SelectMultiple, '<FIGMA_SELECT>', {
  props: {
    placeholder: figma.string('Placeholder'),
    leadingContent: figma.boolean('Leading Content', {
      true: figma.slot('\u2517 Leading Content').connectedInstances,
      false: undefined,
    }),
    status: figma.enum('Status', {
      Normal: undefined,
      Negative: 'negative',
    }),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
    }),
    overflow: figma.boolean('Overflow'),
  },
  variant: {
    Render: 'Chip',
  },
  example: (props) => (
    <SelectMultiple
      render={(labels) =>
        labels.map((label, index) => (
          <SelectRenderChip key={index}>{label}</SelectRenderChip>
        ))
      }
      {...props}
    >
      <OptionGroup>
        <Option value="1">옵션 1</Option>
        <Option value="2">옵션 2</Option>
      </OptionGroup>
    </SelectMultiple>
  ),
});

figma.connect(SelectContent, '<FIGMA_SELECT_CONTENT_LARGE_ICON>', {
  props: {
    children: figma.children('Icons/Icons'),
  },
  example: ({ children }) => (
    <SelectContent variant="icon">{children}</SelectContent>
  ),
});

figma.connect(SelectContent, '<FIGMA_SELECT_CONTENT_LARGE_ICON_BUTTON>', {
  props: {
    children: figma.children('Icon Button'),
  },
  example: ({ children }) => (
    <SelectContent variant="icon-button">{children}</SelectContent>
  ),
});

figma.connect(SelectContent, '<FIGMA_SELECT_CONTENT_LARGE_CUSTOM>', {
  example: () => <SelectContent variant="custom" />,
});

figma.connect(SelectContent, '<FIGMA_SELECT_CONTENT_MEDIUM_ICON>', {
  props: {
    children: figma.children('Icons/Icons'),
  },
  example: ({ children }) => (
    <SelectContent variant="icon">{children}</SelectContent>
  ),
});

figma.connect(SelectContent, '<FIGMA_SELECT_CONTENT_MEDIUM_ICON_BUTTON>', {
  props: {
    children: figma.children('Icon Button'),
  },
  example: ({ children }) => (
    <SelectContent variant="icon-button">{children}</SelectContent>
  ),
});

figma.connect(SelectContent, '<FIGMA_SELECT_CONTENT_MEDIUM_CUSTOM>', {
  example: () => <SelectContent variant="custom" />,
});
