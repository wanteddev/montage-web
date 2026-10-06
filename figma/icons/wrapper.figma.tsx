import { figma } from '@figma/code-connect';

figma.connect('<FIGMA_ICONS_WRAPPER>', {
  props: {
    icon: figma.instance('Icon'),
  },
  example: ({ icon }) => <>{icon}</>,
});

figma.connect('<FIGMA_ICONS_WRAPPER_RESPONSIVE>', {
  props: {
    icon: figma.instance('Icon'),
  },
  example: ({ icon }) => <>{icon}</>,
});
