import { figma } from '@figma/code-connect';

import {
  Autocomplete,
  AutocompleteField,
  AutocompleteGroup,
  AutocompleteList,
  AutocompleteOption,
  TextField,
} from '@montage-ui/core';

const autocompleteProps = {
  options: figma.children('Cell'),
  directInput: figma.boolean('Direct Input', {
    true: figma.children('Action Button'),
    false: undefined,
  }),
  title: figma.nestedProps('Title', {
    text: figma.textContent('제목'),
  }),
};

figma.connect(Autocomplete, '<FIGMA_AUTOCOMPLETE>', {
  props: autocompleteProps,
  variant: {
    'Direct Input Position': 'Top',
    Title: false,
  },
  example: ({ options, directInput }) => (
    <Autocomplete>
      <AutocompleteField>
        <TextField />
      </AutocompleteField>
      <AutocompleteList>
        {directInput}
        {options}
      </AutocompleteList>
    </Autocomplete>
  ),
});

figma.connect(Autocomplete, '<FIGMA_AUTOCOMPLETE>', {
  props: autocompleteProps,
  variant: {
    'Direct Input Position': 'Bottom',
    Title: false,
  },
  example: ({ options, directInput }) => (
    <Autocomplete>
      <AutocompleteField>
        <TextField />
      </AutocompleteField>
      <AutocompleteList>
        {options}
        {directInput}
      </AutocompleteList>
    </Autocomplete>
  ),
});

figma.connect(Autocomplete, '<FIGMA_AUTOCOMPLETE>', {
  props: autocompleteProps,
  variant: {
    'Direct Input Position': 'Top',
    Title: true,
  },
  example: ({ options, directInput, title }) => (
    <Autocomplete>
      <AutocompleteField>
        <TextField />
      </AutocompleteField>
      <AutocompleteList>
        {directInput}
        <AutocompleteGroup title={title.text}>{options}</AutocompleteGroup>
      </AutocompleteList>
    </Autocomplete>
  ),
});

figma.connect(Autocomplete, '<FIGMA_AUTOCOMPLETE>', {
  props: autocompleteProps,
  variant: {
    'Direct Input Position': 'Bottom',
    Title: true,
  },
  example: ({ options, directInput, title }) => (
    <Autocomplete>
      <AutocompleteField>
        <TextField />
      </AutocompleteField>
      <AutocompleteList>
        <AutocompleteGroup title={title.text}>{options}</AutocompleteGroup>
        {directInput}
      </AutocompleteList>
    </Autocomplete>
  ),
});

const optionProps = {
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

figma.connect(AutocompleteOption, '<FIGMA_AUTOCOMPLETE_OPTION>', {
  props: optionProps,
  variant: {
    Variant: 'Normal',
  },
  example: ({ cell }) => (
    <AutocompleteOption
      value={cell.label}
      leadingContent={cell.leadingContent}
      trailingContent={cell.trailingContent}
      labelTrailing={cell.labelTrailing}
      extraContent={cell.extraContent}
    >
      {cell.label}
    </AutocompleteOption>
  ),
});

figma.connect(AutocompleteOption, '<FIGMA_AUTOCOMPLETE_OPTION>', {
  props: optionProps,
  variant: {
    Variant: 'Search',
  },
  example: ({ cell }) => (
    <AutocompleteOption
      value={cell.label}
      leadingContent={cell.leadingContent}
      trailingContent={cell.trailingContent}
      labelTrailing={cell.labelTrailing}
      extraContent={cell.extraContent}
    >
      {cell.label}
    </AutocompleteOption>
  ),
});

figma.connect(AutocompleteOption, '<FIGMA_AUTOCOMPLETE_OPTION>', {
  props: optionProps,
  variant: {
    Variant: 'Avatar',
  },
  example: ({ cell }) => (
    <AutocompleteOption
      value={cell.label}
      leadingContent={cell.leadingContent}
      trailingContent={cell.trailingContent}
      labelTrailing={cell.labelTrailing}
      extraContent={cell.extraContent}
    >
      {cell.label}
    </AutocompleteOption>
  ),
});

figma.connect(AutocompleteOption, '<FIGMA_AUTOCOMPLETE_OPTION>', {
  props: optionProps,
  variant: {
    Variant: 'Thumbnail',
  },
  example: ({ cell }) => (
    <AutocompleteOption
      value={cell.label}
      leadingContent={cell.leadingContent}
      trailingContent={cell.trailingContent}
      labelTrailing={cell.labelTrailing}
      extraContent={cell.extraContent}
    >
      {cell.label}
    </AutocompleteOption>
  ),
});

figma.connect(AutocompleteGroup, '<FIGMA_AUTOCOMPLETE_GROUP_TITLE>', {
  props: {
    title: figma.textContent('제목'),
  },
  example: ({ title }) => <AutocompleteGroup title={title} />,
});

figma.connect(AutocompleteOption, '<FIGMA_AUTOCOMPLETE_DIRECT_INPUT>', {
  props: {
    label: figma.textContent('‘작성영역’ 사용하기'),
    leadingContent: figma.children('Leading Content'),
  },
  example: ({ label, leadingContent }) => (
    <AutocompleteOption value="" leadingContent={leadingContent}>
      {label}
    </AutocompleteOption>
  ),
});
