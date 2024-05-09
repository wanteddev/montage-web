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
  errorStyle,
  toolbarStyle,
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

  const deferredCode = React.useDeferredValue(value);

  const { element, error } = useRunner({
    code: deferredCode,
    scope,
  });

  const handleCopy = () => {
    const success = copy.default(value);

    if (success) {
      toast({
        variant: 'success',
        content: '클립보드에 복사 했습니다.',
      });
    }
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
          <Wds.FlexBox sx={errorStyle} gap="4px">
            <WdsIcon.IconCircleExclamation />
            <Wds.Typography variant="caption1">
              {error?.toString()}
            </Wds.Typography>
          </Wds.FlexBox>
        )}
      </Wds.Box>

      {!hideCode && (
        <Wds.FlexBox sx={editorWrapperStyle} flexDirection="column">
          <Wds.FlexBox
            alignItems="center"
            justifyContent="flex-end"
            gap="16px"
            sx={toolbarStyle}
          >
            <Wds.ChipAction
              size="small"
              variant="outlined"
              color="assistive"
              onClick={() => setCollapsed((prev) => !prev)}
              sx={{ borderRadius: '9999px' }}
            >
              {collapsed ? 'Expand code' : 'Collapse code'}
            </Wds.ChipAction>

            <Wds.CompactTooltip>
              <Wds.CompactTooltipTrigger>
                <Wds.IconButton size={18} onClick={handleCopy}>
                  <WdsIcon.IconCopy />
                </Wds.IconButton>
              </Wds.CompactTooltipTrigger>
              <Wds.CompactTooltipContent shortcut="⌘C">
                Copy
              </Wds.CompactTooltipContent>
            </Wds.CompactTooltip>

            <Wds.CompactTooltip>
              <Wds.CompactTooltipTrigger>
                <Wds.IconButton size={18} onClick={() => setValue(code)}>
                  <WdsIcon.IconRefresh />
                </Wds.IconButton>
              </Wds.CompactTooltipTrigger>
              <Wds.CompactTooltipContent shortcut="⌘R">
                Reset
              </Wds.CompactTooltipContent>
            </Wds.CompactTooltip>
          </Wds.FlexBox>
          {Boolean(error) && (
            <Wds.FlexBox sx={errorStyle} gap="4px">
              <WdsIcon.IconCircleExclamation />
              <Wds.Typography variant="caption1">
                {error?.toString()}
              </Wds.Typography>
            </Wds.FlexBox>
          )}
          <Wds.Box
            as={CodeEditor}
            ignoreTabKey={false}
            insertSpaces
            tabSize={2}
            onKeyDown={(e) => {
              if (e.ctrlKey || e.metaKey) {
                if (e.key === 'c') {
                  e.preventDefault();
                  handleCopy();
                } else if (e.key === 'r') {
                  e.preventDefault();
                  setValue(code);
                }
              }
            }}
            onFocus={() => {
              if (collapsed) {
                setCollapsed(false);
              }
            }}
            value={value}
            onValueChange={setValue}
            sx={[codeBlockStyle, editorStyle]}
            padding={16}
            highlight={(v) =>
              toHtml(
                refractor.highlight(v, 'tsx') as Parameters<typeof toHtml>[0],
              )
            }
          />

          <Wds.FlexBox
            sx={collapseWrapperStyle(collapsed)}
            justifyContent="center"
          ></Wds.FlexBox>
        </Wds.FlexBox>
      )}
    </Wds.FlexBox>
  );
};

export default Demo;
