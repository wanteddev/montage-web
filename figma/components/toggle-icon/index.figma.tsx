import { figma } from '@figma/code-connect';

import { ToggleIcon } from '@montage-ui/core';

figma.connect(ToggleIcon, '<FIGMA_TOGGLE_ICON>', {
  props: {
    children: figma.instance('Icon'),
    active: figma.boolean('Active'),
  },
  example: ({ children, ...props }) => (
    <ToggleIcon {...props}>{children}</ToggleIcon>
  ),
});
