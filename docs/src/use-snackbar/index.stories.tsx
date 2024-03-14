import { Button, useSnackBar } from '@wanteddev/wds';

import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Hooks/useSnackBar',
};

export default meta;

export const Normal = () => {
  const snackbar = useSnackBar();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() =>
        snackbar({
          variant: 'normal',
          content: 'This is Normal Snackbar.',
        })
      }
    >
      Click Me!
    </Button>
  );
};

export const Success = () => {
  const snackbar = useSnackBar();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() =>
        snackbar({ variant: 'success', content: 'This is Success Snackbar.' })
      }
    >
      Success
    </Button>
  );
};

export const Info = () => {
  const snackbar = useSnackBar();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() =>
        snackbar({ variant: 'info', content: 'This is Info Snackbar.' })
      }
    >
      Info
    </Button>
  );
};

export const Error = () => {
  const snackbar = useSnackBar();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() =>
        snackbar({ variant: 'error', content: 'This is Error Snackbar.' })
      }
    >
      Error
    </Button>
  );
};

export const Action = () => {
  const snackbar = useSnackBar();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() =>
        snackbar({
          content: 'This is Link Snackbar.',
          action: { children: '행동', onClick: () => alert('clicked') },
        })
      }
    >
      Link
    </Button>
  );
};
