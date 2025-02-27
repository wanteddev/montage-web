import { figma } from '@figma/code-connect';

import { Slider } from '@wanteddev/wds';

figma.connect(Slider, '<FIGMA_SLIDER>', {
  props: {
    disabled: figma.boolean('Disable'),
  },
  variant: {
    Label: false,
  },
  example: (props) => <Slider defaultValue={[0, 50]} {...props} />,
});

figma.connect(Slider, '<FIGMA_SLIDER>', {
  props: {
    firstLabel: figma.string('┗ First'),
    lastLabel: figma.string('┗ Last'),
    disabled: figma.boolean('Disable'),
  },
  variant: {
    Heading: true,
    Label: true,
  },
  example: (props) => (
    <Slider
      defaultValue={[0, 50]}
      title={
        <>
          <span>{props.firstLabel}</span>
          <span>~</span>
          <span>{props.lastLabel}</span>
        </>
      }
      disabled={props.disabled}
      label={({ index }) => (index === 0 ? props.firstLabel : props.lastLabel)}
    />
  ),
});

figma.connect(Slider, '<FIGMA_SLIDER>', {
  props: {
    firstLabel: figma.string('┗ First'),
    lastLabel: figma.string('┗ Last'),
    disabled: figma.boolean('Disable'),
  },
  variant: {
    Heading: false,
    Label: true,
  },
  example: (props) => (
    <Slider
      defaultValue={[0, 50]}
      disabled={props.disabled}
      label={({ index }) => (index === 0 ? props.firstLabel : props.lastLabel)}
    />
  ),
});

figma.connect(Slider, '<FIGMA_SLIDER>', {
  props: {
    firstLabel: figma.string('┗ First'),
    lastLabel: figma.string('┗ Last'),
    disabled: figma.boolean('Disable'),
  },
  variant: {
    Heading: true,
    Label: false,
  },
  example: (props) => (
    <Slider
      defaultValue={[0, 50]}
      title={
        <>
          <span>{props.firstLabel}</span>
          <span>~</span>
          <span>{props.lastLabel}</span>
        </>
      }
      disabled={props.disabled}
    />
  ),
});
