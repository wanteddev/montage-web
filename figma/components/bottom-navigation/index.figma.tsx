import { figma } from '@figma/code-connect';

import { BottomNavigation, BottomNavigationItem } from '@montage-ui/core';

figma.connect(BottomNavigation, '<FIGMA_BOTTOM_NAVIGATION>', {
  props: {
    children: figma.children('Content'),
  },
  variant: {
    Platform: 'Web Mobile',
  },
  example: ({ children }) => <BottomNavigation>{children}</BottomNavigation>,
});

figma.connect('<FIGMA_BOTTOM_NAVIGATION_CONTENT>', {
  props: {
    items: figma.children(['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5']),
  },
  example: ({ items }) => <>{items}</>,
});

figma.connect(BottomNavigationItem, '<FIGMA_BOTTOM_NAVIGATION_ITEM>', {
  props: {
    label: figma.textContent('Value'),
    icon: figma.children('Icon'),
  },
  example: ({ label, icon }) => (
    <BottomNavigationItem value="value" label={label} icon={icon} />
  ),
});
