import { figma } from '@figma/code-connect';

import {
  Alert,
  AlertActionArea,
  AlertActionAreaButton,
  AlertContainer,
  AlertContent,
  AlertDescription,
  AlertHeading,
  AlertTrigger,
  Button,
} from '@montage-ui/core';

figma.connect(Alert, '<FIGMA_DIALOG>', {
  props: {
    alert: figma.children('Alert'),
  },
  variant: {
    Platform: 'Web',
  },
  example: ({ alert }) => <>{alert}</>,
});

figma.connect(Alert, '<FIGMA_DIALOG_CONTENT>', {
  props: {
    heading: figma.string('┗ Text'),
    description: figma.string('Body'),
    actions: figma.children('Action'),
  },
  variant: {
    Platform: 'Web',
    Heading: true,
  },
  example: ({ heading, description, actions }) => (
    <Alert>
      <AlertTrigger>
        <Button>Trigger</Button>
      </AlertTrigger>
      <AlertContainer>
        <AlertContent>
          <AlertHeading>{heading}</AlertHeading>
          <AlertDescription>{description}</AlertDescription>
        </AlertContent>
        <AlertActionArea>{actions}</AlertActionArea>
      </AlertContainer>
    </Alert>
  ),
});

figma.connect(Alert, '<FIGMA_DIALOG_CONTENT>', {
  props: {
    description: figma.string('Body'),
    actions: figma.children('Action'),
  },
  variant: {
    Platform: 'Web',
    Heading: false,
  },
  example: ({ description, actions }) => (
    <Alert>
      <AlertTrigger>
        <Button>Trigger</Button>
      </AlertTrigger>
      <AlertContainer>
        <AlertContent>
          <AlertDescription>{description}</AlertDescription>
        </AlertContent>
        <AlertActionArea>{actions}</AlertActionArea>
      </AlertContainer>
    </Alert>
  ),
});

figma.connect(AlertActionAreaButton, '<FIGMA_DIALOG_ACTION>', {
  props: {
    variant: figma.enum('Variant', {
      Normal: 'normal',
      Assistive: 'assistive',
      Negative: 'negative',
    }),
    button: figma.nestedProps('Button', {
      label: figma.string('Label'),
      disabled: figma.boolean('Disable'),
    }),
  },
  example: ({ variant, button }) => (
    <AlertActionAreaButton variant={variant} disabled={button.disabled}>
      {button.label}
    </AlertActionAreaButton>
  ),
});
