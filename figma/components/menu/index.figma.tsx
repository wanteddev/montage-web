import { figma } from '@figma/code-connect';

import {
  Button,
  Menu,
  MenuActionArea,
  MenuActionAreaContent,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuTrigger,
} from '@montage-ui/core';

figma.connect(Menu, '<FIGMA_MENU>', {
  props: {
    children: figma.children('Cell'),
    actionArea: figma.boolean('Action Area', {
      true: figma.children('Menu Action Area'),
      false: undefined,
    }),
  },
  example: ({ children, actionArea }) => (
    <Menu>
      <MenuTrigger>
        <Button>Trigger</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuList>{children}</MenuList>
        {actionArea}
      </MenuContent>
    </Menu>
  ),
});

const menuItemProps = {
  variant: figma.enum('Variant', {
    Normal: undefined,
    Radio: 'radio',
    Checkbox: 'checkbox',
  }),
  verticalPadding: figma.enum('Vertical Padding', {
    '8px': 'small',
    '12px': undefined,
  }),
  disabled: figma.boolean('Disable'),
  cell: figma.nestedProps('Cell', {
    label: figma.string('Label'),
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
  }),
};

figma.connect(MenuItem, '<FIGMA_MENU_ITEM>', {
  props: menuItemProps,
  variant: {
    Caption: 'False',
  },
  example: ({ cell, ...props }) => (
    <MenuItem
      value={cell.label}
      leadingContent={cell.leadingContent}
      trailingContent={cell.trailingContent}
      labelTrailing={cell.labelTrailing}
      extraContent={cell.extraContent}
      {...props}
    >
      {cell.label}
    </MenuItem>
  ),
});

figma.connect(MenuItem, '<FIGMA_MENU_ITEM>', {
  props: menuItemProps,
  variant: {
    Caption: 'True',
  },
  example: ({ cell, ...props }) => (
    <MenuItem
      value={cell.label}
      textProps={{ description: '설명' }}
      leadingContent={cell.leadingContent}
      trailingContent={cell.trailingContent}
      labelTrailing={cell.labelTrailing}
      extraContent={cell.extraContent}
      {...props}
    >
      {cell.label}
    </MenuItem>
  ),
});

figma.connect(MenuGroup, '<FIGMA_MENU_GROUP_TITLE>', {
  props: {
    title: figma.textContent('제목'),
  },
  example: ({ title }) => <MenuGroup title={title} />,
});

figma.connect(MenuActionArea, '<FIGMA_MENU_ACTION_AREA>', {
  props: {
    leadingContent: figma.boolean('Leading Content', {
      true: figma.instance('┗ Instance'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Trailing Content', {
      true: figma.instance('┗ Instance᠎'),
      false: undefined,
    }),
  },
  example: (props) => <MenuActionArea {...props} />,
});

figma.connect(
  MenuActionAreaContent,
  '<FIGMA_MENU_ACTION_AREA_LEADING_TEXT_BUTTON>',
  {
    props: {
      children: figma.children('Button'),
    },
    example: ({ children }) => (
      <MenuActionAreaContent variant="text-button">
        {children}
      </MenuActionAreaContent>
    ),
  },
);

figma.connect(MenuActionAreaContent, '<FIGMA_MENU_ACTION_AREA_LEADING_BADGE>', {
  props: {
    children: figma.children('Content Badge/Content Badge'),
  },
  example: ({ children }) => (
    <MenuActionAreaContent variant="badge">{children}</MenuActionAreaContent>
  ),
});

figma.connect(
  MenuActionAreaContent,
  '<FIGMA_MENU_ACTION_AREA_LEADING_ICON_BUTTON>',
  {
    props: {
      children: figma.children('Button'),
    },
    example: ({ children }) => (
      <MenuActionAreaContent variant="icon-button">
        {children}
      </MenuActionAreaContent>
    ),
  },
);

figma.connect(MenuActionAreaContent, '<FIGMA_MENU_ACTION_AREA_LEADING_ICON>', {
  props: {
    children: figma.children('Icon'),
  },
  example: ({ children }) => (
    <MenuActionAreaContent variant="icon">{children}</MenuActionAreaContent>
  ),
});

figma.connect(
  MenuActionAreaContent,
  '<FIGMA_MENU_ACTION_AREA_LEADING_CHECKBOX>',
  {
    props: {
      children: figma.children('Control/Checkbox'),
    },
    example: ({ children }) => (
      <MenuActionAreaContent variant="custom">{children}</MenuActionAreaContent>
    ),
  },
);

figma.connect(
  MenuActionAreaContent,
  '<FIGMA_MENU_ACTION_AREA_TRAILING_BUTTON>',
  {
    props: {
      children: figma.children('Button'),
    },
    example: ({ children }) => (
      <MenuActionAreaContent variant="button">{children}</MenuActionAreaContent>
    ),
  },
);

figma.connect(
  MenuActionAreaContent,
  '<FIGMA_MENU_ACTION_AREA_TRAILING_BADGE>',
  {
    props: {
      children: figma.children('Content Badge'),
    },
    example: ({ children }) => (
      <MenuActionAreaContent variant="badge">{children}</MenuActionAreaContent>
    ),
  },
);

figma.connect(
  MenuActionAreaContent,
  '<FIGMA_MENU_ACTION_AREA_TRAILING_ICON_BUTTON>',
  {
    props: {
      children: figma.children('Icon Button'),
    },
    example: ({ children }) => (
      <MenuActionAreaContent variant="icon-button">
        {children}
      </MenuActionAreaContent>
    ),
  },
);
