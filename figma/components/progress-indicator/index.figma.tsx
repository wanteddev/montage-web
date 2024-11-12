import { figma } from '@figma/code-connect';

import { ProgressIndicator } from '@wanteddev/wds';

figma.connect(ProgressIndicator, '<FIGMA_PROGRESS_INDICATOR>', {
  props: {
    percent: figma.enum('Percent', {
      '0%': 0,
      '50%': 50,
      '100%': 100,
    }),
  },
  example: (props) => <ProgressIndicator {...props} />,
});
