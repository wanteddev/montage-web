'use client';
import { refractor } from 'refractor';
import * as React from 'react';
import * as Wds from '@wanteddev/wds';
import * as WdsIcon from '@wanteddev/wds-icon';
import * as WdsLottie from '@wanteddev/wds-lottie';
import tsx from 'refractor/lang/tsx';
import CodeEditor from 'react-simple-code-editor';
import { toHtml } from 'hast-util-to-html';
import * as HookForm from 'react-hook-form';
import * as copy from 'copy-to-clipboard';

import { codeBlockStyle } from '../code-block/style';

import { useRunner } from './react-runner';
import {
  collapseWrapperStyle,
  demoStyle,
  editorStyle,
  editorWrapperStyle,
} from './style';

type Props = {
  code: string;
  hideCode?: boolean;
};

refractor.register(tsx);

const Demo = ({ code, hideCode }: Props) => {
  const [value, setValue] = React.useState(code);
  const toast = Wds.useToast();

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

  const { element, error } = useRunner({
    code: value,
    scope,
  });

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
        <Wds.NoSsr>{error ? error.toString() : element}</Wds.NoSsr>
      </Wds.Box>

      {!hideCode && (
        <Wds.FlexBox sx={editorWrapperStyle}>
          {/* @ts-expect-error */}
          <Wds.Box
            as={CodeEditor}
            value={value}
            onValueChange={setValue}
            sx={[codeBlockStyle, editorStyle]}
            padding={16}
            highlight={(v: string) =>
              toHtml(
                refractor.highlight(v, 'tsx') as Parameters<typeof toHtml>[0],
              )
            }
          />

          <Wds.FlexBox
            sx={collapseWrapperStyle(collapsed)}
            justifyContent="center"
          >
            <Wds.Button
              size="small"
              variant="outlined"
              color="assistive"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? '자세히' : '접기'}
            </Wds.Button>
          </Wds.FlexBox>

          <Wds.IconButton
            variant="background"
            sx={(theme) => ({
              ['&::before']: {
                backgroundColor: theme.palette.inverse.label,
                border: `1px solid ${theme.palette.line.normal.neutral}`,
                zIndex: 0,
              },
              svg: {
                zIndex: 1,
              },
            })}
            onClick={() => {
              const success = copy.default(value);

              if (success) {
                toast({
                  variant: 'success',
                  content: '클립보드에 복사 했습니다.',
                });
              }
            }}
          >
            <WdsIcon.IconCopy />
          </Wds.IconButton>
        </Wds.FlexBox>
      )}
    </Wds.FlexBox>
  );
};

export default Demo;
