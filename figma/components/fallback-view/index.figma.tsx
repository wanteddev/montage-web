import { figma } from '@figma/code-connect';

import {
  FallbackView,
  FallbackViewActionArea,
  FallbackViewActionAreaButton,
  FallbackViewContent,
  FallbackViewText,
} from '@montage-ui/core';

const fallbackViewProps = {
  title: figma.boolean('Heading', {
    true: figma.string('┗ Text'),
    false: undefined,
  }),
  description: figma.string('Description'),
  platform: figma.enum('Platform', {
    Desktop: 'desktop',
    Mobile: 'mobile',
  }),
  padding: figma.enum('Padding', {
    Normal: 'normal',
    Compact: 'compact',
  }),
};

figma.connect(FallbackView, '<FIGMA_FALLBACK_VIEW>', {
  props: {
    ...fallbackViewProps,
    actionArea: figma.children('Action Area'),
  },
  variant: {
    'Action Area': true,
  },
  example: ({ title, description, actionArea, ...props }) => (
    <FallbackView {...props}>
      <FallbackViewContent>
        <FallbackViewText title={title} description={description} />
        {actionArea}
      </FallbackViewContent>
    </FallbackView>
  ),
});

figma.connect(FallbackView, '<FIGMA_FALLBACK_VIEW>', {
  props: fallbackViewProps,
  variant: {
    'Action Area': false,
  },
  example: ({ title, description, ...props }) => (
    <FallbackView {...props}>
      <FallbackViewContent>
        <FallbackViewText title={title} description={description} />
      </FallbackViewContent>
    </FallbackView>
  ),
});

const actionAreaProps = {
  variant: figma.enum('Variant', {
    Single: 'single',
    Horizontal: 'horizontal',
    Vertical: 'vertical',
  }),
  children: figma.children(['┗ Button', '┗ Alternative Button']),
};

figma.connect(
  FallbackViewActionArea,
  '<FIGMA_FALLBACK_VIEW_ACTION_AREA_DESKTOP>',
  {
    props: actionAreaProps,
    example: ({ children, ...props }) => (
      <FallbackViewActionArea {...props}>{children}</FallbackViewActionArea>
    ),
  },
);

figma.connect(
  FallbackViewActionArea,
  '<FIGMA_FALLBACK_VIEW_ACTION_AREA_MOBILE>',
  {
    props: actionAreaProps,
    example: ({ children, ...props }) => (
      <FallbackViewActionArea {...props}>{children}</FallbackViewActionArea>
    ),
  },
);

const actionAreaButtonProps = {
  button: figma.nestedProps('Button/Button', {
    label: figma.string('Label'),
    disabled: figma.boolean('Disable'),
    loading: figma.boolean('Loading'),
  }),
};

figma.connect(
  FallbackViewActionAreaButton,
  '<FIGMA_FALLBACK_VIEW_ACTION_AREA_BUTTON_DESKTOP>',
  {
    props: actionAreaButtonProps,
    example: ({ button }) => (
      <FallbackViewActionAreaButton
        disabled={button.disabled}
        loading={button.loading}
      >
        {button.label}
      </FallbackViewActionAreaButton>
    ),
  },
);

figma.connect(
  FallbackViewActionAreaButton,
  '<FIGMA_FALLBACK_VIEW_ACTION_AREA_BUTTON_MOBILE>',
  {
    props: actionAreaButtonProps,
    example: ({ button }) => (
      <FallbackViewActionAreaButton
        disabled={button.disabled}
        loading={button.loading}
      >
        {button.label}
      </FallbackViewActionAreaButton>
    ),
  },
);
