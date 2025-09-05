'use client';
import { Box, FlexBox, Loading, NoSsr } from '@wanteddev/wds';

import {
  demoStyle,
  demoWrapperStyle,
  editorFallbackStyle,
  editorWrapperStyle,
} from './style';
import Editor from './editor';
import { useDemoControls, useReactDemoRunner } from './hooks';
import Toolbar from './toolbar';

type Props = {
  code: string;
  hideCode?: boolean;
};

const Demo = ({ code, hideCode }: Props) => {
  const { value, handleValueChange, element, error } = useReactDemoRunner({
    code,
  });

  const {
    isTransparent,
    setIsTransparent,
    collapsed,
    setCollapsed,
    isResetting,
    handleCopy,
    handleReset,
    handleResetComplete,
  } = useDemoControls({ initialValue: code, value, handleValueChange });

  return (
    <FlexBox
      flexDirection="column"
      data-role="demo"
      style={
        {
          ['--demo-editor-height']: collapsed ? '250px' : 'fit-content',
        } as React.CSSProperties
      }
      sx={demoWrapperStyle}
    >
      <Box sx={demoStyle({ hideCode, isTransparent })}>{element}</Box>

      {!hideCode && (
        <FlexBox flexDirection="column">
          <Toolbar
            errorMessage={error?.toString()}
            onCopy={handleCopy}
            onReset={handleReset}
            isTransparent={isTransparent}
            onIsTransparentChange={setIsTransparent}
            collapsed={collapsed}
            onCollapseChange={setCollapsed}
          />

          <FlexBox flexDirection="column" sx={editorWrapperStyle}>
            <NoSsr
              fallback={
                <FlexBox
                  alignItems="center"
                  justifyContent="center"
                  sx={editorFallbackStyle}
                >
                  <Loading variant="circular" />
                </FlexBox>
              }
            >
              <Editor
                hasError={Boolean(error)}
                value={value}
                onValueChange={handleValueChange}
                collapsed={collapsed}
                onCollapseChange={setCollapsed}
                isResetting={isResetting}
                handleResetComplete={handleResetComplete}
              />
            </NoSsr>
          </FlexBox>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default Demo;
