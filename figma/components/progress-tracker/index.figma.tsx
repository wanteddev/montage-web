import { figma } from '@figma/code-connect';

import { ProgressTracker, ProgressTrackerItem } from '@montage-ui/core';

figma.connect(ProgressTracker, '<FIGMA_PROGRESS_TRACKER_HORIZONTAL>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '3',
  },
  example: ({ value, label1, label2, label3 }) => (
    <ProgressTracker value={value}>
      <ProgressTrackerItem value="1" label={label1} />
      <ProgressTrackerItem value="2" label={label2} />
      <ProgressTrackerItem value="3" label={label3} />
    </ProgressTracker>
  ),
});

figma.connect(ProgressTracker, '<FIGMA_PROGRESS_TRACKER_HORIZONTAL>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
    label4: figma.boolean('Label', {
      true: figma.string('Label 4'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '4',
  },
  example: ({ value, label1, label2, label3, label4 }) => (
    <ProgressTracker value={value}>
      <ProgressTrackerItem value="1" label={label1} />
      <ProgressTrackerItem value="2" label={label2} />
      <ProgressTrackerItem value="3" label={label3} />
      <ProgressTrackerItem value="4" label={label4} />
    </ProgressTracker>
  ),
});

figma.connect(ProgressTracker, '<FIGMA_PROGRESS_TRACKER_HORIZONTAL>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
    label4: figma.boolean('Label', {
      true: figma.string('Label 4'),
      false: undefined,
    }),
    label5: figma.boolean('Label', {
      true: figma.string('Label 5'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '5',
  },
  example: ({ value, label1, label2, label3, label4, label5 }) => (
    <ProgressTracker value={value}>
      <ProgressTrackerItem value="1" label={label1} />
      <ProgressTrackerItem value="2" label={label2} />
      <ProgressTrackerItem value="3" label={label3} />
      <ProgressTrackerItem value="4" label={label4} />
      <ProgressTrackerItem value="5" label={label5} />
    </ProgressTracker>
  ),
});

figma.connect(ProgressTracker, '<FIGMA_PROGRESS_TRACKER_VERTICAL>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
    labelContent1: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content'),
      false: undefined,
    }),
    labelContent2: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content2'),
      false: undefined,
    }),
    labelContent3: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content3'),
      false: undefined,
    }),
    content1: figma.boolean('Show Content', {
      true: figma.slot('Content'),
      false: undefined,
    }),
    content2: figma.boolean('Show Content', {
      true: figma.slot('Content2'),
      false: undefined,
    }),
    content3: figma.boolean('Show Content', {
      true: figma.slot('Content3'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '3',
  },
  example: ({
    value,
    label1,
    label2,
    label3,
    labelContent1,
    labelContent2,
    labelContent3,
    content1,
    content2,
    content3,
  }) => (
    <ProgressTracker direction="vertical" value={value}>
      <ProgressTrackerItem
        value="1"
        label={label1}
        labelContent={labelContent1}
      >
        {content1}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="2"
        label={label2}
        labelContent={labelContent2}
      >
        {content2}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="3"
        label={label3}
        labelContent={labelContent3}
      >
        {content3}
      </ProgressTrackerItem>
    </ProgressTracker>
  ),
});

figma.connect(ProgressTracker, '<FIGMA_PROGRESS_TRACKER_VERTICAL>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
    label4: figma.boolean('Label', {
      true: figma.string('Label 4'),
      false: undefined,
    }),
    labelContent1: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content'),
      false: undefined,
    }),
    labelContent2: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content2'),
      false: undefined,
    }),
    labelContent3: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content3'),
      false: undefined,
    }),
    labelContent4: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content4'),
      false: undefined,
    }),
    content1: figma.boolean('Show Content', {
      true: figma.slot('Content'),
      false: undefined,
    }),
    content2: figma.boolean('Show Content', {
      true: figma.slot('Content2'),
      false: undefined,
    }),
    content3: figma.boolean('Show Content', {
      true: figma.slot('Content3'),
      false: undefined,
    }),
    content4: figma.boolean('Show Content', {
      true: figma.slot('Content4'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '4',
  },
  example: ({
    value,
    label1,
    label2,
    label3,
    label4,
    labelContent1,
    labelContent2,
    labelContent3,
    labelContent4,
    content1,
    content2,
    content3,
    content4,
  }) => (
    <ProgressTracker direction="vertical" value={value}>
      <ProgressTrackerItem
        value="1"
        label={label1}
        labelContent={labelContent1}
      >
        {content1}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="2"
        label={label2}
        labelContent={labelContent2}
      >
        {content2}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="3"
        label={label3}
        labelContent={labelContent3}
      >
        {content3}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="4"
        label={label4}
        labelContent={labelContent4}
      >
        {content4}
      </ProgressTrackerItem>
    </ProgressTracker>
  ),
});

figma.connect(ProgressTracker, '<FIGMA_PROGRESS_TRACKER_VERTICAL>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
    label4: figma.boolean('Label', {
      true: figma.string('Label 4'),
      false: undefined,
    }),
    label5: figma.boolean('Label', {
      true: figma.string('Label 5'),
      false: undefined,
    }),
    labelContent1: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content'),
      false: undefined,
    }),
    labelContent2: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content2'),
      false: undefined,
    }),
    labelContent3: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content3'),
      false: undefined,
    }),
    labelContent4: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content4'),
      false: undefined,
    }),
    labelContent5: figma.boolean('\u2517 Show Label Content', {
      true: figma.slot('Label Content5'),
      false: undefined,
    }),
    content1: figma.boolean('Show Content', {
      true: figma.slot('Content'),
      false: undefined,
    }),
    content2: figma.boolean('Show Content', {
      true: figma.slot('Content2'),
      false: undefined,
    }),
    content3: figma.boolean('Show Content', {
      true: figma.slot('Content3'),
      false: undefined,
    }),
    content4: figma.boolean('Show Content', {
      true: figma.slot('Content4'),
      false: undefined,
    }),
    content5: figma.boolean('Show Content', {
      true: figma.slot('Content5'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '5',
  },
  example: ({
    value,
    label1,
    label2,
    label3,
    label4,
    label5,
    labelContent1,
    labelContent2,
    labelContent3,
    labelContent4,
    labelContent5,
    content1,
    content2,
    content3,
    content4,
    content5,
  }) => (
    <ProgressTracker direction="vertical" value={value}>
      <ProgressTrackerItem
        value="1"
        label={label1}
        labelContent={labelContent1}
      >
        {content1}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="2"
        label={label2}
        labelContent={labelContent2}
      >
        {content2}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="3"
        label={label3}
        labelContent={labelContent3}
      >
        {content3}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="4"
        label={label4}
        labelContent={labelContent4}
      >
        {content4}
      </ProgressTrackerItem>
      <ProgressTrackerItem
        value="5"
        label={label5}
        labelContent={labelContent5}
      >
        {content5}
      </ProgressTrackerItem>
    </ProgressTracker>
  ),
});
