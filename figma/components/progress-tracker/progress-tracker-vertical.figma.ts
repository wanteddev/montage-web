// url=<FIGMA_PROGRESS_TRACKER_VERTICAL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/progress-tracker/index.tsx
// component=ProgressTracker

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Total Count') === '3') {
  const value = figma.selectedInstance.getEnum('Current Step', {
    '1': '1',
    '2': '2',
    '3': '3',
  });
  const label1 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 1'),
    false: undefined,
  });
  const label2 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 2'),
    false: undefined,
  });
  const label3 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 3'),
    false: undefined,
  });
  const labelContent1 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content'),
      false: undefined,
    },
  );
  const labelContent2 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content2'),
      false: undefined,
    },
  );
  const labelContent3 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content3'),
      false: undefined,
    },
  );
  const content1 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content'),
    false: undefined,
  });
  const content2 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content2'),
    false: undefined,
  });
  const content3 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content3'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (value && value.type !== 'ERROR') {
    __props['value'] = value;
  }
  if (label1 && label1.type !== 'ERROR') {
    __props['label1'] = label1;
  }
  if (label2 && label2.type !== 'ERROR') {
    __props['label2'] = label2;
  }
  if (label3 && label3.type !== 'ERROR') {
    __props['label3'] = label3;
  }
  if (labelContent1 && labelContent1.type !== 'ERROR') {
    __props['labelContent1'] = labelContent1;
  }
  if (labelContent2 && labelContent2.type !== 'ERROR') {
    __props['labelContent2'] = labelContent2;
  }
  if (labelContent3 && labelContent3.type !== 'ERROR') {
    __props['labelContent3'] = labelContent3;
  }
  if (content1 && content1.type !== 'ERROR') {
    __props['content1'] = content1;
  }
  if (content2 && content2.type !== 'ERROR') {
    __props['content2'] = content2;
  }
  if (content3 && content3.type !== 'ERROR') {
    __props['content3'] = content3;
  }

  template = {
    id: 'ProgressTracker',
    imports: [
      "import { ProgressTracker, ProgressTrackerItem } from '@montage-ui/core';",
    ],
    example: figma.code`<ProgressTracker direction="vertical"${figma.helpers.react.renderProp(
      'defaultValue',
      value,
    )}>
      <ProgressTrackerItem value="1"${figma.helpers.react.renderProp(
        'label',
        label1,
      )}${figma.helpers.react.renderProp('labelContent', labelContent1)}>
        ${figma.helpers.react.renderChildren(content1)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="2"${figma.helpers.react.renderProp(
        'label',
        label2,
      )}${figma.helpers.react.renderProp('labelContent', labelContent2)}>
        ${figma.helpers.react.renderChildren(content2)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="3"${figma.helpers.react.renderProp(
        'label',
        label3,
      )}${figma.helpers.react.renderProp('labelContent', labelContent3)}>
        ${figma.helpers.react.renderChildren(content3)}
      </ProgressTrackerItem>
    </ProgressTracker>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Total Count') === '4') {
  const value = figma.selectedInstance.getEnum('Current Step', {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
  });
  const label1 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 1'),
    false: undefined,
  });
  const label2 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 2'),
    false: undefined,
  });
  const label3 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 3'),
    false: undefined,
  });
  const label4 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 4'),
    false: undefined,
  });
  const labelContent1 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content'),
      false: undefined,
    },
  );
  const labelContent2 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content2'),
      false: undefined,
    },
  );
  const labelContent3 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content3'),
      false: undefined,
    },
  );
  const labelContent4 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content4'),
      false: undefined,
    },
  );
  const content1 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content'),
    false: undefined,
  });
  const content2 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content2'),
    false: undefined,
  });
  const content3 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content3'),
    false: undefined,
  });
  const content4 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content4'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (value && value.type !== 'ERROR') {
    __props['value'] = value;
  }
  if (label1 && label1.type !== 'ERROR') {
    __props['label1'] = label1;
  }
  if (label2 && label2.type !== 'ERROR') {
    __props['label2'] = label2;
  }
  if (label3 && label3.type !== 'ERROR') {
    __props['label3'] = label3;
  }
  if (label4 && label4.type !== 'ERROR') {
    __props['label4'] = label4;
  }
  if (labelContent1 && labelContent1.type !== 'ERROR') {
    __props['labelContent1'] = labelContent1;
  }
  if (labelContent2 && labelContent2.type !== 'ERROR') {
    __props['labelContent2'] = labelContent2;
  }
  if (labelContent3 && labelContent3.type !== 'ERROR') {
    __props['labelContent3'] = labelContent3;
  }
  if (labelContent4 && labelContent4.type !== 'ERROR') {
    __props['labelContent4'] = labelContent4;
  }
  if (content1 && content1.type !== 'ERROR') {
    __props['content1'] = content1;
  }
  if (content2 && content2.type !== 'ERROR') {
    __props['content2'] = content2;
  }
  if (content3 && content3.type !== 'ERROR') {
    __props['content3'] = content3;
  }
  if (content4 && content4.type !== 'ERROR') {
    __props['content4'] = content4;
  }

  template = {
    id: 'ProgressTracker',
    imports: [
      "import { ProgressTracker, ProgressTrackerItem } from '@montage-ui/core';",
    ],
    example: figma.code`<ProgressTracker direction="vertical"${figma.helpers.react.renderProp(
      'defaultValue',
      value,
    )}>
      <ProgressTrackerItem value="1"${figma.helpers.react.renderProp(
        'label',
        label1,
      )}${figma.helpers.react.renderProp('labelContent', labelContent1)}>
        ${figma.helpers.react.renderChildren(content1)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="2"${figma.helpers.react.renderProp(
        'label',
        label2,
      )}${figma.helpers.react.renderProp('labelContent', labelContent2)}>
        ${figma.helpers.react.renderChildren(content2)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="3"${figma.helpers.react.renderProp(
        'label',
        label3,
      )}${figma.helpers.react.renderProp('labelContent', labelContent3)}>
        ${figma.helpers.react.renderChildren(content3)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="4"${figma.helpers.react.renderProp(
        'label',
        label4,
      )}${figma.helpers.react.renderProp('labelContent', labelContent4)}>
        ${figma.helpers.react.renderChildren(content4)}
      </ProgressTrackerItem>
    </ProgressTracker>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Total Count') === '5') {
  const value = figma.selectedInstance.getEnum('Current Step', {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
  });
  const label1 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 1'),
    false: undefined,
  });
  const label2 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 2'),
    false: undefined,
  });
  const label3 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 3'),
    false: undefined,
  });
  const label4 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 4'),
    false: undefined,
  });
  const label5 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 5'),
    false: undefined,
  });
  const labelContent1 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content'),
      false: undefined,
    },
  );
  const labelContent2 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content2'),
      false: undefined,
    },
  );
  const labelContent3 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content3'),
      false: undefined,
    },
  );
  const labelContent4 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content4'),
      false: undefined,
    },
  );
  const labelContent5 = figma.selectedInstance.getBoolean(
    '┗ Show Label Content',
    {
      true: figma.properties.slot('Label Content5'),
      false: undefined,
    },
  );
  const content1 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content'),
    false: undefined,
  });
  const content2 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content2'),
    false: undefined,
  });
  const content3 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content3'),
    false: undefined,
  });
  const content4 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content4'),
    false: undefined,
  });
  const content5 = figma.selectedInstance.getBoolean('Show Content', {
    true: figma.properties.slot('Content5'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (value && value.type !== 'ERROR') {
    __props['value'] = value;
  }
  if (label1 && label1.type !== 'ERROR') {
    __props['label1'] = label1;
  }
  if (label2 && label2.type !== 'ERROR') {
    __props['label2'] = label2;
  }
  if (label3 && label3.type !== 'ERROR') {
    __props['label3'] = label3;
  }
  if (label4 && label4.type !== 'ERROR') {
    __props['label4'] = label4;
  }
  if (label5 && label5.type !== 'ERROR') {
    __props['label5'] = label5;
  }
  if (labelContent1 && labelContent1.type !== 'ERROR') {
    __props['labelContent1'] = labelContent1;
  }
  if (labelContent2 && labelContent2.type !== 'ERROR') {
    __props['labelContent2'] = labelContent2;
  }
  if (labelContent3 && labelContent3.type !== 'ERROR') {
    __props['labelContent3'] = labelContent3;
  }
  if (labelContent4 && labelContent4.type !== 'ERROR') {
    __props['labelContent4'] = labelContent4;
  }
  if (labelContent5 && labelContent5.type !== 'ERROR') {
    __props['labelContent5'] = labelContent5;
  }
  if (content1 && content1.type !== 'ERROR') {
    __props['content1'] = content1;
  }
  if (content2 && content2.type !== 'ERROR') {
    __props['content2'] = content2;
  }
  if (content3 && content3.type !== 'ERROR') {
    __props['content3'] = content3;
  }
  if (content4 && content4.type !== 'ERROR') {
    __props['content4'] = content4;
  }
  if (content5 && content5.type !== 'ERROR') {
    __props['content5'] = content5;
  }

  template = {
    id: 'ProgressTracker',
    imports: [
      "import { ProgressTracker, ProgressTrackerItem } from '@montage-ui/core';",
    ],
    example: figma.code`<ProgressTracker direction="vertical"${figma.helpers.react.renderProp(
      'defaultValue',
      value,
    )}>
      <ProgressTrackerItem value="1"${figma.helpers.react.renderProp(
        'label',
        label1,
      )}${figma.helpers.react.renderProp('labelContent', labelContent1)}>
        ${figma.helpers.react.renderChildren(content1)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="2"${figma.helpers.react.renderProp(
        'label',
        label2,
      )}${figma.helpers.react.renderProp('labelContent', labelContent2)}>
        ${figma.helpers.react.renderChildren(content2)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="3"${figma.helpers.react.renderProp(
        'label',
        label3,
      )}${figma.helpers.react.renderProp('labelContent', labelContent3)}>
        ${figma.helpers.react.renderChildren(content3)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="4"${figma.helpers.react.renderProp(
        'label',
        label4,
      )}${figma.helpers.react.renderProp('labelContent', labelContent4)}>
        ${figma.helpers.react.renderChildren(content4)}
      </ProgressTrackerItem>
      <ProgressTrackerItem value="5"${figma.helpers.react.renderProp(
        'label',
        label5,
      )}${figma.helpers.react.renderProp('labelContent', labelContent5)}>
        ${figma.helpers.react.renderChildren(content5)}
      </ProgressTrackerItem>
    </ProgressTracker>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'ProgressTracker',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
