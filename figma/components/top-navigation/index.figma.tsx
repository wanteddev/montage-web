import { figma } from '@figma/code-connect';

import { TopNavigation, TopNavigationButton } from '@montage-ui/core';

figma.connect(TopNavigation, '<FIGMA_TOP_NAVIGATION>', {
  props: {
    background: figma.boolean('Background'),
    toolbar: figma.boolean('Tool Bar', {
      true: figma.instance('┗ Instance'),
      false: undefined,
    }),
    bar: figma.nestedProps('Bar', {
      title: figma.boolean('Title ', {
        true: figma.string(' ┗ Text'),
        false: undefined,
      }),
      leadingContent: figma.boolean('┗ Leading Button', {
        true: figma.children('Top Navigation/Resource/Leading/Normal/Default'),
        false: undefined,
      }),
      trailingContent: figma.boolean('┗ Trailing Button', {
        true: figma.children('Trailing Button'),
        false: undefined,
      }),
    }),
  },
  variant: {
    Platform: 'Web',
    Variant: 'Normal',
  },
  example: ({ bar, ...props }) => (
    <TopNavigation
      variant="normal"
      leadingContent={bar.leadingContent}
      trailingContent={bar.trailingContent}
      {...props}
    >
      {bar.title}
    </TopNavigation>
  ),
});

figma.connect(TopNavigation, '<FIGMA_TOP_NAVIGATION>', {
  props: {
    background: figma.boolean('Background'),
    toolbar: figma.boolean('Tool Bar', {
      true: figma.instance('┗ Instance'),
      false: undefined,
    }),
    bar: figma.nestedProps('Bar', {
      title: figma.boolean('┗ Title ', {
        true: figma.string(' ┗ Text'),
        false: undefined,
      }),
      trailingButton: figma.boolean('┗ Trailing Button', {
        true: figma.children('Trailing Button'),
        false: undefined,
      }),
      avatar: figma.boolean('┗ Avatar', {
        true: figma.children('Avatar'),
        false: undefined,
      }),
    }),
  },
  variant: {
    Platform: 'Web',
    Variant: 'Display',
  },
  example: ({ bar, ...props }) => (
    <TopNavigation
      variant="display"
      trailingContent={
        <>
          {bar.trailingButton}
          {bar.avatar}
        </>
      }
      {...props}
    >
      {bar.title}
    </TopNavigation>
  ),
});

figma.connect(TopNavigation, '<FIGMA_TOP_NAVIGATION>', {
  props: {
    background: figma.boolean('Background'),
    toolbar: figma.boolean('Tool Bar', {
      true: figma.instance('┗ Instance'),
      false: undefined,
    }),
    bar: figma.nestedProps('Bar', {
      leadingContent: figma.boolean('┗ Leading Button', {
        true: figma.children('Leading Button'),
        false: undefined,
      }),
      trailingContent: figma.boolean('┗ Trailing Button', {
        true: figma.children('Trailing Button'),
        false: undefined,
      }),
      searchField: figma.children('Search field'),
    }),
  },
  variant: {
    Platform: 'Web',
    Variant: 'Search',
  },
  example: ({ bar, ...props }) => (
    <TopNavigation
      variant="search"
      leadingContent={bar.leadingContent}
      trailingContent={bar.trailingContent}
      {...props}
    >
      {bar.searchField}
    </TopNavigation>
  ),
});

figma.connect(TopNavigation, '<FIGMA_TOP_NAVIGATION>', {
  props: {
    background: figma.boolean('Background'),
    bar: figma.nestedProps('Nav Bar', {
      title: figma.boolean('Title', {
        true: figma.textContent('Title'),
        false: undefined,
      }),
      leadingContent: figma.boolean('┗ Leading Button', {
        true: figma.children('Top Navigation/Resource/Leading/Float/Default'),
        false: undefined,
      }),
      trailingContent: figma.boolean('┗ Trailing Button', {
        true: figma.children('Trailing Button'),
        false: undefined,
      }),
    }),
  },
  variant: {
    Platform: 'Web',
    Variant: 'Floating',
  },
  example: ({ bar, ...props }) => (
    <TopNavigation
      variant="floating"
      leadingContent={bar.leadingContent}
      trailingContent={bar.trailingContent}
      {...props}
    >
      {bar.title}
    </TopNavigation>
  ),
});

// Leading 버튼 (Normal / Float 공통 구조)
figma.connect(TopNavigationButton, '<FIGMA_TOP_NAVIGATION_LEADING_NORMAL>', {
  variant: { Type: 'Back' },
  example: () => <TopNavigationButton variant="back-button" />,
});

figma.connect(TopNavigationButton, '<FIGMA_TOP_NAVIGATION_LEADING_NORMAL>', {
  props: {
    icon: figma.nestedProps('Icon', {
      children: figma.children('Icon'),
    }),
  },
  variant: { Type: 'Icon Button' },
  example: ({ icon }) => (
    <TopNavigationButton variant="icon-button">
      {icon.children}
    </TopNavigationButton>
  ),
});

