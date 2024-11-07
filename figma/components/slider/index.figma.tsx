import { figma } from '@figma/code-connect';

import { Slider } from '@wanteddev/wds';

figma.connect(Slider, '<FIGMA_SLIDER>', {
  props: {},
  variant: {
    Label: false,
  },
  example: () => <Slider defaultValue={[0, 50]} />,
});

figma.connect(Slider, '<FIGMA_SLIDER>', {
  props: {
    firstLabel: figma.string('┗ First'),
    lastLabel: figma.string('┗ Last'),
  },
  variant: {
    Heading: true,
    Label: true,
  },
  example: (props) => (
    <Slider
      defaultValue={[0, 50]}
      heading={
        <>
          <span>{props.firstLabel}</span>
          <span>~</span>
          <span>{props.lastLabel}</span>
        </>
      }
      label={({ index }) => (index === 0 ? props.firstLabel : props.lastLabel)}
    />
  ),
});

figma.connect(Slider, '<FIGMA_SLIDER>', {
  props: {
    firstLabel: figma.string('┗ First'),
    lastLabel: figma.string('┗ Last'),
  },
  variant: {
    Heading: false,
    Label: true,
  },
  example: (props) => (
    <Slider
      defaultValue={[0, 50]}
      label={({ index }) => (index === 0 ? props.firstLabel : props.lastLabel)}
    />
  ),
});

figma.connect(Slider, '<FIGMA_SLIDER>', {
  props: {
    firstLabel: figma.string('┗ First'),
    lastLabel: figma.string('┗ Last'),
  },
  variant: {
    Heading: true,
    Label: false,
  },
  example: ({ firstLabel, lastLabel, ...props }) => (
    <Slider
      defaultValue={[0, 50]}
      heading={
        <>
          <span>{firstLabel}</span>
          <span>~</span>
          <span>{lastLabel}</span>
        </>
      }
      {...props}
    />
  ),
});
