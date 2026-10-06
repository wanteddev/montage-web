import { figma } from '@figma/code-connect';

import {
  Snackbar,
  SnackbarAction,
  SnackbarCloseButton,
  SnackbarContent,
  SnackbarDescription,
  SnackbarExtraContent,
  SnackbarHeading,
} from '@montage-ui/core';

figma.connect(Snackbar, '<FIGMA_SNACKBAR>', {
  props: {
    heading: figma.string('\u2517 Text'),
    description: figma.string('\u2517 Text\u200B'),
    action: figma.nestedProps('Button', {
      label: figma.string('Label'),
    }),
    closeButton: figma.boolean('Close Button', {
      true: <SnackbarCloseButton />,
      false: undefined,
    }),
    icon: figma.children('Icon'),
  },
  variant: {
    'Leading Icon': true,
    Description: true,
  },
  example: ({ heading, description, action, closeButton, icon }) => (
    <Snackbar>
      <SnackbarContent
        extraContent={<SnackbarExtraContent>{icon}</SnackbarExtraContent>}
      >
        <SnackbarHeading>{heading}</SnackbarHeading>
        <SnackbarDescription>{description}</SnackbarDescription>
      </SnackbarContent>
      <SnackbarAction>{action.label}</SnackbarAction>
      {closeButton}
    </Snackbar>
  ),
});

figma.connect(Snackbar, '<FIGMA_SNACKBAR>', {
  props: {
    heading: figma.string('\u2517 Text'),
    action: figma.nestedProps('Button', {
      label: figma.string('Label'),
    }),
    closeButton: figma.boolean('Close Button', {
      true: <SnackbarCloseButton />,
      false: undefined,
    }),
    icon: figma.children('Icon'),
  },
  variant: {
    'Leading Icon': true,
    Description: false,
  },
  example: ({ heading, action, closeButton, icon }) => (
    <Snackbar>
      <SnackbarContent
        extraContent={<SnackbarExtraContent>{icon}</SnackbarExtraContent>}
      >
        <SnackbarHeading>{heading}</SnackbarHeading>
      </SnackbarContent>
      <SnackbarAction>{action.label}</SnackbarAction>
      {closeButton}
    </Snackbar>
  ),
});

figma.connect(Snackbar, '<FIGMA_SNACKBAR>', {
  props: {
    heading: figma.string('\u2517 Text'),
    description: figma.string('\u2517 Text\u200B'),
    action: figma.nestedProps('Button', {
      label: figma.string('Label'),
    }),
    closeButton: figma.boolean('Close Button', {
      true: <SnackbarCloseButton />,
      false: undefined,
    }),
  },
  variant: {
    'Leading Icon': false,
    Description: true,
  },
  example: ({ heading, description, action, closeButton }) => (
    <Snackbar>
      <SnackbarContent>
        <SnackbarHeading>{heading}</SnackbarHeading>
        <SnackbarDescription>{description}</SnackbarDescription>
      </SnackbarContent>
      <SnackbarAction>{action.label}</SnackbarAction>
      {closeButton}
    </Snackbar>
  ),
});

figma.connect(Snackbar, '<FIGMA_SNACKBAR>', {
  props: {
    heading: figma.string('\u2517 Text'),
    action: figma.nestedProps('Button', {
      label: figma.string('Label'),
    }),
    closeButton: figma.boolean('Close Button', {
      true: <SnackbarCloseButton />,
      false: undefined,
    }),
  },
  variant: {
    'Leading Icon': false,
    Description: false,
  },
  example: ({ heading, action, closeButton }) => (
    <Snackbar>
      <SnackbarContent>
        <SnackbarHeading>{heading}</SnackbarHeading>
      </SnackbarContent>
      <SnackbarAction>{action.label}</SnackbarAction>
      {closeButton}
    </Snackbar>
  ),
});