figma.connect(TopNavigationButton, '<FIGMA_TOP_NAVIGATION_LEADING_NORMAL>', {
  props: {
    text: figma.nestedProps('Text', {
      label: figma.string('Label'),
      color: figma.enum('Color', {
        Primary: 'primary',
        Assistive: 'assistive',
      }),
      disabled: figma.boolean('Disable'),
    }),
  },
  variant: { Type: 'Text Button' },
  example: ({ text }) => (
    <TopNavigationButton
      variant="text-button"
      color={text.color}
      disabled={text.disabled}
    >
      {text.label}
    </TopNavigationButton>
  ),
});

figma.connect(TopNavigationButton, '<FIGMA_TOP_NAVIGATION_LEADING_FLOAT>', {
  variant: { Type: 'Back' },
  example: () => <TopNavigationButton variant="back-button" />,
});

figma.connect(TopNavigationButton, '<FIGMA_TOP_NAVIGATION_LEADING_FLOAT>', {
  props: {
    icon: figma.nestedProps('Icon', {
      children: figma.children('Icon'),
    }),
  },
  variant: { Type: 'Icon Button' },
  example: ({ icon }) => (
    <TopNavigationButton variant="icon-button">
      {icon.children}
    </TopNavigationButton>
  ),
});

figma.connect(TopNavigationButton, '<FIGMA_TOP_NAVIGATION_LEADING_FLOAT>', {
  props: {
    text: figma.nestedProps('Text', {
      label: figma.string('Label'),
      color: figma.enum('Color', {
        Primary: 'primary',
        Assistive: 'assistive',
      }),
      disabled: figma.boolean('Disable'),
    }),
  },
  variant: { Type: 'Text Button' },
  example: ({ text }) => (
    <TopNavigationButton
      variant="text-button"
      color={text.color}
      disabled={text.disabled}
    >
      {text.label}
    </TopNavigationButton>
  ),
});

// Trailing 버튼 묶음
figma.connect('<FIGMA_TOP_NAVIGATION_TRAILING>', {
  props: {
    button1: figma.boolean('┗ Button', {
      true: figma.children('Button 1'),
      false: undefined,
    }),
    button2: figma.boolean('┗ Button 2', {
      true: figma.children('Button 2'),
      false: undefined,
    }),
    button3: figma.boolean('┗ Button 3', {
      true: figma.children('Button 3'),
      false: undefined,
    }),
  },
  example: ({ button1, button2, button3 }) => (
    <>
      {button1}
      {button2}
      {button3}
    </>
  ),
});

figma.connect(TopNavigationButton, '<FIGMA_TOP_NAVIGATION_ACTION>', {
  props: {
    icon: figma.nestedProps('Icon', {
      children: figma.children('Icon'),
    }),
  },
  variant: { Variant: 'Icon' },
  example: ({ icon }) => (
    <TopNavigationButton variant="icon-button">
      {icon.children}
    </TopNavigationButton>
  ),
});

figma.connect(TopNavigationButton, '<FIGMA_TOP_NAVIGATION_ACTION>', {
  props: {
    text: figma.nestedProps('Text', {
      label: figma.string('Label'),
      color: figma.enum('Variant', {
        Primary: 'primary',
        Assistive: 'assistive',
      }),
      disabled: figma.boolean('Disable'),
    }),
  },
  variant: { Variant: 'Text' },
  example: ({ text }) => (
    <TopNavigationButton
      variant="text-button"
      color={text.color}
      disabled={text.disabled}
    >
      {text.label}
    </TopNavigationButton>
  ),
});

// Title Area / Tool Bar 리소스
figma.connect('<FIGMA_TOP_NAVIGATION_SEARCH_FIELD>', {
  props: {
    children: figma.children('Searchfield/Searchfield'),
  },
  example: ({ children }) => <>{children}</>,
});

figma.connect('<FIGMA_TOP_NAVIGATION_TOOL_TAB>', {
  props: {
    children: figma.children('Tab'),
  },
  example: ({ children }) => <>{children}</>,
});

figma.connect('<FIGMA_TOP_NAVIGATION_TOOL_SEGMENTED_CONTROL>', {
  props: {
    children: figma.children('Segmented Control'),
  },
  example: ({ children }) => <>{children}</>,
});

figma.connect('<FIGMA_TOP_NAVIGATION_TOOL_CATEGORY>', {
  props: {
    children: figma.children('Category'),
  },
  example: ({ children }) => <>{children}</>,
});

figma.connect('<FIGMA_TOP_NAVIGATION_TOOL_SLOT>', {
  props: {
    children: figma.slot('Slot'),
  },
  example: ({ children }) => <>{children}</>,
});
