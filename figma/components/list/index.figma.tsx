import { figma } from '@figma/code-connect';

import {
  ListCell,
  ListCellContent,
  ListCellExtraContent,
  ListCellLabelTrailing,
  Switch,
} from '@montage-ui/core';

figma.connect(ListCell, '<FIGMA_LIST_CELL>', {
  props: {
    children: figma.string('Label'),
    leadingContent: figma.boolean('Show Leading Content', {
      true: figma.slot('Leading Content'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Show Trailing Content', {
      true: figma.slot('Trailing Content'),
      false: undefined,
    }),
    labelTrailing: figma.boolean('Show Label Trailing', {
      true: figma.slot('Label Trailing'),
      false: undefined,
    }),
    extraContent: figma.boolean('Show Extra Content', {
      true: figma.slot('Extra Content'),
      false: undefined,
    }),
    divider: figma.boolean('Divider'),
    disableInteraction: figma.boolean('Interaction', {
      true: undefined,
      false: true,
    }),
    verticalPadding: figma.enum('Vertical Padding', {
      None: 'none',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    variant: figma.enum('Variant', {
      Inset: 'inset',
      Full: 'full',
    }),
    ellipsis: figma.boolean('Text Ellipsis'),
    selected: figma.boolean('Selected'),
    disabled: figma.boolean('Disable'),
  },
  variant: {
    Description: false,
  },
  example: ({ children, ...props }) => (
    <ListCell {...props}>{children}</ListCell>
  ),
});

figma.connect(ListCell, '<FIGMA_LIST_CELL>', {
  props: {
    children: figma.string('Label'),
    leadingContent: figma.boolean('Show Leading Content', {
      true: figma.slot('Leading Content'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Show Trailing Content', {
      true: figma.slot('Trailing Content'),
      false: undefined,
    }),
    labelTrailing: figma.boolean('Show Label Trailing', {
      true: figma.slot('Label Trailing'),
      false: undefined,
    }),
    extraContent: figma.boolean('Show Extra Content', {
      true: figma.slot('Extra Content'),
      false: undefined,
    }),
    divider: figma.boolean('Divider'),
    disableInteraction: figma.boolean('Interaction', {
      true: undefined,
      false: true,
    }),
    verticalPadding: figma.enum('Vertical Padding', {
      None: 'none',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    variant: figma.enum('Variant', {
      Inset: 'inset',
      Full: 'full',
    }),
    ellipsis: figma.boolean('Text Ellipsis'),
    selected: figma.boolean('Selected'),
    disabled: figma.boolean('Disable'),
  },
  variant: {
    Description: true,
  },
  example: ({ children, ...props }) => (
    <ListCell textProps={{ description: '설명' }} {...props}>
      {children}
    </ListCell>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_LEADING_ICON>', {
  props: {
    children: figma.children('Icon'),
  },
  example: ({ children }) => (
    <ListCellContent variant="icon">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_LEADING_RADIO>', {
  props: {
    children: figma.children('Radio'),
  },
  example: ({ children }) => (
    <ListCellContent variant="radio">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_LEADING_CHECKBOX>', {
  props: {
    children: figma.children('Checkbox'),
  },
  example: ({ children }) => (
    <ListCellContent variant="checkbox">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_LEADING_AVATAR>', {
  props: {
    children: figma.children('Avatar'),
  },
  example: ({ children }) => (
    <ListCellContent variant="avatar">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_LEADING_LARGE_ICON>', {
  props: {
    children: figma.children('Icon'),
  },
  example: ({ children }) => (
    <ListCellContent variant="large-icon">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_LEADING_THUMBNAIL>', {
  props: {
    children: figma.children('Thumbnail'),
  },
  example: ({ children }) => (
    <ListCellContent variant="thumbnail">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_ICON_BUTTON>', {
  props: {
    children: figma.children('Icon Button'),
  },
  example: ({ children }) => (
    <ListCellContent variant="icon-button">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_ICON>', {
  props: {
    children: figma.children('Icons'),
  },
  example: ({ children }) => (
    <ListCellContent variant="icon">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_TEXT_BUTTON>', {
  props: {
    children: figma.children('Text Button/Text Button'),
  },
  example: ({ children }) => (
    <ListCellContent variant="text-button">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_CONTENT_BADGE>', {
  props: {
    children: figma.children('Content Badge/Content Badge'),
  },
  example: ({ children }) => (
    <ListCellContent variant="content-badge">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_TOGGLE_ICON>', {
  props: {
    children: figma.children('Toggle Icon/Toggle Icon'),
  },
  example: ({ children }) => (
    <ListCellContent variant="toggle-icon">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_BUTTON>', {
  props: {
    children: figma.children('Button/Button'),
  },
  example: ({ children }) => (
    <ListCellContent variant="button">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_SWITCH>', {
  props: {
    children: figma.children('Switch'),
  },
  example: ({ children }) => (
    <ListCellContent variant="switch">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_CHECK>', {
  props: {
    children: figma.children('Icon/Normal/Check'),
  },
  example: ({ children }) => (
    <ListCellContent variant="icon">{children}</ListCellContent>
  ),
});

figma.connect(ListCellContent, '<FIGMA_LIST_CELL_TRAILING_VALUE>', {
  props: {
    children: figma.string('Text'),
  },
  example: ({ children }) => (
    <ListCellContent variant="value">{children}</ListCellContent>
  ),
});

figma.connect(
  ListCellLabelTrailing,
  '<FIGMA_LIST_CELL_LABEL_TRAILING_CONTENT_BADGE>',
  {
    props: {
      children: figma.children('Content Badge/Content Badge'),
    },
    example: ({ children }) => (
      <ListCellLabelTrailing variant="content-badge">
        {children}
      </ListCellLabelTrailing>
    ),
  },
);

figma.connect(
  ListCellLabelTrailing,
  '<FIGMA_LIST_CELL_LABEL_TRAILING_VERIFIED_CHECK>',
  {
    example: () => <ListCellLabelTrailing variant="verified-check" />,
  },
);

figma.connect(
  ListCellExtraContent,
  '<FIGMA_LIST_CELL_EXTRA_CONTENT_CONTENT_BADGE>',
  {
    props: {
      children: figma.children('Content Badge/Content Badge'),
    },
    example: ({ children }) => (
      <ListCellExtraContent variant="content-badge">
        {children}
      </ListCellExtraContent>
    ),
  },
);

figma.connect(ListCellExtraContent, '<FIGMA_LIST_CELL_EXTRA_CONTENT_TEXT>', {
  props: {
    children: figma.textContent('설명'),
  },
  example: ({ children }) => (
    <ListCellExtraContent variant="text">{children}</ListCellExtraContent>
  ),
});

figma.connect(Switch, '<FIGMA_SWITCH_RESOURCE>', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
    checked: figma.boolean('Active'),
    disabled: figma.boolean('Disable'),
  },
  example: (props) => <Switch {...props} />,
});
