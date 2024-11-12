import { figma } from '@figma/code-connect';

import {
  ProgressStepIndicator,
  ProgressStepIndicatorItem,
} from '@wanteddev/wds';

figma.connect(ProgressStepIndicator, '<FIGMA_PROGRESS_STEP_INDICATOR>', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
    divider: figma.boolean('Divider'),
  },
  example: (props) => (
    <ProgressStepIndicator value="2" {...props}>
      <ProgressStepIndicatorItem value="1" />
      <ProgressStepIndicatorItem value="2" />
      <ProgressStepIndicatorItem value="3" />
      <ProgressStepIndicatorItem value="4" />
    </ProgressStepIndicator>
  ),
});
