import { figma } from '@figma/code-connect';

import {
  Toast,
  ToastContainer,
  ToastContent,
  ToastIcon,
} from '@montage-ui/core';

figma.connect(Toast, '<FIGMA_TOAST>', {
  props: {
    text: figma.string('Text'),
    icon: figma.children('Icon'),
  },
  variant: {
    Variant: 'Normal',
    'Leading Icon': true,
  },
  example: ({ text, icon }) => (
    <Toast variant="normal">
      <ToastContainer>
        <ToastIcon>{icon}</ToastIcon>
        <ToastContent>{text}</ToastContent>
      </ToastContainer>
    </Toast>
  ),
});

figma.connect(Toast, '<FIGMA_TOAST>', {
  props: {
    text: figma.string('Text'),
  },
  variant: {
    Variant: 'Normal',
    'Leading Icon': false,
  },
  example: ({ text }) => (
    <Toast variant="normal">
      <ToastContainer>
        <ToastContent>{text}</ToastContent>
      </ToastContainer>
    </Toast>
  ),
});

figma.connect(Toast, '<FIGMA_TOAST>', {
  props: {
    text: figma.string('Text'),
    icon: figma.boolean('Leading Icon', {
      true: <ToastIcon />,
      false: undefined,
    }),
  },
  variant: {
    Variant: 'Positive',
  },
  example: ({ text, icon }) => (
    <Toast variant="positive">
      <ToastContainer>
        {icon}
        <ToastContent>{text}</ToastContent>
      </ToastContainer>
    </Toast>
  ),
});

figma.connect(Toast, '<FIGMA_TOAST>', {
  props: {
    text: figma.string('Text'),
    icon: figma.boolean('Leading Icon', {
      true: <ToastIcon />,
      false: undefined,
    }),
  },
  variant: {
    Variant: 'Cautionary',
  },
  example: ({ text, icon }) => (
    <Toast variant="cautionary">
      <ToastContainer>
        {icon}
        <ToastContent>{text}</ToastContent>
      </ToastContainer>
    </Toast>
  ),
});

figma.connect(Toast, '<FIGMA_TOAST>', {
  props: {
    text: figma.string('Text'),
    icon: figma.boolean('Leading Icon', {
      true: <ToastIcon />,
      false: undefined,
    }),
  },
  variant: {
    Variant: 'Negative',
  },
  example: ({ text, icon }) => (
    <Toast variant="negative">
      <ToastContainer>
        {icon}
        <ToastContent>{text}</ToastContent>
      </ToastContainer>
    </Toast>
  ),
});
