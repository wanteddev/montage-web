import { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import copy from 'copy-to-clipboard';
import { useToast } from '@montage-ui/core';

import { createShareUrl, parseShareState } from './helpers';

import type { PlaygroundShareState } from './types';

export const useInitialShareState = (): PlaygroundShareState => {
  const searchParams = useSearchParams();

  const [initialState] = useState(() => parseShareState(searchParams));

  return initialState;
};

type UsePlaygroundControlsParams = {
  initialState: PlaygroundShareState;
  value: string;
  handleValueChange: (value: string) => void;
};

export const usePlaygroundControls = ({
  initialState,
  value,
}: UsePlaygroundControlsParams) => {
  const toast = useToast();

  const [isTransparent, setIsTransparent] = useState(
    initialState.isTransparent,
  );

  const handleShare = useCallback(() => {
    const shareUrl = createShareUrl({
      code: value,
      isTransparent,
    });

    window.history.replaceState(null, '', shareUrl);

    if (copy(shareUrl)) {
      toast({
        variant: 'positive',
        content: '공유 링크를 클립보드에 복사 했습니다.',
      });
    }
  }, [value, isTransparent, toast]);

  const handleCopy = useCallback(() => {
    const selection = window.getSelection()?.toString();

    if (selection) {
      copy(selection);
      return;
    }

    if (copy(value)) {
      toast({
        variant: 'positive',
        content: '코드를 클립보드에 복사 했습니다.',
      });
    }
  }, [value, toast]);

  return {
    isTransparent,
    setIsTransparent,
    handleShare,
    handleCopy,
  };
};
