import { Button, useToast } from '@wanteddev/wds';

import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Hooks/useToast',
};

export default meta;

export const Normal = () => {
  const toast = useToast();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() =>
        toast({ variant: 'normal', content: 'This is Normal Toast.' })
      }
    >
      Click Me!
    </Button>
  );
};

export const Success = () => {
  const toast = useToast();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() =>
        toast({ variant: 'success', content: 'This is Success Toast.' })
      }
    >
      Success
    </Button>
  );
};

export const Info = () => {
  const toast = useToast();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() => toast({ variant: 'info', content: 'This is Info Toast.' })}
    >
      Info
    </Button>
  );
};

export const Error = () => {
  const toast = useToast();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() =>
        toast({ variant: 'error', content: 'This is Error Toast.' })
      }
    >
      Error
    </Button>
  );
};

export const Link = () => {
  const toast = useToast();

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={() => toast({ variant: 'link', content: 'This is Link Toast.' })}
    >
      Link
    </Button>
  );
};
