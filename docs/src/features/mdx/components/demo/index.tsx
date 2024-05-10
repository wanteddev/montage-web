'use client';

import * as React from 'react';
import * as Wds from '@wanteddev/wds';
import * as WdsIcon from '@wanteddev/wds-icon';
import * as WdsLottie from '@wanteddev/wds-lottie';
import * as HookForm from 'react-hook-form';
import * as copy from 'copy-to-clipboard';

import { useRunner } from './react-runner';
import { demoStyle, errorStyle } from './style';
import Editor from './editor';

type Props = {
  code: string;
  hideCode?: boolean;
};

const Demo = ({ code, hideCode }: Props) => {
  const [value, setValue] = React.useState(code);

  const [collapsed, setCollapsed] = React.useState(true);

  const scope = React.useMemo(() => {
    return {
      import: {
        react: React,
        '@wanteddev/wds': Wds,
        '@wanteddev/wds-icon': WdsIcon,
        '@wanteddev/wds-lottie': WdsLottie,
        'react-hook-form': HookForm,
        'copy-to-clipboard': copy,
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
          ['--demo-max-height']: collapsed ? '350px' : 'fit-content',
        } as React.CSSProperties
      }
    >
      <Wds.Box sx={demoStyle(hideCode)}>
        <Wds.NoSsr>{element}</Wds.NoSsr>

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
