'use client';

import * as React from 'react';
import * as Wds from '@wanteddev/wds';
import * as WdsIcon from '@wanteddev/wds-icon';
import * as HookForm from 'react-hook-form';
import * as copy from 'copy-to-clipboard';
// @ts-expect-error
import * as autosuggestParse from 'autosuggest-highlight/parse';
// @ts-expect-error
import * as autosuggestMatch from 'autosuggest-highlight/match';
import * as reactVirtual from '@tanstack/react-virtual';
import * as reactSpring from 'react-spring';
import dynamic from 'next/dynamic';

import { useRunner } from './react-runner';
import { demoStyle, errorStyle } from './style';
import Editor from './editor';

const WdsLottieLoading = dynamic(
  () => import('@wanteddev/wds-lottie').then(({ Loading }) => Loading),
  { ssr: false },
);

type Props = {
  code: string;
  hideCode?: boolean;
};

const Demo = ({ code, hideCode }: Props) => {
  const [value, setValue] = React.useState(code);
  const [hatched, setHatched] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(true);

  const scope = React.useMemo(() => {
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

  const deferredCode = React.useDeferredValue(value);

  const { element, error } = useRunner({
    code: deferredCode,
    scope,
  });

  const reset = () => {
    setValue(code);
  };

  return (
    <Wds.FlexBox
      flexDirection="column"
      style={
        {
          ['--demo-max-height']: collapsed ? '250px' : 'fit-content',
        } as React.CSSProperties
      }
    >
      <Wds.Box sx={demoStyle(hideCode ?? false, hatched)}>
        {element}

        {hideCode && Boolean(error) && (
          <Wds.FlexBox sx={errorStyle(hideCode)} gap="4px">
            <WdsIcon.IconCircleExclamation />
            <Wds.Typography variant="caption1">
              {error?.toString()}
            </Wds.Typography>
          </Wds.FlexBox>
        )}
      </Wds.Box>

      {!hideCode && (
        <Editor
          value={value}
          reset={reset}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setValue={setValue}
          setHatched={setHatched}
        >
          {Boolean(error) && (
            <Wds.FlexBox sx={errorStyle(hideCode)} gap="4px">
              <WdsIcon.IconCircleExclamation />
              <Wds.Typography variant="caption1">
                {error?.toString()}
              </Wds.Typography>
            </Wds.FlexBox>
          )}
        </Editor>
      )}
    </Wds.FlexBox>
  );
};

export default Demo;
