import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import copy from 'copy-to-clipboard';
import { useToast } from '@wanteddev/wds';
import * as React from 'react';
import * as Wds from '@wanteddev/wds';
import * as WdsIcon from '@wanteddev/wds-icon';
import * as reactVirtual from '@tanstack/react-virtual';
import * as HookForm from 'react-hook-form';
import * as reactSpring from 'react-spring';
// @ts-expect-error
import * as autosuggestParse from 'autosuggest-highlight/parse';
// @ts-expect-error
import * as autosuggestMatch from 'autosuggest-highlight/match';
import dynamic from 'next/dynamic';

import { useRunner } from './react-runner';

const WdsLottieLoading = dynamic(
  () => import('@wanteddev/wds-lottie').then(({ Loading }) => Loading),
  { ssr: false },
);

type UseReactDemoRunnerParams = {
  code: string;
};

export const useReactDemoRunner = ({ code }: UseReactDemoRunnerParams) => {
  const [value, setValue] = useState(code);

  const scope = useMemo(() => {
    return {
      import: {
        react: React,
        '@wanteddev/wds': Wds,
        '@wanteddev/wds-icon': WdsIcon,
        '@wanteddev/wds-lottie': { Loading: WdsLottieLoading },
        '@tanstack/react-virtual': reactVirtual,
        'react-hook-form': HookForm,
        'copy-to-clipboard': copy,
        'autosuggest-highlight/match': autosuggestMatch,
        'autosuggest-highlight/parse': autosuggestParse,
        'react-spring': reactSpring,
      },
    };
  }, []);

  const deferredCode = useDeferredValue(value);

  const { element, error } = useRunner({
    code: deferredCode,
    scope,
  });

  return {
    value,
    handleValueChange: setValue,
    element,
    error,
  };
};

type UseDemoControlsParams = {
  initialValue: string;
  value: string;
  handleValueChange: (value: string) => void;
  defaultIsTransparent?: boolean;
};

export const useDemoControls = ({
  initialValue,
  value,
  handleValueChange,
  defaultIsTransparent,
}: UseDemoControlsParams) => {
  const toast = useToast();

  const [isTransparent, setIsTransparent] = useState(
    defaultIsTransparent ?? false,
  );
  const [collapsed, setCollapsed] = useState(true);

  const [isResetting, setIsResetting] = useState(false);

  const handleCopy = useCallback(() => {
    const selection = window.getSelection()?.toString();

    if (selection) {
      copy(selection);
      return;
    }

    const success = copy(value);

    if (success) {
      toast({
        variant: 'positive',
        content: '코드를 클립보드에 복사 했습니다.',
      });
    }
  }, [toast, value]);

  const handleReset = useCallback(() => {
    handleValueChange(initialValue);
    setIsResetting(true);
  }, [initialValue, handleValueChange]);

  const handleResetComplete = useCallback(() => {
    setIsResetting(false);
  }, []);

  return {
    isTransparent,
    setIsTransparent,
    collapsed,
    setCollapsed,
    isResetting,
    handleCopy,
    handleReset,
    handleResetComplete,
    handleIsTransparentChange: setIsTransparent,
    handleCollapseChange: setCollapsed,
  };
};
