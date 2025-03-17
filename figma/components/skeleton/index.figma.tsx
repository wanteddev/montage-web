import { figma } from '@figma/code-connect';

import { Skeleton } from '@wanteddev/wds';

figma.connect(Skeleton, '<FIGMA_SKELETON_TEXT>', {
  props: {
    align: figma.enum('Align', {
      Left: 'left',
      Center: 'center',
      Right: 'right',
    }),
    width: figma.enum('Length', {
      '100%': '100%',
      '75%': '75%',
      '50%': '50%',
      '25%': '25%',
    }),
  },
  variant: {
    Color: 'Normal',
  },
  example: (props) => <Skeleton variant="text" {...props} />,
});

figma.connect(Skeleton, '<FIGMA_SKELETON_TEXT>', {
  props: {
    align: figma.enum('Align', {
      Left: 'left',
      Center: 'center',
      Right: 'right',
    }),
    width: figma.enum('Length', {
      '100%': '100%',
      '75%': '75%',
      '50%': '50%',
      '25%': '25%',
    }),
  },
  variant: {
    Color: 'White',
  },
  example: (props) => (
    <Skeleton
      variant="text"
      color="semantic.static.white"
      opacity="opacity.28"
      {...props}
    />
  ),
});

figma.connect(Skeleton, '<FIGMA_SKELETON_RECTANGLE>', {
  variant: {
    Color: 'Normal',
  },
  example: (props) => <Skeleton variant="rectangle" {...props} />,
});

figma.connect(Skeleton, '<FIGMA_SKELETON_RECTANGLE>', {
  variant: {
    Color: 'White',
  },
  example: (props) => (
    <Skeleton
      variant="rectangle"
      color="semantic.static.white"
      opacity="opacity.28"
      {...props}
    />
  ),
});

figma.connect(Skeleton, '<FIGMA_SKELETON_RECTANGLE>', {
  variant: {
    Color: 'Normal',
  },
  example: (props) => <Skeleton variant="rectangle" {...props} />,
});

figma.connect(Skeleton, '<FIGMA_SKELETON_RECTANGLE>', {
  variant: {
    Color: 'White',
  },
  example: (props) => (
    <Skeleton
      variant="rectangle"
      color="semantic.static.white"
      opacity="opacity.28"
      {...props}
    />
  ),
});

figma.connect(Skeleton, '<FIGMA_SKELETON_CIRCLE>', {
  variant: {
    Color: 'Normal',
  },
  example: (props) => <Skeleton variant="circle" {...props} />,
});

figma.connect(Skeleton, '<FIGMA_SKELETON_CIRCLE>', {
  variant: {
    Color: 'White',
  },
  example: (props) => (
    <Skeleton
      variant="circle"
      color="semantic.static.white"
      opacity="opacity.28"
      {...props}
    />
  ),
});
