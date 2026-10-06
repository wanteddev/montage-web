import { figma } from '@figma/code-connect';

import {
  Checkbox,
  FlexBox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Typography,
} from '@montage-ui/core';

figma.connect(Table, '<FIGMA_TABLE>', {
  props: {
    pagination: figma.boolean('Pagination', {
      true: figma.children('Pagination'),
      false: undefined,
    }),
  },
  variant: {
    Content: 'Normal',
  },
  example: (props) => (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableHeadCell>제목</TableHeadCell>
          <TableHeadCell>제목</TableHeadCell>
          <TableHeadCell>제목</TableHeadCell>
          <TableHeadCell>제목</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>텍스트</TableCell>
          <TableCell>텍스트</TableCell>
          <TableCell>텍스트</TableCell>
          <TableCell>텍스트</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
});

figma.connect(Table, '<FIGMA_TABLE>', {
  props: {
    pagination: figma.boolean('Pagination', {
      true: figma.children('Pagination'),
      false: undefined,
    }),
  },
  variant: {
    Content: 'Input',
  },
  example: (props) => (
    <Table {...props}>
      <colgroup>
        <col width="36px" />
        <col width="auto" />
        <col width="auto" />
        <col width="auto" />
        <col width="auto" />
      </colgroup>
      <TableHead>
        <TableRow>
          <TableHeadCell>
            <Checkbox size="small" />
          </TableHeadCell>
          <TableHeadCell>제목</TableHeadCell>
          <TableHeadCell>제목</TableHeadCell>
          <TableHeadCell>제목</TableHeadCell>
          <TableHeadCell>제목</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox size="small" />
          </TableCell>
          <TableCell>텍스트</TableCell>
          <TableCell>텍스트</TableCell>
          <TableCell>텍스트</TableCell>
          <TableCell>텍스트</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
});

figma.connect(TableHeadCell, '<FIGMA_TABLE_CELL_HEAD>', {
  props: {
    text: figma.string('Text'),
  },
  variant: {
    Content: 'Text',
  },
  example: ({ text }) => <TableHeadCell>{text}</TableHeadCell>,
});

figma.connect(TableHeadCell, '<FIGMA_TABLE_CELL_HEAD>', {
  props: {
    text: figma.string('Text'),
    icon: figma.children('Icon'),
  },
  variant: {
    Content: 'Order',
  },
  example: ({ text, icon }) => (
    <TableHeadCell>
      <FlexBox alignItems="center" gap="2px">
        {text}
        {icon}
      </FlexBox>
    </TableHeadCell>
  ),
});

figma.connect(TableHeadCell, '<FIGMA_TABLE_CELL_HEAD>', {
  props: {
    text: figma.string('Text'),
    icon: figma.children('Icon'),
  },
  variant: {
    Content: 'Filter',
  },
  example: ({ text, icon }) => (
    <TableHeadCell>
      <FlexBox alignItems="center" gap="2px">
        {text}
        {icon}
      </FlexBox>
    </TableHeadCell>
  ),
});

figma.connect(TableHeadCell, '<FIGMA_TABLE_CELL_HEAD>', {
  props: {
    control: figma.instance('Instance'),
  },
  variant: {
    Content: 'Input',
  },
  example: ({ control }) => <TableHeadCell>{control}</TableHeadCell>,
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    text: figma.string('Text'),
  },
  variant: {
    Content: 'Text',
    Caption: false,
  },
  example: ({ text }) => <TableCell>{text}</TableCell>,
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    text: figma.string('Text'),
    caption: figma.string('┗ Text'),
  },
  variant: {
    Content: 'Text',
    Caption: true,
  },
  example: ({ text, caption }) => (
    <TableCell>
      <FlexBox flexDirection="column" gap="2px">
        <Typography
          variant="label1"
          weight="regular"
          color="semantic.foreground.neutral.tertiary"
        >
          {caption}
        </Typography>
        {text}
      </FlexBox>
    </TableCell>
  ),
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    text: figma.string('Text'),
    icon: figma.boolean('Icon', {
      true: figma.children('Icon'),
      false: undefined,
    }),
  },
  variant: {
    Content: 'Title & Description',
    Description: false,
  },
  example: ({ text, icon }) => (
    <TableCell>
      <FlexBox alignItems="center" gap="4px">
        {icon}
        <Typography
          variant="label1"
          weight="medium"
          color="semantic.foreground.neutral.secondary"
        >
          {text}
        </Typography>
      </FlexBox>
    </TableCell>
  ),
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    text: figma.string('Text'),
    description: figma.string('┗ Text᠎'),
    icon: figma.boolean('Icon', {
      true: figma.children('Icon'),
      false: undefined,
    }),
  },
  variant: {
    Content: 'Title & Description',
    Description: true,
  },
  example: ({ text, description, icon }) => (
    <TableCell>
      <FlexBox flexDirection="column" gap="2px">
        <FlexBox alignItems="center" gap="4px">
          {icon}
          <Typography
            variant="label1"
            weight="medium"
            color="semantic.foreground.neutral.secondary"
          >
            {text}
          </Typography>
        </FlexBox>
        <Typography
          variant="label1"
          weight="regular"
          color="semantic.foreground.neutral.tertiary"
        >
          {description}
        </Typography>
      </FlexBox>
    </TableCell>
  ),
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    textButton: figma.children('Text Button'),
  },
  variant: {
    Content: 'Text Button',
  },
  example: ({ textButton }) => <TableCell>{textButton}</TableCell>,
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    button: figma.children('Button'),
  },
  variant: {
    Content: 'Button',
  },
  example: ({ button }) => <TableCell>{button}</TableCell>,
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    iconButtons: figma.children('Icon Button'),
  },
  variant: {
    Content: 'Icon Buttons',
  },
  example: ({ iconButtons }) => (
    <TableCell>
      <FlexBox alignItems="center" gap="16px">
        {iconButtons}
      </FlexBox>
    </TableCell>
  ),
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    avatarGroup: figma.children('Avatar Group'),
  },
  variant: {
    Content: 'Avatar',
  },
  example: ({ avatarGroup }) => <TableCell>{avatarGroup}</TableCell>,
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    badges: figma.children('Badge'),
  },
  variant: {
    Content: 'Badges',
  },
  example: ({ badges }) => (
    <TableCell>
      <FlexBox alignItems="center" gap="2px">
        {badges}
      </FlexBox>
    </TableCell>
  ),
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    icons: figma.children('Icon'),
  },
  variant: {
    Content: 'Icons',
  },
  example: ({ icons }) => (
    <TableCell>
      <FlexBox alignItems="center" gap="8px">
        {icons}
      </FlexBox>
    </TableCell>
  ),
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  props: {
    control: figma.instance('Instance'),
  },
  variant: {
    Content: 'Input',
  },
  example: ({ control }) => <TableCell>{control}</TableCell>,
});

figma.connect(TableCell, '<FIGMA_TABLE_CELL_BODY>', {
  variant: {
    Content: 'Custom',
  },
  example: () => <TableCell>Custom</TableCell>,
});
