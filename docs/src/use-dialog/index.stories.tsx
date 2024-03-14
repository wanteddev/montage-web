import { Button, useDialog } from '@wanteddev/wds';

import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Hooks/useDialog',
};

export default meta;

export const Basic = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    const result = await dialog({
      title: '제목',
      content: '설명',
      confirmText: '확인',
      cancelText: '취소',
    });

    alert('결과: ' + result);
  };

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={handleClick}
    >
      Click Me!
    </Button>
  );
};

export const WithoutTitle = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    const result = await dialog({
      content: '설명',
      confirmText: '확인',
      cancelText: '취소',
    });

    alert('결과: ' + result);
  };

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={handleClick}
    >
      Click Me!
    </Button>
  );
};

export const WithoutCancelButton = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    const result = await dialog({
      content: '설명',
      confirmText: '확인',
    });

    alert('결과: ' + result);
  };

  return (
    <Button
      variant="outlined"
      color="assistive"
      size="small"
      onClick={handleClick}
    >
      Click Me!
    </Button>
  );
};
